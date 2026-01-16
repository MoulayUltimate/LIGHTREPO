import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    // TEMPORARY: Hardcoded admin for initial access
                    if (email === "admin@lightburnos.com" && password === "admin123") {
                        return {
                            id: "1",
                            email: "admin@lightburnos.com",
                            name: "Admin User",
                            role: "admin"
                        }
                    }
                }

                console.log("Invalid credentials")
                return null
            },
        }),
    ],
})
