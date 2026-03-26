"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { CommandPalette } from "@/components/command-palette";
import { NotificationBell } from "@/components/notification-bell";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth-provider";

export function Header() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
        <MobileNav />

        <div className="flex-1">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 max-w-md w-full rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </button>
        </div>

        <NotificationBell />

        <div className="hidden sm:flex items-center gap-3">
          <Avatar name={user?.full_name} size="sm" />
          <div>
            <p className="text-sm font-medium">{user?.full_name || "Investor"}</p>
            <p className="text-xs text-muted-foreground">LP</p>
          </div>
        </div>
      </header>

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
    </>
  );
}
