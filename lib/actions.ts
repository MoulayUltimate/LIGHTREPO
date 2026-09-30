"use server"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log("🔐 authenticate called")
    try {
        const email = formData.get("email")
        const password = formData.get("password")
        console.log("📧 Email:", email)
        console.log("🔑 Password length:", password?.toString().length)

        // Validate credentials from environment
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
            console.error("❌ Admin credentials not configured")
            return "Authentication configuration error."
        }

        if (email === adminEmail && password === adminPassword) {
            console.log("✅ Credentials valid!")
            return { success: true, email: String(email) }
        } else {
            console.log("❌ Invalid credentials")
            return "Invalid credentials."
        }
    } catch (error) {
        console.error("💥 Auth error caught:", error)
        return "An authentication error occurred."
    }
}
