"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Battery, Signal, DollarSign, TrendingUp, Clock } from "lucide-react"

export function PhoneMockup() {
  const [balance, setBalance] = useState(1247.83)
  const [availableAdvance, setAvailableAdvance] = useState(450.0)

  useEffect(() => {
    // Animate balance counter
    const balanceInterval = setInterval(() => {
      setBalance((prev) => {
        const increment = Math.random() * 2 + 0.5 // Random increment between 0.5 and 2.5
        const newBalance = prev + increment
        return Math.min(newBalance, 2500) // Cap at $2500
      })
    }, 2000)

    // Animate available advance
    const advanceInterval = setInterval(() => {
      setAvailableAdvance((prev) => {
        const increment = Math.random() * 5 + 1 // Random increment between 1 and 6
        const newAdvance = prev + increment
        return Math.min(newAdvance, 800) // Cap at $800
      })
    }, 3000)

    return () => {
      clearInterval(balanceInterval)
      clearInterval(advanceInterval)
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="relative animate-float">
      {/* Phone Frame */}
      <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] overflow-hidden relative">
          {/* Screen Content */}
          <div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
              <span className="font-medium">{getCurrentTime()}</span>
              <div className="flex items-center space-x-1">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* App Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">PinchPay</h1>
                  <p className="text-gray-300 text-sm">Your Wallet</p>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="px-6 py-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-2">Current Balance</p>
                  <div className="text-4xl font-bold text-white mb-4 animate-pulse-slow">{formatCurrency(balance)}</div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +${(balance - 1247.83).toFixed(2)} today
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Available Advance */}
            <div className="px-6">
              <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Available Advance</p>
                    <div className="text-2xl font-bold text-white animate-count-up">
                      {formatCurrency(availableAdvance)}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-300" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-6 space-y-3">
              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Next Payday</p>
                    <p className="text-gray-400 text-xs">January 15, 2024</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                  5 days
                </Badge>
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center animate-pulse">
                    <TrendingUp className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Earning Rate</p>
                    <p className="text-gray-400 text-xs">$18.50/hour</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500/30 text-green-300">
                  Active
                </Badge>
              </div>
            </div>

            {/* Floating Money Animation */}
            <div className="absolute bottom-20 right-6 animate-bounce">
              <div className="text-2xl">💸</div>
            </div>
            <div className="absolute bottom-32 left-8 animate-bounce delay-500">
              <div className="text-xl">💰</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements Around Phone */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400/20 rounded-full animate-ping"></div>
      <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400/20 rounded-full animate-ping delay-1000"></div>
      <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400/20 rounded-full animate-pulse"></div>
    </div>
  )
}
