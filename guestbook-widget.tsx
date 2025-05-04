"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GuestbookEntry {
  id: string
  comment: string
  timestamp: Date
}

export function GuestbookWidget() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: "1",
      comment: "This is an amazing profile page! Love the layout and design.",
      timestamp: new Date(2023, 11, 15, 14, 30),
    },
    {
      id: "2",
      comment: "Great to see your professional journey. Very impressive background!",
      timestamp: new Date(2024, 0, 5, 9, 45),
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [error, setError] = useState("")
  const maxCharacters = 200

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value
    if (comment.length <= maxCharacters) {
      setNewComment(comment)
      setError("")
    } else {
      setError(`Comment must be ${maxCharacters} characters or less`)
    }
  }

  const addComment = () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty")
      return
    }

    if (newComment.length > maxCharacters) {
      setError(`Comment must be ${maxCharacters} characters or less`)
      return
    }

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      comment: newComment,
      timestamp: new Date(),
    }

    setEntries((prev) => [newEntry, ...prev])
    setNewComment("")
    setError("")
  }

  // Format timestamp as MM/DD/YYYY - HH:MMhrs
  const formatTimestamp = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${month}/${day}/${year} - ${hours}:${minutes}hrs`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guestbook</CardTitle>
        <CardDescription>Leave a comment for future visitors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Add Comment Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="comment" className="text-sm font-medium">
                  Your Comment
                </label>
                <span
                  className={`text-xs ${newComment.length > maxCharacters * 0.8 ? "text-amber-500" : "text-muted-foreground"}`}
                >
                  {newComment.length}/{maxCharacters}
                </span>
              </div>
              <Textarea
                id="comment"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Share your thoughts (max 200 characters)"
                className={`resize-none ${newComment.length > maxCharacters ? "border-red-500" : ""}`}
                rows={3}
              />
            </div>

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={addComment} className="w-full sm:w-auto">
              Sign Guestbook
            </Button>
          </div>

          {/* Existing Comments */}
          <div className="space-y-4">
            <h3 className="font-medium">Recent Comments</h3>
            {entries.length > 0 ? (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">{entry.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{formatTimestamp(entry.timestamp)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No comments yet. Be the first to sign the guestbook!</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
