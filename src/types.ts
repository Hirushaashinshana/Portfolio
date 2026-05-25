export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  category: "AI & ML" | "Web Apps" | "Tools";
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "Languages" | "Frameworks & Libraries" | "Tools & Platforms";
  level?: number; // percentage or rating if we want to show a subtle bar
}

export type Theme = "dark" | "light";
