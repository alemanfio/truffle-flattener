"use client";

import React, { useState } from "react";
import { AuthProvider } from "@/components/auth-provider";
import { Sidebar, SidebarContext } from "@/components/sidebar";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AuthProvider>
      <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
        <div className="min-h-screen bg-gray-50/50">
          <Sidebar />
          <div
            className={cn(
              "transition-all duration-300",
              "ml-0 lg:ml-64",
              isCollapsed && "lg:ml-20"
            )}
          >
            <Header />
            <main className="p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </SidebarContext.Provider>
    </AuthProvider>
  );
}
