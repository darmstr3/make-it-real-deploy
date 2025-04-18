import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-sm text-white font-bold">P</div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PositionKit
              </span>
            </motion.div>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Helping coaches and solopreneurs clarify their positioning and attract ideal clients.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/positioning-guide" 
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/positioning-guide");
                    }}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Positioning Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="/examples" 
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/examples");
                    }}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/privacy-policy" 
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/privacy-policy");
                    }}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms-of-service" 
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/terms-of-service");
                    }}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-8 pt-6 flex justify-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PositionKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
