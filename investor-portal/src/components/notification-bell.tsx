"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  MessageSquare,
  ThumbsUp,
  Handshake,
  Briefcase,
  Calendar,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case "upvote":
      return <ThumbsUp className="h-4 w-4 text-green-500" />;
    case "intro":
      return <Handshake className="h-4 w-4 text-purple-500" />;
    case "job":
      return <Briefcase className="h-4 w-4 text-orange-500" />;
    case "event":
      return <Calendar className="h-4 w-4 text-teal-500" />;
    case "document":
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
}

export function NotificationBell() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setIsOpen(false);
    if (notification.link) {
      router.push(notification.link);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border bg-white shadow-lg z-50">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 ${
                    !notification.is_read ? "bg-blue-50/50" : ""
                  }`}
                >
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
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {notification.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {timeAgo(notification.created_at)}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                  )}
                </button>
              ))
            )}
          </div>

          <div className="border-t px-4 py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/notifications");
              }}
              className="w-full text-center text-xs text-blue-600 hover:text-blue-800 py-1"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
