import { LoginForm } from "@/components/login-form"

export default function StudentPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4WXQXrt7XmplHu7r2pcjduweleCT4n.png"
            alt="UMT Logo"
            className="mx-auto w-24 h-24 mb-4 dark:invert"
          />
          <h2 className="text-3xl font-bold">Participant Sign in</h2>
          <p className="mt-2 text-sm text-muted-foreground">Access your UMT student portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

