import { Notification } from "./types";

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", user_id: "u1", type: "comment", title: "New comment on your discussion", description: "Maria Kovacs replied to 'Longevity Market Outlook 2025'", link: "/community/d2", is_read: false, created_at: "2025-03-25T08:30:00Z" },
  { id: "n2", user_id: "u1", type: "upvote", title: "Your post was upvoted", description: "Thomas Fischer upvoted 'Longevity Market Outlook 2025'", link: "/community/d2", is_read: false, created_at: "2025-03-24T16:00:00Z" },
  { id: "n3", user_id: "u1", type: "intro", title: "Introduction request update", description: "Your introduction to NovaSenescence has been facilitated", link: "/introductions", is_read: false, created_at: "2025-03-23T14:00:00Z" },
  { id: "n4", user_id: "u1", type: "job", title: "New job posted", description: "NovaSenescence is hiring a Senior Research Scientist", link: "/jobs", is_read: true, created_at: "2025-03-22T10:00:00Z" },
  { id: "n5", user_id: "u1", type: "event", title: "Event reminder", description: "Q1 2025 LP Call is tomorrow at 17:00 CET", link: "/events", is_read: true, created_at: "2025-03-21T09:00:00Z" },
  { id: "n6", user_id: "u1", type: "document", title: "New document uploaded", description: "Q4 2024 Quarterly Report is now available", link: "/documents", is_read: true, created_at: "2025-03-20T11:00:00Z" },
  { id: "n7", user_id: "u1", type: "comment", title: "New reply to your comment", description: "Dr. Sophia Chen replied to your comment on 'NovaSenescence Phase I Results'", link: "/community/d1", is_read: false, created_at: "2025-03-25T07:15:00Z" },
];
