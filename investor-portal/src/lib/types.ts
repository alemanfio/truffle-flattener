export interface UserProfile {
  id: string;
  full_name: string | null;
  location: string | null;
  bio: string | null;
  linkedin_url: string | null;
  is_profile_public: boolean;
  open_to_help_with: string | null;
  investment_committed: number | null;
  created_at: string;
  updated_at: string;
  expert_tags?: ExpertTag[];
}

export interface Company {
  id: string;
  name: string;
  sector: "longevity" | "space";
  stage: string | null;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  investment_amount: number | null;
  entry_valuation: number | null;
  current_valuation: number | null;
  entry_date: string | null;
  why_invested: string | null;
  employees: number | null;
  founded_year: number | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpertTag {
  id: string;
  name: string;
  emoji: string | null;
  created_at: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: "company" | "longevity" | "space" | "general";
  company_id: string | null;
  upvotes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  author?: UserProfile;
  company?: Company;
}

export interface Comment {
  id: string;
  discussion_id: string;
  parent_comment_id: string | null;
  author_id: string;
  content: string;
  upvotes_count: number;
  created_at: string;
  updated_at: string;
  author?: UserProfile;
  replies?: Comment[];
}

export interface IntroRequest {
  id: string;
  requester_id: string;
  company_id: string;
  message: string | null;
  status: "pending" | "accepted" | "completed" | "declined";
  created_at: string;
  updated_at: string;
  requester?: UserProfile;
  company?: Company;
}

export interface Document {
  id: string;
  title: string;
  category: "quarterly" | "legal" | "tax" | "memo";
  file_url: string;
  file_size: number | null;
  company_id: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string | null;
  location: string | null;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  salary_range: string | null;
  referral_bonus: number | null;
  posted_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  company?: Company;
}

export interface LearningCircle {
  id: string;
  name: string;
  description: string | null;
  topic: string | null;
  max_members: number | null;
  schedule: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  member_count?: number;
  is_member?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: "lp_call" | "demo" | "meetup" | "learning";
  date_time: string;
  location: string | null;
  max_attendees: number | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  rsvp_count?: number;
  user_rsvp?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: "comment" | "upvote" | "intro" | "job" | "event" | "document";
  title: string;
  description: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface ActivityItem {
  id: string;
  type:
    | "new_investment"
    | "company_update"
    | "discussion_created"
    | "job_posted"
    | "event_created"
    | "document_uploaded"
    | "milestone_achieved";
  title: string;
  description: string | null;
  link: string | null;
  created_at: string;
}

export interface InvestmentMemo {
  why_invested: string;
  market_opportunity: string;
  team_assessment: string;
  risk_factors: string[];
  thesis: string;
}
