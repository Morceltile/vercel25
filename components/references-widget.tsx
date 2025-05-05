"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Linkedin, ExternalLink } from "lucide-react"
import { CollapsibleSection } from "./collapsible-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Reference {
  id: string
  firstName: string
  lastName: string
  title?: string
  mobile?: string
  email: string
  linkedinUrl?: string
  imageUrl?: string
  type: "manager" | "customer"
  year?: string
  company?: string
  successStory?: string
  successStoryUrl?: string
}

export function ReferencesWidget() {
  const [references, setReferences] = useState<Reference[]>([
    {
      id: "1",
      firstName: "Jeff",
      lastName: "Saenger",
      title: "Former VP Customer Success at BoostUp",
      mobile: "+1 (925) 457-4644",
      email: "norcalfan.j@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/jeff-saenger/",
      imageUrl: "/images/jeff-headshot.png",
      type: "manager",
    },
    {
      id: "2",
      firstName: "Lucie",
      lastName: "Maillet",
      title: "Former VP Customer Success at Salesforce",
      mobile: "+41 78 688 56 29",
      email: "luciem24@hotmail.com",
      linkedinUrl: "https://www.linkedin.com/in/luciemaillet/",
      imageUrl: "/images/lucie-headshot.png",
      type: "manager",
    },
    {
      id: "3",
      firstName: "Rajath",
      lastName: "",
      title: "Director, Sales Operations",
      email: "rajath.kn@whatfix.com",
      type: "customer",
      year: "2023",
      company: "Whatfix",
      successStory: "BoostUp Success Story with Whatfix",
      successStoryUrl: "https://www.boostup.ai/whatfix-case-study?",
    },
    {
      id: "4",
      firstName: "Andy",
      lastName: "",
      title: "Director, Business Applications",
      email: "andreas.hoefner@tcs.ch",
      type: "customer",
      year: "2021",
      company: "TCS",
      successStory: "Salesforce Success Story with TCS",
      successStoryUrl: "https://www.salesforce.com/eu/customer-success-stories/touring-club-suisse/?bc=SOC",
    },
  ])

  const [newReference, setNewReference] = useState<Omit<Reference, "id">>({
    firstName: "",
    lastName: "",
    title: "",
    mobile: "",
    email: "",
    linkedinUrl: "",
    imageUrl: "",
    type: "manager",
    year: "",
    company: "",
    successStory: "",
    successStoryUrl: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewReference((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (type: "manager" | "customer") => {
    setNewReference((prev) => ({ ...prev, type }))
  }

  const addReference = () => {
    // Simple validation
    if (!newReference.firstName || !newReference.email) {
      return
    }

    const newRef = {
      id: Date.now().toString(),
      ...newReference,
    }

    setReferences((prev) => [...prev, newRef])
    setNewReference({
      firstName: "",
      lastName: "",
      title: "",
      mobile: "",
      email: "",
      linkedinUrl: "",
      imageUrl: "",
      type: "manager",
      year: "",
      company: "",
      successStory: "",
      successStoryUrl: "",
    })
  }

  const removeReference = (id: string) => {
    setReferences((prev) => prev.filter((ref) => ref.id !== id))
  }

  const managerReferences = references.filter((ref) => ref.type === "manager")
  const customerReferences = references.filter((ref) => ref.type === "customer")

  const ManagerReferenceCard = ({ reference }: { reference: Reference }) => (
    <div key={reference.id} className="p-4 border rounded-lg relative group bg-white bg-opacity-90">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => removeReference(reference.id)}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="sr-only">Remove reference</span>
      </Button>

      <div className="flex gap-4">
        {reference.imageUrl && (
          <div className="relative h-32 w-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={reference.imageUrl || "/placeholder.svg"}
              alt={`${reference.firstName} ${reference.lastName}`}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div>
          <div className="font-medium flex items-center gap-2">
            {reference.linkedinUrl ? (
              <>
                <Link
                  href={reference.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline flex items-center"
                >
                  {reference.firstName} {reference.lastName}
                </Link>
                <Linkedin className="h-4 w-4 text-blue-700" />
              </>
            ) : (
              <>
                {reference.firstName} {reference.lastName}
              </>
            )}
          </div>
          {reference.title && <div className="text-sm">[{reference.title}]</div>}
          <div className="text-sm text-muted-foreground mt-1">
            {reference.mobile && <div>{reference.mobile}</div>}
            <div>{reference.email}</div>
          </div>
        </div>
      </div>
    </div>
  )

  const CustomerReferenceCard = ({ reference }: { reference: Reference }) => (
    <div key={reference.id} className="p-4 border rounded-lg relative group bg-white bg-opacity-90">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => removeReference(reference.id)}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="sr-only">Remove reference</span>
      </Button>

      <div className="space-y-2">
        <h3 className="font-medium">
          {reference.year} - {reference.successStory}
        </h3>

        {reference.successStoryUrl && (
          <div className="flex items-center gap-1">
            <Link
              href={reference.successStoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline text-sm flex items-center gap-1"
            >
              View Success Story
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        )}

        <div className="text-sm">
          <div className="font-medium">
            {reference.firstName} {reference.lastName && reference.lastName}
          </div>
          {reference.title && <div>{reference.title}</div>}
          <div className="text-muted-foreground">{reference.email}</div>
        </div>
      </div>
    </div>
  )

  return (
    <CollapsibleSection title="References" emoji="📞">
      <div className="space-y-6">
        {/* References Description */}
        <p className="text-muted-foreground">
          Feel free to ask my former managers & customers what it's like to work with me.
        </p>

        {/* References Tabs */}
        <Tabs defaultValue="managers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="managers">Former VPs</TabsTrigger>
            <TabsTrigger value="customers">Former Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="managers" className="mt-4">
            {managerReferences.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {managerReferences.map((reference) => (
                  <ManagerReferenceCard key={reference.id} reference={reference} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No manager references added yet.</p>
            )}
          </TabsContent>

          <TabsContent value="customers" className="mt-4">
            {customerReferences.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {customerReferences.map((reference) => (
                  <CustomerReferenceCard key={reference.id} reference={reference} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No customer references added yet.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Add New Reference Form */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Add New Reference</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              variant={newReference.type === "manager" ? "default" : "outline"}
              onClick={() => handleTypeChange("manager")}
              className="w-full"
            >
              Manager Reference
            </Button>
            <Button
              variant={newReference.type === "customer" ? "default" : "outline"}
              onClick={() => handleTypeChange("customer")}
              className="w-full"
            >
              Customer Reference
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={newReference.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={newReference.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newReference.title}
                onChange={handleInputChange}
                placeholder="e.g., Former VP Customer Success at Company"
              />
            </div>

            {newReference.type === "manager" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={newReference.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={newReference.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., https://www.linkedin.com/in/username/"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={newReference.imageUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., /images/headshot.jpg"
                  />
                </div>
              </>
            )}

            {newReference.type === "customer" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={newReference.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2023"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={newReference.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="successStory">Success Story Title</Label>
                  <Input
                    id="successStory"
                    name="successStory"
                    value={newReference.successStory}
                    onChange={handleInputChange}
                    placeholder="e.g., BoostUp Success Story with Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="successStoryUrl">Success Story URL</Label>
                  <Input
                    id="successStoryUrl"
                    name="successStoryUrl"
                    value={newReference.successStoryUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., https://example.com/success-story"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newReference.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
          </div>
          <Button onClick={addReference} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Reference
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  )
}
