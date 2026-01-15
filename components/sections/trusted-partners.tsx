"use client"
import Image from "next/image"
import { Shield } from "lucide-react"

const partners = [
  {
    name: "Compatible with Adobe",
    description: "Import vector files directly into LightBurn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg",
  },
  {
    name: "Works with CorelDRAW",
    description: "Smooth vector design import workflow",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/CorelDraw_logo.svg",
  },
  {
    name: "Autodesk Compatible",
    description: "Perfect support for DXF and CAD drawings",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Autodesk_Logo_2021.svg",
  },
  {
    name: "Official LightBurn Pro",
    description: "Genuine License • Instant Delivery",
    logo: "/logo-icon.webp",
  },
  {
    name: "Secured by PayPal",
    description: "Safe payments & buyer protection",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    name: "ISO 9001 Certified",
    description: "Trusted quality for business-grade software",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/ISO_9001-2015.svg",
  },
]

export function TrustedPartners() {
  return (
    <section className="py-16 md:py-20 bg-[#f9fafb]">
      <div className="mx-auto max-w-[900px] px-5">
        <div className="group flex items-center gap-3.5 mb-8">
          <Shield className="w-7 h-7 text-gray-900" />
          <h3 className="relative text-2xl font-bold text-gray-900 pb-1.5">
            Trusted by Laser Engraving Professionals Worldwide
            <span className="absolute left-0 -bottom-1.5 h-1 bg-primary rounded transition-all duration-500 w-0 group-hover:w-full" />
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group relative bg-white rounded-2xl p-7 flex items-center gap-5 border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_22px_rgba(136,34,51,0.26)] hover:-translate-y-1"
            >
              <div className="absolute left-0 top-0 h-full w-[5px] bg-primary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />

              <div className="flex-shrink-0">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  width={44}
                  height={44}
                  className="h-11 w-auto object-contain"
                  unoptimized
                />
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900 mb-1.5">{partner.name}</div>
                <div className="text-base text-gray-500">{partner.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
