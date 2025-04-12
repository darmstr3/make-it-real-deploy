import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // OpenAI plan generation endpoint
  app.post("/api/generate-plan", async (req, res) => {
    try {
      const { idea, tone } = req.body;
      
      if (!idea || !tone) {
        return res.status(400).json({ error: "Idea and tone are required" });
      }

      const prompt = `
You are a product strategist who turns rough startup ideas into clear launch plans.

Given the idea below, return the following sections with exactly these headings:

One-liner Pitch:
(Provide a concise one-liner pitch for the idea)

Landing Page Copy:
Headline:
(Provide an attention-grabbing headline)

Subheadline:
(Provide a complementary subheadline)

3 Value Bullets:
- (First benefit)
- (Second benefit)
- (Third benefit)

CTA:
(Provide a clear call to action)

Three Cold DMs:
Direct DM:
(Provide a direct message template)

Friendly DM:
(Provide a friendly message template)

High-status DM:
(Provide a high-status message template)

Task Plan:
- Today:
(List the tasks to do immediately)

- Tomorrow:
(List the tasks to do the next day)

- This Week:
(List the tasks to do within the week)

Suggested Pricing Model:
(Describe a pricing structure for the idea)

Important: 
- Do NOT use any asterisks (*) in your response
- Use the EXACT headings as provided above
- Present content in plain text without quotation marks
- For the one-liner and content under headings, use normal text (not bullet points)
- Only use bullet points (dashes) for the 3 value bullets and task plan items

Idea: ${idea}
Tone: ${tone}
`;

      // Use the environment variable for OpenAI API key (from server environment, not Vite)
      const openaiApiKey = process.env.OPENAI_API_KEY;
      
      if (!openaiApiKey) {
        console.error("OpenAI API key is missing. Please set OPENAI_API_KEY in your .env file or server environment.");
        return res.status(500).json({ error: "Configuration error: API key is missing" });
      }
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
          messages: [
            {
              role: "system",
              content: "You are a helpful strategist that helps builders launch ideas.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("OpenAI API Error:", data);
        return res.status(500).json({ error: data.error?.message || "Failed to generate plan" });
      }

      res.json({ content: data.choices?.[0]?.message?.content || "No response from AI." });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
