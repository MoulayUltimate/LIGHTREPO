export const runtime = 'edge'
import { getDictionary } from "@/lib/dictionary"
import { LegalPage } from "@/components/legal-page"
import { Shield } from "lucide-react"

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const legal = dict.legal

  return (
    <LegalPage
      icon={Shield}
      title={legal.privacyPolicy.title}
      updated={legal.updated}
      email={legal.contactEmail}
      sections={legal.privacyPolicy.sections}
    />
  )
}
