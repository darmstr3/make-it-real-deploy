import { Card } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Enhanced loading messages with icons
const loadingMessages = [
  {
    message: "Analyzing your audience profile...",
    icon: "👥"
  },
  {
    message: "Crafting unique value propositions...",
    icon: "💎"
  },
  {
    message: "Identifying your key differentiators...",
    icon: "🔍"
  },
  {
    message: "Applying proven brand frameworks...",
    icon: "🏗️"
  },
  {
    message: "Building compelling positioning assets...",
    icon: "✨"
  },
  {
    message: "Finalizing your positioning kit...",
    icon: "🚀"
  }
];

// Additional coaching tips to show during loading
const coachingTips = [
  "Strong positioning is about clarity, not cleverness",
  "The best positioning answers 'Why should I choose you?'",
  "Good positioning speaks directly to your ideal client's needs",
  "Your positioning should be unique but still feel familiar",
  "Clear positioning builds confidence in your expertise"
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [dots, setDots] = useState("");
  
  // Rotate through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2800);
    
    return () => clearInterval(interval);
  }, []);
  
  // Rotate through coaching tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % coachingTips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animate loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="bg-white rounded-xl shadow-xl p-8 text-center border border-blue-50">
      <div className="flex flex-col items-center max-w-md mx-auto">
        {/* Main loading indicator */}
        <div className="relative mb-8">
          {/* Pulsing background */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-md opacity-70 animate-pulse"></div>
          
          {/* Outer spinning gradient ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 5,
              ease: "linear", 
              repeat: Infinity,
            }}
            className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
          >
            {/* Inner white circle */}
            <div className="absolute inset-1 bg-white rounded-full"></div>
            
            {/* Current stage icon */}
            <motion.div
              key={messageIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-3xl z-10"
            >
              <span role="img" aria-label="loading status icon">
                {loadingMessages[messageIndex].icon}
              </span>
            </motion.div>
          </motion.div>
          
          {/* Small orbiting element */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transformOrigin: "center" }}
          >
            <motion.div 
              className="absolute -left-1 top-1/2 transform -translate-y-1/2 bg-indigo-600 w-4 h-4 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Creating Your Positioning Kit
        </h3>
        
        {/* Current process message */}
        <div className="h-12 flex items-center justify-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-6 py-3 border border-indigo-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-indigo-700 font-medium flex items-center"
            >
              <span className="text-xl mr-3">{loadingMessages[messageIndex].icon}</span>
              <span>{loadingMessages[messageIndex].message}<span className="inline-block w-6">{dots}</span></span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2 mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
            initial={{ width: "5%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: loadingMessages.length * 3.5,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Coaching tip */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 relative mb-2">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Positioning Tip
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-800 italic mt-2"
            >
              "{coachingTips[tipIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
