"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_DISCUSSIONS, MOCK_LPS } from "@/lib/mock-data";
import { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, ArrowLeft } from "lucide-react";

const MOCK_COMMENTS: Comment[] = [
  {
    id: "cm1",
    discussion_id: "",
    parent_comment_id: null,
    author_id: "u2",
    content:
      "Great topic! I've been following this closely. The preliminary data looks very promising, and I think the team has a clear regulatory pathway mapped out.",
    upvotes_count: 5,
    created_at: "2025-03-16T08:30:00Z",
    updated_at: "2025-03-16T08:30:00Z",
    author: MOCK_LPS[1],
    replies: [],
  },
  {
    id: "cm2",
    discussion_id: "",
    parent_comment_id: null,
    author_id: "u3",
    content:
      "From a financial perspective, the burn rate looks sustainable through the next 18 months. They should be well-positioned for a Series B if Phase II results are positive.",
    upvotes_count: 3,
    created_at: "2025-03-16T11:00:00Z",
    updated_at: "2025-03-16T11:00:00Z",
    author: MOCK_LPS[2],
    replies: [],
  },
  {
    id: "cm3",
    discussion_id: "",
    parent_comment_id: null,
    author_id: "u6",
    content:
      "I had a chance to speak with their CSO last week. The safety profile from Phase I was actually better than expected -- minimal adverse events reported across all cohorts.",
    upvotes_count: 8,
    created_at: "2025-03-17T14:15:00Z",
    updated_at: "2025-03-17T14:15:00Z",
    author: MOCK_LPS[5],
    replies: [],
  },
];

function categoryBadgeVariant(category: string) {
  switch (category) {
    case "longevity":
      return "longevity" as const;
    case "space":
      return "space" as const;
    case "company":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

function CommentCard({
  comment,
  depth = 0,
}: {
  comment: Comment;
  depth?: number;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<Comment[]>(comment.replies ?? []);
  const [upvotes, setUpvotes] = useState(comment.upvotes_count);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyContent.trim()) return;

    const newReply: Comment = {
      id: `cm-${Date.now()}`,
      discussion_id: comment.discussion_id,
      parent_comment_id: comment.id,
      author_id: "u1",
      content: replyContent.trim(),
      upvotes_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        id: "u1",
        full_name: "Alex Reinhardt",
        location: "Luxembourg City",
        bio: null,
        linkedin_url: null,
        is_profile_public: true,
        open_to_help_with: null,
        investment_committed: null,
        created_at: "",
        updated_at: "",
      },
      replies: [],
    };

    setReplies([...replies, newReply]);
    setReplyContent("");
    setShowReplyForm(false);
  }

  function handleUpvote() {
    if (hasUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setHasUpvoted(!hasUpvoted);
  }

  return (
    <div className={depth > 0 ? "ml-8 border-l-2 border-muted pl-4" : ""}>
      <div className="flex items-start gap-3 py-4">
        <Avatar name={comment.author?.full_name} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {comment.author?.full_name ?? "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm mb-2">{comment.content}</p>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={hasUpvoted ? "text-primary" : "text-muted-foreground"}
              onClick={handleUpvote}
            >
              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
              {upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              Reply
            </Button>
          </div>

          {showReplyForm && (
            <form onSubmit={handleReply} className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <Button type="submit" size="sm">
                  Post Reply
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {replies.map((reply) => (
        <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function DiscussionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const discussion = MOCK_DISCUSSIONS.find((d) => d.id === id);

  const [upvotes, setUpvotes] = useState(discussion?.upvotes_count ?? 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS.map((c) => ({ ...c, discussion_id: id }))
  );
  const [newComment, setNewComment] = useState("");

  if (!discussion) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/community")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>
        <div className="text-center py-12 text-muted-foreground">
          Discussion not found.
        </div>
      </div>
    );
  }

  function handleUpvote() {
    if (hasUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setHasUpvoted(!hasUpvoted);
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `cm-${Date.now()}`,
      discussion_id: id,
      parent_comment_id: null,
      author_id: "u1",
      content: newComment.trim(),
      upvotes_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: {
        id: "u1",
        full_name: "Alex Reinhardt",
        location: "Luxembourg City",
        bio: null,
        linkedin_url: null,
        is_profile_public: true,
        open_to_help_with: null,
        investment_committed: null,
        created_at: "",
        updated_at: "",
      },
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/community")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Community
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Avatar name={discussion.author?.full_name} size="md" />
            <div>
              <span className="font-medium">
                {discussion.author?.full_name ?? "Anonymous"}
              </span>
              <p className="text-sm text-muted-foreground">
                {formatDate(discussion.created_at)}
              </p>
            </div>
            <Badge variant={categoryBadgeVariant(discussion.category)}>
              {discussion.category}
            </Badge>
          </div>
          <CardTitle>{discussion.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed mb-6 whitespace-pre-wrap">
            {discussion.content}
          </p>
          <div className="flex items-center gap-4 border-t pt-4">
            <Button
              variant="ghost"
              size="sm"
              className={hasUpvoted ? "text-primary" : "text-muted-foreground"}
              onClick={handleUpvote}
            >
              <ThumbsUp className="h-4 w-4 mr-1.5" />
              {upvotes} Upvotes
            </Button>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              {comments.length} Comments
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          {comments.length === 0 && (
            <p className="text-center py-6 text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
          )}

          <form onSubmit={handleAddComment} className="mt-6 space-y-3 border-t pt-6">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
