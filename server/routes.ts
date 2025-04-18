import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { generatePositioningContent, PositioningOutput } from "./services/openai";
// The server/index.ts file already handles environment variable loading,
// so we don't need to call dotenv.config() again here.

export async function registerRoutes(app: Express): Promise<Server> {
  // Create OpenAI client with API key from environment
  // Use process.env.OPENAI_API_KEY directly without intermediate variable
  // This is more secure and compatible with deployment environments like Render
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY not set in environment variables");
    // In production, you might want to throw an error here or set up fallback behavior
  }
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // API endpoint to generate positioning content
  app.post('/api/generate', async (req, res) => {
    try {
      const { 
        workDescription, 
        service, 
        transformation, 
        audience, 
        painPoints,
        misunderstanding 
      } = req.body;
      
      // Validate required fields
      if (!workDescription || !service || !transformation || !audience || !painPoints) {
        return res.status(400).json({ 
          message: "Missing required fields. Please complete all required questions." 
        });
      }
      
      // Generate positioning content using OpenAI
      const output = await generatePositioningContent(
        openai,
        workDescription,
        service,
        transformation,
        audience,
        painPoints,
        misunderstanding
      );
      
      // Log the request to console (simulate Airtable logging)
      console.log('New positioning request:', {
        timestamp: new Date().toISOString(),
        workDescription,
        service,
        transformation,
        audience,
        painPoints,
        misunderstanding
      });
      
      // Return generated content
      res.json({ output });
    } catch (error) {
      console.error("Error generating positioning content:", error);
      res.status(500).json({ 
        message: "An error occurred while generating your positioning content. Please try again." 
      });
    }
  });
  
  // API endpoint to log document download
  app.post('/api/log-download', async (req, res) => {
    try {
      const { requestData } = req.body;
      
      // Log the download to console (simulate Airtable logging)
      console.log('Document downloaded:', {
        timestamp: new Date().toISOString(),
        requestData,
        action: 'download'
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error logging download:", error);
      res.status(500).json({ message: "An error occurred while logging download." });
    }
  });
  
  // API endpoint to send email
  app.post('/api/send-email', async (req, res) => {
    try {
      const { email, requestData, output } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email address is required." });
      }
      
      // Log the email request to console
      console.log('Email requested:', {
        timestamp: new Date().toISOString(),
        email,
        action: 'email'
      });
      
      // Import the email service (dynamically to avoid circular imports)
      const { sendPositioningEmail } = await import('./services/email');
      
      // Send the email
      const emailSent = await sendPositioningEmail({
        to: email,
        positioningOutput: output,
        formData: requestData
      });
      
      if (emailSent) {
        res.json({ success: true });
      } else {
        // If email fails, provide a fallback message
        res.status(500).json({ 
          message: "Failed to send email. Please try downloading the document instead.",
          fallback: true 
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ 
        message: "An error occurred while sending email. Please try downloading the document instead.",
        fallback: true
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
