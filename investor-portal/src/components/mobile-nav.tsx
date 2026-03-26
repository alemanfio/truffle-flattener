"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  FileText,
  Handshake,
  GraduationCap,
  Calendar,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/directory", label: "LP Directory", icon: Users },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/introductions", label: "Introductions", icon: Handshake },
  { href: "/jobs", label: "Job Board", icon: Building2 },
  { href: "/circles", label: "Learning Circles", icon: GraduationCap },
  { href: "/events", label: "Events", icon: Calendar },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col z-50">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-lg bg-genseed-blue flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GS</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-genseed-blue leading-tight">GenSeed</h1>
                  <p className="text-[10px] text-muted-foreground -mt-1">Capital</p>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-genseed-blue text-white font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="p-2 border-t space-y-1">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar name={user?.full_name} size="sm" />
                <span className="text-sm font-medium truncate">
                  {user?.full_name || "Investor"}
                </span>
              </div>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
