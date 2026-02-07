require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js'); // Supabase

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ---------------------------
// Init Gemini
// ---------------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------
// Init Supabase (Admin Mode)
// ---------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ---------------------------------------------------------
// SYSTEM PROMPT
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
    "score": number,
    "verdict": "string",
    "blindSpot": "string",
    "pivotSuggestion": "string" 
  },
  "architectureDiagram": "string",
  "assumptions": ["string", "string"]
}

ARCHITECTURE DIAGRAM RULES:
- The architectureDiagram must be a STRICTLY VALID Mermaid.js diagram
- Use graph TD
- DO NOT include markdown fences
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
// API ROUTE
// ---------------------------------------------------------
app.post('/api/analyze', async (req, res) => {
  try {
    const { projectIdea, userId, userEmail, skillLevel, teamSize, totalWeeks, hoursPerWeek, platform, useAI } = req.body;

    console.log("📝 Request from:", userId || "Guest");

    // ---------------------------
    // 1. CREDIT CHECK
    // ---------------------------
    if (userId) {
      let { data: user } = await supabase
        .from('users')
        .select('credits')
        .eq('user_id', userId)
        .single();

      if (!user) {
        const { data: newUser } = await supabase
          .from('users')
          .insert([{ user_id: userId, email: userEmail, credits: 10 }])
          .select()
          .single();

        user = newUser;
      }

      if (user.credits <= 0) {
        return res.status(403).json({ error: "Insufficient credits. Please upgrade." });
      }
    }

    // ---------------------------
    // USER PROMPT
    // ---------------------------
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

    // ---------------------------
    // GEMINI CALL
    // ---------------------------
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent([SYSTEM_PROMPT, userPrompt]);
    const response = await result.response;
    const text = response.text();

    let analysisData;
    try {
      analysisData = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    // ---------------------------
    // 2. DEDUCT CREDIT
    // ---------------------------
    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('credits')
        .eq('user_id', userId)
        .single();

      await supabase
        .from('users')
        .update({ credits: user.credits - 1 })
        .eq('user_id', userId);
    }

    res.json(analysisData);

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
