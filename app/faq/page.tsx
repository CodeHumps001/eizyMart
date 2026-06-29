"use client";

import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

// FAQ data with categories
const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How do I place an order?",
        a: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), digital wallets (PayPal, Apple Pay, Google Pay), and bank transfers.",
      },
      {
        q: "How long does shipping take?",
        a: "Orders are typically processed within 1-3 business days. Delivery times vary by location: Standard shipping (3-7 business days), Express shipping (1-3 business days), and International shipping (7-14 business days).",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, we offer free standard shipping on orders over $99. Express shipping options are available at an additional cost.",
      },
      {
        q: "Can I track my order?",
        a: "Once your order is shipped, you will receive a tracking number via email. You can also track your order status in your account dashboard.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy from the date of delivery. Items must be unused, in original packaging, and accompanied by proof of purchase. Certain items like personalized products are non-returnable.",
      },
      {
        q: "How do I initiate a return?",
        a: 'To initiate a return, log into your account, go to your order history, select the order, and click "Return Item." Follow the instructions to print a return label and ship the item back to us.',
      },
      {
        q: "How long does the refund process take?",
        a: "Once we receive your returned item, we will process the refund within 3-5 business days. The refund will appear on your original payment method within 5-10 business days.",
      },
      {
        q: "Can I exchange an item?",
        a: "Yes, we offer exchanges for items of equal value. Please contact our support team to arrange an exchange. You may need to return the item and place a new order for the desired product.",
      },
      {
        q: "What if I receive a damaged item?",
        a: "If you receive a damaged or defective item, please contact us immediately within 48 hours of delivery. We will arrange a replacement or full refund and may request photos of the damage.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I create an account?",
        a: 'Click the "Sign Up" or "Register" button on our website. Fill in your name, email address, and create a password. You can also sign up using your Google or Facebook account.',
      },
      {
        q: "I forgot my password. What should I do?",
        a: 'Click the "Forgot Password" link on the login page. Enter your registered email address, and we will send you a link to reset your password.',
      },
      {
        q: "How do I update my account information?",
        a: 'Log in to your account and navigate to the "Account Settings" or "Profile" section. You can update your personal information, shipping addresses, and payment methods there.',
      },
      {
        q: "Is my personal information secure?",
        a: "Yes, we take security seriously. We use SSL encryption for all data transmission, store information securely, and never share your personal details with third parties without your consent.",
      },
    ],
  },
  {
    category: "Products & Inventory",
    questions: [
      {
        q: "Are your products authentic?",
        a: "Yes, all products on our platform are 100% authentic. We source directly from brands and authorized distributors to ensure product quality and authenticity.",
      },
      {
        q: "How do I know which product is right for me?",
        a: "Each product page includes detailed descriptions, specifications, customer reviews, and ratings. You can also contact our support team for personalized recommendations.",
      },
      {
        q: "Do you offer product warranties?",
        a: "Most products come with manufacturer warranties. Warranty information is specified on each product page. Please check the product details for specific warranty terms.",
      },
      {
        q: "What if a product is out of stock?",
        a: 'Out-of-stock items will display a "Notify Me" option. Enter your email to receive a notification when the product becomes available again.',
      },
    ],
  },
  {
    category: "Payment & Billing",
    questions: [
      {
        q: "Is it safe to use my credit card on your site?",
        a: "Yes, all transactions are processed through secure, PCI-compliant payment gateways. Your card information is encrypted and never stored on our servers.",
      },
      {
        q: "Do you charge sales tax?",
        a: "Sales tax is calculated based on your shipping address and applicable local tax rates. The total amount including tax will be shown at checkout before you confirm your purchase.",
      },
      {
        q: "Can I use multiple payment methods?",
        a: "Currently, we only accept one payment method per order. However, you can use gift cards in combination with other payment methods.",
      },
      {
        q: "What is your billing cycle?",
        a: "For one-time purchases, you will be charged immediately at checkout. For subscription services, you will be billed on the same date each month.",
      },
    ],
  },
  {
    category: "Support & Contact",
    questions: [
      {
        q: "How can I contact customer support?",
        a: "You can reach us via email at support@shop.com, through our live chat feature available on the website, or by phone at 1-800-SHOP-123 during business hours (9AM-6PM EST, Monday-Friday).",
      },
      {
        q: "What are your customer service hours?",
        a: "Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM EST. We also offer limited support on weekends via email.",
      },
      {
        q: "Do you have a physical store?",
        a: "Currently, we operate exclusively online. However, we're planning to open physical locations in major cities soon. Stay tuned for updates!",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter questions based on search term
  const filteredData = searchTerm
    ? faqData
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.a.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqData;

  const categories = faqData.map((c) => c.category);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Shop
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Category navigation */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredData.map((category) => {
            if (activeCategory && category.category !== activeCategory)
              return null;

            return (
              <div
                key={category.category}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.category}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, index) => (
                    <FAQItem key={index} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-600">
                No results found for "{searchTerm}"
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your search or contact us for further assistance.
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Still have questions?
          </h3>
          <p className="text-gray-600 mt-2">
            Our support team is here to help. Reach out to us anytime.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@shop.com"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Email Support
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Live Chat
            </a>
          </div>
        </div>

        {/* Footer links */}
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
            <Link
              href="/privacy"
              className="text-sm text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Accordion component for individual FAQ items
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-6 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span className="ml-4 flex-shrink-0">
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 leading-relaxed transition-all duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}
