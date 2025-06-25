import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, sessionType } = await request.json()

    // Create interview session for the user
    const session = {
      sessionId: "session-" + Math.random().toString(36).substr(2, 9),
      phoneNumber,
      sessionType,
      status: "active",
      currentStep: "welcome",
      responses: {},
      createdAt: Date.now(),
    }

    // In a real implementation, you would:
    // 1. Store session in database
    // 2. Send welcome message via WhatsApp Business API
    // 3. Set up webhook handlers for responses

    // Simulate sending welcome message
    const welcomeMessage = `🎉 Welcome to PinchPay!

I'm here to help you complete your application. This will only take 3-5 minutes.

Let's start with a few quick questions:

📊 **Question 1 of 12**
What is your gross monthly income? (Please provide the amount in USD, for example: 3500)`

    // In production, send this via WhatsApp Business API
    console.log("Would send WhatsApp message:", welcomeMessage)

    return NextResponse.json({
      ...session,
      message: "Session created and welcome message sent",
      nextStep: "monthly_income",
    })
  } catch (error) {
    console.error("Session creation error:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
