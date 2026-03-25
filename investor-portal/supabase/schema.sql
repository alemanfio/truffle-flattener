-- GenSeed Capital Investor Portal - Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  location TEXT,
  bio TEXT,
  linkedin_url TEXT,
  is_profile_public BOOLEAN DEFAULT true,
  open_to_help_with TEXT,
  investment_committed DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sector TEXT NOT NULL CHECK (sector IN ('longevity', 'space')),
  stage TEXT,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  investment_amount DECIMAL,
  entry_valuation DECIMAL,
  current_valuation DECIMAL,
  entry_date DATE,
  why_invested TEXT,
  employees INTEGER,
  founded_year INTEGER,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expert Tags
CREATE TABLE expert_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Expert Tags (many-to-many)
CREATE TABLE user_expert_tags (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  expert_tag_id UUID REFERENCES expert_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, expert_tag_id)
);

-- Discussions
CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES user_profiles(id),
  category TEXT CHECK (category IN ('company', 'longevity', 'space', 'general')),
  company_id UUID REFERENCES companies(id),
  upvotes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id),
  author_id UUID REFERENCES user_profiles(id),
  content TEXT NOT NULL,
  upvotes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Upvotes
CREATE TABLE upvotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  votable_type TEXT CHECK (votable_type IN ('discussion', 'comment')),
  votable_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, votable_type, votable_id)
);

-- Introduction Requests
CREATE TABLE intro_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID REFERENCES user_profiles(id),
  company_id UUID REFERENCES companies(id),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('quarterly', 'legal', 'tax', 'memo')),
  file_url TEXT NOT NULL,
  file_size INTEGER,
  company_id UUID REFERENCES companies(id),
  uploaded_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  salary_range TEXT,
  referral_bonus DECIMAL,
  posted_by UUID REFERENCES user_profiles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Circles
CREATE TABLE learning_circles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  topic TEXT,
  max_members INTEGER,
  schedule TEXT,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Circle Members
CREATE TABLE circle_members (
  circle_id UUID REFERENCES learning_circles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (circle_id, user_id)
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('lp_call', 'demo', 'meetup', 'learning')),
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  max_attendees INTEGER,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event RSVPs
CREATE TABLE event_rsvps (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'attending' CHECK (status IN ('attending', 'maybe', 'not_attending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (event_id, user_id)
);

-- Seed default expert tags
INSERT INTO expert_tags (name, emoji) VALUES
  ('Longevity Science', '🧬'),
  ('Space Economy', '🚀'),
  ('VC/Investing', '💼'),
  ('Legal/Regulatory', '⚖️'),
  ('Finance/CFO', '💰'),
  ('Scientific Research', '🔬'),
  ('Operations/Scaling', '🏗️');

-- Create auto-profile trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_expert_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE intro_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- Policies: user_profiles
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON user_profiles FOR SELECT TO authenticated
  USING (is_profile_public = true OR id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- Policies: companies (read-only for all authenticated)
CREATE POLICY "Companies are viewable by authenticated users"
  ON companies FOR SELECT TO authenticated USING (true);

-- Policies: expert_tags
CREATE POLICY "Expert tags are viewable by all authenticated"
  ON expert_tags FOR SELECT TO authenticated USING (true);

-- Policies: user_expert_tags
CREATE POLICY "User tags viewable by authenticated"
  ON user_expert_tags FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage own tags"
  ON user_expert_tags FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Policies: discussions
CREATE POLICY "Discussions viewable by authenticated"
  ON discussions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON discussions FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update own discussions"
  ON discussions FOR UPDATE TO authenticated
  USING (author_id = auth.uid());

-- Policies: comments
CREATE POLICY "Comments viewable by authenticated"
  ON comments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update own comments"
  ON comments FOR UPDATE TO authenticated
  USING (author_id = auth.uid());

-- Policies: upvotes
CREATE POLICY "Upvotes viewable by authenticated"
  ON upvotes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage own upvotes"
  ON upvotes FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Policies: intro_requests
CREATE POLICY "Users can view own intro requests"
  ON intro_requests FOR SELECT TO authenticated
  USING (requester_id = auth.uid());

CREATE POLICY "Users can create intro requests"
  ON intro_requests FOR INSERT TO authenticated
  WITH CHECK (requester_id = auth.uid());

-- Policies: documents
CREATE POLICY "Documents viewable by authenticated"
  ON documents FOR SELECT TO authenticated USING (true);

-- Policies: jobs
CREATE POLICY "Jobs viewable by authenticated"
  ON jobs FOR SELECT TO authenticated USING (true);

-- Policies: learning_circles
CREATE POLICY "Circles viewable by authenticated"
  ON learning_circles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create circles"
  ON learning_circles FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Policies: circle_members
CREATE POLICY "Circle members viewable by authenticated"
  ON circle_members FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage own membership"
  ON circle_members FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- Policies: events
CREATE POLICY "Events viewable by authenticated"
  ON events FOR SELECT TO authenticated USING (true);

-- Policies: event_rsvps
CREATE POLICY "RSVPs viewable by authenticated"
  ON event_rsvps FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage own RSVPs"
  ON event_rsvps FOR ALL TO authenticated
  USING (user_id = auth.uid());
