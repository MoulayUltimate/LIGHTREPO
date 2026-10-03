import { Users, ShoppingCart, MessageSquare, DollarSign, MousePointerClick, Eye } from "lucide-react"
import { getTotals } from "@/lib/admin-data"

export async function DashboardView({ lang }: { lang: string }) {
    const base = `/${lang}/admin`
    const totals = await getTotals()

    const cards = [
        {
            title: "Revenue",
            value: `$${(totals.revenueCents / 100).toFixed(2)}`,
            note: `${totals.paidOrders} paid`,
            icon: DollarSign,
            tone: "green",
        },
        {
            title: "Visitors",
            value: totals.visitors.toLocaleString(),
            note: "all time",
            icon: Users,
            tone: "blue",
        },
        {
            title: "Page views",
            value: totals.pageViews.toLocaleString(),
            note: "all time",
            icon: Eye,
            tone: "blue",
        },
        {
            title: "Checkout clicks",
            value: totals.buyClicks.toLocaleString(),
            note: "buy buttons",
            icon: MousePointerClick,
            tone: "purple",
        },
        {
            title: "Orders",
            value: totals.orders.toLocaleString(),
            note: `${totals.orders - totals.paidOrders} unpaid/abandoned`,
            icon: ShoppingCart,
            tone: "purple",
        },
        {
            title: "Messages",
            value: totals.messages.toLocaleString(),
            note: "all time",
            icon: MessageSquare,
            tone: "orange",
        },
    ]

    const bg: Record<string, string> = {
        green: "bg-green-50",
        blue: "bg-blue-50",
        purple: "bg-purple-50",
        orange: "bg-orange-50",
    }
    const fg: Record<string, string> = {
        green: "text-green-600",
        blue: "text-blue-600",
        purple: "text-purple-600",
        orange: "text-orange-600",
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Figures below are counted from your own database.</p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon
                    return (
                        <div key={card.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${bg[card.tone]}`}>
                                <Icon className={`h-6 w-6 ${fg[card.tone]}`} />
                            </div>
                            <p className="mb-1 text-sm text-gray-500">{card.title}</p>
                            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                            <p className="mt-2 text-xs text-gray-400">{card.note}</p>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <a
                    href={`${base}?view=orders`}
                    className="block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                            <ShoppingCart className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Orders</p>
                            <p className="text-sm text-gray-500">View and track customer orders</p>
                        </div>
                    </div>
                </a>

                <a
                    href={`${base}?view=messages`}
                    className="block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                            <MessageSquare className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Messages</p>
                            <p className="text-sm text-gray-500">Respond to customer inquiries</p>
                        </div>
                    </div>
                </a>

                <a
                    href={`${base}?view=analytics`}
                    className="block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Analytics</p>
                            <p className="text-sm text-gray-500">Traffic, countries and devices</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
