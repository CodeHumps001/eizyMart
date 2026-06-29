import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Shop",
  description: "Read our terms of service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Shop
          </Link>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">Last updated: January 2026</p>

          <h2 className="text-2xl font-semibold mt-8">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. Additionally,
            when using these particular services, you shall be subject to any
            posted guidelines or rules applicable to such services.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            2. Description of Service
          </h2>
          <p>
            Shop provides users with access to a rich collection of products
            including electronics, accessories, and lifestyle items. Our
            platform offers:
          </p>
          <ul>
            <li>Product browsing and search capabilities</li>
            <li>Secure checkout process</li>
            <li>Order tracking and management</li>
            <li>Customer reviews and ratings</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">3. User Account</h2>
          <p>
            To access certain features of the website, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            4. Product Information
          </h2>
          <p>
            We strive to display accurate product information including pricing,
            descriptions, and availability. However, we do not guarantee that
            all information is error-free. Prices are subject to change without
            notice.
          </p>

          <h2 className="text-2xl font-semibold mt-8">5. Payment Terms</h2>
          <p>
            All payments are processed through secure third-party payment
            gateways. We accept various payment methods including credit/debit
            cards and digital wallets. By making a purchase, you agree to pay
            all charges incurred.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            6. Shipping and Delivery
          </h2>
          <p>
            We aim to process and ship orders within 1-3 business days. Delivery
            times may vary depending on your location and selected shipping
            method. Tracking information will be provided once your order ships.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            7. Returns and Refunds
          </h2>
          <p>
            We offer a 30-day return policy for most products. Items must be
            returned in their original packaging and condition. Refunds will be
            processed to the original payment method within 5-10 business days.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            8. Limitation of Liability
          </h2>
          <p>
            Shop is not liable for any indirect, incidental, or consequential
            damages arising from the use of our services. Our total liability is
            limited to the amount paid for the products purchased.
          </p>

          <h2 className="text-2xl font-semibold mt-8">9. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the website after any changes constitutes acceptance of the
            new terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            10. Contact Information
          </h2>
          <p>
            For any questions about these terms, please contact us at:
            <br />
            <a
              href="mailto:support@shop.com"
              className="text-blue-600 hover:underline"
            >
              support@shop.com
            </a>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2026 Shop. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-sm text-blue-600 hover:underline">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
