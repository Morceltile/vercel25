import { ExperienceWidget } from "@/components/experience-widget"
import { EducationWidget } from "@/components/education-widget"
import { DogsWidget } from "@/components/dogs-widget"
import { ReferencesWidget } from "@/components/references-widget"
import { GuestbookWidget } from "@/components/guestbook-widget"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Bienvenido to Mo's Vercel Page</h1>
        <p className="text-muted-foreground">
          <span className="italic">What I've done</span> - LinkinPark
        </p>
      </header>

      <div className="space-y-8">
        <ExperienceWidget />

        <ReferencesWidget />

        <EducationWidget />

        <DogsWidget />

        <GuestbookWidget />
      </div>
    </div>
  )
}
