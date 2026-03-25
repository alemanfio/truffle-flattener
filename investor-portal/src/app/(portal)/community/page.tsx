"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_DISCUSSIONS } from "@/lib/mock-data";
import { Discussion } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Plus } from "lucide-react";

type Category = "all" | "company" | "longevity" | "space" | "general";

const CATEGORY_TABS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Company", value: "company" },
  { label: "Longevity", value: "longevity" },
  { label: "Space", value: "space" },
  { label: "General", value: "general" },
];

function categoryBadgeVariant(category: Discussion["category"]) {
  switch (category) {
    case "longevity":
      return "longevity" as const;
    case "space":
      return "space" as const;
    case "company":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export default function CommunityPage() {
  const [category, setCategory] = useState<Category>("all");
  const [showForm, setShowForm] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>(MOCK_DISCUSSIONS);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<Discussion["category"]>("general");

  const filtered =
    category === "all"
      ? discussions
      : discussions.filter((d) => d.category === category);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const discussion: Discussion = {
      id: `d${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      author_id: "u1",
      category: newCategory,
      company_id: null,
      upvotes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        id: "u1",
        full_name: "Alex Reinhardt",
        location: "Luxembourg City",
        bio: null,
        linkedin_url: null,
        is_profile_public: true,
        open_to_help_with: null,
        investment_committed: null,
        created_at: "",
        updated_at: "",
      },
    };

    setDiscussions([discussion, ...discussions]);
    setNewTitle("");
    setNewContent("");
    setNewCategory("general");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Discuss portfolio companies, market trends, and connect with fellow LPs.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Start a New Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Discussion title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Textarea
                placeholder="What would you like to discuss?"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
              />
              <div className="flex items-center gap-4">
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as Discussion["category"])
                  }
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="general">General</option>
                  <option value="company">Company</option>
                  <option value="longevity">Longevity</option>
                  <option value="space">Space</option>
                </select>
                <Button type="submit">Post Discussion</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        {CATEGORY_TABS.map((tab) => (
          <Button
            key={tab.value}
            variant={category === tab.value ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((discussion) => (
          <Link key={discussion.id} href={`/community/${discussion.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar
                    name={discussion.author?.full_name}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">
                        {discussion.title}
                      </h3>
                      <Badge variant={categoryBadgeVariant(discussion.category)}>
                        {discussion.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {discussion.content.length > 150
                        ? `${discussion.content.slice(0, 150)}...`
                        : discussion.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {discussion.author?.full_name ?? "Anonymous"}
                      </span>
                      <span>{formatDate(discussion.created_at)}</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {discussion.upvotes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {discussion.comments_count}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No discussions found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
