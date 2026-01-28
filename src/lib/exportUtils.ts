import { AnalysisResult, ProjectInput } from '@/types/analyzer';

export function generateMarkdown(input: ProjectInput, result: AnalysisResult): string {
  const date = new Date().toLocaleDateString();
  
  return `
# Project Blueprint: ${input.projectIdea.substring(0, 50)}...
> Generated on ${date} by AI Project Analyzer

## 📋 Executive Summary
- **Constraints:** ${input.skillLevel} Dev, ${input.teamSize} Team, ${input.totalWeeks} Weeks.
- **Estimated Timeline:** ${result.timeline.bestCase}–${result.timeline.worstCase} weeks.
- **Risk Level:** ${result.timeline.confidence === 'low' ? '🔴 High Risk' : result.timeline.confidence === 'medium' ? 'jq Medium Risk' : '🟢 Low Risk'}

## 🏗️ Tech Stack
${result.techStack.map(t => `- **${t.name}** (${t.category}): ${t.reason}`).join('\n')}

## 🛣️ Feature Roadmap
### 🟢 Core (MVP)
${result.features.core.map(f => `- **${f.name}**: ${f.description} (${f.estimatedHours}h)`).join('\n')}

### 🟡 Optional (Post-MVP)
${result.features.optional.map(f => `- ${f.name} (${f.estimatedHours}h)`).join('\n')}

### 🔴 Excluded (Scope Creep)
${result.features.excluded.map(f => `- ${f.name}: ${f.description}`).join('\n')}

## ⚠️ Risk Assessment
${result.risks.map(r => `- **[${r.severity.toUpperCase()}] ${r.title}**: ${r.description}\n  - *Mitigation:* ${r.mitigation}`).join('\n')}
  `.trim();
}

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}