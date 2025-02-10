"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Users, Video } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_LMS_API_URL || "http://localhost:8001"

interface CourseData {
  code: string
  name: string
  instructor: string
  progress: number
  nextAssignment?: {
    title: string
    dueDate: string
  }
  nextLecture?: {
    title: string
    date: string
  }
}

export default function LMSDashboardPage() {
  const [courses, setCourses] = useState<CourseData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/lms/courses`, {
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/lms/login")
          return
        }
        throw new Error("Failed to fetch courses")
      }

      const data = await response.json()
      setCourses(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load courses. Please try again.",
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
          <h1 className="text-4xl font-bold">LMS Dashboard</h1>
          <p className="text-muted-foreground">Access your course materials and activities</p>
        </div>
        <Button variant="outline" onClick={fetchCourses}>
          Refresh Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>Course Code: {course.code}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span>Instructor</span>
                </div>
                <span className="font-medium">{course.instructor}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-primary" />
                  <span>Progress</span>
                </div>
                <span className="font-medium">{course.progress}%</span>
              </div>
              {course.nextAssignment && (
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium">Next Assignment</p>
                    <p className="text-sm text-muted-foreground">
                      {course.nextAssignment.title} - Due {course.nextAssignment.dueDate}
                    </p>
                  </div>
                </div>
              )}
              {course.nextLecture && (
                <div className="flex items-start space-x-2">
                  <Video className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium">Next Lecture</p>
                    <p className="text-sm text-muted-foreground">
                      {course.nextLecture.title} - {course.nextLecture.date}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

