"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminDashboard() {
    const router = useRouter()
    const [sessionData, setSessionData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for session
        const session = sessionStorage.getItem("admin_session")
        if (!session) {
            router.push("/admin/login")
            return
        }

        try {
            const data = JSON.parse(session)
            setSessionData(data)
            setLoading(false)
        } catch (e) {
            router.push("/admin/login")
        }
    }, [router])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back, {sessionData?.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/admin/analytics" className="block">
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Analytics</h3>
                            <p className="text-gray-600 text-sm">View visitor and page view statistics</p>
                        </div>
                    </Link>

                    <Link href="/admin/orders" className="block">
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛒 Orders</h3>
                            <p className="text-gray-600 text-sm">Manage customer orders</p>
                        </div>
                    </Link>

                    <Link href="/admin/messages" className="block">
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">💬 Messages</h3>
                            <p className="text-gray-600 text-sm">View contact form submissions</p>
                        </div>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
                    <p className="text-gray-600">Loading statistics...</p>
                </div>
            </div>
        </div>
    )
}
