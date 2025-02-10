"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, BookOpen, Clock, DollarSign, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface StudentData {
  name: string
  program: string
  semester: string
  cgpa: string
  balance: string
  due_date: string
  notices: string[]
}

export default function DashboardPage() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard`, {
        credentials: "include", // Important for sending cookies
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/portal") // Redirect to login if unauthorized
          return
        }
        throw new Error("Failed to fetch dashboard data")
      }

      const data = await response.json()
      setStudentData(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {studentData?.name || "Student"}</p>
        </div>
        <Button variant="outline" onClick={fetchDashboardData}>
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Status</CardTitle>
            <CardDescription>Current semester progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                <span>Program</span>
              </div>
              <span className="font-medium">{studentData?.program}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                <span>Semester</span>
              </div>
              <span className="font-medium">{studentData?.semester}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                <span>CGPA</span>
              </div>
              <span className="font-medium">{studentData?.cgpa}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Current balance and dues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-primary" />
                <span>Current Balance</span>
              </div>
              <span className="font-medium">{studentData?.balance}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                <span>Next Due Date</span>
              </div>
              <span className="font-medium">{studentData?.due_date}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Notices</CardTitle>
            <CardDescription>Recent announcements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentData?.notices.map((notice, i) => (
              <div key={i} className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">{notice}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

