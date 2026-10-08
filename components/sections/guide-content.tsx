import { Play, Download, Settings, Layers, Camera, Eye, LifeBuoy, Monitor } from "lucide-react"

/**
 * Installation and usage guide.
 *
 * Video IDs are left for the site owner to fill in rather than guessed, so the
 * page never renders a broken player. Anything still empty is skipped, and the
 * section falls back to the vendor's own channel.
 */
const VIDEOS: { id: string; title: string }[] = [
    // e.g. { id: "dQw4w9WgXcQ", title: "Getting started with LightBurn" },
]

const OFFICIAL_CHANNEL = "https://www.youtube.com/@LightBurnSoftware"

const FEATURE_ICONS = [Layers, Settings, Camera, Eye, Monitor, Download]

export function GuideContent({ dict }: { dict: any }) {
    const g = dict.guide

    return (
        <div className="bg-bg">
            {/* Intro */}
            <section className="border-b border-gray-200 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                        {g.eyebrow}
                    </span>
                    <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                        {g.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
                        {g.intro}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                        <Monitor className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">{g.platform}</span>
                    </div>
                </div>
            </section>

            {/* Installation steps */}
            <section className="py-14 md:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">{g.install.title}</h2>
                    <p className="mb-8 text-gray-600">{g.install.intro}</p>

                    <ol className="space-y-5">
                        {g.install.steps.map((step: any, i: number) => (
                            <li key={step.title} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5">
                                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Video tutorials */}
            <section className="border-y border-gray-200 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">{g.videos.title}</h2>
                    <p className="mb-8 text-gray-600">{g.videos.intro}</p>

                    {VIDEOS.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {VIDEOS.filter((v) => v.id).map((v) => (
                                <div key={v.id} className="overflow-hidden rounded-xl border border-gray-200">
                                    <div className="aspect-video w-full">
                                        <iframe
                                            className="h-full w-full"
                                            src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                                            title={v.title}
                                            loading="lazy"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <p className="px-4 py-3 text-sm font-medium text-gray-700">{v.title}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <a
                            href={OFFICIAL_CHANNEL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:bg-gray-100"
                        >
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Play className="h-5 w-5 text-primary" />
                            </span>
                            <span>
                                <span className="block font-semibold text-gray-900">{g.videos.channelTitle}</span>
                                <span className="block text-sm text-gray-600">{g.videos.channelBody}</span>
                            </span>
                        </a>
                    )}
                </div>
            </section>

            {/* What you can do */}
            <section className="py-14 md:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">{g.features.title}</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {g.features.items.map((item: any, i: number) => {
                            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length]
                            return (
                                <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Help */}
            <section className="border-t border-gray-200 bg-white py-14 md:py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <LifeBuoy className="h-7 w-7 text-primary" />
                    </span>
                    <h2 className="mb-3 text-2xl font-bold text-gray-900">{g.help.title}</h2>
                    <p className="mb-6 text-gray-600">{g.help.body}</p>
                    <a
                        href={`mailto:${dict.legal.contactEmail}`}
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                        {g.help.cta}
                    </a>
                </div>
            </section>
        </div>
    )
}
