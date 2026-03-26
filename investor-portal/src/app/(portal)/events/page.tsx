"use client";

import { useState } from "react";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/empty-state";
import { CalendarDays, MapPin, Users, Clock, CalendarPlus } from "lucide-react";
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

function generateICS(event: Event): string {
  const start = new Date(event.date_time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const formatICSDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GenSeed Capital//Investor Portal//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location || ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(event: Event) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

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
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadICS(event)}
                title="Add to calendar"
              >
                <CalendarPlus className="h-4 w-4" />
              </Button>
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
