import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { FormData } from "./step-form";
import { motion, AnimatePresence } from "framer-motion";

export interface PositioningOutput {
  websiteHeadline: string;
  socialBio: string;
  ctaPhrase: string;
  ctaSubheadline: string;
  summary: string;
}

interface PositioningResultsProps {
  output: PositioningOutput;
  formData: FormData;
  onDownload: () => void;
  onEmailSend: (email: string) => void;
  onRegenerate: () => void;
}

// Component icon map
const iconMap = {
  headline: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  ),
  bio: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  cta: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  summary: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
};

export default function PositioningResults({
  output,
  formData,
  onDownload,
  onEmailSend,
  onRegenerate
}: PositioningResultsProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showComingSoonToast, setShowComingSoonToast] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  // Coming soon handlers
  const handleComingSoonClick = (feature: string) => {
    console.log(`User clicked on coming soon feature: ${feature}`);
    setComingSoonMessage(`This feature is coming soon. We're tracking interest to prioritize it.`);
    setShowComingSoonToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowComingSoonToast(false);
    }, 3000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the coming soon handler instead of the actual email function
    handleComingSoonClick("email");
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="space-y-12">
      {/* Coming Soon Toast */}
      <AnimatePresence>
        {showComingSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20
            }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-3 rounded-lg shadow-lg border border-amber-400">
              <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="font-medium">{comingSoonMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header section */}
      <div className="text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Brand Positioning Kit
          </h2>
          <p className="text-gray-600 text-lg">
            Use these elements across your website, social media, and client conversations
          </p>
        </motion.div>
        
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={onRegenerate}
            className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:border-indigo-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate All Content
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Headline */}
        <ResultCard 
          title="Website Headline"
          description="Use this as your main headline"
          icon={iconMap.headline}
          content={output.websiteHeadline}
          id="headline"
          copied={copied === "headline"}
          onCopy={handleCopy}
          isActive={activeCard === "headline"}
          setActive={setActiveCard}
        />
        
        {/* Social Bio */}
        <ResultCard 
          title="Social Media Bio"
          description="Perfect for Instagram or LinkedIn"
          icon={iconMap.bio}
          content={output.socialBio}
          id="bio"
          copied={copied === "bio"}
          onCopy={handleCopy}
          isActive={activeCard === "bio"}
          setActive={setActiveCard}
        />
        
        {/* CTA Section */}
        <ResultCard 
          title="Call-to-Action"
          description="For buttons and lead generation"
          icon={iconMap.cta}
          content={`${output.ctaPhrase}\n\n${output.ctaSubheadline}`}
          id="cta"
          copied={copied === "cta"}
          onCopy={handleCopy}
          isActive={activeCard === "cta"}
          setActive={setActiveCard}
        />
        
        {/* Summary */}
        <ResultCard 
          title="Brand Summary"
          description="Use for your about page or pitches"
          icon={iconMap.summary}
          content={output.summary}
          id="summary"
          copied={copied === "summary"}
          onCopy={handleCopy}
          isActive={activeCard === "summary"}
          setActive={setActiveCard}
        />
      </div>

      {/* Action buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-100 p-8 mt-12"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Save Your Positioning Kit</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Download Doc */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">Download Document</h3>
            <p className="text-gray-600 mb-5">
              Get a formatted document with all your positioning elements for easy reference and sharing
            </p>
            <div className="relative">
              <Button
                onClick={() => handleComingSoonClick("download")}
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white w-full py-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-default opacity-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Document
              </Button>
              <Badge 
                variant="outline" 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-amber-50 text-amber-700 border-amber-200 px-3 py-1"
              >
                Coming Soon
              </Badge>
            </div>
          </div>

          {/* Email Results */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">Email Results</h3>
            {emailSent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-100 rounded-lg p-4 text-green-800"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="font-medium">Email sent! Check your inbox shortly.</p>
                </div>
              </motion.div>
            ) : (
              <>
                <p className="text-gray-600 mb-5">
                  Receive your positioning kit in your email inbox for safekeeping
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <div className="relative">
                    <Button
                      type="submit"
                      disabled={!isValidEmail}
                      className="bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white w-full py-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-default opacity-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send to My Email
                    </Button>
                    <Badge 
                      variant="outline" 
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-amber-50 text-amber-700 border-amber-200 px-3 py-1"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ResultCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  id: string;
  copied: boolean;
  isActive: boolean;
  onCopy: (text: string, id: string) => void;
  setActive: (id: string | null) => void;
}

function ResultCard({ 
  title, 
  description,
  icon,
  content, 
  id, 
  copied, 
  isActive,
  onCopy,
  setActive 
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * parseInt(id === "headline" ? "1" : id === "bio" ? "2" : id === "cta" ? "3" : "4") }}
      className="h-full"
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
    >
      <Card 
        className={`bg-white rounded-xl shadow-md border overflow-hidden h-full transition-all duration-300 ${
          isActive 
            ? "shadow-lg border-indigo-200 transform -translate-y-1" 
            : "border-gray-100 hover:shadow-md hover:-translate-y-1"
        }`}
      >
        <div className={`px-5 py-4 border-b border-gray-100 transition-colors ${
          isActive ? "bg-gradient-to-r from-indigo-50 to-blue-50" : "bg-gradient-to-r from-gray-50 to-slate-50"
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                isActive ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"
              }`}>
                {icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
            <button
              onClick={() => onCopy(content, id)}
              className={`transition-colors p-1.5 rounded-full ${
                copied 
                  ? "text-green-500 bg-green-50" 
                  : isActive 
                    ? "text-indigo-500 hover:bg-indigo-50" 
                    : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
              }`}
              title="Copy to clipboard"
              aria-label={`Copy ${title} to clipboard`}
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="prose">
            {content.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-800 leading-relaxed mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
            <button 
              onClick={() => onCopy(content, id)}
              className={`text-sm font-medium flex items-center transition-colors ${
                copied 
                  ? "text-green-600" 
                  : isActive 
                    ? "text-indigo-600 hover:text-indigo-700" 
                    : "text-blue-600 hover:text-blue-700"
              }`}
            >
              {copied ? "Copied!" : "Copy Text"}
              <svg className="h-4 w-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}