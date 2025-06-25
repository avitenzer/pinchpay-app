import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, type, data } = await request.json()

    let message = ""

    switch (type) {
      case "balance_alert":
        message = `💰 PinchPay Balance Update
        
Your current balance: $${data.balance}
Available advance: $${data.availableAdvance}

Need an advance? Just reply "advance" to this message!`
        break

      case "advance_approved":
        message = `✅ Advance Approved!

Amount: $${data.amount}
Fee: $${data.fee}
Repayment date: ${data.repaymentDate}

Your funds will be available in your wallet within minutes.`
        break

      case "card_shipped":
        message = `📦 Your Premium PinchPay Card is on the way!

Tracking number: ${data.trackingNumber}
Expected delivery: ${data.expectedDelivery}

You can track your package at: ${data.trackingUrl}`
        break

      default:
        message = data.message || "Hello from PinchPay!"
    }

    // In production, integrate with WhatsApp Business API
    console.log(`Would send WhatsApp to ${phoneNumber}:`, message)

    return NextResponse.json({
      success: true,
      messageId: "msg-" + Math.random().toString(36).substr(2, 9),
      message: "Notification sent successfully",
    })
  } catch (error) {
    console.error("WhatsApp notification error:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
