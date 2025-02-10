import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-xl font-bold">
        CampusConnect
      </Link>
      <Button variant="ghost" asChild>
        <Link href="/courses">Courses</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/lms">LMS</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/portal">Student Portal</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/notifications">Notifications</Link>
      </Button>
      <ModeToggle />
    </div>
  )
}

