"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        // Check session
        const session = sessionStorage.getItem("admin_session")
        if (!session && pathname !== "/admin/login") {
            router.push("/admin/login")
            return
        }

        if (session) {
            try {
                const data = JSON.parse(session)
                setUserEmail(data.email)
            } catch (e) {
                console.error("Session parse error:", e)
            }
        }
    }, [pathname, router])

    // Don't show layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    const handleSignOut = () => {
        sessionStorage.removeItem("admin_session")
        router.push("/admin/login")
    }

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    ]

    const isActive = (href: string, exact = false) => {
        if (exact) {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-50 flex flex-col">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">LB</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">LightBurn</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const active = isActive(item.href, item.exact)
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                            ? "bg-red-50 text-red-700"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 ${active ? "text-red-700" : "text-gray-400"}`} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="mb-3 px-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">
                                    {userEmail ? userEmail.charAt(0).toUpperCase() : "A"}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">Admin User</p>
                                <p className="text-xs text-gray-500 truncate">{userEmail || "admin@lightburnos.com"}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    )
}
