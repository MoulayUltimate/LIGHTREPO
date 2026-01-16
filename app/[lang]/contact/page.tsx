import { getDictionary } from "@/lib/dictionary"
import { ContactClient } from "@/components/contact-client"

export const runtime = 'edge'

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return <ContactClient dict={dict.contact} />
}
