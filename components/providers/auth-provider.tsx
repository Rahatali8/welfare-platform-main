"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface User {
  id: number
  cnic: string
  fullName: string
  address: string
  role: string
  city?: string;
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      setIsLoading(false)
      return
    }

    checkAuth()
  }, [pathname])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/user/profile", { credentials: "include" })
      if (response.ok) {
        const data = await response.json()
        // Map backend user to frontend structure
        setUser({
          id: data.user.id,
          cnic: data.user.cnic,
          fullName: data.user.name, // backend 'name' -> frontend 'fullName'
          address: data.user.address,
          role: data.user.role,
        })
      }
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" }) // hum ye agay banaenge
      setUser(null)
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
