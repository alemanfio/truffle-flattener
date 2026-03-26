"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MessageSquare,
  Users,
  Building2,
  Calendar,
  Search,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  MOCK_COMPANIES,
  MOCK_DISCUSSIONS,
  MOCK_LPS,
  MOCK_JOBS,
  MOCK_EVENTS,
} from "@/lib/mock-data";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: string;
  icon: React.ElementType;
}

const categories = ["Companies", "Discussions", "LPs", "Jobs", "Events"];

function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // Companies
  MOCK_COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.description || "").toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q)
  )
    .slice(0, 3)
    .forEach((c) =>
      results.push({
        id: c.id,
        title: c.name,
        subtitle: `${c.stage} - ${c.sector}`,
        href: `/portfolio/${c.id}`,
        category: "Companies",
        icon: Briefcase,
      })
    );

  // Discussions
  MOCK_DISCUSSIONS.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q)
  )
    .slice(0, 3)
    .forEach((d) =>
      results.push({
        id: d.id,
        title: d.title,
        subtitle: d.category,
        href: `/community/${d.id}`,
        category: "Discussions",
        icon: MessageSquare,
      })
    );

  // LPs
  MOCK_LPS.filter(
    (lp) =>
      (lp.full_name && lp.full_name.toLowerCase().includes(q)) ||
      (lp.location && lp.location.toLowerCase().includes(q)) ||
      (lp.bio && lp.bio.toLowerCase().includes(q))
  )
    .slice(0, 3)
    .forEach((lp) =>
      results.push({
        id: lp.id,
        title: lp.full_name || "Anonymous LP",
        subtitle: lp.location || "",
        href: `/directory/${lp.id}`,
        category: "LPs",
        icon: Users,
      })
    );

  // Jobs
  MOCK_JOBS.filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      (j.description || "").toLowerCase().includes(q) ||
      (j.company && j.company.name.toLowerCase().includes(q))
  )
    .slice(0, 3)
    .forEach((j) =>
      results.push({
        id: j.id,
        title: j.title,
        subtitle: j.company?.name || j.location || "",
        href: `/jobs/${j.id}`,
        category: "Jobs",
        icon: Building2,
      })
    );

  // Events
  MOCK_EVENTS.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      (e.description || "").toLowerCase().includes(q)
  )
    .slice(0, 3)
    .forEach((e) =>
      results.push({
        id: e.id,
        title: e.title,
        subtitle: e.location || e.event_type,
        href: `/events/${e.id}`,
        category: "Events",
        icon: Calendar,
      })
    );

  return results;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Debounced search
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const r = searchAll(value);
      setResults(r);
      setActiveIndex(0);
    }, 150);
  }, []);

  // Navigate to result
  const selectResult = useCallback(
    (result: SearchResult) => {
      onOpenChange(false);
      router.push(result.href);
    },
    [onOpenChange, router]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        selectResult(results[activeIndex]);
      }
    },
    [results, activeIndex, selectResult]
  );

  // Group results by category
  const grouped = categories
    .map((cat) => ({
      category: cat,
      items: results.filter((r) => r.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  // Compute flat index for each item for keyboard navigation
  let flatIndex = 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl p-0 overflow-hidden"
        onClose={() => onOpenChange(false)}
      >
        <div className="flex items-center gap-2 px-4 border-b">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search companies, discussions, LPs, jobs, events..."
            className="flex-1 py-3 text-sm outline-none bg-transparent"
          />
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}

          {grouped.map((group) => (
            <div key={group.category}>
              <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50">
                {group.category}
              </div>
              {group.items.map((item) => {
                const currentFlatIndex = flatIndex++;
                return (
                  <button
                    key={item.id}
                    onClick={() => selectResult(item)}
                    onMouseEnter={() => setActiveIndex(currentFlatIndex)}
                    className={`flex items-center gap-3 w-full px-4 py-2 text-left text-sm transition-colors ${
                      activeIndex === currentFlatIndex
                        ? "bg-genseed-blue text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item.title}</p>
                      <p
                        className={`truncate text-xs ${
                          activeIndex === currentFlatIndex
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          {!query.trim() && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Start typing to search...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
