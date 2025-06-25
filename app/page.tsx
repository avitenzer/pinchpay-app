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
  const [monthlyBenefit, setMonthlyBenefit] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [estimatedAdvance, setEstimatedAdvance] = useState(0)
  const [showEstimator, setShowEstimator] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    email: string
    benefit: string
    estimate: number
  } | null>(null)

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

  // Calculate estimated advance based on monthly benefit
  useEffect(() => {
    if (monthlyBenefit && !isNaN(parseFloat(monthlyBenefit))) {
      const benefit = parseFloat(monthlyBenefit)
      // Conservative estimate: 15-25% of monthly benefit, capped at reasonable amounts
      const percentage = benefit > 2000 ? 0.15 : 0.25
      const estimated = Math.min(Math.floor(benefit * percentage), 500)
      setEstimatedAdvance(estimated)
    } else {
      setEstimatedAdvance(0)
    }
  }, [monthlyBenefit])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSuccessModal) {
        setShowSuccessModal(false)
        setMonthlyBenefit("")
        setEmailAddress("")
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showSuccessModal])

  const handleEstimatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailAddress || !monthlyBenefit) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    
    // Here you would typically send to your backend
    console.log('Lead submitted:', { emailAddress, monthlyBenefit, estimatedAdvance })
    
    // Store data and show success modal
    setSubmittedData({
      email: emailAddress,
      benefit: monthlyBenefit,
      estimate: estimatedAdvance
    })
    setShowSuccessModal(true)
    setShowEstimator(false)
  }

  const handleConnectAccount = () => {
    // Redirect to Social Security sign-up flow
    window.location.href = "/sign-up"
  }

  return (
         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 overflow-hidden relative">
       {/* Animated Background Elements - Optimized for contrast */}
        <div className="absolute inset-0 overflow-hidden">
         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

      {/* Floating Calendar Icons representing monthly payments */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float text-blue-300/60 text-xl`}
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
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center animate-bounce">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PinchPay</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30 ml-2">
              For Social Security Recipients
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-slate-800/80 text-slate-200 border-slate-600 animate-slide-in-right">
              {deviceInfo.hasWhatsApp ? "WhatsApp Ready" : "Senior Friendly"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 bg-transparent"
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
              <div className="inline-flex items-center bg-orange-500/20 border border-orange-400/40 rounded-full px-4 py-2 mb-6">
                <Clock className="w-4 h-4 text-orange-300 mr-2 animate-pulse" />
                <span className="text-orange-200 text-sm font-medium">
                  {daysToPayout > 0 ? `${daysToPayout} days until your next payment` : "Payment day is today!"}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Don't Wait Until the
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x block mt-2">
                  6th of the Month
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-200 mb-4 max-w-2xl mx-auto lg:mx-0 font-medium">
                Access your Social Security benefits early when life happens
              </p>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                We understand waiting 30 days between payments is hard. Access $$$ from your Social Security benefits 
                multiple times throughout the month when you need them most.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-slide-in-left delay-200">
              <div className="flex items-center text-blue-300">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">FDIC Insured</span>
              </div>
              <div className="flex items-center text-indigo-300">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">SSA Approved Process</span>
              </div>
              <div className="flex items-center text-yellow-300">
                <Star className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">4.8/5 Rating</span>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="animate-slide-in-left delay-300 mb-12">
              {!showEstimator ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 animate-pulse-slow shadow-lg"
                      onClick={() => setShowEstimator(true)}
                    >
                      See How Much You Can Access
                      <DollarSign className="ml-2 w-5 h-5" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-slate-400 text-slate-200 hover:bg-slate-700/50 hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
                      onClick={handleConnectAccount}
                    >
                      Access Your Benefits
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>

                  {deviceInfo.hasWhatsApp && (
                    <div className="flex justify-center lg:justify-start">
                      <Button
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                      >
                        <Smartphone className="mr-2 w-4 h-4" />
                        Or continue on WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm p-6 mb-6">
                  <form onSubmit={handleEstimatorSubmit} className="space-y-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        💰 Quick Benefit Calculator
                      </h3>
                      <p className="text-slate-300 text-sm">
                        See how much $$$ you could access between payments
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Monthly Social Security Benefit
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            type="number"
                            placeholder="1,500"
                            value={monthlyBenefit}
                            onChange={(e) => setMonthlyBenefit(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-700/60 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700/60 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {estimatedAdvance > 0 && (
                      <div className="text-center p-4 bg-blue-500/20 border border-blue-400/40 rounded-lg animate-slide-in-down">
                        <p className="text-blue-200 text-sm mb-1">You could access:</p>
                        <p className="text-3xl font-bold text-white animate-countdown-tick">
                          ${estimatedAdvance}
                        </p>
                        <p className="text-blue-200 text-xs">multiple times per month</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !emailAddress || !monthlyBenefit}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Calculating...
                          </>
                        ) : (
                          <>
                            Get My Estimate
                            <Zap className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowEstimator(false)}
                        className="bg-transparent border-slate-400 text-slate-200 hover:bg-slate-700/50"
                      >
                        Back
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
                       <div className="flex items-center justify-center">
                         <Shield className="w-3 h-3 mr-1" />
                         SSA Verified
                       </div>
                       <div className="flex items-center justify-center">
                         <Clock className="w-3 h-3 mr-1" />
                         2-min setup
                       </div>
                       <div className="flex items-center justify-center">
                         <CheckCircle className="w-3 h-3 mr-1" />
                         No credit check
                       </div>
                     </div>
                  </form>
                </Card>
              )}
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-in-left delay-500">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white animate-count-up">$86B</div>
                <div className="text-xs md:text-sm text-slate-400">Monthly Social Security Benefits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white animate-count-up delay-200">67M+</div>
                <div className="text-xs md:text-sm text-slate-400">Social Security Recipients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white animate-count-up delay-400">24hrs</div>
                <div className="text-xs md:text-sm text-slate-400">Average Approval Time</div>
              </div>
            </div>

            {/* Pain Point Callout */}
            <div className="bg-orange-500/20 border border-orange-400/40 rounded-xl p-6 mb-8 animate-slide-in-left delay-600">
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-orange-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">We Know Monthly Payments Are Tough</h3>
                  <p className="text-slate-300 text-sm">
                    Rent, groceries, medications - life doesn't wait for the 6th. 
                    That's why we created a safe way to access your earned benefits early.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup with countdown */}
          <div className="flex flex-col items-center lg:items-end animate-slide-in-right">
            <div className="mb-6 p-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Next Payment Countdown</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {daysToPayout}
                </div>
                <p className="text-slate-300">days until your Social Security payment</p>
                <div className="mt-4 w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full transition-all duration-1000"
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
          <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-slide-in-up">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 animate-bounce">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Designed for Seniors</CardTitle>
              <CardDescription className="text-slate-300">
                Simple, secure process built with Social Security recipients in mind. No hidden fees or complicated terms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-slide-in-up delay-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 animate-bounce delay-200">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Monthly Payment Sync</CardTitle>
              <CardDescription className="text-slate-300">
                We understand your payment schedule. Get advances that align with your Social Security calendar.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 animate-slide-in-up delay-400">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 animate-bounce delay-400">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Compassionate Support</CardTitle>
              <CardDescription className="text-slate-300">
                Our team understands the unique needs of Social Security recipients. Get help when you need it.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works - Simplified for Seniors */}
        <div className="text-center max-w-5xl mx-auto animate-slide-in-up delay-600">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How PinchPay Works for You</h2>
          <p className="text-slate-300 mb-12 text-lg">Simple steps designed for Social Security recipients</p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
                             { 
                 step: 1, 
                 title: "Verify Benefits", 
                 description: "Securely verify your Social Security benefits", 
                 icon: Shield,
                 detail: "SSA-approved verification process"
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
                className="text-center animate-slide-in-up bg-slate-800/50 rounded-2xl p-6 border border-slate-600"
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 animate-pulse-slow">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm mb-2">{item.description}</p>
                <p className="text-blue-400 text-xs font-medium">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl border border-slate-600 backdrop-blur-sm p-8 animate-slide-in-up delay-800">
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
            <cite className="text-slate-300">- Margaret S., Social Security Recipient since 2019</cite>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-20 p-8 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl border border-slate-600 backdrop-blur-sm text-center animate-slide-in-up delay-1000">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Bridge the Gap?</h3>
          <p className="text-slate-200 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of Social Security recipients who trust PinchPay for early access to their benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-xl transform hover:scale-110 transition-all duration-300 animate-bounce-slow shadow-xl"
              onClick={handleConnectAccount}
            >
              Access My Benefits
              <Zap className="ml-2 w-6 h-6" />
            </Button>
            <p className="text-sm text-slate-300">
              💳 No credit check required • 🔒 SSA-verified process • ⚡ Usually approved in minutes
            </p>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && submittedData && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-slide-in-down"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuccessModal(false)
              // Reset form for potential reuse
              setMonthlyBenefit("")
              setEmailAddress("")
            }
          }}
        >
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-slide-in-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative">
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  setMonthlyBenefit("")
                  setEmailAddress("")
                }}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                You're All Set! 🎉
              </h3>
              <p className="text-white/90 text-sm">
                Your personalized benefit estimate is ready
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Estimate Display */}
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-gray-600 text-sm mb-1">Based on your ${submittedData.benefit} monthly benefit:</p>
                <div className="text-4xl font-bold text-blue-600 mb-1 animate-countdown-tick">
                  ${submittedData.estimate}
                </div>
                <p className="text-blue-600 text-sm font-medium">
                  Available multiple times per month
                </p>
              </div>

              {/* What's Next */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  What happens next?
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-blue-600 font-bold text-xs">1</span>
                    </div>
                    <p>We'll send detailed information to <strong>{submittedData.email}</strong></p>
                  </div>
                                     <div className="flex items-start">
                     <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                       <span className="text-blue-600 font-bold text-xs">2</span>
                     </div>
                     <p>Complete your benefit access setup (2 minutes)</p>
                   </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-purple-600 font-bold text-xs">3</span>
                    </div>
                    <p>Start accessing your $$$ between Social Security payments</p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
                             <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                 <div className="flex flex-col items-center">
                   <Shield className="w-4 h-4 text-blue-500 mb-1" />
                   <span>SSA Verified</span>
                 </div>
                 <div className="flex flex-col items-center">
                   <Clock className="w-4 h-4 text-blue-500 mb-1" />
                   <span>2-Min Setup</span>
                 </div>
                 <div className="flex flex-col items-center">
                   <CheckCircle className="w-4 h-4 text-purple-500 mb-1" />
                   <span>No Credit Check</span>
                 </div>
               </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                                 <Button
                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 transform hover:scale-105 transition-all duration-200"
                   onClick={() => {
                     setShowSuccessModal(false)
                     handleConnectAccount()
                   }}
                 >
                   <Zap className="w-4 h-4 mr-2" />
                   Start Accessing Benefits
                 </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setShowSuccessModal(false)
                    setMonthlyBenefit("")
                    setEmailAddress("")
                  }}
                >
                  I'll Check My Email First
                </Button>
              </div>

              {/* Footer Note */}
                             <p className="text-xs text-gray-400 text-center">
                 💌 Check your email in the next few minutes for your benefit access instructions
               </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
             <footer className="container mx-auto px-4 py-8 mt-16 border-t border-slate-600 relative z-10">
         <div className="grid md:grid-cols-4 gap-8 mb-8">
           {/* Company Info */}
           <div className="space-y-4">
             <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                 <Heart className="w-5 h-5 text-white" />
               </div>
               <span className="text-xl font-bold text-white">PinchPay</span>
             </div>
             <p className="text-slate-400 text-sm">
               Dedicated to helping Social Security recipients verify their benefits and access advances when they need them most. 
               Bridge the gap between monthly payments with confidence and security.
             </p>
           </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
                         <div className="space-y-2">
               <button
                 className="block text-slate-400 hover:text-white text-sm transition-colors"
                 onClick={() => (window.location.href = "/about")}
               >
                 About Us
               </button>
               <button
                 className="block text-slate-400 hover:text-white text-sm transition-colors"
                 onClick={() => window.open("/wireframes", "_blank")}
               >
                 WhatsApp Alerts
               </button>
               <button
                 className="block text-slate-400 hover:text-white text-sm transition-colors"
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
                className="block text-slate-400 hover:text-white text-sm transition-colors"
                onClick={() => (window.location.href = "/terms")}
              >
                Terms of Use
              </button>
              <button
                className="block text-slate-400 hover:text-white text-sm transition-colors"
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
              <p className="text-slate-400 text-sm">support@pinchpay.com</p>
              <p className="text-slate-400 text-sm">1-555-PINCHPAY</p>
              <button
                className="block text-slate-400 hover:text-white text-sm transition-colors"
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
              >
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-slate-400 pt-8 border-t border-slate-600">
          <p>&copy; 2024 PinchPay. All rights reserved. | FDIC Insured | SOC 2 Compliant | Serving Social Security Recipients Nationwide</p>
        </div>
      </footer>
    </div>
  )
}

