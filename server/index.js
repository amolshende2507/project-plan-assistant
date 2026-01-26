require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allows your Frontend to talk to this backend
app.use(express.json());

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// THE BRAIN: The System Prompt
const SYSTEM_PROMPT = `
You are a Senior Technical Project Manager and Solution Architect. 
Your goal is to analyze project ideas and output a STRICT JSON execution plan.
You must be realistic, cynical about timelines, and brutal about feature scope.
Do not act like a chatbot. Act like an engineer.

OUTPUT JSON SCHEMA:
{
  "features": {
    "core": [{ "name": "string", "description": "string", "estimatedHours": number }],
    "optional": [{ "name": "string", "description": "string", "estimatedHours": number }],
    "excluded": [{ "name": "string", "description": "string", "estimatedHours": number }]
  },
  "techStack": [{ "name": "string", "category": "Frontend|Backend|Database|DevOps|AI", "reason": "string" }],
  "timeline": {
    "bestCase": number (weeks),
    "worstCase": number (weeks),
    "bufferWeeks": number,
    "confidence": "low" | "medium" | "high",
    "bufferReason": "string"
  },
  "risks": [{ "severity": "low"|"medium"|"high", "title": "string", "description": "string", "mitigation": "string" }],
  "assumptions": ["string", "string"]
}

RULES:
1. If skill is 'beginner', multiply timeline by 1.5x and suggest simpler tech stacks.
2. If team is 'solo', strictly limit 'core' features to the absolute MVP.
3. Be specific in 'techStack' reasoning (e.g., "React because of ecosystem," not just "It is good").
4. If the input is vague, lower the confidence score.
5. timeline.bestCase must be at least 2 weeks for any non-trivial project.
`;

app.post('/api/analyze', async (req, res) => {
  try {
    const { projectIdea, skillLevel, teamSize, totalWeeks, hoursPerWeek } = req.body;

    const userPrompt = `
      Project Idea: ${projectIdea}
      Skill Level: ${skillLevel}
      Team Size: ${teamSize}
      Available Time: ${totalWeeks} weeks, ${hoursPerWeek} hours/week.
      
      Analyze this. Return ONLY JSON.
    `;

    // Use Gemini 1.5 Flash (Fast & Free)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const result = await model.generateContent([SYSTEM_PROMPT, userPrompt]);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON
    const analysisData = JSON.parse(text);

    res.json(analysisData);

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to analyze project" });
  }
});

app.listen(port, () => {
  console.log(`🧠 AI Brain running on http://localhost:${port}`);
});