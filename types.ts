
export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface JobRole {
  title: string;
  matchPercentage: number;
  why: string;
}

export interface Improvement {
  category: string;
  suggestion: string;
}

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  skills: Skill[];
  improvements: Improvement[];
  suggestedJobs: JobRole[];
  summary: string;
}

export type AppStatus = 'IDLE' | 'UPLOADING' | 'ANALYZING' | 'RESULT';
