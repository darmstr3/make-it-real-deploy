import OpenAI from "openai";

export interface PositioningOutput {
  websiteHeadline: string;
  socialBio: string;
  ctaPhrase: string;
  ctaSubheadline: string;
  summary: string;
}

export async function generatePositioningContent(
  openai: OpenAI,
  workDescription: string,
  service: string,
  transformation: string,
  audience: string,
  painPoints: string,
  misunderstanding?: string
): Promise<PositioningOutput> {
  try {
    // Check if OpenAI client has an API key but don't log the actual key
    if (!openai.apiKey) {
      console.error("ERROR: OpenAI API key is missing. Please check environment variables.");
      throw new Error("OpenAI API key is not configured properly");
    }
    
    console.log("Starting OpenAI request with API key present:", !!openai.apiKey);
    
    const systemPrompt = `
      You are a brand strategist trained in frameworks like StoryBrand, April Dunford, and Hormozi. 
      Based on the user's answers, generate clear and compelling positioning for their business.
      Your job is to help them articulate their value in a compelling way for different contexts.
      
      Return the output in the following JSON format:
      {
        "websiteHeadline": "A clear, compelling headline for their website homepage",
        "socialBio": "A concise professional bio for social media profiles (150 chars max)",
        "ctaPhrase": "A call-to-action headline that converts",
        "ctaSubheadline": "A supporting sentence that adds context to the CTA",
        "summary": "A 1-paragraph summary of what they do and who they serve (200 words max)"
      }
      
      Make each piece unique, compelling, and free of generic business jargon. Sound like a skilled marketer
      who understands the client's industry. Use specificity and clarity to make their positioning stand out.
    `;

    const userPrompt = `
      Please create positioning content for my business based on this information:
      
      What I do: ${workDescription}
      My service/offer: ${service}
      Transformation I deliver: ${transformation}
      My target audience: ${audience}
      Their pain points: ${painPoints}
      ${misunderstanding ? `What people misunderstand: ${misunderstanding}` : ''}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    console.log("Received response from OpenAI:", content.substring(0, 100) + "...");

    // Parse JSON response
    try {
      const parsedResponse = JSON.parse(content);
      
      // Check if the response has the expected format
      if (!parsedResponse.websiteHeadline || !parsedResponse.socialBio || 
          !parsedResponse.ctaPhrase || !parsedResponse.ctaSubheadline || !parsedResponse.summary) {
        console.error("Invalid response format from OpenAI:", parsedResponse);
        
        // Return a default response if we can't parse it correctly
        return {
          websiteHeadline: "Transform your business with expert positioning",
          socialBio: "I help businesses clarify their messaging and stand out in their market",
          ctaPhrase: "Ready to transform your positioning?",
          ctaSubheadline: "Get clear, compelling messaging that converts",
          summary: "We couldn't generate custom content with your inputs. Please try again with more specific details about your business."
        };
      }

      return parsedResponse as PositioningOutput;
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.error("Raw response content:", content);
      throw new Error("Failed to parse OpenAI response");
    }
  } catch (error: any) {
    console.error("Error in OpenAI API call:", error);
    const errorMessage = error.message || "Unknown error occurred";
    throw new Error(`Failed to generate positioning content: ${errorMessage}`);
  }
}
