"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function AnalyticsDashboard() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetch("/api/analytics/stats")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    if (!mounted) return null
    if (loading) return <div className="p-8">Loading analytics...</div>
    if (!data) return <div className="p-8">Failed to load data</div>

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Visitors</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{data.totalVisitors}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Page Views</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{data.totalPageViews}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Live Visitors (est)</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{data.liveVisitors}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Bounce Rate</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{data.bounceRate}%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm h-[400px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Over Time</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.dailyTraffic}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="visitors" stroke="#4F46E5" strokeWidth={2} />
                            <Line type="monotone" dataKey="views" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm h-[400px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Pages</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.topPages} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="path" type="category" width={150} />
                            <Tooltip />
                            <Bar dataKey="views" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                    <div className="space-y-4">
                        {data.devices.map((device: any) => (
                            <div key={device.type} className="flex items-center justify-between">
                                <span className="capitalize text-gray-600">{device.type}</span>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${device.percentage}%` }} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-12 text-right">{device.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
                    <div className="space-y-4">
                        {data.countries.map((country: any) => (
                            <div key={country.country} className="flex items-center justify-between">
                                <span className="text-gray-600">{country.country}</span>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: `${country.percentage}%` }} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-12 text-right">{country.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
