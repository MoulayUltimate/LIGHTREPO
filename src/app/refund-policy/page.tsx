export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Refund and Returns Policy</h1>

            <div className="prose prose-lg max-w-none">
                <p className="text-lg mb-6">
                    Thank you for shopping at LightBurn Pro. Due to the nature of digital software products,
                    please read our refund policy carefully.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Digital Products</h3>
                <p className="mb-4">
                    All software licenses and digital products sold on our website are non-refundable after
                    delivery. This is because digital products are delivered instantly and cannot be
                    "returned" in the traditional sense.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Exceptions</h3>
                <p className="mb-4">
                    We will only issue refunds or exchanges in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>The product is defective or does not work as described</li>
                    <li>You received the wrong product due to an error on our part</li>
                    <li>Technical issues prevent you from accessing the product</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Refund Request Process</h3>
                <p className="mb-4">
                    To request a refund, you must contact us at contact@lightburnpro.de within 14 days of
                    your purchase. Please include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>Your order number</li>
                    <li>A detailed description of the issue</li>
                    <li>Screenshots or other documentation if applicable</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Processing Time</h3>
                <p className="mb-4">
                    Once we receive your refund request, we will review it within 3-5 business days. If
                    approved, refunds will be processed to your original payment method within 7-10 business
                    days.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">30-Day Free Trial</h3>
                <p className="mb-4">
                    We recommend trying our 30-day free trial before purchasing to ensure the software meets
                    your needs and is compatible with your system.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Contact Us</h3>
                <p className="mb-4">
                    If you have any questions about our refund policy, please contact us at:
                    contact@lightburnpro.de
                </p>
            </div>
        </div>
    );
}
