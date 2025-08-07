"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleDashboardClick = (type: string) => {
    if (!user) {
      router.push("/signup")
    } else {
      router.push(`/${type}-dashboard`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/head-logo.png" alt="Welfare Platform Logo" className="h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
          <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</Link>
          <Link href="/success-stories" className="text-gray-700 hover:text-blue-600 transition-colors">Success Stories</Link>
          <Link href="/dashboard-preview" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard Review</Link>

          {user && (
            <>
              <Link href="/apply" className="text-gray-700 hover:text-blue-600 transition-colors">Apply</Link>

              

              {/* Dashboard Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  Dashboard <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 w-48 z-50">
                  <button onClick={() => handleDashboardClick("user")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">User Dashboard</button>
                  <button onClick={() => handleDashboardClick("admin")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Admin Dashboard</button>
                  <button onClick={() => handleDashboardClick("donor")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Donor Dashboard</button>
                </div>
              </div>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Button onClick={logout} variant="outline">Logout</Button>
          ) : (
            <>
              <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700"><Link href="/signup">Sign Up</Link></Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/services" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/how-it-works" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
            <Link href="/success-stories" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Success Stories</Link>

            {user && (
              <>
                <Link href="/apply" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Apply</Link>
                <Link href="/dashboard/preview" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Review</Link>

                <details className="border rounded-md">
                  <summary className="px-4 py-2 text-gray-700 cursor-pointer">Support</summary>
                  <div className="pl-4 pb-2 flex flex-col space-y-1">
                    <Link href="/help" className="text-sm text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Help Center</Link>
                    <Link href="/contact" className="text-sm text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    <Link href="/privacy-policy" className="text-sm text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
                    <Link href="/terms" className="text-sm text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Terms of Service</Link>
                  </div>
                </details>

                <details className="border rounded-md">
                  <summary className="px-4 py-2 text-gray-700 cursor-pointer">Dashboard</summary>
                  <div className="pl-4 pb-2 flex flex-col space-y-1">
                    <button onClick={() => { handleDashboardClick("user"); setIsMenuOpen(false) }} className="text-left text-sm text-gray-700 hover:text-blue-600">User Dashboard</button>
                    <button onClick={() => { handleDashboardClick("admin"); setIsMenuOpen(false) }} className="text-left text-sm text-gray-700 hover:text-blue-600">Admin Dashboard</button>
                    <button onClick={() => { handleDashboardClick("donor"); setIsMenuOpen(false) }} className="text-left text-sm text-gray-700 hover:text-blue-600">Donor Dashboard</button>
                  </div>
                </details>
              </>
            )}

            <div className="border-t pt-4 space-y-2">
              {user ? (
                <Button variant="ghost" onClick={() => { logout(); setIsMenuOpen(false) }} className="w-full justify-start">Logout</Button>
              ) : (
                <>
                  <Button variant="ghost" asChild className="w-full"><Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></Button>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700"><Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
