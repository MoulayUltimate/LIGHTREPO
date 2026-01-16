"use client"

import { useState } from "react"
import { authenticate } from "@/lib/actions"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>("")
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("🖱️ Form submitted")
        setIsPending(true)
        setErrorMessage("")

        const formData = new FormData(event.currentTarget)
        console.log("📋 FormData created")

        try {
            console.log("🌐 Calling authenticate...")
            const result = await authenticate(undefined, formData)
            console.log("📦 Result received:", result)

            if (typeof result === "object" && result.success) {
                console.log("✨ Login successful, creating session...")
                // Store in sessionStorage temporarily
                sessionStorage.setItem("admin_session", JSON.stringify({ email: result.email }))
                console.log("📍 Redirecting to admin...")
                router.push("/admin")
            } else if (typeof result === "string") {
                console.log("⚠️ Error message:", result)
                setErrorMessage(result)
                setIsPending(false)
            } else {
                console.log("❓ Unexpected result type:", typeof result, result)
                setErrorMessage("An unexpected error occurred.")
                setIsPending(false)
            }
        } catch (error) {
            console.error("🔥 Client-side error:", error)
            console.error("Error details:", error instanceof Error ? error.message : String(error))
            setErrorMessage("An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)))
            setIsPending(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="admin@lightburnos.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isPending ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                    <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
