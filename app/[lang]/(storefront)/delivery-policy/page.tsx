export const runtime = 'edge'
import { getDictionary } from "@/lib/dictionary"
import { LegalPage } from "@/components/legal-page"
import { ShieldCheck, Mail, Zap } from "lucide-react"

export default async function DeliveryPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const legal = dict.legal
  const policy = legal.shippingPolicy
  const icons = [Zap, Mail]

  return (
    <LegalPage
      title={policy.title}
      intro={policy.intro}
      email={legal.contactEmail}
      sections={policy.sections}
    >
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        {policy.highlights.map((h: any, i: number) => {
          const Icon = icons[i] ?? Zap
          return (
            <div key={h.title} className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{h.title}</h3>
              <p className="text-sm text-gray-600">{h.description}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center">
        <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-blue-600" />
        <h3 className="mb-2 text-xl font-bold text-gray-900">{policy.help.title}</h3>
        <p className="mb-6 text-gray-600">{policy.help.description}</p>
        <a
          href={`/${lang}/contact`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
        >
          {policy.help.cta}
        </a>
      </div>
    </LegalPage>
  )
}
