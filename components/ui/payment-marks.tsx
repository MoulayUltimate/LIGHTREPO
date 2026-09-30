import Image from "next/image"
import { Lock } from "lucide-react"

// Official acceptance marks, referenced from Wikimedia Commons.
// Heights are tuned per logo because the source files have very different
// aspect ratios (wide wordmarks vs. square/stacked marks).
const methods = [
  {
    name: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg",
    className: "h-2.5",
  },
  {
    name: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    className: "h-5",
  },
  {
    name: "Maestro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Maestro_2016.svg",
    className: "h-4",
  },
  {
    name: "American Express",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
    className: "h-5",
  },
  {
    name: "Discover",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg",
    className: "h-2.5",
  },
  {
    name: "Apple Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
    className: "h-3",
  },
  {
    name: "Google Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg",
    className: "h-3",
  },
]

export function PaymentMarks({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
        <Lock className="h-3 w-3" />
        {label || "Secure checkout — 256-bit SSL encryption"}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {methods.map((method) => (
          <span
            key={method.name}
            className="flex h-6 w-9 items-center justify-center rounded border border-gray-200 bg-white px-1 sm:h-7 sm:w-11 sm:px-1.5"
          >
            <Image
              src={method.logo}
              alt={method.name}
              width={36}
              height={20}
              className={`w-auto max-w-full object-contain ${method.className}`}
              unoptimized
            />
          </span>
        ))}
      </div>
    </div>
  )
}
