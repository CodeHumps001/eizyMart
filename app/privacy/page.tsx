import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Shop",
  description: "Read our privacy policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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
            1. Information We Collect
          </h2>
          <p>
            We collect information to provide better services to all our users.
            The types of information we collect include:
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address,
              shipping address, phone number, and payment information.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages viewed, products browsed,
              search queries, and time spent on our site.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              device type, and operating system.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Improve our products and services</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Personalize your shopping experience</li>
            <li>Send promotional offers (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">
            3. Information Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share information with:
          </p>
          <ul>
            <li>Service providers (payment processors, shipping carriers)</li>
            <li>When required by law or to protect our rights</li>
            <li>With your explicit consent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. This includes:
          </p>
          <ul>
            <li>SSL encryption for data transmission</li>
            <li>Regular security audits and updates</li>
            <li>Limited access to personal information</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">
            5. Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            browsing experience, analyze website traffic, and personalize
            content. You can control cookie preferences through your browser
            settings.
          </p>

          <h2 className="text-2xl font-semibold mt-8">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">7. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not
            knowingly collect personal information from children. If we become
            aware that we have collected such information, we will take steps to
            delete it.
          </p>

          <h2 className="text-2xl font-semibold mt-8">8. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this policy, unless a longer
            retention period is required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            9. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            for such transfers.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            10. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-8">11. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us:
            <br />
            <a
              href="mailto:privacy@shop.com"
              className="text-blue-600 hover:underline"
            >
              privacy@shop.com
            </a>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2026 Shop. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link
              href="/terms"
              className="text-sm text-blue-600 hover:underline"
            >
              Terms of Service
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
