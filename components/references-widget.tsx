"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"

interface Reference {
  id: string
  firstName: string
  lastName: string
  mobile: string
  email: string
}

export function ReferencesWidget() {
  const [references, setReferences] = useState<Reference[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      mobile: "+1 (555) 123-4567",
      email: "john.smith@example.com",
    },
  ])

  const [newReference, setNewReference] = useState<Omit<Reference, "id">>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewReference((prev) => ({ ...prev, [name]: value }))
  }

  const addReference = () => {
    // Simple validation
    if (!newReference.firstName || !newReference.lastName || !newReference.email) {
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
      mobile: "",
      email: "",
    })
  }

  const removeReference = (id: string) => {
    setReferences((prev) => prev.filter((ref) => ref.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>References</CardTitle>
        <CardDescription>You can ask my former bosses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Existing References */}
          {references.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">My References</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {references.map((reference) => (
                  <div key={reference.id} className="p-4 border rounded-lg relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeReference(reference.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove reference</span>
                    </Button>
                    <div className="font-medium">
                      {reference.firstName} {reference.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>{reference.mobile}</div>
                      <div>{reference.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Reference Form */}
          <div className="space-y-4">
            <h3 className="font-medium">Add New Reference</h3>
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
      </CardContent>
    </Card>
  )
}
