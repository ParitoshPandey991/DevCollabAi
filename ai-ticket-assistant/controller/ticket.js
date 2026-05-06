import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.js";
export const createTicket = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const title = req.body.title?.trim();
    const description = req.body.description?.trim();

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString(),
    });

    try {
      await inngest.send({
        name: "ticket/create",
        data: {
          ticketId: newTicket._id,
          title,
          description,
          createdBy: req.user._id.toString(),
        },
      });
    } catch (e) {
      console.error("Inngest event send error:", e);
    }

    return res
      .status(201)
      .json({
        message: "Ticket created successfully and processing started",
        ticket: newTicket,
      });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while creating tickets",details:error.message});
  }
};


export const getuserTickets = async (req, res) => {
    try {
      
        const tickets = await Ticket.find({ createdBy: req.user._id }).select("title description status createdAt updatedAt").sort({ createdAt: -1 })
        
        // Jab ye frontend pe bad request beja tha hai to server down page redirect kar deta hai
        // if (tickets.length === 0) {
        //     return res.status(404).json({ error: "No tickets found" });
        // }

        if (tickets.length === 0) {
            return res.status(200).json(tickets);
        }
        
        return res.status(200).json( tickets );

    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ error: "Internal server error while fetching tickets"})
    }
}

export const getmoderatorTicketbyid = async (req, res) => {
    const mid = req.params.mid
    const decodedid= decodeURIComponent(mid)
    try {
        
      
          const ticket = await Ticket.findOne({ _id: decodedid, assignedTo: req.user._id }).select("title description status priority helpfulNotes relatedSkills assignedTo createdBy createdAt updatedAt").populate('createdBy', 'email');
         
        
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        return res.status(200).json(ticket);
    } catch (error) {
         console.error("Error creating ticket:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while getting tickets",details:error.message});
  
    }
}

export const getuserTicketbyid = async (req, res) => {
    const id = req.params.id
    const decodedid= decodeURIComponent(id)
    try {
        
      
          const ticket = await Ticket.findOne({ _id: decodedid, createdBy: req.user._id }).select("title description status helpfulNotes priority relatedSkills createdBy assignedTo createdAt updatedAt").populate('assignedTo', 'email');
        
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        return res.status(200).json(ticket);
    } catch (error) {
         console.error("Error creating ticket:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while getting tickets",details:error.message});
  
    }
}

export const getassignedTickets = async (req, res) => {
    console.log(req.user._id)
    try {

        
        
        const tickets = await Ticket.find({ assignedTo: req.user._id }).select("title description status createdAt updatedAt").sort({ createdAt: -1 });
        
        if (tickets.length === 0) {
            return res.status(200).json(tickets);
        }
        
        return res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching assigned tickets:", error);
        return res.status(500).json({ error: "Internal server error while fetching assigned tickets" });
    }
}

