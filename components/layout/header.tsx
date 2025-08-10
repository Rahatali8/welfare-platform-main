
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, ShieldCheck, User, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { ProfileDropdown } from "@/components/profile-dropdown";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesRef.current &&
        !(servicesRef.current as HTMLElement).contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[aria-expanded][aria-expanded='true']")
      ) {
        setServicesOpen(false);
      }
      if (
        dashboardRef.current &&
        !(dashboardRef.current as HTMLElement).contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[aria-expanded][aria-expanded='true']")
      ) {
        setDashboardOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = (type: string) => {
    if (!user) {
      router.push("/signup");
    } else {
      router.push(`/${type}/dashboard`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 rounded-b-2xl bg-white/90 shadow-xl border border-blue-100">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/head-logo.png" alt="Welfare Platform Logo" className="h-16 w-auto drop-shadow-md" />
        </Link>

        {/* Desktop Navigation */}
  <nav className="hidden md:flex items-center gap-10 font-semibold text-lg">
          <Link href="/about" className="text-blue-900 hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-blue-50">About</Link>
          <Link href="/success-stories" className="text-blue-900 hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-blue-50">Success Stories</Link>
          <div className="relative">
            <button
              className="text-blue-900 hover:text-blue-600 transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-blue-50"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
            >
              Services <ChevronDown className="w-4 h-4" />
            </button>
            {servicesOpen && (
              <div ref={servicesRef} className="absolute bg-white shadow-xl rounded-xl mt-2 w-52 z-50 border border-blue-100">
                <Link href="/services" className="block w-full text-left px-5 py-3 text-base text-blue-900 hover:bg-blue-50 rounded-t-xl">Services</Link>
                <Link href="/how-it-works" className="block w-full text-left px-5 py-3 text-base text-blue-900 hover:bg-blue-50 rounded-b-xl">How It Works</Link>
              </div>
            )}
          </div>
          {!user && (
            <Link href="/stats-sec" className="text-blue-900 hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-blue-50">Overview</Link>
          )}

          {user && (
            <>
              <Link href="/apply" className="text-blue-900 hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-blue-50">Apply</Link>
              {/* Dashboard Dropdown */}
              <div className="relative">
                <button
                  className="text-blue-900 hover:text-blue-600 transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-blue-50"
                  onClick={() => setDashboardOpen((prev) => !prev)}
                  aria-expanded={dashboardOpen}
                >
                  Dashboard <ChevronDown className="w-4 h-4" />
                </button>
                {dashboardOpen && (
                  <div ref={dashboardRef} className="absolute bg-white shadow-xl rounded-xl mt-2 w-56 z-50 border border-blue-100">
                    <Link href="/dashboard/user" className="flex items-center gap-2 px-5 py-3 text-base text-blue-900 hover:bg-blue-50 rounded-t-xl">
                      <User className="w-5 h-5 text-blue-500" /> User Dashboard
                    </Link>
                    <button onClick={() => handleDashboardClick("donor")} className="flex items-center gap-2 w-full text-left px-5 py-3 text-base text-blue-900 hover:bg-blue-50">
                      <HeartHandshake className="w-5 h-5 text-green-500" /> Donor Dashboard
                    </button>
                    <Link href="/dashboard/admin-dashboard" className="flex items-center gap-2 px-5 py-3 text-base text-blue-900 hover:bg-blue-50 rounded-b-xl">
                      <ShieldCheck className="w-5 h-5 text-blue-700" /> Admin Dashboard
                    </Link>
                  </div>
                )}
              </div>
              {/* Donor Signup - ✅ Show only when logged in */}
              <Link href="/donor/signup" className="text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-md px-4 py-2 rounded-xl transition-all border border-green-200">Donor Signup</Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
  <div className="hidden md:flex items-center gap-4">
          {user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Button variant="ghost" className="text-blue-900 font-semibold hover:bg-blue-50 px-4 py-2 rounded-lg" onClick={() => {window.location.href='/login';}}>Login</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md" onClick={() => {window.location.href='/signup';}}>Sign Up</Button>
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
            <Link href="/about" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/services" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/success-stories" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Success Stories</Link>
            <Link href="/how-it-works" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
          {!user && (
            <Link href="/stats-sec" className="text-gray-700 hover:text-blue-600 transition-colors">stats</Link>
          )}

            {user && (
              <>
                <Link href="/apply" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Apply</Link>


                <details className="border rounded-md">
                  <summary className="px-4 py-2 text-gray-700 cursor-pointer">Dashboard</summary>
                  <div className="pl-4 pb-2 flex flex-col space-y-1">
                    <Link
                      href="/dashboard/user"
                      className="text-left text-sm text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      User Dashboard
                    </Link>
                    <button
                      onClick={() => { handleDashboardClick("donor"); setIsMenuOpen(false); }}
                      className="text-left text-sm text-gray-700 hover:text-blue-600"
                    >
                      Donor Dashboard
                    </button>
                  </div>
                  {/* ✅ Donor Signup in Mobile view */}
                  <Link href="/donor/signup" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Donor Signup</Link>

                </details>
              </>
            )}

            <div className="border-t pt-4 space-y-2">
              {user ? (
                <Button variant="ghost" onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full justify-start">Logout</Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" onClick={() => {setIsMenuOpen(false); window.location.href='/login';}}>Login</Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {setIsMenuOpen(false); window.location.href='/signup';}}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
