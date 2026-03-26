"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_DISCUSSIONS, MOCK_COMPANIES } from "@/lib/mock-data";
import { Discussion } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/empty-state";
import { ThumbsUp, MessageSquare, Plus, MessagesSquare } from "lucide-react";

type Category = "all" | "company" | "longevity" | "space" | "general";
type SortOption = "recent" | "upvotes" | "comments";

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
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>(MOCK_DISCUSSIONS);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<Discussion["category"]>("general");

  const filtered = useMemo(() => {
    let result =
      category === "all"
        ? discussions
        : discussions.filter((d) => d.category === category);

    if (category === "company" && companyFilter !== "all") {
      result = result.filter((d) => d.company_id === companyFilter);
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "upvotes":
          return b.upvotes_count - a.upvotes_count;
        case "comments":
          return b.comments_count - a.comments_count;
        default:
          return 0;
      }
    });

    return result;
  }, [category, companyFilter, sortBy, discussions]);

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
              <div className="space-y-1">
                <Textarea
                  placeholder="What would you like to discuss?"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value.slice(0, 2000))}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {newContent.length}/2000
                </p>
              </div>
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-wrap">
          {CATEGORY_TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={category === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCategory(tab.value);
                if (tab.value !== "company") setCompanyFilter("all");
              }}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {category === "company" && (
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All Companies</option>
              {MOCK_COMPANIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          <span className="text-sm text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="recent">Recent</option>
            <option value="upvotes">Most Upvoted</option>
            <option value="comments">Most Comments</option>
          </select>
        </div>
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
          <EmptyState
            icon={MessagesSquare}
            title="No discussions found"
            description="There are no discussions in this category yet. Start one!"
            actionLabel="New Discussion"
            onAction={() => setShowForm(true)}
          />
        )}
      </div>
    </div>
  );
}
