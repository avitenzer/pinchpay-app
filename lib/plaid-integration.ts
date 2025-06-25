export interface PlaidConfig {
  onSuccess: (publicToken: string, metadata: any) => void
  onError: (error: any) => void
  onReady: () => void
}

export function initializePlaid(config: PlaidConfig) {
  // In a real implementation, you would load the Plaid Link script
  // and initialize it with your public key

  if (typeof window !== "undefined") {
    // Simulate Plaid Link initialization
    window.plaidLinkHandler = {
      open: () => {
        // Simulate successful bank connection
        setTimeout(() => {
          const mockPublicToken = "public-sandbox-" + Math.random().toString(36).substr(2, 9)
          const mockMetadata = {
            institution: {
              name: "Chase Bank",
              institution_id: "ins_3",
            },
            accounts: [
              {
                id: "acc_123",
                name: "Checking Account",
                type: "depository",
                subtype: "checking",
              },
            ],
          }
          config.onSuccess(mockPublicToken, mockMetadata)
        }, 2000)
      },
    }

    // Simulate ready state
    setTimeout(() => {
      config.onReady()
    }, 1000)
  }
}

export async function handlePlaidSuccess(publicToken: string, metadata: any) {
  try {
    // Exchange public token for access token
    const response = await fetch("/api/plaid/exchange-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_token: publicToken,
        metadata,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange token")
    }

    const data = await response.json()

    // Store user session and redirect to processing
    localStorage.setItem(
      "pinchpay_session",
      JSON.stringify({
        accessToken: data.access_token,
        itemId: data.item_id,
        institution: metadata.institution,
        timestamp: Date.now(),
      }),
    )

    return data
  } catch (error) {
    console.error("Plaid success handler error:", error)
    throw error
  }
}

export function handlePlaidError(error: any) {
  console.error("Plaid error:", error)

  // Log error for analytics
  if (typeof window !== "undefined") {
    // Send error to analytics service
    fetch("/api/analytics/plaid-error", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: error.error_code,
        message: error.error_message,
        timestamp: Date.now(),
      }),
    }).catch(console.error)
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    plaidLinkHandler?: {
      open: () => void
    }
  }
}
