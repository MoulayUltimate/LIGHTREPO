"use client"

import { useEffect, useState } from "react"
import { Eye, TrendingUp, ShoppingBag, Activity } from "lucide-react"

interface LiveStats {
    windowMinutes: number
    visitorsNow: number
    pageViewsNow: number
    checkingOutNow: number
    abandonedNow: number
    purchasedNow: number
    salesNow: number
    salesAllTime: number
    ordersAllTime: number
    visitorDetails: Array<{
        id: string
        country: string
        enteredAt: number
        status: string
        currentPage: string
    }>
}

export function LiveView() {
    const [stats, setStats] = useState<LiveStats>({
        windowMinutes: 10,
        visitorsNow: 0,
        pageViewsNow: 0,
        checkingOutNow: 0,
        abandonedNow: 0,
        purchasedNow: 0,
        salesNow: 0,
        salesAllTime: 0,
        ordersAllTime: 0,
        visitorDetails: [],
    })
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/live-stats")
            const data = await res.json()
            if (!data.error) {
                setStats(data)
            }
            setLoading(false)
        } catch (err) {
            console.error("Failed to fetch live stats:", err)
            setLoading(false)
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        // Initial fetch
        fetchStats()

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000)

        return () => clearInterval(interval)
    }, [mounted])

    if (!mounted) return null

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <h1 className="text-2xl font-bold text-gray-900">Live View</h1>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Real-time activity from the last 10 minutes</p>
                </div>
                <div className="text-xs text-gray-400">Auto-refreshes every 30s</div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Visitors right now</p>
                        <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.visitorsNow}</p>
                    <p className="text-xs text-gray-400 mt-2">last {stats.windowMinutes} min</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Page views</p>
                        <Activity className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.pageViewsNow}</p>
                    <p className="text-xs text-gray-400 mt-2">last {stats.windowMinutes} min</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Sales</p>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">${stats.salesAllTime.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        all time · ${stats.salesNow.toFixed(2)} in last {stats.windowMinutes} min
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Paid orders</p>
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.ordersAllTime}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        all time · {stats.purchasedNow} in last {stats.windowMinutes} min
                    </p>
                </div>
            </div>

            {/* Customer Behavior */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Customer behavior</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {/* Active carts */}
                    <div className="p-6">
                        <p className="text-sm text-gray-500 mb-1">Abandoned</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.abandonedNow}</p>
                    </div>

                    {/* Checking out */}
                    <div className="p-6">
                        <p className="text-sm text-gray-500 mb-1">Checking out</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.checkingOutNow}</p>
                    </div>

                    {/* Purchased */}
                    <div className="p-6">
                        <p className="text-sm text-gray-500 mb-1">Purchased</p>
                        <p className="text-2xl font-bold text-green-600">{stats.purchasedNow}</p>
                    </div>
                </div>

                {/* Visitor Details List */}
                {stats.visitorDetails.length > 0 && (
                    <>
                        <div className="border-t border-gray-100"></div>
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">Live Visitors (Last 10 min)</h3>
                            <div className="space-y-3">
                                {stats.visitorDetails.map((visitor, index) => {
                                    const timeAgo = Math.floor((Date.now() / 1000 - visitor.enteredAt) / 60)
                                    const statusColors = {
                                        browsing: 'bg-gray-100 text-gray-700',
                                        checking_out: 'bg-yellow-100 text-yellow-700',
                                        abandoned: 'bg-red-100 text-red-700',
                                        paid: 'bg-green-100 text-green-700',
                                    }
                                    const statusLabels = {
                                        browsing: 'Browsing',
                                        checking_out: 'Checking Out',
                                        abandoned: 'Abandoned',
                                        paid: 'Paid',
                                    }
                                    return (
                                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{visitor.country === 'US' ? '🇺🇸' : visitor.country === 'MA' ? '🇲🇦' : visitor.country === 'GB' ? '🇬🇧' : visitor.country === 'FR' ? '🇫🇷' : visitor.country === 'DE' ? '🇩🇪' : visitor.country === 'CA' ? '🇨🇦' : '🌍'}</div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-mono text-gray-600">#{visitor.id}</span>
                                                        {timeAgo < 2 && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{timeAgo === 0 ? 'Just now' : `${timeAgo} min ago`}</div>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[visitor.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700'}`}>
                                                {statusLabels[visitor.status as keyof typeof statusLabels] || visitor.status}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {loading && (
                <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">
                    Updating...
                </div>
            )}
        </div>
    )
}
