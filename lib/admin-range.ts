/**
 * Date ranges for the admin analytics filter.
 *
 * Timestamps are stored as UTC epoch seconds, but "today" should mean the
 * shop owner's day, not the server's. Boundaries are therefore computed in a
 * fixed local offset: at UTC+1, today starts at 23:00 UTC the previous day.
 *
 * Set ADMIN_UTC_OFFSET_HOURS to change it (it accepts fractions, e.g. 5.5).
 * A fixed offset is used rather than a named zone because the edge runtime
 * has no timezone database; this means it does not follow daylight saving.
 */

export type RangeKey = "today" | "yesterday" | "7d" | "30d" | "all"

export const RANGES: { key: RangeKey; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "7d", label: "Last 7 days" },
    { key: "30d", label: "Last 30 days" },
    { key: "all", label: "All time" },
]

const DAY = 24 * 60 * 60

/** Seconds to add to UTC to reach the shop owner's local time. */
export function utcOffsetSeconds(): number {
    const raw = Number(process.env.ADMIN_UTC_OFFSET_HOURS)
    const hours = Number.isFinite(raw) ? raw : 1
    return Math.round(hours * 3600)
}

/** How the offset reads in the UI, e.g. "UTC+1" or "UTC-3:30". */
export function offsetLabel(): string {
    const total = utcOffsetSeconds()
    const sign = total < 0 ? "-" : "+"
    const abs = Math.abs(total)
    const h = Math.floor(abs / 3600)
    const m = Math.round((abs % 3600) / 60)
    return `UTC${sign}${h}${m ? ":" + String(m).padStart(2, "0") : ""}`
}

/** Epoch seconds of local midnight for the day containing `epochSeconds`. */
export function startOfLocalDay(epochSeconds: number): number {
    const offset = utcOffsetSeconds()
    // Shift into the local frame, floor to a whole day, shift back.
    return Math.floor((epochSeconds + offset) / DAY) * DAY - offset
}

/** Local calendar date (YYYY-MM-DD) for an instant. */
export function localDateKey(epochSeconds: number): string {
    return new Date((epochSeconds + utcOffsetSeconds()) * 1000).toISOString().slice(0, 10)
}

/** Local hour (0-23) for an instant. */
export function localHour(epochSeconds: number): number {
    return new Date((epochSeconds + utcOffsetSeconds()) * 1000).getUTCHours()
}

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

export function resolveRange(key?: string | null): ResolvedRange {
    const nowSeconds = Math.floor(Date.now() / 1000)
    const todayStart = startOfLocalDay(nowSeconds)

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
            return { key: "30d", label: "Last 30 days", since: nowSeconds - 30 * DAY, until: null, hourly: false }
        case "all":
            return { key: "all", label: "All time", since: null, until: null, hourly: false }
        case "7d":
        default:
            return { key: "7d", label: "Last 7 days", since: nowSeconds - 7 * DAY, until: null, hourly: false }
    }
}
