"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2, CreditCard } from "lucide-react"

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [approvalResult, setApprovalResult] = useState<"pending" | "approved" | "rejected">("pending")

  const steps = [
    { title: "Verifying bank connection", description: "Confirming secure connection to your bank" },
    { title: "Analyzing account data", description: "Reviewing your account history and balance" },
    { title: "Checking eligibility", description: "Verifying income consistency and account standing" },
    { title: "Running approval algorithm", description: "Final approval decision processing" },
    { title: "Setting up your account", description: "Preparing your PinchPay profile" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Simulate approval decision
          setTimeout(() => {
            setApprovalResult("approved") // In real app, this would be based on actual analysis
            setTimeout(() => {
              window.location.href = "/subscription"
            }, 2000)
          }, 1000)
          return 100
        }
        return prev + 3
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setCurrentStep(Math.floor(progress / 20))
  }, [progress])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              {approvalResult === "approved" ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              )}
            </div>
            <CardTitle className="text-2xl text-white">
              {approvalResult === "approved" ? "Account Approved!" : "Reviewing Your Application"}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {approvalResult === "approved"
                ? "Congratulations! Your bank account has been approved for PinchPay."
                : "We're analyzing your bank account data to determine eligibility"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">
                    {index < currentStep || approvalResult === "approved" ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : index === currentStep ? (
                      <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${index <= currentStep || approvalResult === "approved" ? "text-white" : "text-gray-500"}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm ${index <= currentStep || approvalResult === "approved" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {approvalResult === "approved" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-300">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Ready for next step!</span>
                </div>
                <p className="text-sm text-green-200 mt-1">
                  You'll now be redirected to set up your $9.99/month subscription to activate your account.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
