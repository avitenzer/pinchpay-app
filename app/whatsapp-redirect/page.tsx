"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Smartphone, MessageCircle, Phone, Mail, CheckCircle, Loader2 } from "lucide-react"
import { detectWhatsAppSupport, openWhatsApp, createWhatsAppChatbot } from "@/lib/whatsapp-integration"

export default function WhatsAppRedirectPage() {
  const [hasWhatsApp, setHasWhatsApp] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [redirectStatus, setRedirectStatus] = useState<"idle" | "redirecting" | "success" | "failed">("idle")
  const [userPhone, setUserPhone] = useState("")

  useEffect(() => {
    const checkWhatsApp = async () => {
      const supported = await detectWhatsAppSupport()
      setHasWhatsApp(supported)
    }
    checkWhatsApp()

    // Get user session data
    const sessionData = localStorage.getItem("pinchpay_session")
    if (sessionData) {
      // In a real app, you'd extract phone number from user data
      setUserPhone("+1234567890") // This should come from user registration
    }
  }, [])

  const handleWhatsAppRedirect = async () => {
    setIsRedirecting(true)
    setRedirectStatus("redirecting")

    try {
      // Create WhatsApp session first
      await createWhatsAppChatbot(userPhone)

      // Prepare welcome message
      const welcomeMessage = `Hi! 👋 I just completed my bank connection on PinchPay and I'm ready to speak with a representative about opening my account.

My application is ready for the next step - the quick interview process.

Can we get started? 🚀`

      // Try to open WhatsApp
      const success = await openWhatsApp(welcomeMessage, userPhone)

      if (success) {
        setRedirectStatus("success")

        // Redirect to interview status page after a delay
        setTimeout(() => {
          window.location.href = "/interview-status"
        }, 3000)
      } else {
        setRedirectStatus("failed")
      }
    } catch (error) {
      console.error("WhatsApp redirect error:", error)
      setRedirectStatus("failed")
    } finally {
      setIsRedirecting(false)
    }
  }

  const handlePhoneFallback = () => {
    window.location.href = "tel:+1-555-PINCHPAY"
  }

  const handleEmailFallback = () => {
    const subject = encodeURIComponent("New Application - Bank Connected")
    const body = encodeURIComponent(`Hi PinchPay team,

I just completed my bank connection and I'm ready to continue with my application.

Please contact me to schedule the interview process.

Thank you!`)

    window.location.href = `mailto:support@pinchpay.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              {redirectStatus === "success" ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : redirectStatus === "redirecting" ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : (
                <MessageCircle className="w-8 h-8 text-white" />
              )}
            </div>
            <CardTitle className="text-2xl text-white">
              {redirectStatus === "success" ? "Opening WhatsApp..." : "Let's Chat on WhatsApp!"}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {redirectStatus === "success"
                ? "You should see WhatsApp opening now. If not, try the button below."
                : "Connect with a PinchPay representative to complete your application"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {redirectStatus === "success" && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  WhatsApp should be opening now! If it doesn't open automatically, click the button below.
                </AlertDescription>
              </Alert>
            )}

            {redirectStatus === "failed" && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <Phone className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  Couldn't open WhatsApp automatically. Please try the manual options below.
                </AlertDescription>
              </Alert>
            )}

            {hasWhatsApp && redirectStatus === "idle" && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <Smartphone className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  WhatsApp detected! Click below to start your interview.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleWhatsAppRedirect}
                disabled={isRedirecting}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {isRedirecting
                  ? "Opening WhatsApp..."
                  : redirectStatus === "success"
                    ? "Open WhatsApp Again"
                    : "Start Interview on WhatsApp"}
              </Button>

              <div className="text-center text-gray-400 text-sm">or contact us directly</div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={handlePhoneFallback}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </Button>

                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={handleEmailFallback}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-medium text-blue-300 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Quick 5-minute interview about your income</li>
                <li>• Real-time approval decision</li>
                <li>• Crypto debit card shipped within 24 hours</li>
                <li>• Immediate access to earned wages</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-400">Having trouble? Our support team is available 24/7</p>
              <Button
                variant="link"
                className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                onClick={() => (window.location.href = "/support")}
              >
                Get Help →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
