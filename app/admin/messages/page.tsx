"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Mail, MessageSquare } from "lucide-react"

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
    }, [])

    if (loading) return <div className="p-8">Loading messages...</div>

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            </div>

            <div className="grid gap-6">
                {messages.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No messages yet</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Mail className="h-3 w-3" />
                                            <a href={`mailto:${msg.email}`} className="hover:text-indigo-600">{msg.email}</a>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {msg.createdAt ? format(new Date(msg.createdAt), "MMM d, yyyy HH:mm") : "-"}
                                </span>
                            </div>

                            <div className="pl-13">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Subject: <span className="font-normal text-gray-600">{msg.subject || "No Subject"}</span>
                                </h4>
                                <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
                                    {msg.message}
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <a
                                        href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your inquiry"}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
