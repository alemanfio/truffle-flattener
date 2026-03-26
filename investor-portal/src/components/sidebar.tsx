"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  FileText,
  Handshake,
  GraduationCap,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Avatar } from "@/components/ui/avatar";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

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

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, [setIsCollapsed]);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-white hidden lg:flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-genseed-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">GS</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-genseed-blue leading-tight">GenSeed</h1>
              <p className="text-[10px] text-muted-foreground -mt-1">Capital</p>
            </div>
          )}
        </Link>
        <button
          onClick={toggleCollapsed}
          className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
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
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isCollapsed && "justify-center px-2",
                isActive
                  ? "bg-genseed-blue text-white font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* User menu */}
      <div className="relative p-2 border-t">
        <button
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm w-full hover:bg-muted transition-colors",
            isCollapsed && "justify-center px-2"
          )}
        >
          <Avatar name={user?.full_name} size="sm" />
          {!isCollapsed && (
            <span className="truncate text-left font-medium">
              {user?.full_name || "Investor"}
            </span>
          )}
        </button>

        {userMenuOpen && (
          <div
            className={cn(
              "absolute bottom-full mb-1 bg-white border rounded-lg shadow-lg py-1 z-50 w-48",
              isCollapsed ? "left-full ml-1" : "left-2 right-2 w-auto"
            )}
          >
            <Link
              href="/settings"
              onClick={() => setUserMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              Account Settings
            </Link>
            <button
              onClick={() => {
                setUserMenuOpen(false);
                signOut();
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
