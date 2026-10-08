import {
    getTotals,
    getTopPages,
    getCountries,
    getDevices,
    getTraffic,
    getBuyClicksByLocation,
    getClicksByUrl,
    getRecentClicks,
    getUniqueClickers,
    getAddToCartByLocation,
} from "@/lib/admin-data"
import { RANGES, offsetLabel, type ResolvedRange } from "@/lib/admin-range"
import { formatWhen } from "@/components/admin/records-table"

function Bar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0
    return (
        <div className="mb-3">
            <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
                <span className="truncate text-gray-700">{label}</span>
                <span className="flex-shrink-0 font-semibold text-gray-900">
                    {value.toLocaleString()}
                    {suffix}
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

function Panel({ title, children, empty }: { title: string; children: React.ReactNode; empty: boolean }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-gray-900">{title}</h2>
            {empty ? <p className="text-sm text-gray-400">Nothing recorded in this period.</p> : children}
        </div>
    )
}

export async function AnalyticsView({ lang, range }: { lang: string; range: ResolvedRange }) {
    const [totals, topPages, countries, devices, traffic, clicksByLocation, clicksByUrl, recentClicks, uniqueClickers, addToCart] =
        await Promise.all([
        getTotals(range),
        getTopPages(range),
        getCountries(range),
        getDevices(range),
        getTraffic(range),
        getBuyClicksByLocation(range),
        getClicksByUrl(range),
        getRecentClicks(range),
        getUniqueClickers(range),
        getAddToCartByLocation(range),
    ])

    const maxTraffic = Math.max(1, ...traffic.map((d) => d.views))
    const maxPage = Math.max(1, ...topPages.map((p) => p.views))
    const maxCountry = Math.max(1, ...countries.map((c) => c.visitors))
    const maxDevice = Math.max(1, ...devices.map((d) => d.visitors))
    const maxClick = Math.max(1, ...clicksByLocation.map((c) => c.clicks))
    const maxUrl = Math.max(1, ...clicksByUrl.map((c) => c.clicks))
    const maxCart = Math.max(1, ...addToCart.map((c) => c.clicks))
    const addToCartTotal = addToCart.reduce((sum, c) => sum + c.clicks, 0)

    const base = `/${lang}/admin?view=analytics`

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {range.label} ({offsetLabel()}) · {totals.visitors.toLocaleString()} visitors ·{" "}
                    {totals.pageViews.toLocaleString()} page views ·{" "}
                    {totals.buyClicks.toLocaleString()} checkout clicks
                </p>
            </div>

            {/* Date filter */}
            <div className="mb-8 flex flex-wrap gap-2">
                {RANGES.map((r) => {
                    const active = r.key === range.key
                    return (
                        <a
                            key={r.key}
                            href={`${base}&range=${r.key}`}
                            className={
                                active
                                    ? "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                                    : "rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            }
                        >
                            {r.label}
                        </a>
                    )
                })}
            </div>

            {/* Headline figures for the selected period */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                    { label: "Visitors", value: totals.visitors.toLocaleString() },
                    { label: "Page views", value: totals.pageViews.toLocaleString() },
                    { label: "Checkout clicks", value: totals.buyClicks.toLocaleString() },
                    { label: "Add to cart", value: addToCartTotal.toLocaleString() },
                    {
                        label: "Reached checkout",
                        value:
                            totals.visitors > 0
                                ? `${((uniqueClickers / totals.visitors) * 100).toFixed(1)}%`
                                : "—",
                    },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">{s.label}</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Panel
                    title={range.hourly ? `Page views by hour (${offsetLabel()})` : "Page views by day"}
                    empty={traffic.every((d) => d.views === 0)}
                >
                    {traffic.map((d) => (
                        <Bar key={d.label} label={d.label} value={d.views} max={maxTraffic} />
                    ))}
                </Panel>

                <Panel title="Add to cart by button" empty={addToCart.length === 0}>
                    {addToCart.map((c) => (
                        <Bar key={c.location} label={c.location} value={c.clicks} max={maxCart} />
                    ))}
                </Panel>

                <Panel title="Checkout clicks by button" empty={clicksByLocation.length === 0}>
                    {clicksByLocation.map((c) => (
                        <Bar key={c.location} label={c.location} value={c.clicks} max={maxClick} />
                    ))}
                </Panel>

                <Panel title="Top pages" empty={topPages.length === 0}>
                    {topPages.map((p) => (
                        <Bar key={p.path} label={p.path} value={p.views} max={maxPage} />
                    ))}
                </Panel>

                <Panel title="Countries" empty={countries.length === 0}>
                    {countries.map((c) => (
                        <Bar
                            key={c.country ?? "unknown"}
                            label={c.country ?? "Unknown"}
                            value={c.visitors}
                            max={maxCountry}
                        />
                    ))}
                </Panel>

                <Panel title="Devices" empty={devices.length === 0}>
                    {devices.map((d) => (
                        <Bar key={d.type ?? "unknown"} label={d.type ?? "Unknown"} value={d.visitors} max={maxDevice} />
                    ))}
                </Panel>

                <Panel title="Checkout links clicked" empty={clicksByUrl.length === 0}>
                    {clicksByUrl.map((c) => (
                        <Bar key={c.url} label={c.url} value={c.clicks} max={maxUrl} />
                    ))}
                </Panel>
            </div>

            {/* Individual checkout clicks */}
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-4">
                    <h2 className="font-semibold text-gray-900">Recent checkout clicks</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {uniqueClickers.toLocaleString()} unique visitor
                        {uniqueClickers === 1 ? "" : "s"} clicked a checkout button in this period
                    </p>
                </div>

                {recentClicks.length === 0 ? (
                    <p className="p-8 text-center text-sm text-gray-400">No checkout clicks in this period.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    {["When", "Button", "Destination", "Visitor"].map((h) => (
                                        <th key={h} className="px-5 py-3 text-left font-medium text-gray-500">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentClicks.map((c: any) => (
                                    <tr key={c.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-5 py-3 text-gray-700">
                                            {formatWhen(c.createdAt)}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                                {c.location}
                                            </span>
                                        </td>
                                        <td className="max-w-xs truncate px-5 py-3 text-gray-500">{c.linkUrl}</td>
                                        <td className="px-5 py-3 font-mono text-xs text-gray-400">
                                            {c.visitorId ? String(c.visitorId).slice(0, 8) : "—"}
                                        </td>
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
