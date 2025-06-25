"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Smartphone, Battery, Wifi, Signal } from "lucide-react"

export function WhatsAppWireframes() {
  const [currentAlert, setCurrentAlert] = useState(0)
  const [piggyBankRotation, setPiggyBankRotation] = useState(0)
  const [todaysEarnings, setTodaysEarnings] = useState(127.5)

  useEffect(() => {
    // Animate piggy bank spinning
    const piggyInterval = setInterval(() => {
      setPiggyBankRotation((prev) => (prev + 10) % 360)
    }, 100)

    // Animate earnings counter
    const earningsInterval = setInterval(() => {
      setTodaysEarnings((prev) => {
        const increment = Math.random() * 2 + 0.5
        return Math.min(prev + increment, 200)
      })
    }, 3000)

    return () => {
      clearInterval(piggyInterval)
      clearInterval(earningsInterval)
    }
  }, [])

  const alerts = [
    {
      id: 1,
      type: "daily_earnings",
      title: "Daily Earnings Alert",
      time: "4:32 PM",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2 inline-block" style={{ transform: `rotate(${piggyBankRotation}deg)` }}>
              🐷
            </div>
            <div className="text-lg font-bold text-gray-800">Great work today! 🎉</div>
          </div>

          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-600">Today's earnings</div>
            <div className="text-2xl font-bold text-green-600">${todaysEarnings.toFixed(2)}</div>
          </div>

          <div className="text-center text-gray-700">Do you want to pull or keep today's wages?</div>

          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full">💸 Pull Now</Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full">
              🐷 Keep Saving
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      type: "balance_alert",
      title: "Balance Update",
      time: "2:15 PM",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl mb-2 animate-bounce">💰</div>
            <div className="text-lg font-bold text-gray-800">Balance Update! 📊</div>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Balance</span>
                <span className="font-bold text-blue-600">$1,247.83</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available to Pull</span>
                <span className="font-bold text-green-600">$450.00</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Payday</span>
                <span className="font-bold text-purple-600">Jan 15</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full w-full">
              💳 Request Advance
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      type: "milestone",
      title: "Milestone Achievement",
      time: "11:45 AM",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-pulse">🎯</div>
            <div className="text-lg font-bold text-gray-800">Milestone Reached! 🚀</div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">You've saved</div>
            <div className="text-3xl font-bold text-orange-600 mb-1">$500</div>
            <div className="text-sm text-gray-600">this month! 🎉</div>
          </div>

          <div className="text-center text-gray-700">
            Keep up the great work! Your financial goals are getting closer.
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full">🎉 Celebrate</Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full">
              📊 View Stats
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      type: "advance_approved",
      title: "Advance Approved",
      time: "9:20 AM",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-bounce">✅</div>
            <div className="text-lg font-bold text-gray-800">Advance Approved! 💚</div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-green-600">$200.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee</span>
                <span className="font-bold text-gray-800">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Repayment</span>
                <span className="font-bold text-blue-600">Jan 15</span>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-700">
            Your funds will be available in your wallet within 5 minutes! 🚀
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full w-full">💳 Check Wallet</Button>
        </div>
      ),
    },
    {
      id: 5,
      type: "payday_reminder",
      title: "Payday Reminder",
      time: "8:00 AM",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-pulse">📅</div>
            <div className="text-lg font-bold text-gray-800">Payday Tomorrow! 🎊</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Expected deposit</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">$1,850.00</div>
              <div className="text-xs text-gray-500">After automatic repayments</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="text-yellow-600">⚠️</div>
              <div className="text-sm text-gray-700">Outstanding advance: $200 will be automatically repaid</div>
            </div>
          </div>

          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full w-full">
            📊 View Breakdown
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">WhatsApp Payment Alerts</h2>
        <p className="text-gray-300">Interactive wireframes showing how users receive notifications</p>
      </div>

      {/* Alert Type Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {alerts.map((alert, index) => (
          <Button
            key={alert.id}
            variant={currentAlert === index ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentAlert(index)}
            className={
              currentAlert === index
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "border-white/20 text-white hover:bg-white/10"
            }
          >
            {alert.title}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Phone Mockup */}
        <div className="flex justify-center">
          <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
              {/* Phone Status Bar */}
              <div className="bg-gray-50 px-4 py-2 flex justify-between items-center text-xs">
                <span className="font-medium">9:41 AM</span>
                <div className="flex items-center space-x-1">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3 h-3" />
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-green-500 px-4 py-3 flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">PinchPay</div>
                  <div className="text-green-100 text-xs">Online</div>
                </div>
                <Badge className="bg-green-600 text-white text-xs">Business</Badge>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 bg-gray-50 p-4 space-y-4 overflow-y-auto" style={{ height: "calc(100% - 120px)" }}>
                {/* Previous message */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-lg px-3 py-2 max-w-xs text-sm">
                    Hi! I'd like to check my balance
                  </div>
                </div>

                {/* Current Alert */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg shadow-sm border p-4 max-w-xs">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {alerts[currentAlert].type.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-gray-500">{alerts[currentAlert].time}</span>
                    </div>
                    {alerts[currentAlert].content}
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white border-t px-4 py-2 flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 rounded-full px-3 py-2">
                  <span className="text-gray-500 text-sm">Type a message...</span>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Details */}
        <div className="space-y-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>{alerts[currentAlert].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Key Features:</h4>
                <ul className="space-y-2 text-sm">
                  {currentAlert === 0 && (
                    <>
                      <li>• Animated spinning piggy bank 🐷</li>
                      <li>• Real-time earnings counter</li>
                      <li>• Two-button choice: Pull or Save</li>
                      <li>• Encouraging daily message</li>
                    </>
                  )}
                  {currentAlert === 1 && (
                    <>
                      <li>• Live balance updates</li>
                      <li>• Available advance amount</li>
                      <li>• Next payday countdown</li>
                      <li>• One-tap advance request</li>
                    </>
                  )}
                  {currentAlert === 2 && (
                    <>
                      <li>• Milestone celebration 🎯</li>
                      <li>• Savings progress tracking</li>
                      <li>• Motivational messaging</li>
                      <li>• Achievement badges</li>
                    </>
                  )}
                  {currentAlert === 3 && (
                    <>
                      <li>• Instant approval notification</li>
                      <li>• Clear fee breakdown</li>
                      <li>• Repayment date reminder</li>
                      <li>• Quick wallet access</li>
                    </>
                  )}
                  {currentAlert === 4 && (
                    <>
                      <li>• Payday countdown timer</li>
                      <li>• Expected deposit amount</li>
                      <li>• Automatic repayment preview</li>
                      <li>• Detailed breakdown option</li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">User Experience:</h4>
                <p className="text-sm">
                  {currentAlert === 0 &&
                    "Playful and encouraging with animated elements to make daily earnings feel rewarding and fun."}
                  {currentAlert === 1 &&
                    "Clean, informative layout that gives users all the key information at a glance."}
                  {currentAlert === 2 &&
                    "Celebratory and motivating to encourage continued saving and financial responsibility."}
                  {currentAlert === 3 &&
                    "Clear and reassuring with all the important details about their approved advance."}
                  {currentAlert === 4 && "Helpful preparation for payday with transparency about automatic deductions."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specs */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Technical Implementation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-white">Platform</div>
                  <div>WhatsApp Business API</div>
                </div>
                <div>
                  <div className="font-medium text-white">Message Type</div>
                  <div>Interactive Template</div>
                </div>
                <div>
                  <div className="font-medium text-white">Buttons</div>
                  <div>Quick Reply + URL</div>
                </div>
                <div>
                  <div className="font-medium text-white">Frequency</div>
                  <div>Real-time + Daily</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Alerts Preview */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">All Alert Types</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert, index) => (
            <Card
              key={alert.id}
              className={`bg-white/10 border-white/20 backdrop-blur-sm cursor-pointer transition-all duration-200 ${
                currentAlert === index ? "ring-2 ring-green-400" : "hover:bg-white/20"
              }`}
              onClick={() => setCurrentAlert(index)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {index === 0 && "🐷"}
                    {index === 1 && "💰"}
                    {index === 2 && "🎯"}
                    {index === 3 && "✅"}
                    {index === 4 && "📅"}
                  </div>
                  <div className="font-medium text-white text-sm">{alert.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{alert.time}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
