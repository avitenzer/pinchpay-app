"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Shield, CreditCard, Zap, ArrowRight, DollarSign, TrendingUp, Clock, Calendar, Heart, Users, CheckCircle, Star } from "lucide-react"
import { detectDevice } from "@/lib/device-detection"
import { PhoneMockup } from "@/components/phone-mockup"

export default function LandingPage() {
  const [deviceInfo, setDeviceInfo] = useState<{
    isMobile: boolean
    hasWhatsApp: boolean
    browser: string
  }>({
    isMobile: false,
    hasWhatsApp: false,
    browser: "unknown",
  })

  const [daysToPayout, setDaysToPayout] = useState(0)

  useEffect(() => {
    const info = detectDevice()
    setDeviceInfo(info)

    // Calculate days until next 6th of the month
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const currentDay = today.getDate()
    
    let nextPayoutDate = new Date(currentYear, currentMonth, 6)
    
    // If we're past the 6th this month, calculate for next month
    if (currentDay > 6) {
      nextPayoutDate = new Date(currentYear, currentMonth + 1, 6)
    }
    
    const timeDiff = nextPayoutDate.getTime() - today.getTime()
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24))
    setDaysToPayout(days)
  }, [])

  const handleConnectAccount = () => {
    // Redirect to Plaid OAuth flow
    window.location.href = "/connect-bank"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden relative">
      {/* Animated Background Elements - More calming for seniors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-ping delay-2000"></div>
      </div>

      {/* Floating Calendar Icons representing monthly payments */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float text-green-400/40 text-xl`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            📅
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-slide-in-left">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center animate-bounce">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PinchPay</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
              For Social Security Recipients
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 animate-slide-in-right">
              {deviceInfo.hasWhatsApp ? "WhatsApp Ready" : "Senior Friendly"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300"
              onClick={() => window.open("/wireframes", "_blank")}
            >
              📱 View WhatsApp Alerts
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="animate-slide-in-left">
              {/* Urgency Badge */}
              <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                <Clock className="w-4 h-4 text-red-400 mr-2 animate-pulse" />
                <span className="text-red-300 text-sm font-medium">
                  {daysToPayout > 0 ? `${daysToPayout} days until your next payment` : "Payment day is today!"}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Don't Wait Until the
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x block mt-2">
                  6th of the Month
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl mx-auto lg:mx-0 font-medium">
                Access your Social Security benefits early when life happens
              </p>

                             <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                 We understand waiting 30 days between payments is hard. Access $$$ from your Social Security benefits 
                 multiple times throughout the month when you need them most.
               </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-slide-in-left delay-200">
              <div className="flex items-center text-green-400">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">FDIC Insured</span>
              </div>
              <div className="flex items-center text-blue-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">SSA Approved Process</span>
              </div>
              <div className="flex items-center text-purple-400">
                <Star className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">4.8/5 Rating</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-slide-in-left delay-300">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 animate-pulse-slow shadow-lg"
                onClick={handleConnectAccount}
              >
                Get Your Advance Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {deviceInfo.hasWhatsApp && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Smartphone className="mr-2 w-5 h-5" />
                  Continue on WhatsApp
                </Button>
              )}
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-in-left delay-500">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white animate-count-up">$86B</div>
                <div className="text-xs md:text-sm text-gray-400">Monthly Social Security Benefits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white animate-count-up delay-200">67M+</div>
                <div className="text-xs md:text-sm text-gray-400">Social Security Recipients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white animate-count-up delay-400">24hrs</div>
                <div className="text-xs md:text-sm text-gray-400">Average Approval Time</div>
              </div>
            </div>

            {/* Pain Point Callout */}
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-6 mb-8 animate-slide-in-left delay-600">
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">We Know Monthly Payments Are Tough</h3>
                  <p className="text-gray-300 text-sm">
                    Rent, groceries, medications - life doesn't wait for the 6th. 
                    That's why we created a safe way to access your earned benefits early.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup with countdown */}
          <div className="flex flex-col items-center lg:items-end animate-slide-in-right">
            <div className="mb-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Next Payment Countdown</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {daysToPayout}
                </div>
                <p className="text-gray-300">days until your Social Security payment</p>
                <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(10, 100 - (daysToPayout / 30 * 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <PhoneMockup />
          </div>
        </div>

        {/* Features Grid - Specifically for Social Security Recipients */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 mt-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-slide-in-up">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center mb-4 animate-bounce">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Designed for Seniors</CardTitle>
              <CardDescription className="text-gray-300">
                Simple, secure process built with Social Security recipients in mind. No hidden fees or complicated terms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-slide-in-up delay-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mb-4 animate-bounce delay-200">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Monthly Payment Sync</CardTitle>
              <CardDescription className="text-gray-300">
                We understand your payment schedule. Get advances that align with your Social Security calendar.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-slide-in-up delay-400">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4 animate-bounce delay-400">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Compassionate Support</CardTitle>
              <CardDescription className="text-gray-300">
                Our team understands the unique needs of Social Security recipients. Get help when you need it.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works - Simplified for Seniors */}
        <div className="text-center max-w-5xl mx-auto animate-slide-in-up delay-600">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How PinchPay Works for You</h2>
          <p className="text-gray-300 mb-12 text-lg">Simple steps designed for Social Security recipients</p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: 1, 
                title: "Connect Safely", 
                description: "Link your bank account with bank-level security", 
                icon: Shield,
                detail: "Same security used by major banks"
              },
              { 
                step: 2, 
                title: "Instant Approval", 
                description: "Get approved based on your Social Security income", 
                icon: CheckCircle,
                detail: "Usually approved within minutes"
              },
                             { 
                 step: 3, 
                 title: "Access Your $$$", 
                 description: "Get money from your benefits before your payment date", 
                 icon: DollarSign,
                 detail: "Available multiple times per month"
               },
              { 
                step: 4, 
                title: "Auto Payback", 
                description: "We automatically collect when you get paid", 
                icon: Calendar,
                detail: "Happens on the 6th automatically"
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center animate-slide-in-up bg-white/5 rounded-2xl p-6 border border-white/10"
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 animate-pulse-slow">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                <p className="text-green-400 text-xs font-medium">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-3xl border border-white/10 backdrop-blur-sm p-8 animate-slide-in-up delay-800">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-white font-medium mb-4">
              "PinchPay helped me when my prescription costs went up unexpectedly. 
              I didn't have to wait until the 6th to get my medication."
            </blockquote>
            <cite className="text-gray-300">- Margaret S., Social Security Recipient since 2019</cite>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-20 p-8 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-3xl border border-white/20 backdrop-blur-sm text-center animate-slide-in-up delay-1000">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Bridge the Gap?</h3>
          <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of Social Security recipients who trust PinchPay for early access to their benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-4 text-xl transform hover:scale-110 transition-all duration-300 animate-bounce-slow shadow-xl"
              onClick={handleConnectAccount}
            >
              Get Started Now
              <Zap className="ml-2 w-6 h-6" />
            </Button>
            <p className="text-sm text-gray-300">
              💳 No credit check required • 🔒 Bank-level security • ⚡ Usually approved in minutes
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-white/10 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PinchPay</span>
            </div>
            <p className="text-gray-400 text-sm">
              Dedicated to helping Social Security recipients access their benefits when they need them most. 
              Bridge the gap between monthly payments with confidence.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
            <div className="space-y-2">
              <button
                className="block text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => (window.location.href = "/about")}
              >
                About Us
              </button>
              <button
                className="block text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => window.open("/wireframes", "_blank")}
              >
                WhatsApp Alerts
              </button>
              <button
                className="block text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal</h3>
            <div className="space-y-2">
              <button
                className="block text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => (window.location.href = "/terms")}
              >
                Terms of Use
              </button>
              <button
                className="block text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => (window.location.href = "/privacy")}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">support@pinchpay.com</p>
              <p className="text-gray-400 text-sm">1-555-PINCHPAY</p>
              <button
                className="block text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
              >
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 pt-8 border-t border-white/10">
          <p>&copy; 2024 PinchPay. All rights reserved. | FDIC Insured | SOC 2 Compliant | Serving Social Security Recipients Nationwide</p>
        </div>
      </footer>
    </div>
  )
}

