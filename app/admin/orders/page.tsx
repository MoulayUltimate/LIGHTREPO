"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
    }, [])

    if (loading) {
        return <div style={{ padding: '40px' }}>Loading orders...</div>
    }

    return (
        <div style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Orders</h1>
            <p>Total orders: {orders.length}</p>

            {orders.length === 0 ? (
                <p style={{ marginTop: '20px', color: '#666' }}>No orders yet</p>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    {orders.map((order: any) => (
                        <div key={order.id} style={{
                            background: 'white',
                            padding: '20px',
                            marginBottom: '10px',
                            borderRadius: '8px'
                        }}>
                            <p><strong>Order #{order.id.slice(0, 8)}</strong></p>
                            <p>Customer: {order.customerEmail || 'Unknown'}</p>
                            <p>Amount: ${(order.amount / 100).toFixed(2)}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
