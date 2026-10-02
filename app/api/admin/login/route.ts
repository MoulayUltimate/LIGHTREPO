import { NextResponse } from "next/server"

export const runtime = "edge"

// The address is fixed; only the password is a secret, and that stays in
// the ADMIN_PASSWORD environment variable.
const ADMIN_EMAIL = "admin@lightburnos.com"

export async function POST(req: Request) {
    console.log("🔐 Login API called")

    try {
        const { email, password } = await req.json()
        console.log("📧 Email:", email)
        console.log("🔑 Password length:", password?.length)

        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminPassword) {
            console.error("❌ ADMIN_PASSWORD is not configured")
            return NextResponse.json({
                success: false,
                error: "Server configuration error"
            }, { status: 500 })
        }

        if (email === ADMIN_EMAIL && password === adminPassword) {
            console.log("✅ Credentials valid!")
            return NextResponse.json({
                success: true,
                email
            })
        } else {
            console.log("❌ Invalid credentials")
            return NextResponse.json({
                success: false,
                error: "Invalid credentials"
            }, { status: 401 })
        }
    } catch (error) {
        console.error("💥 Login error:", error)
        return NextResponse.json({
            success: false,
            error: "An error occurred"
        }, { status: 500 })
    }
}
