"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, CheckCircle, User, Calendar, MapPin, Lock, Eye, EyeOff, AlertCircle, Heart } from "lucide-react"
import Link from "next/link"

interface FormData {
  firstName: string
  middleName: string
  lastName: string
  socialSecurityNumber: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  emailAddress: string
}

export default function VerifyBenefitsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    socialSecurityNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    emailAddress: ""
  })
  
  const [showSSN, setShowSSN] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatSSN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    // Format as XXX-XX-XXXX
    if (digits.length <= 3) return digits
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value
    
    if (field === 'socialSecurityNumber') {
      formattedValue = formatSSN(value)
    } else if (field === 'phoneNumber') {
      formattedValue = formatPhone(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.socialSecurityNumber.trim()) {
      newErrors.socialSecurityNumber = "Social Security Number is required"
    } else if (formData.socialSecurityNumber.replace(/\D/g, '').length !== 9) {
      newErrors.socialSecurityNumber = "Please enter a valid 9-digit SSN"
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call to verify Social Security benefits
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Here you would send to your backend for SSA verification
      console.log('Social Security verification data:', formData)
      
      // Redirect to confirmation page
      window.location.href = "/confirmation"
      
    } catch (error) {
      console.error('Verification failed:', error)
      setErrors({ submit: 'Verification failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PinchPay</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 ml-2">
              Secure Registration
            </Badge>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sign Up to Access Your 
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block">
              Social Security Benefits Early
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Complete your secure registration to start accessing your Social Security benefits before the 6th of each month.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center text-green-400">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Bank-Level Security</span>
            </div>
            <div className="flex items-center text-blue-400">
              <Lock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center text-purple-400">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">SSA Approved Setup</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Create Your PinchPay Account</CardTitle>
            <CardDescription className="text-gray-300">
              Your secure registration to access Social Security benefits early. All information is encrypted and never shared.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Section */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Robert (optional)"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  placeholder="Smith"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* SSN and DOB */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Social Security Number *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showSSN ? "text" : "password"}
                    value={formData.socialSecurityNumber}
                    onChange={(e) => handleInputChange('socialSecurityNumber', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${errors.socialSecurityNumber ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSSN(!showSSN)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showSSN ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.socialSecurityNumber && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.socialSecurityNumber}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  🔒 Encrypted and used only to set up your benefit access
                </p>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${errors.dateOfBirth ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Street Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${errors.address ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  placeholder="123 Main Street"
                />
              </div>
              {errors.address && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.city ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.state ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                >
                  <option value="" className="bg-gray-800">Select State</option>
                  <option value="AL" className="bg-gray-800">Alabama</option>
                  <option value="AK" className="bg-gray-800">Alaska</option>
                  <option value="AZ" className="bg-gray-800">Arizona</option>
                  <option value="AR" className="bg-gray-800">Arkansas</option>
                  <option value="CA" className="bg-gray-800">California</option>
                  <option value="CO" className="bg-gray-800">Colorado</option>
                  <option value="CT" className="bg-gray-800">Connecticut</option>
                  <option value="DE" className="bg-gray-800">Delaware</option>
                  <option value="FL" className="bg-gray-800">Florida</option>
                  <option value="GA" className="bg-gray-800">Georgia</option>
                  <option value="HI" className="bg-gray-800">Hawaii</option>
                  <option value="ID" className="bg-gray-800">Idaho</option>
                  <option value="IL" className="bg-gray-800">Illinois</option>
                  <option value="IN" className="bg-gray-800">Indiana</option>
                  <option value="IA" className="bg-gray-800">Iowa</option>
                  <option value="KS" className="bg-gray-800">Kansas</option>
                  <option value="KY" className="bg-gray-800">Kentucky</option>
                  <option value="LA" className="bg-gray-800">Louisiana</option>
                  <option value="ME" className="bg-gray-800">Maine</option>
                  <option value="MD" className="bg-gray-800">Maryland</option>
                  <option value="MA" className="bg-gray-800">Massachusetts</option>
                  <option value="MI" className="bg-gray-800">Michigan</option>
                  <option value="MN" className="bg-gray-800">Minnesota</option>
                  <option value="MS" className="bg-gray-800">Mississippi</option>
                  <option value="MO" className="bg-gray-800">Missouri</option>
                  <option value="MT" className="bg-gray-800">Montana</option>
                  <option value="NE" className="bg-gray-800">Nebraska</option>
                  <option value="NV" className="bg-gray-800">Nevada</option>
                  <option value="NH" className="bg-gray-800">New Hampshire</option>
                  <option value="NJ" className="bg-gray-800">New Jersey</option>
                  <option value="NM" className="bg-gray-800">New Mexico</option>
                  <option value="NY" className="bg-gray-800">New York</option>
                  <option value="NC" className="bg-gray-800">North Carolina</option>
                  <option value="ND" className="bg-gray-800">North Dakota</option>
                  <option value="OH" className="bg-gray-800">Ohio</option>
                  <option value="OK" className="bg-gray-800">Oklahoma</option>
                  <option value="OR" className="bg-gray-800">Oregon</option>
                  <option value="PA" className="bg-gray-800">Pennsylvania</option>
                  <option value="RI" className="bg-gray-800">Rhode Island</option>
                  <option value="SC" className="bg-gray-800">South Carolina</option>
                  <option value="SD" className="bg-gray-800">South Dakota</option>
                  <option value="TN" className="bg-gray-800">Tennessee</option>
                  <option value="TX" className="bg-gray-800">Texas</option>
                  <option value="UT" className="bg-gray-800">Utah</option>
                  <option value="VT" className="bg-gray-800">Vermont</option>
                  <option value="VA" className="bg-gray-800">Virginia</option>
                  <option value="WA" className="bg-gray-800">Washington</option>
                  <option value="WV" className="bg-gray-800">West Virginia</option>
                  <option value="WI" className="bg-gray-800">Wisconsin</option>
                  <option value="WY" className="bg-gray-800">Wyoming</option>
                </select>
                {errors.state && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.state}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.zipCode ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  placeholder="10001"
                  maxLength={5}
                />
                {errors.zipCode && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.zipCode}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.phoneNumber ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  placeholder="(555) 123-4567"
                  maxLength={14}
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.emailAddress ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg`}
                  placeholder="john.smith@email.com"
                />
                {errors.emailAddress && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.emailAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-white mb-1">Your Information is Secure</p>
                  <p>
                    We use the same security standards as major banks. Your SSN and personal data are encrypted 
                    and used only to set up your benefit access with the SSA. We never store your SSN 
                    after account setup is complete.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.submit}
                  </p>
                </div>
              )}
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 text-lg font-medium transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating your account & setting up access...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-3" />
                    Create Account & Access Benefits
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-400 text-center mt-3">
                By continuing, you agree to our Terms of Service and Privacy Policy. 
                Account setup typically takes 1-3 minutes.
              </p>
            </div>
          </form>
        </Card>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Common Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
              <h4 className="text-white font-semibold mb-2">Is my SSN safe?</h4>
              <p className="text-gray-300 text-sm">
                Yes. We use bank-level encryption and never store your SSN after account setup. 
                It's only used to establish your benefit access with the SSA.
              </p>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
              <h4 className="text-white font-semibold mb-2">How long does account setup take?</h4>
              <p className="text-gray-300 text-sm">
                Most account setups complete in 1-3 minutes. You'll receive email updates 
                throughout the registration process.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 