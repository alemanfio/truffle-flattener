"use client";

import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      {/* Logo / Branding */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl text-white font-bold text-xl shadow-lg",
            "bg-[#2E75B6]"
          )}
        >
          GS
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            GenSeed Capital
          </h1>
          <p className="text-sm text-slate-500">Investor Portal</p>
        </div>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md">{children}</div>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} GenSeed Capital. All rights reserved.
      </p>
    </div>
  );
}
