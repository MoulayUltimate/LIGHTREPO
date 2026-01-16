"use client"

import { useEffect, useState } from "react"
import { Search, Filter, ShoppingCart, Mail } from "lucide-react"

export default function MissedCheckoutsPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        fetch("/api/orders")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    // Filter for abandoned orders
                    setOrders(data.filter((o: any) => o.status === 'abandoned'))
                } else {
                    setOrders([])
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setOrders([])
                setLoading(false)
            })
    }, [mounted])

    if (!mounted) return null

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            (order.customerEmail?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (order.id?.toLowerCase() || "").includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const formatDate = (dateString: string) => {
        if (!dateString) return '-'
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Missed Checkouts</h1>
                <p className="text-sm text-gray-500 mt-1">Track abandoned carts and potential customers</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Total Missed</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">{orders.length}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Potential Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        ${(orders.reduce((sum, o) => sum + o.amount, 0) / 100).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading missed checkouts...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-12 text-center">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No missed checkouts</p>
                        <p className="text-gray-400 text-sm mt-2">Abandoned carts will appear here</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => {
                                    let items = []
                                    try {
                                        items = JSON.parse(order.metadata || "[]")
                                    } catch (e) { }

                                    return (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{order.customerEmail || "Unknown"}</div>
                                                {order.name && <div className="text-sm text-gray-500">{order.name}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ${(order.amount / 100).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {items.length > 0 ? (
                                                    <div className="flex flex-col gap-1">
                                                        {items.map((item: any, i: number) => (
                                                            <span key={i} className="text-xs">
                                                                {item.quantity}x {item.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href={`mailto:${order.customerEmail}?subject=Complete your purchase&body=Hi, we noticed you left something in your cart...`}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                                                >
                                                    <Mail className="w-3 h-3" />
                                                    Email Customer
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
