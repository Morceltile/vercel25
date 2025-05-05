import Link from "next/link"
import { ExperienceWidget } from "@/components/experience-widget"
import { EducationWidget } from "@/components/education-widget"
import { DogsWidget } from "@/components/dogs-widget"
import { ReferencesWidget } from "@/components/references-widget"
import { GuestbookWidget } from "@/components/guestbook-widget"
import { LanguageExperienceWidget } from "@/components/language-experience-widget"
import { LearnedWidget } from "@/components/learned-widget"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Bienvenido to Mo's Vercel Page</h1>
        <p className="text-muted-foreground">
          <span>To quote Linkin Park: </span>
          <span className="italic">"What I've Done"</span>
          <span> see below </span>
          <span>👇🏼</span>
          <span> | </span>
          <Link
            href="https://www.linkedin.com/in/guessuwantsummo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            Find me on LinkedIn
          </Link>
        </p>
      </header>

      <div className="space-y-8">
        <LanguageExperienceWidget />

        <ExperienceWidget />

        <ReferencesWidget />

        <LearnedWidget />

        <EducationWidget />

        <DogsWidget />

        <GuestbookWidget />
      </div>
    </div>
  )
}
