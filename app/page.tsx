"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AIChat } from "@/components/ai-chat"
import { Calendar } from "@/components/ui/calendar"
import { Activity, BookOpen, GraduationCap, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [portalLoggedIn, setPortalLoggedIn] = useState(false)
  const [lmsLoggedIn, setLmsLoggedIn] = useState(false)
  const [isGuestMode, setIsGuestMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/check-auth", {
        credentials: "include",
      })
      const data = await response.json()

      if (response.ok && data.loggedIn) {
        setIsLoggedIn(true)
      } else {
        setPortalLoggedIn(data.portalLoggedIn)
        setLmsLoggedIn(data.lmsLoggedIn)
      }
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = () => {
    setIsGuestMode(true)
    setIsLoggedIn(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn && !isGuestMode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to CampusConnect</h1>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please log in to both the UMT Portal and LMS to access CampusConnect features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!portalLoggedIn && (
              <Button className="w-full" asChild>
                <Link href="/portal/login">Log in to UMT Portal</Link>
              </Button>
            )}
            {!lmsLoggedIn && (
              <Button className="w-full" asChild>
                <Link href="/lms/login">Log in to UMT LMS</Link>
              </Button>
            )}
            <Button className="w-full" onClick={handleGuestLogin}>
              Guest Login (Demo)
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to CampusConnect</h1>
      {isGuestMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
          <p className="font-bold">Guest Mode</p>
          <p>You are viewing a demo version of CampusConnect. Some features may be limited.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access key features</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full" asChild>
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" /> My Courses
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/portal">
                <GraduationCap className="mr-2 h-4 w-4" /> Course Registration
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/portal">
                <Activity className="mr-2 h-4 w-4" /> Grades & Progress
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/lms">
                <Users className="mr-2 h-4 w-4" /> Student Community
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Stay on top of your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Get help with any questions</CardDescription>
          </CardHeader>
          <CardContent>
            <AIChat />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

