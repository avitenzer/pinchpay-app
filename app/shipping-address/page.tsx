"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Truck, Loader2 } from "lucide-react"

export default function ShippingAddressPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Create user account and wallet
      const response = await fetch("/api/user/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          sessionData: JSON.parse(localStorage.getItem("pinchpay_session") || "{}"),
        }),
      })

      if (response.ok) {
        const userData = await response.json()

        // Store user credentials
        localStorage.setItem("pinchpay_user", JSON.stringify(userData))

        // Redirect to dashboard
        window.location.href = "/dashboard"
      } else {
        throw new Error("Failed to create account")
      }
    } catch (error) {
      console.error("Address submission error:", error)
      alert("Failed to save address. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Shipping Address</CardTitle>
            <CardDescription className="text-gray-300">Where should we send your premium debit card?</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <Alert className="bg-green-500/10 border-green-500/20">
                <Truck className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  <strong>Free shipping!</strong> Your premium debit card will be shipped within 24 hours at no cost.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={address.firstName}
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={address.lastName}
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="street" className="text-white">
                  Street Address
                </Label>
                <Input
                  id="street"
                  placeholder="123 Main Street, Apt 4B"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-white">
                  City
                </Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state" className="text-white">
                    State
                  </Label>
                  <Select value={address.state} onValueChange={(value) => setAddress({ ...address, state: value })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      {/* Add more states as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-white">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    placeholder="12345"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Your Account...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Complete Setup
                  </>
                )}
              </Button>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-medium text-blue-300 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Your custodial wallet will be created</li>
                  <li>• You'll get web dashboard access</li>
                  <li>• Debit card ships within 24 hours</li>
                  <li>• WhatsApp notifications will be set up</li>
                </ul>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
