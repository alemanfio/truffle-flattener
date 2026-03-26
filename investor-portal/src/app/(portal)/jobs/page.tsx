"use client";

import { useState } from "react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/empty-state";
import { Search, MapPin, Briefcase, DollarSign, Gift } from "lucide-react";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Apply dialog state
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applyJobId, setApplyJobId] = useState<string | null>(null);
  const [applyCoverLetter, setApplyCoverLetter] = useState("");
  const [applyLinkedIn, setApplyLinkedIn] = useState("");

  // Refer dialog state
  const [referDialogOpen, setReferDialogOpen] = useState(false);
  const [referJobId, setReferJobId] = useState<string | null>(null);
  const [referName, setReferName] = useState("");
  const [referEmail, setReferEmail] = useState("");
  const [referLinkedIn, setReferLinkedIn] = useState("");
  const [referReason, setReferReason] = useState("");

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch =
      search === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(search.toLowerCase()) ||
      job.description?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || job.job_type === typeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  const jobTypeBadgeColor: Record<string, string> = {
    "full-time": "bg-blue-100 text-blue-800",
    "part-time": "bg-purple-100 text-purple-800",
    contract: "bg-orange-100 text-orange-800",
    internship: "bg-pink-100 text-pink-800",
  };

  const applyJob = MOCK_JOBS.find((j) => j.id === applyJobId);
  const referJob = MOCK_JOBS.find((j) => j.id === referJobId);

  function handleApplySubmit() {
    if (!applyCoverLetter.trim()) {
      alert("Please provide a cover letter.");
      return;
    }
    alert(`Application submitted for ${applyJob?.title} at ${applyJob?.company?.name}! We'll be in touch.`);
    setApplyDialogOpen(false);
    setApplyCoverLetter("");
    setApplyLinkedIn("");
    setApplyJobId(null);
  }

  function handleReferSubmit() {
    if (!referName.trim() || !referEmail.trim()) {
      alert("Please provide the candidate's name and email.");
      return;
    }
    alert(`Referral submitted for ${referJob?.title} at ${referJob?.company?.name}! Thank you for the referral.`);
    setReferDialogOpen(false);
    setReferName("");
    setReferEmail("");
    setReferLinkedIn("");
    setReferReason("");
    setReferJobId(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
        <p className="text-muted-foreground">
          Explore opportunities at portfolio companies
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, company, or description..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {JOB_TYPES.map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {job.company?.name}
                  </p>
                  <CardTitle className="text-lg mt-1">{job.title}</CardTitle>
                </div>
                <Badge className={jobTypeBadgeColor[job.job_type]}>
                  {job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {job.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                )}
                {job.salary_range && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {job.salary_range}
                  </span>
                )}
              </div>

              {job.referral_bonus != null && job.referral_bonus > 0 && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-teal-700 bg-teal-50 rounded-md px-3 py-1.5 w-fit">
                  <Gift className="h-3.5 w-3.5" />
                  Referral Bonus: EUR {job.referral_bonus.toLocaleString()}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => {
                    setApplyJobId(job.id);
                    setApplyDialogOpen(true);
                  }}
                >
                  <Briefcase className="h-4 w-4" />
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setReferJobId(job.id);
                    setReferDialogOpen(true);
                  }}
                >
                  Refer Someone
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          description="Try adjusting your search or filters to find opportunities."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch("");
            setTypeFilter("All");
          }}
        />
      )}

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent onClose={() => setApplyDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Apply for {applyJob?.title}</DialogTitle>
            <DialogDescription>
              {applyJob?.company?.name} - {applyJob?.location}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Tell us why you're a great fit for this role..."
                value={applyCoverLetter}
                onChange={(e) => setApplyCoverLetter(e.target.value.slice(0, 2000))}
                rows={5}
              />
              <p className="text-xs text-muted-foreground text-right">
                {applyCoverLetter.length}/2000
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                value={applyLinkedIn}
                onChange={(e) => setApplyLinkedIn(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplySubmit} disabled={!applyCoverLetter.trim()}>
                Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Refer Dialog */}
      <Dialog open={referDialogOpen} onOpenChange={setReferDialogOpen}>
        <DialogContent onClose={() => setReferDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Refer Someone for {referJob?.title}</DialogTitle>
            <DialogDescription>
              {referJob?.company?.name} - {referJob?.location}
              {referJob?.referral_bonus ? ` (EUR ${referJob.referral_bonus.toLocaleString()} referral bonus)` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Full name"
                value={referName}
                onChange={(e) => setReferName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Candidate Email <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="email@example.com"
                value={referEmail}
                onChange={(e) => setReferEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input
                placeholder="https://linkedin.com/in/their-profile"
                value={referLinkedIn}
                onChange={(e) => setReferLinkedIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Why they are a good fit</label>
              <Textarea
                placeholder="What makes this person a great candidate?"
                value={referReason}
                onChange={(e) => setReferReason(e.target.value.slice(0, 1000))}
                rows={3}
              />
              <p className="text-xs text-muted-foreground text-right">
                {referReason.length}/1000
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReferDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReferSubmit} disabled={!referName.trim() || !referEmail.trim()}>
                Submit Referral
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
