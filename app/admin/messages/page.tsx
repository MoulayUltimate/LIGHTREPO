"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Mail, MessageSquare, Inbox, Send } from "lucide-react"

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState("all")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        fetch("/api/contact")
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }, [mounted])

    if (!mounted) return null

    const filteredMessages = messages.filter((msg) => {
        if (statusFilter === "all") return true
        return msg.status === statusFilter
    })

    const stats = {
        total: messages.length,
        new: messages.filter(m => m.status === 'new').length,
        replied: messages.filter(m => m.status === 'replied').length,
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-500 mt-1">View and manage customer messages</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Messages</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">New Messages</p>
                            <p className="text-3xl font-bold text-orange-600 mt-2">{stats.new}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                            <Inbox className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Replied</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">{stats.replied}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <Send className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                    <div className="flex gap-2">
                        {['all', 'new', 'replied'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === status
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Messages List */}
            {loading ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">
                    Loading messages...
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No messages yet</p>
                    <p className="text-gray-400 text-sm mt-2">Customer messages will appear here</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredMessages.map((msg) => (
                        <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{msg.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Mail className="h-3 w-3" />
                                            <a href={`mailto:${msg.email}`} className="hover:text-red-600 transition-colors">
                                                {msg.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${msg.status === 'new' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {msg.status === 'new' ? 'New' : 'Replied'}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {msg.createdAt ? format(new Date(msg.createdAt), "MMM d, yyyy HH:mm") : "-"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Subject: <span className="font-normal text-gray-600">{msg.subject || "No Subject"}</span>
                                </h4>
                                <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">
                                    {msg.message}
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <a
                                        href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your inquiry"}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
