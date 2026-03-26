"use client";

import { useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Handshake,
  Briefcase,
  Calendar,
  FileText,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data-notifications";
import { Notification } from "@/lib/types";

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "comment":
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case "upvote":
      return <ThumbsUp className="h-5 w-5 text-green-500" />;
    case "intro":
      return <Handshake className="h-5 w-5 text-purple-500" />;
    case "job":
      return <Briefcase className="h-5 w-5 text-orange-500" />;
    case "event":
      return <Calendar className="h-5 w-5 text-teal-500" />;
    case "document":
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  function markAllAsRead() {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, is_read: true }))
    );
  }

  function handleNotificationClick(notification: Notification) {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, is_read: true } : n
      )
    );
    if (notification.link) {
      router.push(notification.link);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "You're all caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "unread"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Bell className="h-12 w-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No notifications</p>
            <p className="text-sm mt-1">
              {activeTab === "unread"
                ? "You've read all your notifications"
                : "You don't have any notifications yet"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                !notification.is_read ? "border-blue-200 bg-blue-50/30" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start gap-4 p-4">
                <div className="mt-0.5 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${
                      !notification.is_read ? "font-semibold" : ""
                    }`}
                  >
                    {notification.title}
                  </p>
                  {notification.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {timeAgo(notification.created_at)}
                  </p>
                </div>
                {!notification.is_read && (
                  <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-500" />
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
