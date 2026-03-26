"use client";

import { useState } from "react";
import { MOCK_CIRCLES } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Plus, BookOpen } from "lucide-react";

export default function CirclesPage() {
  const [circles, setCircles] = useState(MOCK_CIRCLES);

  function toggleMembership(circleId: string) {
    setCircles((prev) =>
      prev.map((c) =>
        c.id === circleId
          ? {
              ...c,
              is_member: !c.is_member,
              member_count: (c.member_count ?? 0) + (c.is_member ? -1 : 1),
            }
          : c
      )
    );
  }

  const topicColor: Record<string, string> = {
    Longevity: "bg-emerald-100 text-emerald-800",
    Space: "bg-indigo-100 text-indigo-800",
    Investing: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Circles</h1>
          <p className="text-muted-foreground">
            Join peer-led groups to learn together
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Circle
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {circles.map((circle) => (
          <Card key={circle.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                </div>
                {circle.topic && (
                  <Badge className={topicColor[circle.topic] ?? "bg-gray-100 text-gray-800"}>
                    {circle.topic}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-2">{circle.name}</CardTitle>
              <CardDescription>{circle.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {circle.member_count}{circle.max_members ? ` / ${circle.max_members}` : ""} members
                </span>
                {circle.schedule && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {circle.schedule}
                  </span>
                )}
              </div>
              <Button
                variant={circle.is_member ? "secondary" : "default"}
                size="sm"
                className="w-full"
                onClick={() => toggleMembership(circle.id)}
              >
                {circle.is_member ? "Joined" : "Join"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
