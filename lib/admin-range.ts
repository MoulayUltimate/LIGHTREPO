/**
 * Date ranges for the admin analytics filter.
 *
 * Boundaries are computed in UTC because that is how created_at is stored and
 * what the edge runtime reports; the UI says so, rather than implying a local
 * "today" it cannot honour.
 */

export type RangeKey = "today" | "yesterday" | "7d" | "30d" | "all"

export const RANGES: { key: RangeKey; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "7d", label: "Last 7 days" },
    { key: "30d", label: "Last 30 days" },
    { key: "all", label: "All time" },
]

export type ResolvedRange = {
    key: RangeKey
    label: string
    /** Inclusive lower bound, epoch seconds. null means no lower bound. */
    since: number | null
    /** Exclusive upper bound, epoch seconds. null means up to now. */
    until: number | null
    /** Whether to bucket a traffic chart by hour rather than by day. */
    hourly: boolean
}

const DAY = 24 * 60 * 60

/** Start of the UTC day containing `ms`, in epoch seconds. */
function startOfUtcDay(ms: number): number {
    const d = new Date(ms)
    return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 1000)
}

export function resolveRange(key?: string | null): ResolvedRange {
    const now = Date.now()
    const todayStart = startOfUtcDay(now)

    switch (key) {
        case "today":
            return { key: "today", label: "Today", since: todayStart, until: null, hourly: true }
        case "yesterday":
            return {
                key: "yesterday",
                label: "Yesterday",
                since: todayStart - DAY,
                until: todayStart,
                hourly: true,
            }
        case "30d":
            return {
                key: "30d",
                label: "Last 30 days",
                since: Math.floor(now / 1000) - 30 * DAY,
                until: null,
                hourly: false,
            }
        case "all":
            return { key: "all", label: "All time", since: null, until: null, hourly: false }
        case "7d":
        default:
            return {
                key: "7d",
                label: "Last 7 days",
                since: Math.floor(now / 1000) - 7 * DAY,
                until: null,
                hourly: false,
            }
    }
}
