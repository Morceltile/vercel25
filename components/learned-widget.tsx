import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LearnedWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What is something new that you have learned recently?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 p-6 rounded-lg">
          <p className="mb-2">
            German word of the day: <span className="font-bold italic text-xl">Verschlimmbessern</span>
          </p>
          <p className="mb-2">Making something worse while trying to make it better.</p>
          <p className="text-sm text-muted-foreground">Verschlimmern = to worsen</p>
          <p className="text-sm text-muted-foreground">verbessern = to improve</p>
        </div>
      </CardContent>
    </Card>
  )
}
