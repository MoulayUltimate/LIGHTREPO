import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"

const { providers, ...authConfigRest } = authConfig

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfigRest,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    // Use environment variables for credentials
                    const adminEmail = process.env.ADMIN_EMAIL
                    const adminPassword = process.env.ADMIN_PASSWORD

                    if (!adminEmail || !adminPassword) {
                        console.error("Admin credentials not configured")
                        return null
                    }

                    if (email === adminEmail && password === adminPassword) {
                        return {
                            id: "1",
                            email: adminEmail,
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
