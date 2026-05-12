import {Inngest} from "inngest"

export const inngest = new Inngest({
    id: "ai-ticket-assistant",signingKey:process.env.INNGEST_SIGNING_KEY })

