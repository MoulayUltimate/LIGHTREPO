import type { LucideIcon } from "lucide-react"

type Section = {
    heading: string
    paragraphs?: string[]
    list?: string[]
}

/**
 * Shared renderer for the policy pages.
 *
 * The body of each policy used to be hardcoded English JSX, so /de and /fr
 * showed a translated heading above an English document. The text now lives in
 * the dictionaries and is rendered here.
 */
function withEmail(text: string, email: string) {
    const parts = text.split("{email}")
    if (parts.length === 1) return text
    return parts.flatMap((part, i) =>
        i === 0
            ? [part]
            : [
                  <a key={i} href={`mailto:${email}`} className="text-primary hover:underline">
                      {email}
                  </a>,
                  part,
              ],
    )
}

export function LegalPage({
    icon: Icon,
    title,
    updated,
    email,
    intro,
    sections,
    children,
}: {
    icon?: LucideIcon
    title: string
    updated?: string
    email: string
    intro?: string
    sections: Section[]
    children?: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-bg py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    {Icon && (
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Icon className="h-8 w-8 text-primary" />
                        </div>
                    )}
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h1>
                    {intro && <p className="text-lg text-gray-600">{intro}</p>}
                    {updated && <p className="text-sm text-gray-500">{updated}</p>}
                </div>

                {children}

                <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">
                    {sections.map((section) => (
                        <section key={section.heading} className="mb-8 last:mb-0">
                            <h2 className="mb-3 text-xl font-bold text-gray-900">{section.heading}</h2>

                            {section.paragraphs?.map((p, i) => (
                                <p key={i} className="mb-3 leading-relaxed text-gray-700 last:mb-0">
                                    {withEmail(p, email)}
                                </p>
                            ))}

                            {section.list && (
                                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-700">
                                    {section.list.map((item, i) => (
                                        <li key={i} className="leading-relaxed">
                                            {withEmail(item, email)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
