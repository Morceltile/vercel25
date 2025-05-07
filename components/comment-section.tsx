"use client"

import { CollapsibleSection } from "./collapsible-section"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CommentSection() {
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (comment.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <CollapsibleSection title="This is where I leave my comment" emoji="💬">
      <div className="space-y-4">
        {!submitted ? (
          <>
            <Textarea
              placeholder="Share your thoughts..."
              className="min-h-[150px] resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Submit Comment</Button>
            </div>
          </>
        ) : (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-green-800 font-medium">Thank you for your comment!</p>
            <p className="mt-2 italic">{comment}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setComment("")
                setSubmitted(false)
              }}
            >
              Leave another comment
            </Button>
          </div>
        )}
      </div>
    </CollapsibleSection>
  )
}
