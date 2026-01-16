import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'de']
const defaultLocale = 'en'

function getLocale(request: NextRequest) {
    // Check cf-ipcountry
    const country = request.headers.get('cf-ipcountry')
    if (country === 'DE' || country === 'AT' || country === 'CH') return 'de'

    // Check accept-language
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage?.toLowerCase().includes('de')) return 'de'

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

    // Admin paths
    if (pathname.startsWith('/admin')) {
        return NextResponse.next()
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
