import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Language {
  name: string
  level: string
}

export function LanguageExperienceWidget() {
  const languages: Language[] = [
    { name: "German", level: "Native" },
    { name: "English", level: "C2" },
    { name: "Spanish", level: "C1" },
    { name: "French", level: "B1" },
    { name: "Next.js", level: "A1" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
          {languages.map((lang, index) => (
            <div key={lang.name} className="flex items-center">
              <span className="font-medium">{lang.name}</span>
              <span className="text-muted-foreground ml-1">[{lang.level}]</span>
              {index < languages.length - 1 && <span className="text-muted-foreground ml-4">|</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
