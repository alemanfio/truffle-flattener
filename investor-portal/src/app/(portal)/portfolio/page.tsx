"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";

const TABS = ["All", "Longevity", "Space"] as const;
type Tab = (typeof TABS)[number];

export default function PortfolioPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");

  const filteredCompanies = MOCK_COMPANIES.filter((company) => {
    const matchesTab =
      activeTab === "All" ||
      company.sector === activeTab.toLowerCase();
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground">
          Explore the companies in the GenSeed Capital portfolio.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => {
          const performance =
            (((company.current_valuation ?? 0) / (company.entry_valuation ?? 1)) - 1) * 100;
          const initials = company.name
            .split(/(?=[A-Z])/)
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <Card
              key={company.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => router.push(`/portfolio/${company.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
                      company.sector === "longevity"
                        ? "bg-emerald-600"
                        : "bg-indigo-600"
                    )}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{company.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <Badge
                        variant={
                          company.sector === "longevity"
                            ? "longevity"
                            : "space"
                        }
                      >
                        {company.sector === "longevity"
                          ? "Longevity"
                          : "Space"}
                      </Badge>
                      <Badge variant="secondary">{company.stage}</Badge>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {company.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Invested</p>
                    <p className="font-medium">
                      {formatCurrency(company.investment_amount ?? 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valuation</p>
                    <p className="font-medium">
                      {formatCurrency(company.current_valuation ?? 0)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-muted-foreground">
                    Performance
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      performance >= 0 ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {formatPercent(performance)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No companies found matching your criteria.
        </div>
      )}
    </div>
  );
}
