"use client"

import { Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    name: "Sarah M.",
    role: "Verified Purchase",
    avatar: "/professional-woman-headshot.png",
    rating: 5,
    text: "Der Bestellprozess war einfach, und mein Schlüssel kam sofort nach der Zahlung. LightBurn ist sehr benutzerfreundlich und bietet viele Funktionen, die meine Arbeit erleichtern. Top Service!",
  },
  {
    name: "James R.",
    role: "Verified Purchase",
    avatar: "/professional-man-headshot-glasses.png",
    rating: 5,
    text: "Perfect Laser Software – Easy to Install & Lifetime Access! LightBurn is simply amazing! The installation was fast and effortless, and within minutes, I was ready to start engraving. The software is incredibly user-friendly, with powerful tools that make designing and controlling my laser easy.",
  },
  {
    name: "Maria L.",
    role: "Designer",
    avatar: "/creative-woman-designer-headshot.jpg",
    rating: 5,
    text: "Outstanding Laser Software It's a one-time purchase with a lifetime license! No subscriptions, no hidden fees—just buy it once and use it forever. Plus, you get 12 months of free updates, and even after that, the software continues to work perfectly. LightBurn is fast, reliable, and works seamlessly with my laser. If you're looking for the best laser engraving software,",
  },
  {
    name: "David K.",
    role: "Small Business Owner",
    avatar: "/business-owner-man-headshot.jpg",
    rating: 5,
    text: "The Best Laser Software – Lifetime License & Easy Setup! LightBurn is an absolute game-changer for laser engraving! The installation was super easy, and I was ready to start engraving within minutes. The software is packed with powerful tools, yet it's incredibly user-friendly, making it perfect for both beginners and professionals. One of the biggest advantages is that it's a one-time purchase with a lifetime license—no monthly fees, no subscriptions! You also get 12 months of free updates, and even after that, you can keep using it forever.",
  },
  {
    name: "James Carter",
    role: "Small Business Owner",
    avatar: "/businessman-headshot-professional.jpg",
    rating: 5,
    text: "Ich habe LightBurn hier gekauft und innerhalb weniger Minuten meinen Lizenzschlüssel per E-Mail erhalten. Die Installation war super einfach, und die Software funktioniert perfekt mit meinem Laser. Absolut empfehlenswert!",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">Rating 5/5</span>
          </div>
          <p className="text-gray-600">from Verified Users</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
