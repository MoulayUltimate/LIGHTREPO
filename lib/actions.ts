"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

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

        console.log("🚀 Calling signIn...")
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        console.log("✅ signIn result:", JSON.stringify(result))

        // NextAuth with redirect: false returns { error } on failure or { url } on success
        if (result?.error) {
            console.log("❌ SignIn error:", result.error)
            return "Invalid credentials."
        }

        console.log("🎉 Authentication successful!")
        return { success: true }
    } catch (error) {
        console.error("💥 Auth error caught:", error)
        console.error("Error type:", typeof error)
        console.error("Error constructor:", error?.constructor?.name)
        console.error("Error message:", error instanceof Error ? error.message : String(error))

        if (error instanceof AuthError) {
            console.log("📝 AuthError type:", error.type)
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials."
                default:
                    return "Something went wrong."
            }
        }
        return "An authentication error occurred: " + (error instanceof Error ? error.message : String(error))
    }
}
