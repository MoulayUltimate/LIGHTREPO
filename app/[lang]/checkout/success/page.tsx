import { getDictionary } from "@/lib/dictionary"
import { SuccessClient } from "@/components/success-client"

export const runtime = 'edge'

export default async function SuccessPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return <SuccessClient dict={dict.success} />
}
