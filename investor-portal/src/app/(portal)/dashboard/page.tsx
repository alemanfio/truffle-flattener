"use client";

import { useAuth } from "@/components/auth-provider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FUND_SUMMARY, MOCK_COMPANIES, MOCK_DISCUSSIONS } from "@/lib/mock-data";
import { formatCurrency, formatPercent, formatDate } from "@/lib/utils";
import {
  TrendingUp,
  Wallet,
  BarChart3,
  Target,
  Rocket,
  Dna,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NAV_DATA = [
  { month: "Jul 24", nav: 5.2 },
  { month: "Sep 24", nav: 5.8 },
  { month: "Nov 24", nav: 6.4 },
  { month: "Jan 25", nav: 7.1 },
  { month: "Mar 25", nav: 7.6 },
  { month: "May 25", nav: 8.05 },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const sortedCompanies = [...MOCK_COMPANIES].sort((a, b) => {
    const perfA = (((a.current_valuation ?? 0) - (a.entry_valuation ?? 0)) / (a.entry_valuation ?? 1)) * 100;
    const perfB = (((b.current_valuation ?? 0) - (b.entry_valuation ?? 0)) / (b.entry_valuation ?? 1)) * 100;
    return perfB - perfA;
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.full_name?.split(" ")[0] ?? "Investor"}
        </h1>
        <p className="text-muted-foreground mt-1">
          New generation capital for frontier technology
        </p>
      </div>

      {/* Investment Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Commitment</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(FUND_SUMMARY.userCommitted)}
            </div>
            <p className="text-xs text-muted-foreground">GenSeed Fund I</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(FUND_SUMMARY.userCurrentValue)}
            </div>
            <Badge className="mt-1 bg-emerald-100 text-emerald-800 border-transparent">
              {formatPercent(19)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fund MOIC</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{FUND_SUMMARY.moic}x</div>
            <p className="text-xs text-muted-foreground">Multiple on invested capital</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fund IRR</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{FUND_SUMMARY.irr}%</div>
            <p className="text-xs text-muted-foreground">Internal rate of return</p>
          </CardContent>
        </Card>
      </div>

      {/* Fund Overview + NAV Chart */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Fund Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Fund</span>
              <span className="font-medium">{formatCurrency(FUND_SUMMARY.totalCommitted)} target</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deployed</span>
              <span className="font-medium">
                {formatCurrency(FUND_SUMMARY.totalDeployed)} ({FUND_SUMMARY.deployedPercent}%)
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Portfolio</span>
              <span className="font-medium">{FUND_SUMMARY.portfolioCount} companies</span>
            </div>

            {/* Deployment Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Deployment Progress</span>
                <span>{FUND_SUMMARY.deployedPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-genseed-blue transition-all"
                  style={{ width: `${FUND_SUMMARY.deployedPercent}%` }}
                />
              </div>
            </div>

            {/* Sector Split */}
            <div className="pt-2">
              <p className="text-sm font-medium mb-3">Sector Split</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Dna className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium">Longevity</p>
                    <Badge variant="longevity" className="mt-1">
                      {FUND_SUMMARY.longevityCount} companies
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Rocket className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium">Space</p>
                    <Badge variant="space" className="mt-1">
                      {FUND_SUMMARY.spaceCount} companies
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg">Fund NAV Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={NAV_DATA}>
                  <defs>
                    <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v}M`}
                  />
                  <Tooltip
                    formatter={(value) => [`€${value}M`, "NAV"]}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="nav"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#navGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance + Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Portfolio Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedCompanies.map((company) => {
                const perf =
                  (((company.current_valuation ?? 0) - (company.entry_valuation ?? 0)) /
                    (company.entry_valuation ?? 1)) *
                  100;
                return (
                  <div
                    key={company.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-genseed-blue-light text-genseed-blue text-sm font-semibold">
                        {company.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {company.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {company.stage}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          perf >= 0
                            ? "bg-emerald-100 text-emerald-800 border-transparent"
                            : "bg-red-100 text-red-800 border-transparent"
                        }
                      >
                        {formatPercent(perf)}
                      </Badge>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_DISCUSSIONS.map((discussion) => (
                <div
                  key={discussion.id}
                  className="flex flex-col gap-1.5 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">
                      {discussion.title}
                    </p>
                    <Badge
                      variant={
                        discussion.category === "longevity"
                          ? "longevity"
                          : discussion.category === "space"
                            ? "space"
                            : "secondary"
                      }
                      className="shrink-0"
                    >
                      {discussion.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{discussion.author?.full_name ?? "Anonymous"}</span>
                    <span>&middot;</span>
                    <span>{formatDate(discussion.created_at)}</span>
                    <span>&middot;</span>
                    <span>{discussion.comments_count} comments</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
