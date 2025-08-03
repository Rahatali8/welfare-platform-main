"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, User, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleDashboardClick = (dashboardType: string) => {
    // Redirect to signup if not authenticated
    router.push("/signup")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-blue-900">Welfare Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="/success-stories" className="text-gray-700 hover:text-blue-600 transition-colors">
            Success Stories
          </Link>

          {/* Dashboard Links */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDashboardClick("user")}
              className="text-gray-700 hover:text-blue-600"
            >
              <User className="h-4 w-4 mr-1" />
              User
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDashboardClick("admin")}
              className="text-gray-700 hover:text-blue-600"
            >
              <Settings className="h-4 w-4 mr-1" />
              Admin
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDashboardClick("donor")}
              className="text-gray-700 hover:text-blue-600"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Donor
            </Button>
          </div>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/success-stories"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </Link>

            <div className="border-t pt-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleDashboardClick("user")
                  setIsMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <User className="h-4 w-4 mr-2" />
                User Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleDashboardClick("admin")
                  setIsMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleDashboardClick("donor")
                  setIsMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Donor Dashboard
              </Button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Button variant="ghost" asChild className="w-full">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
