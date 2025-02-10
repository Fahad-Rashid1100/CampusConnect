"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"

// If NEXT_PUBLIC_API_URL is not set, it defaults to http://localhost:8000
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function LoginForm() {
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          password,
        }),
        credentials: "include", // Important for handling cookies
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Login successful",
          description: "Redirecting to your dashboard...",
        })
        router.push("/portal/dashboard")
      } else {
        throw new Error(data.detail || "Login failed")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to login. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Student ID (e.g., F2022266416)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
        <div className="text-sm text-center space-y-2">
          <a href="#" className="text-primary hover:underline block">
            Create New Account
          </a>
          <a href="#" className="text-primary hover:underline block">
            Forgot Password?
          </a>
          <a href="#" className="text-primary hover:underline block">
            Click Here For alumni Access
          </a>
        </div>
      </form>
    </Card>
  )
}

