import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

const locales = LOCALES as readonly string[]
const defaultLocale = DEFAULT_LOCALE

function getLocale(request: NextRequest) {
    // Check cf-ipcountry
    const country = request.headers.get('cf-ipcountry')
    if (country === 'DE' || country === 'AT' || country === 'CH') return 'de'
    if (country === 'FR' || country === 'BE' || country === 'LU') return 'fr'
    if (country === 'ES') return 'es'
    if (country === 'IT') return 'it'

    // Check accept-language
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
        const lower = acceptLanguage.toLowerCase()
        if (lower.includes('de')) return 'de'
        if (lower.includes('fr')) return 'fr'
        if (lower.includes('es')) return 'es'
        if (lower.includes('it')) return 'it'
    }

    return defaultLocale
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip internal paths and files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next()
    }

    // Admin panel is English-only, so send bare /admin to /en/admin rather
    // than letting it follow the visitor's detected language.
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        request.nextUrl.pathname = `/${defaultLocale}${pathname}`
        return NextResponse.redirect(request.nextUrl)
    }

    // Check if pathname already has locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    // Redirect if no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|static|favicon.ico).*)',
    ],
}
