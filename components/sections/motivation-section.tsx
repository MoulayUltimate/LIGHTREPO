import { FileImage, Edit3, Settings } from "lucide-react"

const features = [
  {
    icon: FileImage,
    title: "Import Artwork",
    description: "Import artwork in a variety of common vector graphic and image formats.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Edit3,
    title: "Edit & Create",
    description: "Arrange, edit, and even create new vector shapes within LightBurn's powerful editor.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: Settings,
    title: "Apply Settings",
    description:
      "Apply settings like power, speed, number of passes, cut order, brightness & contrast, dithering mode, and many more!",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
]

export function MotivationSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-bg border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layout, editing, and control software for your laser cutter with{" "}
            <span className="text-primary">LightBurn</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            LightBurn is a native application written for Windows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`${feature.bg} ${feature.border} border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div
                className={`h-14 w-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 border ${feature.border}`}
              >
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
