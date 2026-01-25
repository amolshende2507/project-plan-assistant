export type SkillLevel = 'beginner' | 'intermediate';
export type TeamSize = 'solo' | 'small-team';
export type Platform = 'web' | 'mobile';
export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface ProjectInput {
  projectIdea: string;
  skillLevel: SkillLevel;
  teamSize: TeamSize;
  totalWeeks: number;
  hoursPerWeek: number;
  platform?: Platform;
  useAI?: boolean;
}

export interface Feature {
  name: string;
  description: string;
  estimatedHours: number;
}

export interface FeatureBreakdown {
  core: Feature[];
  optional: Feature[];
  excluded: Feature[];
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
  bufferReason: string;
  confidence: ConfidenceLevel;
}

export interface Risk {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  mitigation?: string;
}

export interface AnalysisResult {
  features: FeatureBreakdown;
  techStack: TechStackItem[];
  timeline: TimelineEstimate;
  risks: Risk[];
  assumptions: string[];
}

export interface ComparisonScenario {
  label: string;
  input: ProjectInput;
  result: AnalysisResult;
}
