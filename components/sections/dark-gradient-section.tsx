import { FileImage, PenTool, Settings } from "lucide-react"

const features = [
  {
    icon: FileImage,
    title: "Import Artwork",
    description: "Import artwork in a variety of common vector graphic and image formats.",
    color: "text-red-700",
    iconBg: "bg-red-100",
    cardBg: "bg-red-50",
    borderColor: "border-red-100"
  },
  {
    icon: PenTool,
    title: "Edit & Create",
    description: "Arrange, edit, and even create new vector shapes within LightBurn's powerful editor.",
    color: "text-blue-700",
    iconBg: "bg-blue-100",
    cardBg: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    icon: Settings,
    title: "Apply Settings",
    description: "Apply settings like power, speed, number of passes, cut order, brightness & contrast, dithering mode, and many more!",
    color: "text-green-700",
    iconBg: "bg-green-100",
    cardBg: "bg-green-50",
    borderColor: "border-green-100"
  },
]

export function DarkGradientSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#f9fafb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layout, editing, and control software for your laser cutter with{" "}
            <span className="text-[#8B2E41]">LightBurn</span>
          </h2>
          <p className="text-lg text-gray-600">
            LightBurn is a native application written for Windows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`rounded-2xl p-8 border ${feature.borderColor} ${feature.cardBg} transition-all duration-300 hover:shadow-md`}
            >
              <div className={`h-14 w-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
