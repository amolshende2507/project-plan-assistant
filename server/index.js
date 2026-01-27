require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------
// THE SYSTEM PROMPT (The Brain's Personality)
// ---------------------------------------------------------
const SYSTEM_PROMPT = `
You are a Senior Technical Project Manager and Solution Architect.
Your job is to analyze project ideas and output a STRICT JSON execution plan.

CRITICAL INSTRUCTIONS:
1. Be realistic. If a beginner asks for a complex AI SaaS in 1 week, you must flag it as high risk.
2. Cut scope ruthlessly. Identify the "Core" (MVP) vs "Optional" features.
3. Your output must be valid JSON matching the schema below exactly. No markdown, no "Here is the JSON". Just the raw JSON.

JSON SCHEMA:
{
  "features": {
    "core": [{ "name": "string", "description": "string", "estimatedHours": number }],
    "optional": [{ "name": "string", "description": "string", "estimatedHours": number }],
    "excluded": [{ "name": "string", "description": "string", "estimatedHours": number }]
  },
  "techStack": [
    { "name": "string", "category": "Frontend|Backend|Database|Infra|AI", "reason": "string" }
  ],
  "timeline": {
    "bestCase": number, // in weeks
    "worstCase": number, // in weeks
    "bufferWeeks": number,
    "confidence": "low" | "medium" | "high",
    "bufferReason": "string"
  },
  "risks": [
    { "severity": "low" | "medium" | "high", "title": "string", "description": "string", "mitigation": "string" }
  ],
  "assumptions": ["string", "string"]
}

SCENARIO LOGIC:
- If 'Skill Level' is Beginner: Multiply timeline estimates by 1.5x. Recommend simpler stacks (e.g., Firebase over Kubernetes).
- If 'Team Size' is Solo: Limit 'core' features to max 3-5 major items.
- If timeline provided is too short: Mark confidence as "low" and add a risk about burnout/failure.
`;

// ---------------------------------------------------------
// THE API ROUTE
// ---------------------------------------------------------
app.post('/api/analyze', async (req, res) => {
  try {
    const { projectIdea, skillLevel, teamSize, totalWeeks, hoursPerWeek, platform, useAI } = req.body;

    console.log("📝 Analyzing Request:", { projectIdea: projectIdea.substring(0, 50) + "..." });

    // Construct the User Prompt
    const userPrompt = `
      PROJECT DETAILS:
      - Idea: ${projectIdea}
      - Skill Level: ${skillLevel}
      - Team Size: ${teamSize}
      - Target Platform: ${platform}
      - AI Requirement: ${useAI ? "Yes" : "No"}
      - Time Budget: ${totalWeeks} weeks at ${hoursPerWeek} hours/week.

      Analyze this project based on the constraints. Return ONLY the JSON object.
    `;

    // Initialize the model (Gemini 1.5 Flash is fast and free)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } // Force JSON
    });

    const result = await model.generateContent([SYSTEM_PROMPT, userPrompt]);
    const response = await result.response;
    const text = response.text();

    // Parse logic to ensure it's valid JSON
    let analysisData;
    try {
      analysisData = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    res.json(analysisData);

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 AI Brain online at http://localhost:${port}`);
});