"use client"

export default function AdminDashboard() {
    return (
        <div style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>

            <div style={{ marginTop: '40px' }}>
                <a href="/admin/orders" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#8B1A1A',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    marginRight: '10px'
                }}>
                    View Orders
                </a>

                <a href="/admin/messages" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#8B1A1A',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px'
                }}>
                    View Messages
                </a>
            </div>
        </div>
    )
}
