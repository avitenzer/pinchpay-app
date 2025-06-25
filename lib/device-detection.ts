export interface DeviceInfo {
  isMobile: boolean
  hasWhatsApp: boolean
  browser: string
  userAgent: string
}

export function detectDevice(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      hasWhatsApp: false,
      browser: "unknown",
      userAgent: "",
    }
  }

  const userAgent = navigator.userAgent
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  // Detect browser
  let browser = "unknown"
  if (userAgent.includes("Chrome")) browser = "chrome"
  else if (userAgent.includes("Firefox")) browser = "firefox"
  else if (userAgent.includes("Safari")) browser = "safari"
  else if (userAgent.includes("Edge")) browser = "edge"

  return {
    isMobile,
    hasWhatsApp: hasWhatsAppSupport(),
    browser,
    userAgent,
  }
}

export function hasWhatsAppSupport(): boolean {
  if (typeof window === "undefined") return false

  // Check if mobile device (WhatsApp is primarily mobile)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Additional checks for WhatsApp availability
  const isAndroid = /Android/i.test(navigator.userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  return isMobile && (isAndroid || isIOS)
}

export function validatePhoneNumber(phone: string): boolean {
  // Basic phone number validation
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}
