export async function generatePlan(idea: string, tone: string): Promise<string> {
  try {
    // We no longer need to check for API key on client side
    // The API key is now securely stored on the server side
    
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
