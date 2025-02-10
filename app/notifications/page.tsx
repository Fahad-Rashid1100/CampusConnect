import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, FileText, Users } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    { icon: Calendar, title: "Upcoming Exam", description: "Data Structures exam on Friday at 2 PM" },
    { icon: FileText, title: "Assignment Due", description: "Web Development project due in 2 days" },
    { icon: Users, title: "Study Group", description: "New study group formed for Algorithms class" },
    { icon: Bell, title: "Campus Alert", description: "Library hours extended for finals week" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notifications.map((notification, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <notification.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{notification.title}</CardTitle>
                <CardDescription>{notification.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

