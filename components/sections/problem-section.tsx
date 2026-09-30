import { Clock3, CreditCard, Plug, MessageSquareWarning } from "lucide-react"

const icons = [Clock3, CreditCard, Plug, MessageSquareWarning]

const fallback = {
  eyebrow: "The problem",
  title: "Laser software shouldn't be the hard part",
  subtitle: "Most people lose more time to their software than to their machine.",
  items: [
    {
      title: "Setup that drags on",
      description: "Hours spent configuring before you cut anything.",
    },
    {
      title: "Recurring fees",
      description: "Subscriptions that quietly add up year after year.",
    },
    {
      title: "Controller lock-in",
      description: "Software tied to one brand of controller board.",
    },
    {
      title: "Slow support",
      description: "Waiting days for an answer while a job sits unfinished.",
    },
  ],
}

export function ProblemSection({ dict }: { dict?: any }) {
  const eyebrow = dict?.eyebrow || fallback.eyebrow
  const title = dict?.title || fallback.title
  const subtitle = dict?.subtitle || fallback.subtitle
  const items = dict?.items || fallback.items

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any, index: number) => {
            const Icon = icons[index % icons.length]
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
