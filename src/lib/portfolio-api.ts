const API_URL = "https://nevo.is-a.dev/api";

export type Project = {
  _id: string;
  name: string;
  year: number;
  liveUrl?: string;
  sourceCode?: string;
  description: string;
  features: string[];
  techStack: string[];
  thumbnail: string;
  slug: string;
};

export type StackItem = {
  _id: string;
  name: string;
  icon: string;
  type: string;
};

export type StackGroup = {
  type: string;
  items: StackItem[];
};

export type Experience = {
  _id: string;
  title: string;
  company: string;
  /** "MM/YYYY" */
  startDate: string;
  /** "MM/YYYY" or "Present" */
  endDate: string;
};

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T };
    return json.data;
  } catch {
    return null;
  }
}

export const getProjects = () => get<Project[]>("/projects");
export const getStack = () => get<StackGroup[]>("/stack");
export const getExperience = () => get<Experience[]>("/experience");
