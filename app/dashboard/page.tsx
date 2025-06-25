"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Settings,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
} from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [walletData, setWalletData] = useState({
    balance: 0,
    availableAdvance: 0,
    nextPayday: "2024-01-15",
    transactions: [],
  })

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem("pinchpay_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load wallet data
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      const response = await fetch("/api/wallet/balance")
      if (response.ok) {
        const data = await response.json()
        setWalletData(data)
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error)
    }
  }

  const handleRequestAdvance = () => {
    // Open WhatsApp to request advance
    const message = encodeURIComponent("Hi! I'd like to request a wage advance. Can you help me with that?")
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank")
  }

  const copyWalletAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress)
      alert("Wallet address copied!")
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PinchPay Dashboard</h1>
                <p className="text-sm text-gray-300">Welcome back, {user.firstName}!</p>
              </div>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Balance Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Wallet Balance</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-400 hover:text-white"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {showBalance ? `$${walletData.balance.toFixed(2)}` : "••••••"}
              </div>
              <p className="text-xs text-gray-400">Available in your custodial wallet</p>
            </CardContent>
          </Card>

          {/* Available Advance */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Available Advance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">${walletData.availableAdvance.toFixed(2)}</div>
              <p className="text-xs text-gray-400">Based on your earned wages</p>
            </CardContent>
          </Card>

          {/* Next Payday */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Next Payday</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Jan 15</div>
              <p className="text-xs text-gray-400">Automatic repayment scheduled</p>
            </CardContent>
          </Card>

          {/* Wallet Info */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Your Custodial Wallet</CardTitle>
              <CardDescription className="text-gray-300">
                Your secure wallet for receiving and managing wage advances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400">Wallet Address</p>
                  <p className="text-white font-mono text-sm">
                    {user.walletAddress ? `${user.walletAddress.slice(0, 20)}...` : "Generating..."}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyWalletAddress}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400">Wallet Type</p>
                  <p className="text-white">Custodial (Managed by PinchPay)</p>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                  Secure
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleRequestAdvance}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Request Advance
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open("/card-status", "_blank")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Track Debit Card
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <div className="mt-8 space-y-4">
          <Alert className="bg-blue-500/10 border-blue-500/20">
            <MessageCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              <strong>WhatsApp Notifications Active:</strong> You'll receive balance alerts and can request advances
              directly through WhatsApp.
            </AlertDescription>
          </Alert>

          <Alert className="bg-green-500/10 border-green-500/20">
            <CreditCard className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">
              <strong>Debit Card Shipping:</strong> Your premium debit card has been shipped and should arrive within
              2-3 business days.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  )
}
