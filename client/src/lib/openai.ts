export async function generatePlan(idea: string, tone: string): Promise<string> {
  try {
    // Check if API key is available in the environment
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.warn("OpenAI API key is missing. Please set VITE_OPENAI_API_KEY in your .env file.");
    }
    
    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea, tone }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error || "Failed to generate plan");
    }

    return data.content || "No response from AI.";
  } catch (error) {
    console.error("Generate plan error:", error);
    throw error;
  }
}
