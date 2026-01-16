"use client"

import Image from "next/image"

const reviews = [
  {
    name: "Sarah M.",
    role: "Verified Purchase",
    avatar: "/professional-woman-headshot.png",
    text: "Der Bestellprozess war einfach, und mein Schlüssel kam sofort nach der Zahlung. LightBurn ist sehr benutzerfreundlich und bietet viele Funktionen, die meine Arbeit erleichtern. Top Service!",
  },
  {
    name: "James R.",
    role: "Verified Purchase",
    avatar: "/professional-man-headshot-glasses.png",
    title: "Perfect Laser Software – Easy to Install & Lifetime Access!",
    text: "LightBurn is simply amazing! The installation was fast and effortless, and within minutes, I was ready to start engraving. The software is incredibly user-friendly, with powerful tools that make designing and controlling my laser easy.",
  },
  {
    name: "Maria L.",
    role: "Designer",
    avatar: "/creative-woman-designer-headshot.jpg",
    title: "Outstanding Laser Software",
    text: "It's a one-time purchase with a lifetime license! No subscriptions, no hidden fees—just buy it once and use it forever. Plus, you get 12 months of free updates, and even after that, the software continues to work perfectly. LightBurn is fast, reliable, and works seamlessly with my laser. If you're looking for the best laser engraving software,",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Rating 5/5
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-gray-700">
            from Verified Users
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Review Title (if exists) */}
              {review.title && (
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  {review.title}
                </h3>
              )}

              {/* Review Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {review.text}
              </p>

              {/* Author Info at Bottom */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
