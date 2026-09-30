// Single source of truth for the locale list.
// Imported by middleware.ts and the client-side locale helpers so the two
// can't drift apart.

export const LOCALES = ['en', 'de', 'fr', 'es', 'it'] as const
export const DEFAULT_LOCALE = 'en'

export type Locale = (typeof LOCALES)[number]

export function isLocale(value: string | undefined): value is Locale {
    return !!value && (LOCALES as readonly string[]).includes(value)
}

/** Read the locale out of a pathname like "/de/contact". */
export function localeFromPathname(pathname: string | null | undefined): string {
    const segment = pathname?.split('/')[1]
    return isLocale(segment) ? segment : DEFAULT_LOCALE
}

/** Prefix an app-relative path with a locale: ("/contact","de") -> "/de/contact". */
export function localizePath(href: string, locale: string): string {
    if (!href.startsWith('/')) return href
    if (href === '/') return `/${locale}`
    // Already localized, leave it alone.
    if (isLocale(href.split('/')[1])) return href
    return `/${locale}${href}`
}
