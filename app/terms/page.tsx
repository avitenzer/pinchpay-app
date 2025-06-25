"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-2xl font-bold text-white">PinchPay</span>
            </div>
            <button className="text-purple-400 hover:text-purple-300" onClick={() => (window.location.href = "/")}>
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Terms of Use</div>
            <button
              className="bg-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20"
              onClick={() => (window.location.href = "/privacy")}
            >
              Privacy Policy
            </button>
          </div>

          {/* Alert */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
            <p className="text-blue-300 text-sm">
              Please review the updated arbitration agreement in PinchPay Terms of Use, and Account Agreements. Your
              continued use of PinchPay services means you have reviewed and accepted these terms.
            </p>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">PinchPay Terms of Use</h1>
            <p className="text-gray-300">Last revised December 15, 2024</p>
          </div>

          {/* Terms Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-yellow-300 text-sm font-medium">
                PLEASE BE AWARE THAT SECTION 19 OF THIS AGREEMENT CONTAINS PROVISIONS GOVERNING HOW TO RESOLVE CLAIMS
                BETWEEN YOU AND PINCHPAY. AMONG OTHER THINGS, SECTION 19 INCLUDES AN AGREEMENT TO ARBITRATE WHICH
                REQUIRES, WITH LIMITED EXCEPTIONS, THAT ALL CLAIMS BETWEEN YOU AND US WILL BE RESOLVED BY BINDING AND
                FINAL ARBITRATION. SECTION 19 ALSO CONTAINS A CLASS ACTION AND JURY TRIAL WAIVER. PLEASE READ SECTION 19
                CAREFULLY.
              </p>
            </div>

            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                <p className="leading-relaxed">
                  The following terms of service are terms of a legal agreement (the "Agreement") between you ("you",
                  "your", or "user") and PinchPay Operating LLC, its subsidiaries, affiliates, agents, and assigns
                  ("PinchPay", "we", "us", or "our") which sets forth the terms and conditions for your use of
                  PinchPay's mobile application ("Mobile App") and PinchPay's website, pinchpay.com, as well as the
                  products and services offered by PinchPay (collectively, the "Services").
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
                <p className="leading-relaxed mb-4">
                  PinchPay provides financial services including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Wage advance services that allow you to access earned wages before your scheduled payday</li>
                  <li>Premium debit card services for spending your available funds</li>
                  <li>WhatsApp-based notifications and balance management</li>
                  <li>Web dashboard for account management</li>
                  <li>Custodial wallet services for fund management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
                <p className="leading-relaxed mb-4">To use PinchPay Services, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years old</li>
                  <li>Be a legal resident of the United States</li>
                  <li>Have a valid Social Security number</li>
                  <li>Have a bank account in your name at a U.S. financial institution</li>
                  <li>Have a consistent source of income</li>
                  <li>Provide accurate and complete information during registration</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Account Registration and Security</h2>
                <p className="leading-relaxed mb-4">
                  When you create an account with PinchPay, you agree to provide accurate, current, and complete
                  information. You are responsible for maintaining the confidentiality of your account credentials and
                  for all activities that occur under your account.
                </p>
                <p className="leading-relaxed">
                  You agree to immediately notify PinchPay of any unauthorized use of your account or any other breach
                  of security. PinchPay will not be liable for any loss or damage arising from your failure to comply
                  with this security obligation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Wage Advance Services</h2>
                <p className="leading-relaxed mb-4">
                  PinchPay's wage advance service allows eligible users to access a portion of their earned wages before
                  their scheduled payday. By using this service, you agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Advances are based on your verified income and work schedule</li>
                  <li>Repayment will be automatically deducted from your bank account on your next payday</li>
                  <li>A service fee may apply to each advance as disclosed at the time of request</li>
                  <li>You authorize PinchPay to access your bank account for repayment purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Fees and Charges</h2>
                <p className="leading-relaxed mb-4">
                  PinchPay charges a monthly subscription fee of $9.99 for access to our services. Additional fees may
                  apply for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Wage advance transactions (disclosed at time of request)</li>
                  <li>Expedited transfers</li>
                  <li>Returned payment fees</li>
                  <li>Account closure fees in certain circumstances</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  All fees will be clearly disclosed before you incur them. You authorize PinchPay to charge these fees
                  to your linked payment method or deduct them from your account balance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Privacy and Data Protection</h2>
                <p className="leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                  Services, to understand our practices regarding the collection, use, and disclosure of your personal
                  information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Prohibited Uses</h2>
                <p className="leading-relaxed mb-4">You may not use PinchPay Services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To transmit or procure the sending of any advertising or promotional material without our prior
                    written consent
                  </li>
                  <li>
                    To impersonate or attempt to impersonate PinchPay, a PinchPay employee, another user, or any other
                    person or entity
                  </li>
                  <li>
                    In any way that infringes upon the rights of others, or in any way is illegal, threatening,
                    fraudulent, or harmful
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                <p className="leading-relaxed">
                  We may terminate or suspend your account and bar access to the Services immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever, including but not limited
                  to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the
                  Services and cancel your subscription.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Use, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="font-medium">PinchPay Customer Support</p>
                  <p>Email: support@pinchpay.com</p>
                  <p>Phone: 1-555-PINCHPAY</p>
                  <p>Address: 123 Financial District, San Francisco, CA 94105</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
