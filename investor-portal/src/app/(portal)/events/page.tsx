"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { downloadICS, getGoogleCalendarUrl, getOutlookUrl } from "@/lib/calendar-utils";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/empty-state";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  CalendarPlus,
  ChevronDown,
  Download,
} from "lucide-react";
import type { Event } from "@/lib/types";

const EVENT_TYPE_LABELS: Record<string, string> = {
  lp_call: "LP Call",
  demo: "Demo Day",
  meetup: "Meetup",
  learning: "Learning",
};

const EVENT_TYPE_BADGE: Record<string, string> = {
  lp_call: "bg-blue-100 text-blue-800",
  demo: "bg-purple-100 text-purple-800",
  meetup: "bg-orange-100 text-orange-800",
  learning: "bg-emerald-100 text-emerald-800",
};

const RSVP_OPTIONS = ["Attending", "Maybe", "Not Attending"] as const;

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [events, setEvents] = useState(MOCK_EVENTS);

  const now = new Date();

  const filtered = events.filter(
    (e) => typeFilter === "all" || e.event_type === typeFilter
  );

  const upcoming = filtered.filter((e) => new Date(e.date_time) >= now);
  const past = filtered.filter((e) => new Date(e.date_time) < now);

  function handleRsvp(eventId: string, rsvp: string) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              user_rsvp: e.user_rsvp === rsvp ? undefined : rsvp,
              rsvp_count:
                (e.rsvp_count ?? 0) +
                (e.user_rsvp === rsvp ? -1 : e.user_rsvp ? 0 : 1),
            }
          : e
      )
    );
  }

  function rsvpVariant(
    event: Event,
    option: string
  ): "default" | "outline" | "secondary" {
    if (event.user_rsvp === option.toLowerCase().replace(" ", "_"))
      return "default";
    return "outline";
  }

  function formatEventRsvpKey(option: string): string {
    return option.toLowerCase().replace(" ", "_");
  }

  function EventCard({ event }: { event: Event }) {
    const eventDate = new Date(event.date_time);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-muted text-center shrink-0">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {format(eventDate, "MMM")}
                </span>
                <span className="text-lg font-bold leading-none">
                  {format(eventDate, "dd")}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{event.title}</h3>
                  <Badge className={EVENT_TYPE_BADGE[event.event_type]}>
                    {EVENT_TYPE_LABELS[event.event_type] ?? event.event_type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(eventDate, "EEEE, d MMM yyyy")} at{" "}
                    {format(eventDate, "HH:mm")}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  )}
                  {event.rsvp_count != null && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.rsvp_count} attending
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-shrink-0">
              {RSVP_OPTIONS.map((option) => (
                <Button
                  key={option}
                  variant={rsvpVariant(event, option)}
                  size="sm"
                  onClick={() =>
                    handleRsvp(event.id, formatEventRsvpKey(option))
                  }
                >
                  {option}
                </Button>
              ))}
              <AddToCalendarDropdown event={event} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          LP calls, demo days, and community events
        </p>
      </div>

      <Tabs defaultValue="all" onValueChange={setTypeFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="lp_call">LP Calls</TabsTrigger>
          <TabsTrigger value="demo">Demo Days</TabsTrigger>
          <TabsTrigger value="meetup">Meetups</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        {["all", "lp_call", "demo", "meetup", "learning"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {upcoming.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Upcoming
                  </h2>
                </div>
                <div className="space-y-3">
                  {upcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Past
                  </h2>
                </div>
                <div className="space-y-3 opacity-75">
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {upcoming.length === 0 && past.length === 0 && (
              <EmptyState
                icon={CalendarDays}
                title="No events found"
                description="Check back soon for upcoming events."
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function AddToCalendarDropdown({ event }: { event: Event }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        title="Add to calendar"
      >
        <CalendarPlus className="h-4 w-4" />
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-lg border bg-white shadow-lg z-50 py-1">
          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
            onClick={() => {
              window.open(getGoogleCalendarUrl(event), "_blank");
              setIsOpen(false);
            }}
          >
            <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Google Calendar
          </button>

          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
            onClick={() => {
              window.open(getOutlookUrl(event), "_blank");
              setIsOpen(false);
            }}
          >
            <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              <path d="M12 14h4M12 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Outlook Calendar
          </button>

          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
            onClick={() => {
              downloadICS(event);
              setIsOpen(false);
            }}
          >
            <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              <path d="M8 15l4 4 4-4M12 19V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Apple Calendar (.ics)
          </button>

          <div className="border-t my-1" />

          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
            onClick={() => {
              downloadICS(event);
              setIsOpen(false);
            }}
          >
            <Download className="h-4 w-4 text-muted-foreground" />
            Download .ics File
          </button>
        </div>
      )}
    </div>
  );
}
