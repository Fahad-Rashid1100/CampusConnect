import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Introduction to Computer Science", "Data Structures", "Algorithms", "Web Development"].map(
          (course, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{course}</CardTitle>
                <CardDescription>Course Code: CS{100 + index}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Click to view course details, assignments, and materials.</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  )
}

