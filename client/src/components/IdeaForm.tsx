import { useState } from "react";
import { generatePlan } from "@/lib/openai";

interface IdeaFormProps {
  onGeneratePlan: (plan: { content: string }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function IdeaForm({ onGeneratePlan, isLoading, setIsLoading }: IdeaFormProps) {
  const [idea, setIdea] = useState<string>("");
  const [tone, setTone] = useState<string>("bold");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      alert("Please enter your idea first.");
      return;
    }
    
    // Check if the OpenAI API key is available
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      alert("OpenAI API key is missing. Please add your VITE_OPENAI_API_KEY to the .env file.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await generatePlan(idea, tone);
      onGeneratePlan({ content: result });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate plan. Please check that your API key is valid and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="mb-4 flex-1 flex flex-col">
        <label htmlFor="ideaInput" className="block text-sm font-medium text-slate-700 mb-2">
          Your Idea
        </label>
        <textarea
          id="ideaInput"
          placeholder="Describe your startup idea in detail..."
          className="w-full p-4 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition duration-200 flex-1 text-slate-800 bg-slate-50"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-6 mt-2">
        <label htmlFor="toneSelect" className="block text-sm font-medium text-slate-700 mb-2">
          Communication Tone
        </label>
        <select
          id="toneSelect"
          className="w-full p-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition bg-white text-slate-800"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="bold">Bold</option>
          <option value="clear">Clear</option>
          <option value="friendly">Friendly</option>
          <option value="witty">Witty</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 px-6 rounded-lg transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center mb-0 ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          "Generate Startup Plan"
        )}
      </button>
    </form>
  );
}
