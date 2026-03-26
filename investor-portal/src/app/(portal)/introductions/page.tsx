"use client";

import { useState } from "react";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/empty-state";
import { Handshake, Send, Building2, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { IntroRequest } from "@/lib/types";

const MOCK_REQUESTS: IntroRequest[] = [
  {
    id: "ir1",
    requester_id: "u1",
    company_id: "c1",
    message:
      "Would love an introduction to the CEO to discuss potential scientific advisory role.",
    status: "completed",
    created_at: "2025-02-15T10:00:00Z",
    updated_at: "2025-02-20T14:00:00Z",
    company: MOCK_COMPANIES[0],
  },
  {
    id: "ir2",
    requester_id: "u1",
    company_id: "c4",
    message:
      "Interested in connecting with the engineering team regarding a robotics collaboration.",
    status: "pending",
    created_at: "2025-03-10T09:00:00Z",
    updated_at: "2025-03-10T09:00:00Z",
    company: MOCK_COMPANIES[3],
  },
  {
    id: "ir3",
    requester_id: "u1",
    company_id: "c2",
    message:
      "Looking to discuss partnership opportunities for materials testing.",
    status: "declined",
    created_at: "2025-01-20T16:00:00Z",
    updated_at: "2025-01-25T11:00:00Z",
    company: MOCK_COMPANIES[1],
  },
];

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  completed: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  declined: { color: "bg-red-100 text-red-800", icon: XCircle },
  accepted: { color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
};

const pendingCompanyIds = MOCK_REQUESTS.filter(
  (r) => r.status === "pending"
).map((r) => r.company_id);

export default function IntroductionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(MOCK_COMPANIES[0].id);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");
  const [messageError, setMessageError] = useState("");

  function handleSubmit() {
    if (message.trim().length < 50) {
      setMessageError("Message must be at least 50 characters");
      return;
    }
    setMessageError("");
    alert(
      `Introduction request sent for ${MOCK_COMPANIES.find((c) => c.id === selectedCompany)?.name}! We'll review your request and facilitate the introduction.`
    );
    setDialogOpen(false);
    setMessage("");
    setReason("");
  }

  const companyOptions = MOCK_COMPANIES.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Introductions</h1>
          <p className="text-muted-foreground">
            Request introductions to portfolio companies
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Send className="h-4 w-4" />
          Request Introduction
        </Button>
      </div>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="companies">All Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <div className="space-y-4">
            {MOCK_REQUESTS.length === 0 ? (
              <EmptyState
                icon={Handshake}
                title="No introduction requests"
                description="Request your first introduction to a portfolio company."
                actionLabel="Request Introduction"
                onAction={() => setDialogOpen(true)}
              />
            ) : (
              MOCK_REQUESTS.map((request) => {
                const config = statusConfig[request.status];
                const StatusIcon = config.icon;
                return (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold">
                              {request.company?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {request.message}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Requested{" "}
                              {new Date(request.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={`gap-1 shrink-0 ${config.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="companies">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_COMPANIES.map((company) => {
              const isPending = pendingCompanyIds.includes(company.id);
              return (
                <Card key={company.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge
                        variant={
                          company.sector === "longevity" ? "longevity" : "space"
                        }
                      >
                        {company.sector}
                      </Badge>
                    </div>
                    <CardDescription>
                      {company.stage} &middot; {company.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {company.description}
                    </p>
                    {isPending ? (
                      <Badge
                        variant="secondary"
                        className="gap-1.5 px-3 py-1.5 text-sm"
                      >
                        <Clock className="h-3.5 w-3.5" />
                        Pending Request
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => {
                          setSelectedCompany(company.id);
                          setDialogOpen(true);
                        }}
                      >
                        <Handshake className="h-4 w-4" />
                        Request Introduction
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onClose={() => setDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Request Introduction</DialogTitle>
            <DialogDescription>
              The GP team will review your request and facilitate the
              introduction.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                options={companyOptions}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value.slice(0, 500));
                  if (e.target.value.trim().length >= 50) setMessageError("");
                }}
                placeholder="Introduce yourself and explain what you'd like to discuss... (min 50 characters)"
                rows={4}
              />
              <div className="flex justify-between">
                {messageError && (
                  <p className="text-xs text-red-500">{messageError}</p>
                )}
                <p className="text-xs text-muted-foreground ml-auto">
                  {message.length}/500
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Why you want the intro
              </label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value.slice(0, 500))}
                placeholder="What specific value or synergy do you see? (optional)"
                rows={3}
              />
              <p className="text-xs text-muted-foreground text-right">
                {reason.length}/500
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={message.trim().length < 50}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
