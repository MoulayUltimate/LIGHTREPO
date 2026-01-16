export async function sendTelegramMessage(message: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    console.log("Sending Telegram message...")
    console.log("Token exists:", !!token)
    console.log("Chat ID exists:", !!chatId)

    if (!token || !chatId) {
        console.warn("Telegram credentials missing")
        return
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        })

        const responseText = await res.text()
        console.log("Telegram API response:", responseText)

        if (!res.ok) {
            console.error("Failed to send Telegram message", responseText)
        }
    } catch (error) {
        console.error("Telegram error:", error)
    }
}
