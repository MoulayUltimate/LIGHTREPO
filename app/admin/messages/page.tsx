"use client"

import { useEffect, useState } from "react"

export default function MessagesPage() {
    const [messages, setMessages] = useState([])
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

    if (loading) {
        return <div style={{ padding: '40px' }}>Loading messages...</div>
    }

    return (
        <div style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Messages</h1>
            <p>Total messages: {messages.length}</p>

            {messages.length === 0 ? (
                <p style={{ marginTop: '20px', color: '#666' }}>No messages yet</p>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    {messages.map((msg: any) => (
                        <div key={msg.id} style={{
                            background: 'white',
                            padding: '20px',
                            marginBottom: '10px',
                            borderRadius: '8px'
                        }}>
                            <p><strong>{msg.name}</strong></p>
                            <p>Email: {msg.email}</p>
                            <p>Subject: {msg.subject || 'No subject'}</p>
                            <p style={{ marginTop: '10px' }}>{msg.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
