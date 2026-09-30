"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { localeFromPathname, localizePath } from "@/lib/i18n"

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string }

/**
 * A <Link> that keeps the visitor in their current language.
 *
 * Plain <Link href="/contact"> drops the locale, so the middleware re-guesses
 * it from request headers and can move a /de visitor to /en. This prefixes the
 * locale taken from the URL the visitor is actually on.
 */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
    const locale = localeFromPathname(usePathname())
    return <Link href={localizePath(href, locale)} {...props} />
}
