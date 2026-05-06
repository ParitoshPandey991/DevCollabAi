import { inngest } from "../client.js"
import Ticket from "../../models/ticket.js"
import { NonRetriableError } from "inngest"
import  analyzeTicket  from "../../utils/agent.js"
import User from "../../models/user.js"
import { sendEmail } from "../../utils/mailer.js"
import user from "../../models/user.js"
export const onTicketCreate = inngest.createFunction(
  {
    id: "on-ticket-create",
    retries: 3,
    triggers: [{ event: "ticket/create" }], // ✅ FIXED
  },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      const ticket = await step.run("get-ticket", async () => {
        const ticketObj = await Ticket.findById(ticketId);
        if (!ticketObj) {
          throw new NonRetriableError("Ticket not found");
        }
        return ticketObj;
      });

      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          status: "TODO",
        });
      });

      const airesponse = await analyzeTicket(ticket);

      const relatedSkills = await step.run("ai-processing", async () => {
        let skills = [];

        if (airesponse) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: ["High", "Medium", "Low"].includes(airesponse.priority)
              ? airesponse.priority
              : "Medium",
            helpfulNotes: airesponse.helpfulNotes,
            relatedSkills: airesponse.relatedSkills,
            status: "IN_PROGRESS",
          });

          skills = Array.isArray(airesponse.relatedSkills)
            ? airesponse.relatedSkills
            : [];
        }

        return skills;
      });

      const moderator = await step.run("assign-ticket", async () => {
        if (relatedSkills.length === 0) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            status: "CANCELLED",
            helpfulNotes:
              airesponse?.helpfulNotes ||
              "AI could not determine skills.",
          });
          throw new NonRetriableError(
            "No skills detected. Ticket cancelled."
          );
        }

        const regexSkills = relatedSkills.map(
          (skill) => new RegExp(skill, "i")
        );

        const user = await User.findOne({
          role: "moderator",
          skills: { $in: regexSkills },
        });

        if (!user) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            status: "CANCELLED",
            helpfulNotes:
              airesponse?.helpfulNotes ||
              "No moderator available.",
          });
          throw new NonRetriableError(
            "No moderator found. Ticket cancelled."
          );
        }

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignedTo: user._id,
        });

        return user;
      });

      await step.run("notify-assigned-user", async () => {
        if (moderator) {
          const finalTicket = await Ticket.findById(ticket._id);
          await sendEmail(
            moderator.email,
            "Ticket Assigned",
            `You have been assigned a new ticket: ${finalTicket.title}`
          );
        }
      });

      await step.run("finalstatus", async () => {
        if (moderator) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            status: "ASSIGNED",
          });
        }
      });

      return { success: true };
    } catch (error) {
      console.error("Error in onTicketCreate:", error);
      return { success: false };
    }
  }
);