import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>CampusConnect</SheetTitle>
          <SheetDescription>Navigate your campus experience</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Link href="/courses" className="text-sm font-medium">
            Courses
          </Link>
          <Link href="/lms" className="text-sm font-medium">
            LMS
          </Link>
          <Link href="/portal" className="text-sm font-medium">
            Student Portal
          </Link>
          <Link href="/notifications" className="text-sm font-medium">
            Notifications
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

