// Cloudflare Pages requires every non-static route to opt into the Edge
// runtime. The admin pages are all client components, and Next.js does not
// allow route segment config to be exported from those, so it is declared
// here on a server layout instead — nested segments inherit it.
export const runtime = 'edge'

export default function AdminGroupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
