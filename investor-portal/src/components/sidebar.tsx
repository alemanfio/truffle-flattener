"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  FileText,
  Settings,
  Handshake,
  GraduationCap,
  Calendar,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuth } from "./auth-provider";

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
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white flex flex-col">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-genseed-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">GS</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-genseed-blue">GenSeed</h1>
            <p className="text-[10px] text-muted-foreground -mt-1">Capital</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-genseed-blue-light text-genseed-blue font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={signOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
