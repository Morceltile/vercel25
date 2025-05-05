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
      startDate: "11/2022",
      endDate: "02/2025",
      title: "Senior Customer Success Manager",
      company: "BoostUp.ai",
      bulletPoints:
        "• Focused on full customer lifecycle from onboarding, to solution design, implementation and adoption\n• Specialized in US Tech & StartUp sector\n• Ran regular EBRs with Executive Stakeholders (Chief Revenue Officers, Chief Customer Officers, Head of Sales Operations)\n• Served as Voice of Customer to internal BoostUp product team, updating JTBD and prioritzed feature requests\n• Supported contract renewal negotation which was led by BoostUp VP",
    },
    {
      id: "2",
      startDate: "08/2015",
      endDate: "05/2021",
      title: "Customer Success Manager",
      company: "Salesforce.com",
      bulletPoints:
        "• Spent three years at the Irish EMEA HQ in Dublin, serving the entire EMEA and DACH region\n• Went through various customer-facing roles from Success Plan Onboarding to Cloud Specialist\n• Implemented customer process enhancements to drive adoption\n• Strong alignment with regional DACH sales leaders to ensure 90% Success Rate for new customer onboarding\n• Spent three years in the Swiss Francophone region serving the Financial Services industry team\n• Owned full customer lifecycle and contract renewals for USD3M AOV portfolio wich included Swiss Wealth Managers and CPG companies like Richemont & Philipp Morris International",
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
