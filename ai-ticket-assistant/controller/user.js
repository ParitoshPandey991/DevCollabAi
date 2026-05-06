import { inngest } from "../inngest/client.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Ticket from '../models/ticket.js'
 
export const signupUser = async (req, res) => {
    const { email, password,skills=[],role} = req.body;
    console.log("body",req.body);
    
    if (!email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }   
    
    try {
       const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "A User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            skills,
            role,
        });

           await newUser.save();
        

        await inngest.send({
            name: "user/signup",
            data: { email},
        })

       const token = jwt.sign(
            {_id:newUser._id, role: newUser.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" },)
        return res.json({token, user: newUser});

    } catch (error) {
   
         res.status(500).json({ error: "Internal server error in signup", details: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({ token, user });

    } catch (error) {
        res.status(500).json({ error: "Internal server error in login", details: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        jwt.verify(token,process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            res.json({ message: "User logged out successfully" });
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error in logout", details: error.message });
    }
}
export const updateUser = async (req, res) => {
  const { skills } = req.body;

  if (!Array.isArray(skills)) {
    return res.status(400).json({ error: "Skills must be an array" });
  }

  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.updateOne(
      { _id: req.user._id },
      [
        {
          $set: {
            skills: {
              $setUnion: ["$skills", skills], // merge and remove duplicates
            },
          },
        },
      ]
    );
    

    return res.json({ message: "User updated successfully using pipeline" });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error in updateUser",
      details: error.message,
    });
  }
};

export const getuser = async(req,res)=>{
      try {
        const user = await User.findById(req.user._id).select("email skills createdAt updatedAt")
        if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

     return res.json(user);
      } catch (error) {
         return res.status(500).json({
      error: "Internal server error in gettingUser",
      details: error.message,
    });
      }
}


export const completestatus = async(req,res) =>{
  
         const mid = req.params.mid
    const decodedid= decodeURIComponent(mid)
    

    try {
       const ticket = await Ticket.findById(decodedid);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.status = 'COMPLETED';
  await ticket.save();
     return res.status(200).json(ticket);
    } catch (error) {
        console.error("Error creating ticket:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while geetiing tickets",details:error.message});
  
    }
}

