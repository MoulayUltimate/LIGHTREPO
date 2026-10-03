import { getMessages } from "@/lib/admin-data"
import { RecordsTable, StatusBadge, formatWhen } from "@/components/admin/records-table"

export async function MessagesView() {
    const messages = await getMessages()

    return (
        <RecordsTable
            title="Messages"
            subtitle={`${messages.length} message${messages.length === 1 ? "" : "s"}`}
            columns={["Date", "Name", "Email", "Subject", "Message", "Status"]}
            emptyHint="No contact messages yet."
            rows={messages.map((m: any) => [
                formatWhen(m.createdAt),
                m.name,
                <a key="e" href={`mailto:${m.email}`} className="text-primary hover:underline">
                    {m.email}
                </a>,
                m.subject ?? "—",
                <span key="m" className="block max-w-md whitespace-pre-wrap text-gray-600">
                    {m.message}
                </span>,
                <StatusBadge key="s" status={m.status} />,
            ])}
        />
    )
}
