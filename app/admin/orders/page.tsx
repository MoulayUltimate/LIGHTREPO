"use client"

import { useEffect, useState } from "react"
import { Search, Filter, Download, Eye, Package } from "lucide-react"
import { format } from "date-fns"

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        fetch("/api/orders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }, [mounted])

    if (!mounted) return null

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || order.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const stats = {
        total: orders.length,
        paid: orders.filter(o => o.status === 'paid').length,
        pending: orders.filter(o => o.status === 'pending').length,
        revenue: orders.reduce((sum, o) => o.status === 'paid' ? sum + o.amount : sum, 0) / 100
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and track customer orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Paid Orders</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.paid}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">${stats.revenue.toFixed(2)}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="p-4 flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by email or order ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading orders...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No orders found</p>
                        <p className="text-gray-400 text-sm mt-2">Orders will appear here once customers make purchases</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
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
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                                #{order.id.slice(0, 8)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {order.createdAt ? format(new Date(order.createdAt), "MMM d, yyyy") : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{order.customerEmail || "Unknown"}</div>
                                                {order.name && <div className="text-sm text-gray-500">{order.name}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ${(order.amount / 100).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
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
