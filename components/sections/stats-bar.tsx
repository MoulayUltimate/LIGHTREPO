import { Truck, Ban, CreditCard, Headphones } from "lucide-react"

const stats = [
  {
    icon: Truck,
    title: "INSTANT DELIVERY",
    subtitle: "1-30 min",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Ban,
    title: "NO EXTRA CHARGES",
    subtitle: "No fees",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CreditCard,
    title: "SAFE PAYMENTS",
    subtitle: "Credit card",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Headphones,
    title: "24/7 SUPPORT",
    subtitle: "Available 24/7",
    color: "text-primary",
    bg: "bg-primary/10",
  },
]

export function StatsBar() {
  return (
    <section className="py-8 shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Better Software For <span className="text-primary">Laser Cutters!</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.title} className="flex flex-col items-center text-center gap-3">
              <div className={`h-14 w-14 rounded-full ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div>
                <p className={`text-sm font-bold ${stat.color}`}>{stat.title}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
