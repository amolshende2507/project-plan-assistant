export type SkillLevel = 'beginner' | 'intermediate';
export type TeamSize = 'solo' | 'small-team';
export type Platform = 'web' | 'mobile';

export interface ProjectInput {
  projectIdea: string;
  skillLevel: SkillLevel;
  teamSize: TeamSize;
  totalWeeks: number;
  hoursPerWeek: number;
  platform: Platform;
  useAI: boolean;
}

export interface Feature {
  name: string;
  description: string;
  estimatedHours: number;
}

export interface TechStackItem {
  name: string;
  category: string;
  reason: string;
}

export interface TimelineEstimate {
  bestCase: number;
  worstCase: number;
  bufferWeeks: number;
  confidence: 'low' | 'medium' | 'high';
  bufferReason: string;
}

export interface Risk {
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  mitigation: string;
}

export interface FeatureBreakdown {
  core: Feature[];
  optional: Feature[];
  excluded: Feature[];
}

export interface AnalysisResult {
  features: FeatureBreakdown;
  techStack: TechStackItem[];
  timeline: TimelineEstimate;
  risks: Risk[];
  assumptions: string[];
}

// Comparison types
export interface ComparisonScenario {
  id: string;
  label: string;
  input: ProjectInput;
  result: AnalysisResult;
}