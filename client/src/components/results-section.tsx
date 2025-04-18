import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Statement, FormData } from "@/pages/home";
import { motion } from "framer-motion";

interface ResultsSectionProps {
  statements: Statement[];
  isUnlocked: boolean;
  onRegenerate: (formData: FormData) => void;
  onUnlock: () => void;
  onCopy: (message: string) => void;
}

export default function ResultsSection({ 
  statements, 
  isUnlocked, 
  onRegenerate, 
  onUnlock, 
  onCopy 
}: ResultsSectionProps) {
  const formDataRef = useRef<FormData | null>(null);

  // Split statements into free and premium
  const freeStatements = statements.slice(0, 3);
  const premiumStatements = statements.slice(3, 6);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    onCopy("Copied to clipboard!");
  };

  const handleRegenerate = () => {
    if (formDataRef.current) {
      onRegenerate(formDataRef.current);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button 
          className="text-primary hover:text-blue-700 font-medium text-sm flex items-center transition duration-300"
          onClick={handleRegenerate}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Regenerate Statements
        </button>
      </div>
      
      {/* Free Statements */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {freeStatements.map((statement, index) => (
          <StatementCard 
            key={index}
            statement={statement.text} 
            index={index} 
            onCopy={handleCopy} 
            blurred={false}
          />
        ))}
      </motion.div>
      
      {/* Premium Section */}
      <div className="mt-12 relative border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            <span className="mr-2">Premium Positioning Statements</span>
            {!isUnlocked && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border border-purple-200">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Locked
              </span>
            )}
          </h3>
          
          {!isUnlocked && (
            <Button 
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white text-sm px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              onClick={onUnlock}
            >
              Unlock Premium
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {premiumStatements.map((statement, index) => (
            <div key={index + 3} className={!isUnlocked ? 'premium-card' : ''}>
              <StatementCard 
                statement={statement.text} 
                index={index + 3} 
                onCopy={handleCopy} 
                blurred={!isUnlocked}
              />
            </div>
          ))}
        </div>
        
        {/* Premium Side Drawer */}
        {!isUnlocked && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:absolute md:top-12 md:right-0 md:w-80 mt-8 md:mt-0 bg-white rounded-xl shadow-xl p-6 border border-purple-100 md:ml-6"
          >
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4 -mt-6 -mx-6 mb-6 rounded-t-xl">
              <h3 className="text-xl font-bold mb-1">Unlock Premium</h3>
              <p className="text-purple-100 text-sm">Get 3x more positioning statements</p>
            </div>
                
            <ul className="space-y-3 mb-6">
              <li className="flex items-start text-sm">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Unlock 9 proven messaging styles used by 6-figure consultants</span>
              </li>
              <li className="flex items-start text-sm">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Generate variations instantly</span>
              </li>
              <li className="flex items-start text-sm">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Includes expert PDF with positioning frameworks</span>
              </li>
              <li className="flex items-start text-sm">
                <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Use your copy in bios, decks, and websites</span>
              </li>
            </ul>
            
            <div className="bg-purple-50 p-3 rounded-lg mb-4 border border-purple-100">
              <p className="text-purple-800 text-sm font-medium">One-time payment, lifetime access</p>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              onClick={onUnlock}
            >
              <span className="relative z-10 flex items-center justify-center font-bold">
                <span>Unlock Premium – $19</span>
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface StatementCardProps {
  statement: string;
  index: number;
  onCopy: (text: string) => void;
  blurred: boolean;
}

function StatementCard({ statement, index, onCopy, blurred }: StatementCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={`bg-white rounded-xl shadow-md border border-gray-100 relative ${blurred ? 'blur-effect' : ''} h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden`}>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
              Format #{index + 1}
            </div>
            
            <button 
              className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-full hover:bg-blue-50"
              onClick={() => onCopy(statement)}
              disabled={blurred}
              title="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-800 font-medium text-lg leading-relaxed">{statement}</p>
        </div>
        
        <div className="px-5 pb-4 pt-2 border-t border-gray-50">
          <button 
            onClick={() => onCopy(statement)}
            disabled={blurred}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Statement
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
