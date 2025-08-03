"use client"

import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold">Welfare Platform</span>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Empowering communities across Pakistan through comprehensive welfare programs, financial assistance, and
              sustainable development initiatives.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-800">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-100 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-blue-100 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-blue-100 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-blue-100 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-400" />
                <span className="text-blue-100">+92 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span className="text-blue-100">info@welfareplatform.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-cyan-400 mt-1" />
                <span className="text-blue-100">123 Welfare Street, Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">© 2024 Welfare Platform. All rights reserved.</p>
            <p className="text-blue-100 text-sm">Made with ❤️ for the people of Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
