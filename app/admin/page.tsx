"use client"

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-4">You are successfully logged in!</p>

            <div className="mt-8 grid gap-4">
                <a href="/admin/analytics" className="block p-4 bg-white rounded shadow hover:shadow-md">
                    📊 Analytics
                </a>
                <a href="/admin/orders" className="block p-4 bg-white rounded shadow hover:shadow-md">
                    🛒 Orders
                </a>
                <a href="/admin/messages" className="block p-4 bg-white rounded shadow hover:shadow-md">
                    💬 Messages
                </a>
            </div>
        </div>
    )
}
