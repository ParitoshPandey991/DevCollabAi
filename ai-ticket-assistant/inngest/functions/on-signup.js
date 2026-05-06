import { inngest } from "../client.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendEmail } from "../../utils/mailer.js";

export const onSignup = inngest.createFunction(
  {
    id: "on-signup",
    retries: 3,
    triggers: [{ event: "user/signup" }],// ✅ FIXED
  },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      const user = await step.run("get-user-email", async () => {
        const userobj = await User.findOne({ email });

        if (!userobj) {
          throw new NonRetriableError("User not found");
        }

        return userobj;
      });

      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to DEVCOLLAB-AI";
        const text = `Hello,\n\nWelcome to DEVCOLLAB-AI! We're excited to have you on board.\n\nBest regards,\nThe DEVCOLLAB-AI Team`;

        try {
          const result = await sendEmail(email, subject, text);
          console.log("📧 Email sent:", result);
        } catch (err) {
          console.error("❌ Email send error:", err);
          throw new NonRetriableError("Email failed");
        }
      });

      return { success: true, user };
    } catch (error) {
      console.error("Error in onSignup function:", error);
      return { success: false };
    }
  }
);