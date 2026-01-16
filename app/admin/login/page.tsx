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
        setIsPending(true)
        setErrorMessage("")

        const formData = new FormData(event.currentTarget)
        try {
            const result = await authenticate(undefined, formData)

            if (typeof result === "object" && result.success) {
                router.push("/admin")
                router.refresh() // Ensure session is updated
            } else if (typeof result === "string") {
                setErrorMessage(result)
                setIsPending(false)
            } else {
                setErrorMessage("An unexpected error occurred.")
                setIsPending(false)
            }
        } catch (error) {
            console.error("Login error:", error)
            setErrorMessage("An unexpected error occurred.")
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
                                placeholder="admin@example.com"
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
