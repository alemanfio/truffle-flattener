"use client";

import React from "react";
import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAuth } from "./auth-provider";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 bg-muted/50 border-0" />
        </div>
      </div>
      <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-genseed-teal" />
      </button>
      <div className="flex items-center gap-3">
        <Avatar name={user?.full_name} size="sm" />
        <div className="hidden sm:block">
          <p className="text-sm font-medium">{user?.full_name || "Investor"}</p>
          <p className="text-xs text-muted-foreground">LP</p>
        </div>
      </div>
    </header>
  );
}
