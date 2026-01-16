import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
    console.log("🔐 Login API called")

    try {
        const { email, password } = await req.json()
        console.log("📧 Email:", email)
        console.log("🔑 Password length:", password?.length)

        // Validate credentials
        if (email === "admin@lightburnos.com" && password === "admin123") {
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
