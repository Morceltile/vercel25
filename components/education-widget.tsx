"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"
import { CollapsibleSection } from "./collapsible-section"
import Link from "next/link"

interface Education {
  id: string
  startDate: string
  endDate: string
  degree: string
  university: string
  universityUrl?: string
  city: string
  country: string
}

// Map of countries to their flag emojis
const countryFlags: Record<string, string> = {
  USA: "🇺🇸",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Japan: "🇯🇵",
  China: "🇨🇳",
  India: "🇮🇳",
  Brazil: "🇧🇷",
  Mexico: "🇲🇽",
  Netherlands: "🇳🇱",
  Switzerland: "🇨🇭",
  Sweden: "🇸🇪",
  Norway: "🇳🇴",
  Denmark: "🇩🇰",
  Finland: "🇫🇮",
  Ireland: "🇮🇪",
  Portugal: "🇵🇹",
  Greece: "🇬🇷",
  Russia: "🇷🇺",
  "South Korea": "🇰🇷",
  Singapore: "🇸🇬",
  // Add more countries as needed
}

export function EducationWidget() {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      startDate: "09/2021",
      endDate: "09/2022",
      degree: "Master of Business Administration",
      university: "EGADE Business School",
      universityUrl: "https://egade.tec.mx/en",
      city: "Mexico City",
      country: "Mexico",
    },
    {
      id: "2",
      startDate: "08/2012",
      endDate: "06/2015",
      degree: "Bachelor of Business Administration",
      university: "ICN Business School",
      universityUrl: "https://www.icn-artem.com/en/",
      city: "Nancy",
      country: "France",
    },
  ])

  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    startDate: "",
    endDate: "",
    degree: "",
    university: "",
    universityUrl: "",
    city: "",
    country: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEducation((prev) => ({ ...prev, [name]: value }))
  }

  const addEducation = () => {
    // Simple validation
    if (!newEducation.startDate || !newEducation.degree || !newEducation.university) {
      return
    }

    const newEdu = {
      id: Date.now().toString(),
      ...newEducation,
    }

    setEducations((prev) => [...prev, newEdu])
    setNewEducation({
      startDate: "",
      endDate: "",
      degree: "",
      university: "",
      universityUrl: "",
      city: "",
      country: "",
    })
  }

  const removeEducation = (id: string) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id))
  }

  // Function to get flag for a country
  const getCountryFlag = (country: string) => {
    return countryFlags[country] || "🏳️"
  }

  return (
    <CollapsibleSection title="Education" emoji="🎓">
      <div className="space-y-6">
        {/* Existing Education */}
        {educations.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-lg relative group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Remove education</span>
            </Button>

            <h3 className="font-medium">
              {edu.startDate} - {edu.endDate} [{edu.degree}]{" "}
              {edu.universityUrl ? (
                <Link
                  href={edu.universityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {edu.university}
                </Link>
              ) : (
                edu.university
              )}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {edu.city}, {edu.country} {getCountryFlag(edu.country)}
            </p>
          </div>
        ))}

        {/* Add New Education Form */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Add New Education</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                value={newEducation.startDate}
                onChange={handleInputChange}
                placeholder="e.g., Sep 2016"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                value={newEducation.endDate}
                onChange={handleInputChange}
                placeholder="e.g., May 2020"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                placeholder="e.g., Master of Business Administration"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                name="university"
                value={newEducation.university}
                onChange={handleInputChange}
                placeholder="e.g., Harvard Business School"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="universityUrl">University URL</Label>
              <Input
                id="universityUrl"
                name="universityUrl"
                value={newEducation.universityUrl}
                onChange={handleInputChange}
                placeholder="e.g., https://www.harvard.edu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={newEducation.city}
                onChange={handleInputChange}
                placeholder="e.g., Boston"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={newEducation.country}
                onChange={handleInputChange}
                placeholder="e.g., USA"
              />
            </div>
          </div>

          <Button onClick={addEducation} className="w-full sm:w-auto mt-2">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  )
}
