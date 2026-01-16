"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })

        // NextAuth with redirect: false returns { error } on failure or { url } on success
        if (result?.error) {
            return "Invalid credentials."
        }

        return { success: true }
    } catch (error) {
        console.error("Auth error:", error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials."
                default:
                    return "Something went wrong."
            }
        }
        return "An authentication error occurred."
    }
}
