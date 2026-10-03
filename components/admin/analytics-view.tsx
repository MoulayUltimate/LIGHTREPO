import {
    getTotals,
    getTopPages,
    getCountries,
    getDevices,
    getDailyTraffic,
    getBuyClicksByLocation,
} from "@/lib/admin-data"

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
            {empty ? <p className="text-sm text-gray-400">No data recorded yet.</p> : children}
        </div>
    )
}

export async function AnalyticsView() {
    const [totals, topPages, countries, devices, daily, clicksByLocation] = await Promise.all([
        getTotals(),
        getTopPages(),
        getCountries(),
        getDevices(),
        getDailyTraffic(7),
        getBuyClicksByLocation(),
    ])

    const maxDaily = Math.max(1, ...daily.map((d) => d.views))
    const maxPage = Math.max(1, ...topPages.map((p) => p.views))
    const maxCountry = Math.max(1, ...countries.map((c) => c.visitors))
    const maxDevice = Math.max(1, ...devices.map((d) => d.visitors))
    const maxClick = Math.max(1, ...clicksByLocation.map((c) => c.clicks))

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {totals.visitors.toLocaleString()} visitors · {totals.pageViews.toLocaleString()} page views ·{" "}
                    {totals.buyClicks.toLocaleString()} checkout clicks
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Panel title="Page views, last 7 days" empty={daily.every((d) => d.views === 0)}>
                    {daily.map((d) => (
                        <Bar
                            key={d.date}
                            label={new Date(d.date).toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}
                            value={d.views}
                            max={maxDaily}
                        />
                    ))}
                </Panel>

                <Panel title="Checkout clicks by location" empty={clicksByLocation.length === 0}>
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
                        <Bar key={c.country ?? "unknown"} label={c.country ?? "Unknown"} value={c.visitors} max={maxCountry} />
                    ))}
                </Panel>

                <Panel title="Devices" empty={devices.length === 0}>
                    {devices.map((d) => (
                        <Bar key={d.type ?? "unknown"} label={d.type ?? "Unknown"} value={d.visitors} max={maxDevice} />
                    ))}
                </Panel>
            </div>
        </div>
    )
}
