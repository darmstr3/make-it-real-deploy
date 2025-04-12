import { useEffect, useRef } from "react";

interface OutputDisplayProps {
  generatedPlan: { content: string } | null;
  isLoading: boolean;
}

export default function OutputDisplay({ generatedPlan, isLoading }: OutputDisplayProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (!generatedPlan) return;
    
    const text = outputRef.current?.innerText || "";
    navigator.clipboard.writeText(text).then(() => {
      const copyBtn = document.getElementById("copyBtn");
      if (!copyBtn) return;
      
      const originalText = copyBtn.innerHTML;
      
      copyBtn.innerHTML = "✅ Copied!";
      copyBtn.classList.add("bg-green-100", "text-green-800", "border-green-200");
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove("bg-green-100", "text-green-800", "border-green-200");
      }, 2000);
    });
  };

  useEffect(() => {
    if (generatedPlan && !isLoading && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedPlan, isLoading]);

  const formatContent = (content: string) => {
    // First remove any quotes and asterisks in the response
    content = content.replace(/["']([^"']+)["']/g, "$1");
    content = content.replace(/\*([^*]+)\*/g, "$1");
    content = content.replace(/\*\*([^*]+)\*\*/g, "$1");
    
    // Pre-process to add line breaks for proper formatting
    content = content.replace(/^(One-liner Pitch:|Landing Page Copy:|Three Cold DMs:|Task Plan:|Suggested Pricing Model:)/gm, "\n\n$1");
    
    // Apply formatting in a specific order with consistent spacing
    let formatted = content
      // Main section headers (One-liner Pitch:, Landing Page Copy:, etc.)
      .replace(/^(One-liner Pitch:|Landing Page Copy:|Three Cold DMs:|Task Plan:|Suggested Pricing Model:)/gm, 
        "<h2 class='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mt-8 mb-4 pb-1 border-b border-purple-100'>$1</h2>")
      
      // Format text content after main headers as black text with consistent spacing
      .replace(/<\/h2>([^<]*)/g, "</h2><p class='text-slate-800 mt-2 mb-4'>$1</p>")
      
      // Secondary headers (Headline:, Subheadline:, 3 Value Bullets:, etc.)
      .replace(/^(Headline:|Subheadline:|3 Value Bullets:|CTA:)/gm, 
        "<h3 class='text-lg font-semibold text-purple-700 mt-5 mb-2'>$1</h3>")
      
      // DM sections (Direct DM:, Friendly DM:, High-status DM:) with improved spacing
      .replace(/^(Direct DM:|Friendly DM:|High-status DM:)/gm, 
        "<h3 class='text-lg font-semibold text-purple-700 mt-8 mb-2 pb-1 border-b border-purple-100'>$1</h3>")
      
      // Task sections (Today:, Tomorrow:, This Week:) - make these bold and larger
      .replace(/^- (Today:|Tomorrow:|This Week:)/gm, 
        "<h3 class='text-lg font-bold text-purple-800 mt-5 mb-2'>$1</h3>")
      
      // Process task sections and their bullets
      .replace(/(<h3 class=['"].*?['"]>Today:<\/h3>)([\s\S]*?)(?=<h3|<h2|$)/g, 
        "$1<div class='space-y-1 mt-1 mb-4'>$2</div>")
      .replace(/(<h3 class=['"].*?['"]>Tomorrow:<\/h3>)([\s\S]*?)(?=<h3|<h2|$)/g, 
        "$1<div class='space-y-1 mt-1 mb-4'>$2</div>")
      .replace(/(<h3 class=['"].*?['"]>This Week:<\/h3>)([\s\S]*?)(?=<h3|<h2|$)/g, 
        "$1<div class='space-y-1 mt-1 mb-4'>$2</div>")
      
      // Individual bulleted list items with consistent styling and tighter spacing
      .replace(/^- ([^<:\n]+)(?=<br>|$)/gm, 
        "<div class='flex items-start mb-1'><span class='text-purple-600 mr-2'>•</span><span class='flex-1 text-slate-800'>$1</span></div>")
      
      // Numbered list items with consistent spacing and tighter layout
      .replace(/^(\d+\.\s)([^<:\n]+)(?=<br>|$)/gm, 
        "<div class='flex items-start mb-1'><span class='text-purple-700 font-medium mr-2'>$1</span><span class='flex-1 text-slate-800'>$2</span></div>")
      
      // Content after DM headers should be closer to their headers with minimal spacing
      .replace(/(<h3 class=['"].*?(Direct DM:|Friendly DM:|High-status DM:).*?['"]>.*?<\/h3>)([^<]*)/g, 
        "$1<p class='text-slate-800 mt-1 mb-3'>$3</p>")
      
      // Content after secondary headers (non-DM) 
      .replace(/<\/h3>([^<]+)(?=<h|$)/g, 
        "</h3><p class='text-slate-800 mt-1 mb-3'>$1</p>")
      
      // Add consistent spacing between sections
      .replace(/\n\n/g, "<div class='my-3'></div>")
      
      // Basic line breaks
      .replace(/\n/g, "<br>");
      
      // Clean up any doubled paragraph tags
      formatted = formatted.replace(/<\/p><p class=[^>]+>/g, "<br>");
      
      return formatted;
  };

  // Always show the component, with an empty state if needed

  return (
    <>
      <div
        ref={outputRef}
        id="output"
        className={`bg-white rounded-xl shadow-md p-6 md:p-8 border ${
          isLoading ? 'border-slate-200' : 'border-purple-100'
        } transition-all duration-300 leading-relaxed text-slate-700 sticky top-4 h-[560px] overflow-y-auto`}
        dangerouslySetInnerHTML={
          isLoading
            ? {
                __html: `<div class="flex items-center justify-center h-full">
                  <div class="inline-flex items-center px-6 py-3 rounded-lg bg-purple-50 border border-purple-100 font-semibold leading-6 text-slate-700 shadow-sm">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-purple-600">Generating your startup plan...</span>
                  </div>
                </div>`,
              }
            : generatedPlan
            ? { 
                __html: `
                <div class="prose prose-slate max-w-none mb-2">
                  ${formatContent(generatedPlan.content)}
                </div>
                `
              }
            : { __html: `
                <div class="flex flex-col items-center justify-center h-full text-center">
                  <div class="text-6xl mb-5">✨</div>
                  <h3 class="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-3">Your startup plan will appear here</h3>
                  <p class="text-slate-500 max-w-md">Enter your idea in the form and click "Generate Startup Plan" to see your complete launch strategy</p>
                </div>
            ` }
        }
      ></div>

      {generatedPlan && !isLoading && (
        <button
          id="copyBtn"
          onClick={copyToClipboard}
          className="w-full mt-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-700 font-medium py-3 px-6 rounded-lg transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 border border-purple-200 flex items-center justify-center"
        >
          <span className="mr-2">📋</span> Copy to Clipboard
        </button>
      )}
    </>
  );
}
