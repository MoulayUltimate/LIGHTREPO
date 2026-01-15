import { Clock, Shield, Lock, Headphones } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Instant Delivery",
    description: "Get your license key within 1-30 minutes after purchase.",
  },
  {
    icon: Shield,
    title: "No Extra Charges",
    description: "One-time payment. No hidden fees or subscriptions.",
  },
  {
    icon: Lock,
    title: "Safe Payments",
    description: "Secure checkout with SSL encryption and trusted payment providers.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is here to help you anytime, day or night.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-16 md:py-20 bg-white" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:shadow-lg hover:bg-white"
            >
              <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
