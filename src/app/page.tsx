import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LandingPageClient } from "@/components/layout/LandingPageClient"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // Strict route segmentation: If a session exists, the landing page is completely inaccessible.
  if (session?.user) {
    if (!session.user.onboardingCompleted) {
      redirect("/onboarding")
    } else {
      redirect("/dashboard")
    }
  }

  // Only unauthenticated users will ever see this payload.
  return <LandingPageClient />
}
