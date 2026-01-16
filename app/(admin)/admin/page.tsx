"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, ShoppingCart, MessageSquare, DollarSign } from "lucide-react"

interface DashboardStats {
    totalVisitors: number
    totalOrders: number
    totalRevenue: number
    pendingMessages: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        async function loadStats() {
            try {
                const [ordersRes, messagesRes, analyticsRes] = await Promise.all([
                    fetch("/api/orders"),
                    fetch("/api/contact"),
                    fetch("/api/analytics/stats")
                ])

                const orders = ordersRes.ok ? await ordersRes.json() : []
                const messages = messagesRes.ok ? await messagesRes.json() : []
                const analytics = analyticsRes.ok ? await analyticsRes.json() : { totalVisitors: 0 }

                // Safety checks
                const safeOrders = Array.isArray(orders) ? orders : []
                const safeMessages = Array.isArray(messages) ? messages : []

                const totalRevenue = safeOrders.reduce((sum: number, order: any) => {
                    return order.status === 'paid' ? sum + order.amount : sum
                }, 0)

                const pendingMessages = safeMessages.filter((m: any) => m.status === 'new').length

                setStats({
                    totalVisitors: analytics.totalVisitors || 0,
                    totalOrders: safeOrders.length || 0,
                    totalRevenue: totalRevenue / 100,
                    pendingMessages,
                })
            } catch (error) {
                console.error("Failed to load stats:", error)
            } finally {
                setLoading(false)
            }
        }

        loadStats()
    }, [mounted])

    if (!mounted) return null

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                    <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const statCards = [
        {
            title: "Total Revenue",
            value: `$${stats?.totalRevenue.toFixed(2) || '0.00'}`,
            change: "+8.3%",
            icon: DollarSign,
            color: "green",
            badge: `${stats?.totalOrders || 0} orders`
        },
        {
            title: "Total Visitors",
            value: stats?.totalVisitors || 0,
            change: "+12.5%",
            icon: Users,
            color: "blue",
            badge: "Last 30 days"
        },
        {
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            change: "+5.2%",
            icon: ShoppingCart,
            color: "purple",
            badge: "All time"
        },
        {
            title: "New Messages",
            value: stats?.pendingMessages || 0,
            change: "Live",
            icon: MessageSquare,
            color: "orange",
            badge: "Unread"
        },
    ]

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Real-time analytics and visitor tracking</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ● LIVE
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => {
                    const IconComponent = card.icon
                    const bgColor = {
                        green: "bg-green-50",
                        blue: "bg-blue-50",
                        purple: "bg-purple-50",
                        orange: "bg-orange-50"
                    }[card.color]

                    const iconColor = {
                        green: "text-green-600",
                        blue: "text-blue-600",
                        purple: "text-purple-600",
                        orange: "text-orange-600"
                    }[card.color]

                    return (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                                    <IconComponent className={`w-6 h-6 ${iconColor}`} />
                                </div>
                                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {card.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                                <p className="text-xs text-green-600 mt-2">↑ {card.badge}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="/admin/orders" className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Manage Orders</p>
                            <p className="text-sm text-gray-500">View and track customer orders</p>
                        </div>
                    </div>
                </a>

                <a href="/admin/messages" className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">View Messages</p>
                            <p className="text-sm text-gray-500">Respond to customer inquiries</p>
                        </div>
                    </div>
                </a>

                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 shadow-sm text-white">
                    <div>
                        <p className="text-sm opacity-90">Welcome back!</p>
                        <p className="text-2xl font-bold mt-1">Admin Dashboard</p>
                        <p className="text-sm opacity-90 mt-2">LightBurn Management Panel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
