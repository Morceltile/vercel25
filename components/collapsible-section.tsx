"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollapsibleSectionProps {
  title: string
  emoji: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function CollapsibleSection({ title, emoji, children, defaultExpanded = false }: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className="bg-white bg-opacity-90">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
            <CardTitle>{title}</CardTitle>
          </div>
          <span className="text-xl" aria-hidden="true">
            {emoji}
          </span>
        </div>
      </CardHeader>
      {isExpanded && <CardContent>{children}</CardContent>}
    </Card>
  )
}
