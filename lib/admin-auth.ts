import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const ADMIN_COOKIE = "admin_session"

/**
 * Server-side admin session.
 *
 * The panel previously gated itself on a sessionStorage flag, which any
 * visitor could set from the console, so every admin page was effectively
 * public. The gate now lives in an httpOnly cookie that page code cannot read
 * or forge.
 *
 * The cookie holds a hash of ADMIN_API_TOKEN rather than the token itself, so
 * a leaked cookie does not hand over the API credential.
 */
export async function sessionValue(): Promise<string | null> {
    const token = process.env.ADMIN_API_TOKEN
    if (!token) return null

    const data = new TextEncoder().encode(`${token}:admin-session-v1`)
    const digest = await crypto.subtle.digest("SHA-256", data)
    return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
}

export async function isAdmin(): Promise<boolean> {
    const expected = await sessionValue()
    if (!expected) return false

    const jar = await cookies()
    const actual = jar.get(ADMIN_COOKIE)?.value
    if (!actual || actual.length !== expected.length) return false

    // Constant-time comparison so the value can't be guessed byte by byte.
    let diff = 0
    for (let i = 0; i < expected.length; i++) {
        diff |= expected.charCodeAt(i) ^ actual.charCodeAt(i)
    }
    return diff === 0
}

/** Use at the top of every admin server page. */
export async function requireAdmin(lang: string) {
    if (!(await isAdmin())) {
        redirect(`/${lang}/admin/login`)
    }
}
