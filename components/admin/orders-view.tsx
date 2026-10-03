import { getOrders } from "@/lib/admin-data"
import { RecordsTable, StatusBadge, formatWhen, formatMoney } from "@/components/admin/records-table"

export async function OrdersView() {
    const orders = await getOrders()

    return (
        <RecordsTable
            title="Orders"
            subtitle={`${orders.length} record${orders.length === 1 ? "" : "s"}`}
            columns={["Date", "Email", "Amount", "Status", "Reference"]}
            emptyHint="No orders recorded yet."
            rows={orders.map((o: any) => [
                formatWhen(o.createdAt),
                o.customerEmail ?? "—",
                formatMoney(o.amount),
                <StatusBadge key="s" status={o.status} />,
                <span key="r" className="font-mono text-xs text-gray-400">
                    {o.stripePaymentIntentId ?? o.id}
                </span>,
            ])}
        />
    )
}
