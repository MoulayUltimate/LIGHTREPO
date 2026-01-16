import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="bg-bg min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 prose prose-gray max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>

          <h2>2. Products and Services</h2>
          <p>
            We sell digital software licenses for LightBurn Pro. All purchases are for digital delivery only. License
            keys are delivered via email within 1-30 minutes of successful payment.
          </p>

          <h2>3. License Terms</h2>
          <p>
            Each LightBurn Pro license entitles you to install and use the software on up to two computers for personal
            use. Commercial and multi-seat licenses require separate agreements.
          </p>

          <h2>4. Payment</h2>
          <p>
            All prices are listed in USD. Payment is processed securely through our payment providers. We accept major
            credit cards and PayPal. All sales are final except as provided in our Refund Policy.
          </p>

          <h2>5. Delivery</h2>
          <p>
            Software license keys are delivered digitally via email. Delivery typically occurs within 1-30 minutes of
            payment confirmation. If you do not receive your license within 24 hours, please contact our support team.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            LightBurn and all associated trademarks, logos, and content are the property of their respective owners. We
            are an authorized reseller of LightBurn Pro software.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting
            from your use of or inability to use the service or products purchased.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
            to the website. Your continued use of the site constitutes acceptance of the modified terms.
          </p>

          <h2>9. Contact</h2>
          <p>
            For any questions regarding these terms, please contact us at{" "}
            <a href="mailto:contact@lightburntool.com" className="text-primary hover:underline">
              contact@lightburntool.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
