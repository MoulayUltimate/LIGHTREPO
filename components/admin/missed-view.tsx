import { getOrdersByStatus } from "@/lib/admin-data"
import { RecordsTable, formatWhen, formatMoney } from "@/components/admin/records-table"

export async function MissedView() {
    const abandoned = await getOrdersByStatus("abandoned")

    return (
        <RecordsTable
            title="Missed checkouts"
            subtitle="People who reached checkout and entered details but did not pay."
            columns={["Date", "Email", "Name", "Amount"]}
            emptyHint="No abandoned checkouts recorded yet."
            rows={abandoned.map((o: any) => {
                let name = "—"
                try {
                    name = JSON.parse(o.metadata ?? "{}").name || "—"
                } catch {
                    /* metadata may not be JSON */
                }
                return [formatWhen(o.createdAt), o.customerEmail ?? "—", name, formatMoney(o.amount)]
            })}
        />
    )
}
