import { Lock } from "lucide-react"

const methods = ["Visa", "Mastercard", "Amex"]

export function PaymentMarks({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
        <Lock className="h-3.5 w-3.5" />
        {label || "Secure checkout — 256-bit SSL encryption"}
      </div>
      <div className="flex items-center gap-2">
        {methods.map((method) => (
          <span
            key={method}
            className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-600 shadow-sm"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  )
}
