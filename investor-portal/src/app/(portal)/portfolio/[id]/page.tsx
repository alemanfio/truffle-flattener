"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_COMPANIES, MOCK_DISCUSSIONS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatCurrency, formatPercent, formatDate, cn } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Building2,
  Clock,
} from "lucide-react";

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const company = MOCK_COMPANIES.find((c) => c.id === params.id);

  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [introMessage, setIntroMessage] = useState("");
  const [introReason, setIntroReason] = useState("");

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Building2 className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">Company not found</h2>
        <p className="mt-1 text-muted-foreground">
          The company you are looking for does not exist.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const performance =
    (((company.current_valuation ?? 0) / (company.entry_valuation ?? 1)) - 1) * 100;

  const relatedDiscussions = MOCK_DISCUSSIONS.filter(
    (d) => d.company_id === company.id
  );

  const initials = company.name
    .split(/(?=[A-Z])/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hasExistingRequest = ["c1"].includes(company.id);

  function handleIntroSubmit() {
    if (introMessage.trim().length < 50) {
      alert("Please provide a message of at least 50 characters.");
      return;
    }
    alert(`Introduction request submitted for ${company?.name}! We'll review your request and get back to you shortly.`);
    setIntroDialogOpen(false);
    setIntroMessage("");
    setIntroReason("");
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Portfolio
      </Button>

      {/* Company Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white",
            company.sector === "longevity" ? "bg-emerald-600" : "bg-indigo-600"
          )}
        >
          {initials}
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={company.sector === "longevity" ? "longevity" : "space"}
            >
              {company.sector === "longevity" ? "Longevity" : "Space"}
            </Badge>
            <Badge variant="secondary">{company.stage}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {company.location}
            </span>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{company.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Investment Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Investment Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Investment Amount</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(company.investment_amount ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entry Valuation</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(company.entry_valuation ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Valuation</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(company.current_valuation ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entry Date</p>
                <p className="text-lg font-semibold">
                  {formatDate(company.entry_date ?? "")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t pt-4">
              <TrendingUp
                className={cn(
                  "h-5 w-5",
                  performance >= 0 ? "text-emerald-600" : "text-red-600"
                )}
              />
              <span className="text-sm text-muted-foreground">Performance</span>
              <span
                className={cn(
                  "ml-auto text-lg font-bold",
                  performance >= 0 ? "text-emerald-600" : "text-red-600"
                )}
              >
                {formatPercent(performance)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Why We Invested */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why We Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {company.why_invested}
            </p>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <Users className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold">{company.employees}</p>
                <p className="text-xs text-muted-foreground">Employees</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold">{company.founded_year}</p>
                <p className="text-xs text-muted-foreground">Founded</p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-semibold">{company.location}</p>
                <p className="text-xs text-muted-foreground">Location</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connect</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Interested in learning more about {company.name}? Request an
              introduction to the founding team.
            </p>
            {hasExistingRequest ? (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <Clock className="h-3.5 w-3.5" />
                Pending Introduction Request
              </Badge>
            ) : (
              <Button variant="default" onClick={() => setIntroDialogOpen(true)}>
                Request Introduction
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Related Discussions */}
      {relatedDiscussions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Related Discussions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {relatedDiscussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{discussion.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {discussion.content}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {discussion.author?.full_name ?? "Anonymous"}
                    </span>
                    <span>{discussion.upvotes_count} upvotes</span>
                    <span>{discussion.comments_count} comments</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Introduction Request Dialog */}
      <Dialog open={introDialogOpen} onOpenChange={setIntroDialogOpen}>
        <DialogContent onClose={() => setIntroDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Request Introduction to {company.name}</DialogTitle>
            <DialogDescription>
              Tell us why you would like to be introduced to the founding team. We will review your request and facilitate the introduction.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Introduce yourself and explain what you would like to discuss with the team... (min 50 characters)"
                value={introMessage}
                onChange={(e) => setIntroMessage(e.target.value.slice(0, 500))}
                rows={4}
              />
              <p className="text-xs text-muted-foreground text-right">
                {introMessage.length}/500
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Why you want the intro
              </label>
              <Textarea
                placeholder="What specific value or synergy do you see? (optional)"
                value={introReason}
                onChange={(e) => setIntroReason(e.target.value.slice(0, 500))}
                rows={3}
              />
              <p className="text-xs text-muted-foreground text-right">
                {introReason.length}/500
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIntroDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleIntroSubmit}
                disabled={introMessage.trim().length < 50}
              >
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
