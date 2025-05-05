import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Language {
  name: string
  level: string
  percentage: number
  color: string
}

export function LanguageExperienceWidget() {
  const leftLanguages: Language[] = [
    { name: "German", level: "Native", percentage: 100, color: "bg-black" },
    { name: "English", level: "C2", percentage: 95, color: "bg-green-500" },
    { name: "Spanish", level: "C1", percentage: 90, color: "bg-red-500" },
  ]

  const rightLanguages: Language[] = [
    { name: "French", level: "B1", percentage: 40, color: "bg-blue-500" },
    { name: "Next.js", level: "A1", percentage: 15, color: "bg-purple-500" },
  ]

  const LanguageBar = ({ language }: { language: Language }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">
          {language.name} <span className="text-muted-foreground">[{language.level}]</span>
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${language.color}`} style={{ width: `${language.percentage}%` }}></div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {leftLanguages.map((language) => (
              <LanguageBar key={language.name} language={language} />
            ))}
          </div>
          <div>
            {rightLanguages.map((language) => (
              <LanguageBar key={language.name} language={language} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
