import Image from "next/image"
import { Lock } from "lucide-react"

const methods = [
  {
    name: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg",
    className: "h-4",
  },
  {
    name: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    className: "h-7",
  },
  {
    name: "American Express",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
    className: "h-7",
  },
]

export function PaymentMarks({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
        <Lock className="h-3.5 w-3.5" />
        {label || "Secure checkout — 256-bit SSL encryption"}
      </div>
      <div className="flex items-center gap-3">
        {methods.map((method) => (
          <span
            key={method.name}
            className="flex h-10 w-16 items-center justify-center rounded-md border border-gray-200 bg-white px-2 shadow-sm"
          >
            <Image
              src={method.logo}
              alt={method.name}
              width={48}
              height={28}
              className={`w-auto object-contain ${method.className}`}
              unoptimized
            />
          </span>
        ))}
      </div>
    </div>
  )
}
