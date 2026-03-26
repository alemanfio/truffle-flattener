"use client";

import { useState, useMemo } from "react";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, FileText, Download, Eye, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

type CategoryTab = "all" | "quarterly" | "legal" | "tax" | "memo";

const CATEGORY_LABELS: Record<string, string> = {
  quarterly: "Quarterly Reports",
  legal: "Legal",
  tax: "Tax",
  memo: "Memos",
};

function formatFileSize(bytes: number | null): string {
  if (bytes === null) return "--";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function categoryBadgeVariant(category: string) {
  switch (category) {
    case "quarterly":
      return "default" as const;
    case "legal":
      return "secondary" as const;
    case "tax":
      return "outline" as const;
    case "memo":
      return "longevity" as const;
    default:
      return "secondary" as const;
  }
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [previewDoc, setPreviewDoc] = useState<(typeof MOCK_DOCUMENTS)[number] | null>(null);

  const filteredDocuments = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeTab === "all" || doc.category === activeTab;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documents Library</h1>
        <p className="text-muted-foreground">
          Access fund reports, legal documents, and investment memos.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={(v) => setActiveTab(v as CategoryTab)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly Reports</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="memo">Memos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center text-muted-foreground">
                  No documents found.
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Document Icon */}
                      <div className="w-14 h-16 bg-gradient-to-br from-genseed-blue to-genseed-teal rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="h-7 w-7 text-white" />
                      </div>

                      {/* Document Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.title}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground flex-wrap">
                          <Badge
                            variant={categoryBadgeVariant(doc.category)}
                            className="text-xs"
                          >
                            {CATEGORY_LABELS[doc.category]}
                          </Badge>
                          <span>{formatFileSize(doc.file_size)}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(doc.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <Eye className="h-4 w-4 mr-1.5" />
                          <span className="hidden sm:inline">Preview</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (doc.file_url === "#") {
                              alert(
                                "This is a demo document. In production, this would download the actual file."
                              );
                            } else {
                              window.open(doc.file_url, "_blank");
                            }
                          }}
                        >
                          <Download className="h-4 w-4 mr-1.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Document Preview Modal */}
      <Dialog
        open={previewDoc !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewDoc(null);
        }}
      >
        <DialogContent
          className="max-w-4xl"
          onClose={() => setPreviewDoc(null)}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="pr-8">{previewDoc?.title}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="mt-4">
            {/* Document metadata */}
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              {previewDoc && (
                <>
                  <Badge variant={categoryBadgeVariant(previewDoc.category)}>
                    {CATEGORY_LABELS[previewDoc.category]}
                  </Badge>
                  <span>{formatFileSize(previewDoc.file_size)}</span>
                  <span>{formatDate(previewDoc.created_at)}</span>
                </>
              )}
            </div>

            {/* Preview content */}
            <div className="rounded-lg border bg-muted/30 min-h-[400px] flex flex-col">
              {previewDoc?.file_url === "#" ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-24 bg-gradient-to-br from-genseed-blue to-genseed-teal rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {previewDoc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mb-6">
                    This is a demo document. In production, a PDF preview would
                    be displayed here. You can download the document to view the
                    full contents.
                  </p>

                  {/* Sample content preview */}
                  <div className="w-full max-w-lg bg-white rounded-lg border p-6 text-left space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-8 mt-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-4/5" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${previewDoc?.file_url}#toolbar=0`}
                  className="w-full min-h-[500px] rounded-lg"
                  title={previewDoc?.title}
                />
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setPreviewDoc(null)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  if (previewDoc?.file_url === "#") {
                    alert(
                      "This is a demo document. In production, this would download the actual file."
                    );
                  } else {
                    window.open(previewDoc?.file_url, "_blank");
                  }
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
