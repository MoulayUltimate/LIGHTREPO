import Image from "next/image"
import { Check } from "lucide-react"

const capabilities = [
  "Full camera support for alignment and tracing",
  "Powerful layer system for complex projects",
  "Built-in material library with presets",
  "Support for images, vectors, and text",
]

export function DarkGradientSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#5A1E2E] via-[#8B2E41] to-[#A84655]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Everything You Need for Professional Laser Work
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              LightBurn provides everything you need to create stunning laser engraving and cutting projects. From
              simple designs to complex manufacturing workflows, we{"'"}ve got you covered.
            </p>

            {/* Software Preview */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/lightburn-software-screenshot.webp"
                alt="LightBurn Software Interface"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            {capabilities.map((capability) => (
              <div key={capability} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-white font-medium">{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
