"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Sparkles, Lock, Mail } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        router.push("/dashboard/admin")
      } else {
        const data = await res.json()
        setError(data.error || "Login failed")
      }
    } catch (e) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-white relative overflow-hidden">
      {/* Decorative orbs in blue tones */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl"></div>

      {/* LEFT: Branding panel */}
      <section className="hidden lg:flex flex-col justify-center p-14 relative bg-gradient-to-br from-blue-900 via-blue-800/90 to-blue-700/80">
        <div className="relative z-10 max-w-xl space-y-8 text-white">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/15 shadow-lg">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm tracking-wide">Enterprise Admin Access</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-2xl">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold leading-tight">Admin Console</h1>
              <p className="text-white/70">Secure, powerful, and built for speed.</p>
            </div>
          </div>

          <p className="text-white/80 leading-relaxed max-w-lg">
            Welcome to the <span className="font-semibold">Himayyat Admin Portal</span>. Manage data with confidence using
            bank-grade security and a lightning-fast workflow.
          </p>

          {/* Highlights with animations */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "99.99%", desc: "Uptime" },
              { title: "AES-256", desc: "Encryption" },
              { title: "24/7", desc: "Monitoring" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur ring-1 ring-white/10 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                <div className="text-2xl font-bold">{item.title}</div>
                <div className="text-white/70 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT: Form */}
      <section className="flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Gradient border wrapper in blue */}
          <div className="rounded-3xl p-[1px] bg-[conic-gradient(at_top_left,_theme(colors.blue.500),_theme(colors.blue.300),_transparent_60%)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
            <Card className="rounded-3xl border border-blue-100 bg-white backdrop-blur-xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-blue-900 text-2xl">Admin Sign In</CardTitle>
                <CardDescription className="text-blue-600">Use your admin credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-blue-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-blue-50 border-blue-200 text-blue-900 placeholder-blue-400 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm text-blue-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 bg-blue-50 border-blue-200 text-blue-900 placeholder-blue-400 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <Button
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>

                  <p className="text-center text-xs text-blue-500 pt-2">Secure area • Authorized personnel only</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
