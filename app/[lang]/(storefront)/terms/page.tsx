export const runtime = 'edge'
import { getDictionary } from "@/lib/dictionary"
import { LegalPage } from "@/components/legal-page"
import { FileText } from "lucide-react"

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const legal = dict.legal

  return (
    <LegalPage
      icon={FileText}
      title={legal.termsOfService.title}
      updated={legal.updated}
      email={legal.contactEmail}
      sections={legal.termsOfService.sections}
    />
  )
}
