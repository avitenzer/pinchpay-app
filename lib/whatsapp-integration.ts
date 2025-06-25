export function detectWhatsAppSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false)
      return
    }

    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (!isMobile) {
      resolve(false)
      return
    }

    // For mobile devices, assume WhatsApp is available
    // In production, you might want more sophisticated detection
    resolve(true)
  })
}

export function generateWhatsAppLink(message: string, phoneNumber?: string): string {
  // Your business WhatsApp number (replace with actual number)
  const businessNumber = "1234567890" // Replace with your actual WhatsApp Business number
  const number = phoneNumber || businessNumber
  const encodedMessage = encodeURIComponent(message)

  // Remove any non-digit characters from phone number
  const cleanNumber = number.replace(/\D/g, "")

  // Use different URLs based on device
  const userAgent = navigator.userAgent
  const isAndroid = /Android/i.test(userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)

  if (isAndroid) {
    return `intent://send?phone=${cleanNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`
  } else if (isIOS) {
    return `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`
  } else {
    // Fallback to web WhatsApp
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
  }
}

export function openWhatsApp(message: string, phoneNumber?: string): Promise<boolean> {
  return new Promise((resolve) => {
    const whatsappUrl = generateWhatsAppLink(message, phoneNumber)

    try {
      // Try to open WhatsApp
      window.location.href = whatsappUrl

      // Also try opening in a new window as fallback
      const newWindow = window.open(whatsappUrl, "_blank")

      // If new window was blocked, the main redirect should work
      if (!newWindow) {
        console.log("Popup blocked, using main window redirect")
      }

      resolve(true)
    } catch (error) {
      console.error("Failed to open WhatsApp:", error)
      resolve(false)
    }
  })
}

export async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  // This would integrate with WhatsApp Business API
  try {
    const response = await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message,
        timestamp: Date.now(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send WhatsApp message")
    }

    return await response.json()
  } catch (error) {
    console.error("WhatsApp message error:", error)
    throw error
  }
}

export async function createWhatsAppChatbot(phoneNumber: string) {
  try {
    const response = await fetch("/api/whatsapp/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        sessionType: "interview",
        timestamp: Date.now(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create WhatsApp session")
    }

    return await response.json()
  } catch (error) {
    console.error("WhatsApp session creation error:", error)
    throw error
  }
}
