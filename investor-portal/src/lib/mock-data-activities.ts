import { ActivityItem } from "./types";

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act1",
    type: "new_investment",
    title: "GenSeed invested €500K in EpigenReset",
    description: "Seed round - Epigenetic reprogramming therapies",
    link: "/portfolio/c5",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act2",
    type: "company_update",
    title: "NovaSenescence Phase I results exceed expectations",
    description:
      "40% reduction in senescent cell burden confirmed in peer-reviewed study",
    link: "/portfolio/c1",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act3",
    type: "discussion_created",
    title: "New discussion: FDA aging biomarker guidance",
    description: "Started by Dr. Sophia Chen - 12 comments",
    link: "/community",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act4",
    type: "job_posted",
    title: "LunarLogistics is hiring: Robotics Engineer",
    description: "Bremen, Germany - EUR 85,000-110,000 - Full-time",
    link: "/jobs",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act5",
    type: "milestone_achieved",
    title: "OrbitMaterials signs third telecom LOI",
    description:
      "Major validation of space-manufactured ZBLAN fiber optics technology",
    link: "/portfolio/c2",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act6",
    type: "event_created",
    title: "Upcoming: Q1 2025 LP Quarterly Call",
    description: "Apr 10 - 5:00pm CET - Virtual",
    link: "/events",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act7",
    type: "document_uploaded",
    title: "Q4 2024 Quarterly Report now available",
    description: "Portfolio performance and fund updates",
    link: "/documents",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act8",
    type: "company_update",
    title: "CryoGenix achieves 95% organ viability rate",
    description:
      "Breakthrough in vitrification protocol for transplant organs",
    link: "/portfolio/c3",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act9",
    type: "new_investment",
    title: "GenSeed invested €700K in AstroFarm",
    description: "Seed round - Space agriculture & bio-regenerative systems",
    link: "/portfolio/c6",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act10",
    type: "milestone_achieved",
    title: "LunarLogistics secures ESA contract",
    description:
      "Selected for Artemis cargo logistics mission, validating RTV technology",
    link: "/portfolio/c4",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
