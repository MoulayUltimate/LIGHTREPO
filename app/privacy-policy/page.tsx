import { Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-bg min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 prose prose-gray max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including your name, email address, payment information,
            and any other information you choose to provide when making a purchase or contacting us.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your orders and deliver your software license</li>
            <li>Send you order confirmations and license keys</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, and promotions</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties. This does not
            include trusted third parties who assist us in operating our website, conducting our business, or servicing
            you, as long as those parties agree to keep this information confidential.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against
            unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using
            SSL technology.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use cookies to enhance your experience on our site, including remembering your cart items and
            preferences. You can choose to disable cookies through your browser settings, but this may affect some
            functionality.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:support@lightburn.store" className="text-primary hover:underline">
              support@lightburn.store
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
