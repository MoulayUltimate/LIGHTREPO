import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow access to login page
    if (pathname === '/admin/login') {
        return NextResponse.next()
    }

    // For now, allow all admin access (we'll add proper auth check later)
    // The real auth check will happen client-side via sessionStorage
    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
