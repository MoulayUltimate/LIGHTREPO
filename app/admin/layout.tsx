"use client"

import { usePathname } from "next/navigation"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    // Don't show layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: '#1F2937', color: 'white', padding: '20px' }}>
                <h1 style={{ fontSize: '20px', marginBottom: '30px' }}>LightBurn Admin</h1>
                <nav>
                    <a href="/admin" style={{ display: 'block', padding: '10px', color: 'white', textDecoration: 'none' }}>Dashboard</a>
                    <a href="/admin/orders" style={{ display: 'block', padding: '10px', color: 'white', textDecoration: 'none' }}>Orders</a>
                    <a href="/admin/messages" style={{ display: 'block', padding: '10px', color: 'white', textDecoration: 'none' }}>Messages</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, background: '#F9FAFB' }}>
                {children}
            </main>
        </div>
    )
}
