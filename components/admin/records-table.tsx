/** Shared, server-rendered table for the admin list screens. */

export function formatWhen(value: unknown): string {
    if (value == null) return "—"
    const ms = value instanceof Date ? value.getTime() : Number(value) * 1000
    if (!Number.isFinite(ms)) return "—"
    return new Date(ms).toLocaleString()
}

export function formatMoney(cents: unknown): string {
    const n = Number(cents)
    return Number.isFinite(n) ? `$${(n / 100).toFixed(2)}` : "—"
}

const statusTone: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    abandoned: "bg-gray-100 text-gray-600",
    failed: "bg-red-100 text-red-700",
    new: "bg-blue-100 text-blue-700",
}

export function StatusBadge({ status }: { status: string | null }) {
    const key = status ?? "unknown"
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                statusTone[key] ?? "bg-gray-100 text-gray-600"
            }`}
        >
            {key}
        </span>
    )
}

export function RecordsTable({
    title,
    subtitle,
    columns,
    rows,
    emptyHint,
}: {
    title: string
    subtitle?: string
    columns: string[]
    rows: React.ReactNode[][]
    emptyHint: string
}) {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {rows.length === 0 ? (
                    <p className="p-8 text-center text-sm text-gray-400">{emptyHint}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {columns.map((c) => (
                                        <th key={c} className="px-5 py-3 text-left font-medium text-gray-500">
                                            {c}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {rows.map((cells, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        {cells.map((cell, j) => (
                                            <td key={j} className="px-5 py-3 text-gray-700">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
