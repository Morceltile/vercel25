"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { CollapsibleSection } from "./collapsible-section"

interface DogPhoto {
  id: string
  url: string
  name: string
  startYear: string
  endYear: string
}

export function DogsWidget() {
  const [photos, setPhotos] = useState<DogPhoto[]>([
    {
      id: "1",
      url: "/images/atax-airdale.jpeg",
      name: "Atax | Airdale",
      startYear: "2000",
      endYear: "2013",
    },
    {
      id: "2",
      url: "/images/jonny-doberman.jpeg",
      name: "Jonny | Doberman",
      startYear: "2014",
      endYear: "2023",
    },
  ])

  const [newDogYears, setNewDogYears] = useState({
    startYear: "",
    endYear: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]

      // Check if file is a jpg
      if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
        alert("Please upload a JPG file")
        return
      }

      // Create a URL for the file
      const url = URL.createObjectURL(file)

      // Get the file name without extension
      const fullName = file.name.split(".")[0]

      const newPhoto: DogPhoto = {
        id: Date.now().toString(),
        url,
        name: fullName,
        startYear: newDogYears.startYear || "Unknown",
        endYear: newDogYears.endYear || "Present",
      }

      setPhotos((prev) => [...prev, newPhoto])

      // Reset the inputs
      event.target.value = ""
      setNewDogYears({
        startYear: "",
        endYear: "",
      })
    }
  }

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((photo) => photo.id !== id)

      // Revoke the URL to prevent memory leaks
      const photoToRemove = prev.find((photo) => photo.id === id)
      if (photoToRemove && !photoToRemove.url.includes("/images/")) {
        URL.revokeObjectURL(photoToRemove.url)
      }

      return filtered
    })
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDogYears((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <CollapsibleSection title="Friends on Four Paws" emoji="🐾">
      <div className="space-y-6">
        {/* Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <Image
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(photo.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center font-medium">
                {photo.name} [{photo.startYear} - {photo.endYear}]
              </p>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="startYear">Start Year</Label>
              <Input
                id="startYear"
                name="startYear"
                value={newDogYears.startYear}
                onChange={handleYearChange}
                placeholder="e.g., 2015"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endYear">End Year</Label>
              <Input
                id="endYear"
                name="endYear"
                value={newDogYears.endYear}
                onChange={handleYearChange}
                placeholder="e.g., Present"
              />
            </div>
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Label htmlFor="dog-photo" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Click to upload a photo</p>
                <p className="text-xs text-muted-foreground">JPG files only</p>
              </div>
              <input id="dog-photo" type="file" accept=".jpg,.jpeg" className="hidden" onChange={handleFileUpload} />
            </Label>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
