"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Shield, Loader2 } from "lucide-react"

export default function SubscriptionPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  })

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // In real implementation, integrate with Stripe
      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          planId: "basic-monthly",
          amount: 999, // $9.99 in cents
        }),
      })

      if (response.ok) {
        // Redirect to address collection
        window.location.href = "/shipping-address"
      } else {
        throw new Error("Payment failed")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Activate Your Account</CardTitle>
            <CardDescription className="text-gray-300">
              Subscribe to PinchPay for $9.99/month to access your earned wages early
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubscription} className="space-y-6">
              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Shield className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  <strong>What you get:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Access to earned wages before payday</li>
                    <li>• Premium debit card (shipped free)</li>
                    <li>• WhatsApp balance alerts & withdrawals</li>
                    <li>• Web dashboard to manage your account</li>
                    <li>• No hidden fees or interest charges</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Cardholder Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={paymentMethod.name}
                    onChange={(e) => setPaymentMethod({ ...paymentMethod, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber" className="text-white">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentMethod.cardNumber}
                    onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-white">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentMethod.expiryDate}
                      onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-white">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentMethod.cvv}
                      onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center text-white">
                  <span>Monthly Subscription</span>
                  <span className="text-2xl font-bold">$9.99</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Billed monthly • Cancel anytime</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe & Continue
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will
                automatically renew monthly.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
