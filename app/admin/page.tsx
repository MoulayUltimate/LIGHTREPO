"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Users, ShoppingCart, MessageSquare, DollarSign } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface DashboardStats {
    totalVisitors: number
    totalOrders: number
    totalRevenue: number
    pendingMessages: number
    visitorsChange: number
    ordersChange: number
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
                // Fetch orders
                const ordersRes = await fetch("/api/orders")
                const orders = ordersRes.ok ? await ordersRes.json() : []

                // Fetch messages
                const messagesRes = await fetch("/api/contact")
                const messages = messagesRes.ok ? await messagesRes.json() : []

                // Fetch analytics
                const analyticsRes = await fetch("/api/analytics/stats")
                const analytics = analyticsRes.ok ? await analyticsRes.json() : { totalVisitors: 0 }

                // Calculate stats
                const totalRevenue = orders.reduce((sum: number, order: any) => {
                    return order.status === 'paid' ? sum + order.amount : sum
                }, 0)

                const pendingMessages = messages.filter((m: any) => m.status === 'new').length

                setStats({
                    totalVisitors: analytics.totalVisitors || 0,
                    totalOrders: orders.length || 0,
                    totalRevenue: totalRevenue / 100, // Convert from cents
                    pendingMessages,
                    visitorsChange: 12.5, // Mock data
                    ordersChange: 8.3, // Mock data
                })
            } catch (error) {
                console.error("Failed to load stats:", error)
            } finally {
                setLoading(false)
            }
        }

        loadStats()
    }, [mounted])

    // Sample chart data
    const revenueData = [
        { day: 'Mon', revenue: 45 },
        { day: 'Tue', revenue: 52 },
        { day: 'Wed', revenue: 38 },
        { day: 'Thu', revenue: 65 },
        { day: 'Fri', revenue: 75 },
        { day: 'Sat', revenue: 42 },
        { day: 'Sun', revenue: 38 },
    ]

    const conversionData = [
        { name: 'Visitors', value: stats?.totalVisitors || 0, color: '#3B82F6' },
        { name: 'Add to Cart', value: Math.floor((stats?.totalVisitors || 0) * 0.4), color: '#8B5CF6' },
        { name: 'Checkout', value: Math.floor((stats?.totalVisitors || 0) * 0.15), color: '#EC4899' },
        { name: 'Purchase', value: stats?.totalOrders || 0, color: '#10B981' },
    ]

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
            value: `$${stats?.totalRevenue.toFixed(2)}`,
            change: stats?.ordersChange || 0,
            trend: "up",
            icon: DollarSign,
            color: "green",
            badge: `${stats?.totalOrders} orders`
        },
        {
            title: "Total Visitors",
            value: stats?.totalVisitors || 0,
            change: stats?.visitorsChange || 0,
            trend: "up",
            icon: Users,
            color: "blue",
            badge: "Last 30 days"
        },
        {
            title: "Pending Orders",
            value: stats?.totalOrders || 0,
            change: 0,
            trend: "neutral",
            icon: ShoppingCart,
            color: "purple",
            badge: "Live"
        },
        {
            title: "New Messages",
            value: stats?.pendingMessages || 0,
            change: 0,
            trend: "neutral",
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
                                {card.change !== 0 && (
                                    <span className={`text-xs font-medium flex items-center gap-1 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {card.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {card.change}%
                                    </span>
                                )}
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8B1A1A"
                                strokeWidth={2}
                                dot={{ fill: '#8B1A1A', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
                    <div className="space-y-4">
                        {conversionData.map((item, index) => {
                            const percentage = conversionData[0].value > 0
                                ? ((item.value / conversionData[0].value) * 100).toFixed(1)
                                : 0

                            return (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: item.color }}>
                                                <span className="text-white text-sm font-semibold">{index + 1}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-gray-900">{item.value}</span>
                                            {index > 0 && (
                                                <span className="text-xs text-red-500">
                                                    -{((conversionData[index - 1].value - item.value) / conversionData[index - 1].value * 100).toFixed(1)}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: item.color
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
