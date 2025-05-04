"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"

interface WorkExperience {
  id: string
  startDate: string
  endDate: string
  title: string
  company: string
  bulletPoints: string[]
}

export function ExperienceWidget() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      startDate: "Jan 2020",
      endDate: "Present",
      title: "Senior Product Manager",
      company: "Tech Innovations Inc.",
      bulletPoints: [
        "Led product strategy and development for enterprise SaaS solutions",
        "Managed a team of 12 and increased revenue by 35%",
        "Implemented agile methodologies that improved delivery time by 40%",
      ],
    },
    {
      id: "2",
      startDate: "Mar 2018",
      endDate: "Dec 2019",
      title: "Product Manager",
      company: "Digital Solutions Corp.",
      bulletPoints: [
        "Oversaw the development and launch of mobile applications",
        "Collaborated with cross-functional teams to deliver projects on time and within budget",
        "Conducted user research that led to a 25% increase in user satisfaction",
      ],
    },
  ])

  const [newExperience, setNewExperience] = useState<Omit<WorkExperience, "id" | "bulletPoints">>({
    startDate: "",
    endDate: "",
    title: "",
    company: "",
  })

  const [newBulletPoint, setNewBulletPoint] = useState("")
  const [tempBulletPoints, setTempBulletPoints] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({ ...prev, [name]: value }))
  }

  const addBulletPoint = () => {
    if (newBulletPoint.trim()) {
      setTempBulletPoints((prev) => [...prev, newBulletPoint])
      setNewBulletPoint("")
    }
  }

  const removeBulletPoint = (index: number) => {
    setTempBulletPoints((prev) => prev.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    // Simple validation
    if (!newExperience.startDate || !newExperience.title || !newExperience.company) {
      return
    }

    const newExp = {
      id: Date.now().toString(),
      ...newExperience,
      bulletPoints: tempBulletPoints,
    }

    setExperiences((prev) => [...prev, newExp])
    setNewExperience({
      startDate: "",
      endDate: "",
      title: "",
      company: "",
    })
    setTempBulletPoints([])
  }

  const removeExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Professional work history and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Existing Work Experience */}
          {experiences.map((exp) => (
            <div key={exp.id} className="p-4 border rounded-lg relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Remove experience</span>
              </Button>

              <h3 className="font-medium">
                {exp.startDate} - {exp.endDate} [{exp.title}] {exp.company}
              </h3>

              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                {exp.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Add New Experience Form */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">Add New Work Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  value={newExperience.startDate}
                  onChange={handleInputChange}
                  placeholder="e.g., Jan 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  value={newExperience.endDate}
                  onChange={handleInputChange}
                  placeholder="e.g., Present"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newExperience.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Product Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={newExperience.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Tech Innovations Inc."
                />
              </div>
            </div>

            {/* Bullet Points Section */}
            <div className="space-y-3">
              <Label>Bullet Points</Label>

              {tempBulletPoints.length > 0 && (
                <ul className="space-y-2">
                  {tempBulletPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="flex-1 p-2 bg-muted rounded-md text-sm">{point}</div>
                      <Button variant="ghost" size="icon" onClick={() => removeBulletPoint(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex gap-2">
                <Input
                  value={newBulletPoint}
                  onChange={(e) => setNewBulletPoint(e.target.value)}
                  placeholder="Add a bullet point"
                  className="flex-1"
                />
                <Button onClick={addBulletPoint} type="button">
                  Add
                </Button>
              </div>
            </div>

            <Button onClick={addExperience} className="w-full sm:w-auto mt-2">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
