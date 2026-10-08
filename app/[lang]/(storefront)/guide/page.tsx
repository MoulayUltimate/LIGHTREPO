export const runtime = 'edge'

import { getDictionary } from "@/lib/dictionary"
import { GuideContent } from "@/components/sections/guide-content"

export default async function GuidePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return <GuideContent dict={dict} />
}
