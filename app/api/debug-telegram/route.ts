import { NextResponse } from "next/server"

export const runtime = 'edge'

export async function GET() {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    const debug = {
        tokenExists: !!token,
        chatIdExists: !!chatId,
        tokenPreview: token ? token.substring(0, 10) + "..." : null,
        chatIdPreview: chatId ? chatId.substring(0, 3) + "..." : null,
        telegramResponse: null as any,
        error: null as any,
    }

    if (!token || !chatId) {
        return NextResponse.json(debug)
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: "🧪 Test message from your website!",
                parse_mode: "HTML",
            }),
        })

        debug.telegramResponse = await res.json()
    } catch (error) {
        debug.error = String(error)
    }

    return NextResponse.json(debug)
}
