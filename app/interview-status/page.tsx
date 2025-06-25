"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { MessageCircle, Clock, CheckCircle, AlertTriangle, Smartphone } from "lucide-react"

export default function InterviewStatusPage() {
  const [interviewStatus, setInterviewStatus] = useState<"waiting" | "in_progress" | "completed" | "timeout">("waiting")
  const [progress, setProgress] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    // Simulate interview progress tracking
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)

      // Simulate different stages
      if (timeElapsed < 30) {
        setInterviewStatus("waiting")
        setProgress(10)
      } else if (timeElapsed < 300) {
        // 5 minutes
        setInterviewStatus("in_progress")
        setProgress(Math.min(90, 10 + (timeElapsed - 30) * 2))
      } else if (timeElapsed < 600) {
        // 10 minutes
        setInterviewStatus("completed")
        setProgress(100)
      } else {
        setInterviewStatus("timeout")
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeElapsed])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleRetryWhatsApp = () => {
    window.location.href = "/whatsapp-redirect"
  }

  const getStatusIcon = () => {
    switch (interviewStatus) {
      case "waiting":
        return <Clock className="w-8 h-8 text-yellow-400 animate-pulse" />
      case "in_progress":
        return <MessageCircle className="w-8 h-8 text-blue-400 animate-bounce" />
      case "completed":
        return <CheckCircle className="w-8 h-8 text-green-400" />
      case "timeout":
        return <AlertTriangle className="w-8 h-8 text-red-400" />
    }
  }

  const getStatusMessage = () => {
    switch (interviewStatus) {
      case "waiting":
        return {
          title: "Waiting for WhatsApp Response",
          description: "Please check WhatsApp and respond to our representative to begin your interview.",
        }
      case "in_progress":
        return {
          title: "Interview in Progress",
          description:
            "Great! You're chatting with our representative. Please continue answering the questions in WhatsApp.",
        }
      case "completed":
        return {
          title: "Interview Completed!",
          description:
            "Thank you! We're processing your responses and will notify you of the approval decision shortly.",
        }
      case "timeout":
        return {
          title: "Interview Timeout",
          description: "We haven't received a response in WhatsApp. Would you like to restart the process?",
        }
    }
  }

  const status = getStatusMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              {getStatusIcon()}
            </div>
            <CardTitle className="text-2xl text-white">{status.title}</CardTitle>
            <CardDescription className="text-gray-300">{status.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Interview Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Time Elapsed */}
            <div className="text-center">
              <p className="text-sm text-gray-400">Time elapsed: {formatTime(timeElapsed)}</p>
            </div>

            {/* Status-specific content */}
            {interviewStatus === "waiting" && (
              <Alert className="bg-yellow-500/10 border-yellow-500/20">
                <Smartphone className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-300">
                  <strong>Action Required:</strong> Please open WhatsApp and look for our message to begin the interview
                  process.
                </AlertDescription>
              </Alert>
            )}

            {interviewStatus === "in_progress" && (
              <Alert className="bg-blue-500/10 border-blue-500/20">
                <MessageCircle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  <strong>Interview Active:</strong> Continue answering questions in WhatsApp. This usually takes 3-5
                  minutes.
                </AlertDescription>
              </Alert>
            )}

            {interviewStatus === "completed" && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  <strong>Success!</strong> Your interview is complete. You'll receive an approval decision within 5
                  minutes.
                </AlertDescription>
              </Alert>
            )}

            {interviewStatus === "timeout" && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  <strong>Timeout:</strong> No response received in WhatsApp. You can restart the interview process.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {(interviewStatus === "waiting" || interviewStatus === "timeout") && (
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleRetryWhatsApp}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {interviewStatus === "timeout" ? "Restart Interview" : "Open WhatsApp Again"}
                </Button>
              )}

              {interviewStatus === "completed" && (
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => (window.location.href = "/approval-status")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Check Approval Status
                </Button>
              )}
            </div>

            {/* Interview Questions Preview */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-medium text-white mb-3">Interview Questions Include:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Monthly income verification</li>
                <li>• Employment history and stability</li>
                <li>• Payment schedule confirmation</li>
                <li>• Basic financial information</li>
                <li>• Address confirmation for card shipping</li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">Need help with the interview process?</p>
              <Button
                variant="link"
                className="text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
                onClick={() => (window.location.href = "tel:+1-555-PINCHPAY")}
              >
                Call Support: (555) PINCHPAY
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
