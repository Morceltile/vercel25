"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface WorkExperience {
  id: string
  startDate: string
  endDate: string
  title: string
  company: string
  bulletPoints: string // Changed from string[] to string
}

export function ExperienceWidget() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      startDate: "Jan 2020",
      endDate: "Present",
      title: "Senior Product Manager",
      company: "Tech Innovations Inc.",
      bulletPoints:
        "• Led product strategy and development for enterprise SaaS solutions\n• Managed a team of 12 and increased revenue by 35%\n• Implemented agile methodologies that improved delivery time by 40%",
    },
    {
      id: "2",
      startDate: "Mar 2018",
      endDate: "Dec 2019",
      title: "Product Manager",
      company: "Digital Solutions Corp.",
      bulletPoints:
        "• Oversaw the development and launch of mobile applications\n• Collaborated with cross-functional teams to deliver projects on time and within budget\n• Conducted user research that led to a 25% increase in user satisfaction",
    },
  ])

  const [newExperience, setNewExperience] = useState<Omit<WorkExperience, "id" | "bulletPoints">>({
    startDate: "",
    endDate: "",
    title: "",
    company: "",
  })

  const [newBulletPoints, setNewBulletPoints] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({ ...prev, [name]: value }))
  }

  const addExperience = () => {
    // Simple validation
    if (!newExperience.startDate || !newExperience.title || !newExperience.company) {
      return
    }

    const newExp = {
      id: Date.now().toString(),
      ...newExperience,
      bulletPoints: newBulletPoints,
    }

    setExperiences((prev) => [...prev, newExp])
    setNewExperience({
      startDate: "",
      endDate: "",
      title: "",
      company: "",
    })
    setNewBulletPoints("")
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

              <div className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{exp.bulletPoints}</div>
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
            <div className="space-y-2 col-span-1 sm:col-span-2">
              <Label htmlFor="bulletPoints">Bullet Points</Label>
              <Textarea
                id="bulletPoints"
                value={newBulletPoints}
                onChange={(e) => setNewBulletPoints(e.target.value)}
                placeholder="• Add your bullet points here
• Start each point with a bullet (•)
• Press Enter for a new line"
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">
                Start each line with a bullet point (•) and press Enter for a new line
              </p>
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
