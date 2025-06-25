"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { initializePlaid, handlePlaidSuccess, handlePlaidError } from "@/lib/plaid-integration"

export default function ConnectBankPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plaidReady, setPlaidReady] = useState(false)

  useEffect(() => {
    // Initialize Plaid Link
    initializePlaid({
      onSuccess: async (publicToken, metadata) => {
        setIsLoading(true)
        try {
          await handlePlaidSuccess(publicToken, metadata)
          // Redirect to data processing page
          window.location.href = "/processing"
        } catch (err) {
          setError("Failed to connect your bank account. Please try again.")
        } finally {
          setIsLoading(false)
        }
      },
      onError: (error) => {
        handlePlaidError(error)
        setError("Unable to connect to your bank. Please ensure your bank is supported.")
      },
      onReady: () => {
        setPlaidReady(true)
      },
    })
  }, [])

  const startPlaidFlow = () => {
    if (window.plaidLinkHandler) {
      window.plaidLinkHandler.open()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Connect Your Bank</CardTitle>
            <CardDescription className="text-gray-300">
              Securely link your bank account to get started with PinchPay
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Bank-level 256-bit encryption</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Read-only access to your account</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Powered by Plaid - trusted by millions</span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={startPlaidFlow}
              disabled={!plaidReady || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Bank Account"
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              By connecting your bank account, you agree to our Terms of Service and Privacy Policy. We never store your
              banking credentials.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
