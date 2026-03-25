"use client";

import { useState } from "react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, DollarSign, Gift } from "lucide-react";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

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
                <Button size="sm" className="flex-1 gap-2">
                  <Briefcase className="h-4 w-4" />
                  Apply
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Refer Someone
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
