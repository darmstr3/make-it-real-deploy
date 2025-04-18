import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastNotificationProps {
  message: string;
  visible: boolean;
}

export default function ToastNotification({ message, visible }: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  
  if (!message) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
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
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-lg shadow-lg border border-green-400">
            <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
