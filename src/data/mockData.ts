import { AnalysisResult, ComparisonScenario, ProjectInput } from '@/types/analyzer';

export const mockAnalysisResult: AnalysisResult = {
  features: {
    core: [
      {
        name: 'User Authentication',
        description: 'Email/password login with session management',
        estimatedHours: 12,
      },
      {
        name: 'Dashboard Interface',
        description: 'Main navigation and data visualization layout',
        estimatedHours: 16,
      },
      {
        name: 'Data Input Forms',
        description: 'Structured forms with validation',
        estimatedHours: 8,
      },
      {
        name: 'API Integration',
        description: 'REST API endpoints for core operations',
        estimatedHours: 20,
      },
    ],
    optional: [
      {
        name: 'Dark Mode',
        description: 'Theme switching capability',
        estimatedHours: 4,
      },
      {
        name: 'Export Functionality',
        description: 'PDF/CSV export of analysis results',
        estimatedHours: 6,
      },
      {
        name: 'Email Notifications',
        description: 'Automated status updates via email',
        estimatedHours: 8,
      },
    ],
    excluded: [
      {
        name: 'Real-time Collaboration',
        description: 'Multi-user simultaneous editing',
        estimatedHours: 40,
      },
      {
        name: 'Mobile Native App',
        description: 'iOS/Android native applications',
        estimatedHours: 80,
      },
      {
        name: 'Advanced Analytics',
        description: 'ML-powered predictive analytics',
        estimatedHours: 60,
      },
    ],
  },
  techStack: [
    {
      name: 'React',
      category: 'Frontend',
      reason: 'Component-based architecture ideal for dashboard UIs with excellent ecosystem support.',
    },
    {
      name: 'TypeScript',
      category: 'Language',
      reason: 'Type safety reduces runtime errors by 15% on average, critical for data-intensive apps.',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling',
      reason: 'Utility-first approach accelerates UI development by 40% compared to traditional CSS.',
    },
    {
      name: 'Node.js + Express',
      category: 'Backend',
      reason: 'JavaScript consistency across stack reduces context-switching overhead.',
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      reason: 'ACID compliance essential for data integrity. Excellent for structured analysis data.',
    },
  ],
  timeline: {
    bestCase: 6,
    worstCase: 10,
    bufferWeeks: 2,
    bufferReason: 'Account for learning curve and unexpected integration issues based on skill level.',
    confidence: 'medium',
  },
  risks: [
    {
      title: 'Scope Creep',
      description: 'Feature requests may expand beyond initial estimates.',
      severity: 'high',
      mitigation: 'Define MVP scope strictly and defer enhancements to v2.',
    },
    {
      title: 'Integration Complexity',
      description: 'Third-party API behaviors may differ from documentation.',
      severity: 'medium',
      mitigation: 'Build integration layer early to identify issues.',
    },
    {
      title: 'Performance Bottlenecks',
      description: 'Large datasets may cause UI lag without optimization.',
      severity: 'low',
      mitigation: 'Implement pagination and lazy loading from the start.',
    },
  ],
  assumptions: [
    'Developer has basic familiarity with React and JavaScript',
    'Design assets and brand guidelines are already available',
    'No regulatory compliance requirements (GDPR, HIPAA)',
    'Single timezone operation initially',
    'English-only interface for v1',
    'Cloud hosting budget of $50-100/month available',
  ],
};

export const beginnerResult: AnalysisResult = {
  ...mockAnalysisResult,
  features: {
    core: mockAnalysisResult.features.core.slice(0, 3),
    optional: mockAnalysisResult.features.optional.slice(0, 1),
    excluded: [
      ...mockAnalysisResult.features.core.slice(3),
      ...mockAnalysisResult.features.optional.slice(1),
      ...mockAnalysisResult.features.excluded,
    ],
  },
  timeline: {
    bestCase: 10,
    worstCase: 16,
    bufferWeeks: 4,
    bufferReason: 'Extended buffer for learning curve and debugging time typical for beginner developers.',
    confidence: 'low',
  },
  risks: [
    {
      title: 'Learning Curve',
      description: 'Time estimates may be significantly off due to skill ramp-up.',
      severity: 'high',
      mitigation: 'Follow structured tutorials and build incrementally.',
    },
    ...mockAnalysisResult.risks,
  ],
};

export const intermediateResult: AnalysisResult = mockAnalysisResult;

export const soloResult: AnalysisResult = {
  ...mockAnalysisResult,
  timeline: {
    bestCase: 8,
    worstCase: 12,
    bufferWeeks: 2,
    bufferReason: 'Solo work eliminates coordination overhead but increases individual workload.',
    confidence: 'medium',
  },
};

export const teamResult: AnalysisResult = {
  ...mockAnalysisResult,
  features: {
    ...mockAnalysisResult.features,
    optional: [
      ...mockAnalysisResult.features.optional,
      {
        name: 'Team Workspace',
        description: 'Shared project views and handoff capabilities',
        estimatedHours: 12,
      },
    ],
  },
  timeline: {
    bestCase: 4,
    worstCase: 7,
    bufferWeeks: 1,
    bufferReason: 'Team parallelization reduces timeline but coordination overhead applies.',
    confidence: 'high',
  },
};

export const comparisonScenarios: ComparisonScenario[] = [
  {
    label: 'Beginner Developer',
    input: {
      projectIdea: 'Task management dashboard',
      skillLevel: 'beginner',
      teamSize: 'solo',
      totalWeeks: 12,
      hoursPerWeek: 20,
      platform: 'web',
      useAI: false,
    },
    result: beginnerResult,
  },
  {
    label: 'Intermediate Developer',
    input: {
      projectIdea: 'Task management dashboard',
      skillLevel: 'intermediate',
      teamSize: 'solo',
      totalWeeks: 12,
      hoursPerWeek: 20,
      platform: 'web',
      useAI: false,
    },
    result: intermediateResult,
  },
];

export const defaultInput: ProjectInput = {
  projectIdea: '',
  skillLevel: 'intermediate',
  teamSize: 'solo',
  totalWeeks: 8,
  hoursPerWeek: 20,
  platform: 'web',
  useAI: false,
};
