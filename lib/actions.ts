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

        // Validate credentials directly
        if (email === "admin@lightburnos.com" && password === "admin123") {
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
