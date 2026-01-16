export async function sendTelegramMessage(message: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

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

        if (!res.ok) {
            console.error("Failed to send Telegram message", await res.text())
        }
    } catch (error) {
        console.error("Telegram error:", error)
    }
}
