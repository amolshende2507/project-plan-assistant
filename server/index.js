require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: '*', // 👈 Allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------
// THE SYSTEM PROMPT (The Brain's Personality)
// ---------------------------------------------------------
const SYSTEM_PROMPT = `
You are a Senior Technical Project Manager and Mentor.
Your job is to analyze project ideas and output a STRICT JSON execution plan.

CRITICAL INSTRUCTIONS:
1. Be realistic but CONSTRUCTIVE. If a project is impossible, suggest a "Pivot" (a smaller, easier version).
2. Cut scope ruthlessly to ensure they finish.
3. Your output must be valid JSON matching the schema below.
4. ALL fields in the schema are REQUIRED.

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
    "bestCase": number,
    "worstCase": number,
    "bufferWeeks": number,
    "confidence": "low" | "medium" | "high",
    "bufferReason": "string"
  },
  "risks": [
    { 
      "severity": "low" | "medium" | "high", 
      "title": "string", 
      "description": "string", 
      "mitigation": "string" 
    }
  ],
    "feasibility": {
    "score": number, // 0 to 100. (CRITICAL: Use 0-100 scale. 90=Excellent, 50=Risky, 10=Impossible. DO NOT USE 1-10 scale.)
    "verdict": "string", // MAX 5 WORDS. (e.g., "High Risk", "Solid Plan", "Needs Pivot"). Do not write a sentence here.
    "blindSpot": "string",
    "pivotSuggestion": "string" 
  },
  "architectureDiagram": "string",
  "assumptions": ["string", "string"]
}

ARCHITECTURE DIAGRAM RULES:
- The architectureDiagram must be a STRICTLY VALID Mermaid.js diagram
- Use graph TD
- DO NOT include markdown fences (no \`\`\`mermaid)
- Show flow between:
  Client → Server → Database
- Include External APIs or AI services if used
- Base components on the chosen Tech Stack

SCENARIO LOGIC:
- Beginner + Complex Idea: Suggest a Pivot to a "No-Code" or "CLI tool" version first.
- Short Timeline: Warn about Burnout Risk and suggest cutting Auth and Payments.
- Always generate an architecture diagram that matches the solution.
`;
// ---------------------------------------------------------
// THE API ROUTE
// ---------------------------------------------------------
app.post('/api/analyze', async (req, res) => {
  try {
    const { projectIdea, skillLevel, teamSize, totalWeeks, hoursPerWeek, platform, useAI } = req.body;

    // console.log("📝 Analyzing Request:", { projectIdea: projectIdea.substring(0, 50) + "..." });

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
  // console.log(`🚀 AI Brain online at http://localhost:${port}`);
});