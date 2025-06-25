"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Mail, Phone, ArrowRight, Heart, DollarSign, Calendar, Bell } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const [timeToNextPayment, setTimeToNextPayment] = useState(0)

  useEffect(() => {
    // Calculate days until next Social Security payment (6th of next month)
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 6)
    
    // If we're past the 6th of current month, next payment is next month
    // If we're before the 6th, next payment is this month
    if (today.getDate() < 6) {
      nextMonth.setMonth(today.getMonth())
      nextMonth.setDate(6)
    }
    
    const timeDiff = nextMonth.getTime() - today.getTime()
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24))
    setTimeToNextPayment(days)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PinchPay</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
              Account Created Successfully
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12 animate-slide-in-down">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to 
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block">
              PinchPay!
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Your account has been created successfully. We're now setting up secure access to your Social Security benefits.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center text-green-400">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Account Secured</span>
            </div>
            <div className="flex items-center text-blue-400">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Verification In Progress</span>
            </div>
            <div className="flex items-center text-purple-400">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">SSA Processing</span>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8 animate-slide-in-up">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">What Happens Next?</CardTitle>
            <CardDescription className="text-gray-300">
              Here's what you can expect over the next 24-48 hours
            </CardDescription>
          </CardHeader>
          
          <div className="p-6 space-y-6">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Social Security Administration Verification</h3>
                <p className="text-gray-300 text-sm mb-2">
                  We're securely verifying your Social Security benefits with the SSA. This process typically takes 1-6 hours.
                </p>
                <div className="flex items-center text-orange-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-xs">In Progress - Expected completion within 6 hours</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Email Confirmation & Next Steps</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Once verified, you'll receive an email with instructions to complete your benefit access setup.
                </p>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-1" />
                  <span className="text-xs">Pending verification completion</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Start Accessing Benefits Early</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Once setup is complete, you'll be able to access your Social Security benefits multiple times per month.
                </p>
                <div className="flex items-center text-gray-400">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-xs">Available after setup completion</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm animate-slide-in-left">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-white font-semibold">Check Your Email</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                We'll send updates to your registered email address. Make sure to check your inbox and spam folder.
              </p>
              <div className="bg-blue-600/20 rounded-lg p-3">
                <p className="text-blue-300 text-xs">
                  💡 Add hello@pinchpay.com to your contacts to ensure you receive our emails
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-green-500/20 border border-green-500/30 backdrop-blur-sm animate-slide-in-right">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-white font-semibold">Next Payment Timeline</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {timeToNextPayment}
                </div>
                <p className="text-green-300 text-sm mb-2">
                  days until your next Social Security payment
                </p>
                <p className="text-gray-300 text-xs">
                  You'll be able to access benefits early once verification is complete
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8 animate-slide-in-up delay-200">
          <div className="p-6">
            <h3 className="text-white font-semibold text-center mb-6">Need Help? We're Here for You</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">Call Us</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Speak with a Social Security specialist
                </p>
                <p className="text-green-400 font-medium">1-800-PINCHPAY</p>
                <p className="text-gray-400 text-xs">Mon-Fri 8AM-8PM EST</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">Email Support</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Get help with your account setup
                </p>
                <p className="text-blue-400 font-medium">support@pinchpay.com</p>
                <p className="text-gray-400 text-xs">Usually responds within 2 hours</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <Card className="bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm mb-8 animate-slide-in-up delay-300">
          <div className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-2">Your Information is Safe</h3>
                <p className="text-gray-300 text-sm">
                  Your Social Security number and personal information are encrypted using bank-level security. 
                  We never store your SSN after the initial verification process. PinchPay is compliant with 
                  all federal regulations for handling Social Security benefit information.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="text-center animate-slide-in-up delay-400">
          <h3 className="text-2xl font-bold text-white mb-6">What You Can Do Now</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => window.open("mailto:support@pinchpay.com", "_blank")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm mt-4">
            📧 Remember to check your email for verification updates
          </p>
        </div>
      </main>
    </div>
  )
} 