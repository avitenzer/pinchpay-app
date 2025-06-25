"use client"

export default function PrivacyPage() {
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
            <button
              className="bg-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20"
              onClick={() => (window.location.href = "/terms")}
            >
              Terms of Use
            </button>
            <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Privacy Policy</div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">PinchPay Privacy Policy</h1>
            <p className="text-gray-300">Last updated December 15, 2024</p>
          </div>

          {/* Privacy Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-8">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                This Privacy Policy describes how PinchPay Operating LLC ("PinchPay," "we," "us," or "our") collects,
                uses, and shares your personal information when you use our services.
              </p>
            </div>

            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="leading-relaxed mb-4">We collect information you provide directly to us, such as:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Personal identification information (name, address, phone number, email address, Social Security
                    number)
                  </li>
                  <li>Financial information (bank account details, income information, employment details)</li>
                  <li>Device and usage information (IP address, device type, app usage patterns)</li>
                  <li>Communication preferences and WhatsApp contact information</li>
                  <li>Transaction history and account activity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our wage advance and financial services</li>
                  <li>Process transactions and send you related information</li>
                  <li>Verify your identity and prevent fraud</li>
                  <li>Send you technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and promotional offers</li>
                  <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing and Disclosure</h2>
                <p className="leading-relaxed mb-4">We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> With third-party vendors who perform services on our behalf
                  </li>
                  <li>
                    <strong>Financial Partners:</strong> With banks and payment processors to facilitate transactions
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of assets
                  </li>
                  <li>
                    <strong>Consent:</strong> With your explicit consent for specific purposes
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>256-bit SSL encryption for data transmission</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Compliance with industry-standard security frameworks</li>
                  <li>Employee training on data protection and privacy</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights and Choices</h2>
                <p className="leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
                    requirements)
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your information in a structured format
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. WhatsApp Integration</h2>
                <p className="leading-relaxed">
                  Our WhatsApp integration allows us to send you balance alerts, transaction notifications, and respond
                  to your requests. By providing your WhatsApp number, you consent to receive these communications. You
                  can opt out at any time by contacting customer support or replying "STOP" to any message.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services, comply with
                  legal obligations, resolve disputes, and enforce our agreements. When we no longer need your
                  information, we will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect
                  personal information from children under 18. If we become aware that we have collected personal
                  information from a child under 18, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this
                  Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="font-medium">PinchPay Privacy Team</p>
                  <p>Email: privacy@pinchpay.com</p>
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
