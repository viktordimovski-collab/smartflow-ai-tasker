import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

async function callGemini(task, retries = 4) {
  const models = [
    "gemini-3.1-flash-lite",     // најстабилен во моментов
    "gemini-flash-latest",
    "gemini-2.0-flash"
  ];

  for (let attempt = 0; attempt < retries; attempt++) {
    for (const model of models) {
      try {
        console.log(`Attempt ${attempt + 1} with ${model}`);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 18000);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Break down the following task into a JSON array of objects. 
Each object must have exactly these keys: 
- title (short title)
- description (detailed description)
- icon (only one of: code, work, fastfood, event)
- priority (high, medium, or low)
- category (one word category)

Task: ${task}

Return ONLY valid raw JSON array. No explanations, no markdown.`
                }]
              }]
            }),
            signal: controller.signal
          }
        );

        clearTimeout(timeout);

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          if (err.error?.message?.includes("high demand") || response.status === 503) {
            console.log(`Model ${model} overloaded, trying next...`);
            continue; // пробај следен модел
          }
          throw new Error(err.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      } catch (err) {
        console.log(`Error with model: ${err.message}`);
      }
    }

    // Exponential backoff
    if (attempt < retries - 1) {
      const wait = 1500 * Math.pow(2, attempt);
      console.log(`Waiting ${wait/1000}s before retry...`);
      await new Promise(r => setTimeout(r, wait));
    }
  }

  throw new Error("All models overloaded. Please try again later.");
}

app.post('/api/tasks', async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    console.log("Processing task:", task);

    const aiText = await callGemini(task);

    console.log("AI response received!");

    let cleanJson = aiText
      .replace(/```(?:json)?\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    const jsonStart = cleanJson.indexOf('[');
    const jsonEnd = cleanJson.lastIndexOf(']') + 1;

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanJson = cleanJson.substring(jsonStart, jsonEnd);
    }

    const parsedTasks = JSON.parse(cleanJson);
    res.json(parsedTasks);

  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(503).json({ 
      error: "Gemini is currently overloaded", 
      message: "Please try again in a few minutes",
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});