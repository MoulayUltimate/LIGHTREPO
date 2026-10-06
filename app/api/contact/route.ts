import { NextResponse } from "next/server"
import { requireAdminApi } from "@/lib/admin-auth"
import { db } from "@/lib/db"
import { contactMessages } from "@/db/schema"
import { sendTelegramMessage } from "@/lib/telegram"

export const runtime = "edge"

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // const db = drizzle(process.env.DB as D1Database)

        await db.insert(contactMessages).values({
            id: crypto.randomUUID(),
            name,
            email,
            subject,
            message,
            status: "new",
        })

        // Notify Telegram
        await sendTelegramMessage(
            `📩 <b>New Contact Message</b>\n\n` +
            `👤 Name: ${name}\n` +
            `📧 Email: ${email}\n` +
            `📝 Subject: ${subject}\n` +
            `💬 Message: ${message}`
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Contact API Error:", error)
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    // Returns every customer message, so this is admin-only.
    const denied = await requireAdminApi(req)
    if (denied) return denied

    try {
        // const db = drizzle(process.env.DB as D1Database)
        const messages = await db.select().from(contactMessages).all()
        return NextResponse.json(messages)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
    }
}
