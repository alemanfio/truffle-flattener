"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

const TABS = ["All", "Longevity", "Space"] as const;
type Tab = (typeof TABS)[number];

type PerformanceFilter = "all" | "winners" | "losers";
type SortOption = "name" | "investment" | "performance" | "date";

function getPerformance(company: (typeof MOCK_COMPANIES)[number]) {
  return (((company.current_valuation ?? 0) / (company.entry_valuation ?? 1)) - 1) * 100;
}

export default function PortfolioPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState<PerformanceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const filteredCompanies = useMemo(() => {
    let companies = MOCK_COMPANIES.filter((company) => {
      const matchesTab =
        activeTab === "All" ||
        company.sector === activeTab.toLowerCase();
      const matchesSearch = company.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const perf = getPerformance(company);
      const matchesPerformance =
        performanceFilter === "all" ||
        (performanceFilter === "winners" && perf > 10) ||
        (performanceFilter === "losers" && perf < 0);

      return matchesTab && matchesSearch && matchesPerformance;
    });

    companies = [...companies].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "investment":
          return (b.investment_amount ?? 0) - (a.investment_amount ?? 0);
        case "performance":
          return getPerformance(b) - getPerformance(a);
        case "date":
          return new Date(b.entry_date ?? "").getTime() - new Date(a.entry_date ?? "").getTime();
        default:
          return 0;
      }
    });

    return companies;
  }, [activeTab, search, performanceFilter, sortBy]);

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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(
            [
              { label: "All", value: "all" },
              { label: "Winners (>10%)", value: "winners" },
              { label: "Losers (<0%)", value: "losers" },
            ] as const
          ).map((option) => (
            <Button
              key={option.value}
              variant={performanceFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPerformanceFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="name">Name</option>
            <option value="investment">Investment Amount</option>
            <option value="performance">Performance</option>
            <option value="date">Entry Date</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => {
          const performance = getPerformance(company);
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
        <EmptyState
          icon={Briefcase}
          title="No companies match your filters"
          description="Try adjusting your search, sector, or performance filters to find companies."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch("");
            setActiveTab("All");
            setPerformanceFilter("all");
          }}
        />
      )}
    </div>
  );
}
