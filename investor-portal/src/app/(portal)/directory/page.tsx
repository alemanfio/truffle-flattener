"use client";

import { useState, useMemo } from "react";
import { MOCK_LPS, EXPERT_TAGS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Search, MapPin, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredLPs = useMemo(() => {
    return MOCK_LPS.filter((lp, index) => {
      const displayName = lp.is_profile_public && lp.full_name
        ? lp.full_name
        : `LP #${index + 1}`;
      const location = lp.location ?? "";

      const matchesSearch =
        searchQuery === "" ||
        displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tagId) =>
          lp.expert_tags?.some((tag) => tag.id === tagId)
        );

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">LP Directory</h1>
        <p className="text-muted-foreground">
          Connect with fellow limited partners in the GenSeed Capital community.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {EXPERT_TAGS.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedTags.includes(tag.id) && "bg-genseed-blue hover:bg-genseed-blue/80"
              )}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.emoji} {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLPs.map((lp) => {
          const isPublic = lp.is_profile_public && lp.full_name;
          const displayName = isPublic ? lp.full_name : `LP #${MOCK_LPS.indexOf(lp) + 1}`;

          if (!isPublic) {
            return (
              <Card key={lp.id} className="opacity-75">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar name={null} size="md" />
                    <div>
                      <p className="font-medium text-muted-foreground">
                        Anonymous LP
                      </p>
                      {lp.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {lp.location}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card key={lp.id}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name={lp.full_name} size="md" />
                  <div>
                    <p className="font-semibold">{displayName}</p>
                    {lp.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {lp.location}
                      </div>
                    )}
                  </div>
                </div>

                {lp.bio && (
                  <p className="text-sm text-muted-foreground">
                    {lp.bio.length > 100
                      ? `${lp.bio.slice(0, 100)}...`
                      : lp.bio}
                  </p>
                )}

                {lp.expert_tags && lp.expert_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {lp.expert_tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.emoji} {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {lp.open_to_help_with && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Open to help with:</span>{" "}
                    {lp.open_to_help_with}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLPs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No LPs found matching your search criteria.
        </div>
      )}
    </div>
  );
}
