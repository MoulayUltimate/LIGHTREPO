import { RefreshCw } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="bg-bg min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 prose prose-gray max-w-none">
          <h2>30-Day Money-Back Guarantee</h2>
          <p>
            We want you to be completely satisfied with your purchase. If for any reason you are not happy with
            LightBurn Pro, we offer a full refund within 30 days of purchase.
          </p>

          <h2>How to Request a Refund</h2>
          <p>To request a refund, please:</p>
          <ol>
            <li>
              Email us at{" "}
              <a href="mailto:support@lightburn.store" className="text-primary hover:underline">
                support@lightburn.store
              </a>
            </li>
            <li>Include your order number and the email used for purchase</li>
            <li>Briefly explain why you{"'"}re requesting a refund</li>
          </ol>

          <h2>Refund Processing</h2>
          <p>
            Once your refund request is approved, we will process the refund within 5-7 business days. The refund will
            be credited to the original payment method used for the purchase.
          </p>

          <h2>Conditions</h2>
          <p>Please note the following conditions:</p>
          <ul>
            <li>Refund requests must be made within 30 days of the original purchase date</li>
            <li>The license key must not have been previously refunded</li>
            <li>We may ask for feedback to help us improve our service</li>
          </ul>

          <h2>Non-Refundable Items</h2>
          <p>
            In cases of suspected fraud or abuse of the refund policy, we reserve the right to deny refund requests.
            Multiple refund requests from the same customer may also be subject to review.
          </p>

          <h2>Questions?</h2>
          <p>
            If you have any questions about our refund policy, please don{"'"}t hesitate to contact us at{" "}
            <a href="mailto:support@lightburn.store" className="text-primary hover:underline">
              support@lightburn.store
            </a>
            . We{"'"}re here to help!
          </p>
        </div>
      </div>
    </div>
  )
}
