"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Users, Video } from "lucide-react"
import Link from "next/link"

export default function LMSPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
            <CardDescription>Please log in to access the UMT Learning Management System.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/lms/login">Log in to UMT LMS</Link>
            </Button>
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
      <h1 className="text-4xl font-bold mb-8">Learning Management System</h1>
      {isGuestMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
          <p className="font-bold">Guest Mode</p>
          <p>You are viewing a demo version of the UMT Learning Management System. Some features may be limited.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Materials</CardTitle>
            <CardDescription>Access your learning resources</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full">
              <BookOpen className="mr-2 h-4 w-4" /> Lecture Notes
            </Button>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Assignments
            </Button>
            <Button className="w-full">
              <Video className="mr-2 h-4 w-4" /> Recorded Lectures
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collaboration</CardTitle>
            <CardDescription>Interact with peers and instructors</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full">
              <Users className="mr-2 h-4 w-4" /> Discussion Forums
            </Button>
            <Button className="w-full">
              <Video className="mr-2 h-4 w-4" /> Virtual Classroom
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

