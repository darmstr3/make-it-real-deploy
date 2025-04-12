import IdeaForm from "@/components/IdeaForm";
import OutputDisplay from "@/components/OutputDisplay";
import { useState } from "react";

interface GeneratedPlan {
  content: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  
  return (
    <div className="bg-gradient-to-b from-purple-50 to-indigo-50 font-sans text-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <span className="mr-3 text-3xl md:text-4xl">🛠️</span> 
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Make It Real</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto">
            Describe your idea below and get a one-liner, landing copy, DMs, task list, and pricing.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Left column - Input form */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 sticky top-4 h-[560px] flex flex-col">
              <IdeaForm 
                onGeneratePlan={(plan) => setGeneratedPlan(plan)} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
          
          {/* Right column - Output display */}
          <div className="lg:w-1/2 flex flex-col">
            <OutputDisplay 
              generatedPlan={generatedPlan} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
