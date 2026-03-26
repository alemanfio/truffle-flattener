import type { Event } from "./types";

export function generateICS(event: Event): string {
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
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(event: Event) {
  const ics = generateICS(event);
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event: Event): string {
  const start = new Date(event.date_time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description || "",
    location: event.location || "",
    dates: `${formatDate(start)}/${formatDate(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookUrl(event: Event): string {
  const start = new Date(event.date_time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description || "",
    location: event.location || "",
    startdt: start.toISOString(),
    enddt: end.toISOString(),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
