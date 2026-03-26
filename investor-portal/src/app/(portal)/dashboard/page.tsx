"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FUND_SUMMARY, MOCK_COMPANIES, MOCK_EVENTS } from "@/lib/mock-data";
import { MOCK_ACTIVITIES } from "@/lib/mock-data-activities";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  TrendingUp,
  Wallet,
  BarChart3,
  Target,
  Rocket,
  Dna,
  ArrowUpRight,
  Building2,
  MessageSquare,
  Briefcase,
  Calendar,
  FileText,
  Trophy,
  CalendarDays,
  MapPin,
  Zap,
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

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  new_investment: <Building2 className="h-5 w-5 text-genseed-blue" />,
  company_update: <TrendingUp className="h-5 w-5 text-emerald-600" />,
  discussion_created: <MessageSquare className="h-5 w-5 text-purple-600" />,
  job_posted: <Briefcase className="h-5 w-5 text-orange-600" />,
  event_created: <Calendar className="h-5 w-5 text-blue-600" />,
  document_uploaded: <FileText className="h-5 w-5 text-gray-600" />,
  milestone_achieved: <Trophy className="h-5 w-5 text-yellow-600" />,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [showAllActivities, setShowAllActivities] = useState(false);

  const sortedCompanies = [...MOCK_COMPANIES].sort((a, b) => {
    const perfA = (((a.current_valuation ?? 0) - (a.entry_valuation ?? 0)) / (a.entry_valuation ?? 1)) * 100;
    const perfB = (((b.current_valuation ?? 0) - (b.entry_valuation ?? 0)) / (b.entry_valuation ?? 1)) * 100;
    return perfB - perfA;
  });

  const visibleActivities = showAllActivities
    ? MOCK_ACTIVITIES
    : MOCK_ACTIVITIES.slice(0, 6);

  const upcomingEvents = MOCK_EVENTS.filter(
    (e) => new Date(e.date_time) >= new Date()
  ).slice(0, 3);

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
                    formatter={(value) => [`\u20AC${value}M`, "NAV"]}
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

      {/* Activity Feed + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed - Main Column */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-genseed-blue" />
                    Recent Activity
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stay updated with the latest fund developments
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {visibleActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.link || "#"}
                    className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {ACTIVITY_ICONS[activity.type] || (
                        <Building2 className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {activity.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {formatDistanceToNow(new Date(activity.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {MOCK_ACTIVITIES.length > 6 && (
                <div className="mt-4 pt-4 border-t text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllActivities(!showAllActivities)}
                  >
                    {showAllActivities
                      ? "Show Less"
                      : `View All Activity (${MOCK_ACTIVITIES.length})`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Actions + Upcoming Events + Portfolio */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/portfolio" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Briefcase className="h-4 w-4" />
                  View Portfolio
                </Button>
              </Link>
              <Link href="/documents" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <FileText className="h-4 w-4" />
                  Documents Library
                </Button>
              </Link>
              <Link href="/community" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <MessageSquare className="h-4 w-4" />
                  Join Discussion
                </Button>
              </Link>
              <Link href="/events" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <CalendarDays className="h-4 w-4" />
                  View Events
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const eventDate = new Date(event.date_time);
                    return (
                      <Link
                        key={event.id}
                        href="/events"
                        className="flex gap-3 group"
                      >
                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-muted text-center shrink-0">
                          <span className="text-[10px] font-medium text-muted-foreground uppercase">
                            {eventDate.toLocaleDateString("en", {
                              month: "short",
                            })}
                          </span>
                          <span className="text-sm font-bold leading-none">
                            {eventDate.getDate()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium group-hover:text-genseed-blue transition-colors truncate">
                            {event.title}
                          </p>
                          {event.location && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

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
        </div>
      </div>
    </div>
  );
}
