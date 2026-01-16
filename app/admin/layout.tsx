"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Don't show admin layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    const handleSignOut = () => {
        sessionStorage.removeItem("admin_session")
        router.push("/admin/login")
    }

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Analytics", href: "/admin/analytics", icon: LayoutDashboard },
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    ]

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-50 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-gray-900">LightBurn Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                {children}
            </main>
        </div>
    )
}
