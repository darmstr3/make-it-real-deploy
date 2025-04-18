import { useState, useEffect, useRef } from "react";
import LandingPage from "../components/landing-page";
import StepForm, { FormData } from "../components/step-form";
import PositioningResults, { PositioningOutput } from "../components/positioning-results";
import LoadingState from "../components/loading-state";
import ToastNotification from "../components/toast-notification";
import Footer from "../components/footer";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { Card } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { generateDocx, downloadDocx } from "../lib/docx-generator";

// Structure for regeneration tracking
interface RegenerationLimit {
  count: number;
  timestamp: number;
}

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [positioningOutput, setPositioningOutput] = useState<PositioningOutput | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenLimitReached, setRegenLimitReached] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Check if user already started the process
  useEffect(() => {
    // Skip landing page if there's already results or if form started
    const hasStarted = sessionStorage.getItem("positionkit_started");
    if (hasStarted === "true" || positioningOutput) {
      setShowLanding(false);
    }
  }, []);

  // Auto-scroll to results when output is generated
  useEffect(() => {
    if (positioningOutput && !loading && resultsRef.current) {
      // Smooth scroll to results
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Show success message
      setShowSuccess(true);
      
      // Hide success message after 4 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [positioningOutput, loading]);

  // Mutation for generating positioning content
  const generateMutation = useMutation({
    mutationFn: (data: FormData) => 
      apiRequest("POST", "/api/generate", data).then(res => res.json()),
    onSuccess: (data) => {
      // Update state with new positioning output
      setPositioningOutput(data.output);
      
      // Reset loading states
      setLoading(false);
      
      // Show appropriate success message
      if (regenerating) {
        // For regeneration, show a toast and scroll to results
        showToast("Content regenerated successfully!");
        
        // Delay slightly to ensure DOM is updated
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
      
      // Reset regenerating flag at the end
      setRegenerating(false);
      
      // Original success for first generation will be shown via the useEffect
    },
    onError: (error) => {
      console.error("Error generating positioning content:", error);
      setToast({
        visible: true,
        message: "An error occurred. Please try again."
      });
      
      // Reset all loading states
      setLoading(false);
      setRegenerating(false);
      setRegenLimitReached(false);
    }
  });
  
  // Mutation for logging document downloads
  const downloadMutation = useMutation({
    mutationFn: (data: { requestData: FormData }) => 
      apiRequest("POST", "/api/log-download", data),
    onSuccess: () => {
      console.log("Download logged successfully");
    },
    onError: (error) => {
      console.error("Error logging download:", error);
    }
  });
  
  // Mutation for sending email
  const emailMutation = useMutation({
    mutationFn: (data: { email: string, requestData: FormData, output: PositioningOutput }) => 
      apiRequest("POST", "/api/send-email", data),
    onSuccess: () => {
      showToast("Email sent successfully!");
    },
    onError: (error) => {
      console.error("Error sending email:", error);
      showToast("Failed to send email. Please try again or download instead.");
    }
  });

  // Handle starting the form process from landing page
  const handleGetStarted = () => {
    // Scroll to top first, then change state
    window.scrollTo(0, 0);
    
    // Set state after a small delay to prevent weird animation
    setTimeout(() => {
      setShowLanding(false);
      sessionStorage.setItem("positionkit_started", "true");
    }, 50);
  };

  // Handle form submission
  const handleSubmit = (data: FormData) => {
    setLoading(true);
    setFormData(data);
    generateMutation.mutate(data);
  };

  // Check regeneration limit (2 per hour)
  const checkRegenerationLimit = (): boolean => {
    const REGEN_LIMIT = 2; // Maximum number of regenerations per hour
    const ONE_HOUR_MS = 60 * 60 * 1000; // One hour in milliseconds
    
    // Get stored regeneration data
    const storedRegenData = localStorage.getItem('positionkit_regen_limit');
    let regenData: RegenerationLimit = { count: 0, timestamp: Date.now() };
    
    if (storedRegenData) {
      try {
        regenData = JSON.parse(storedRegenData);
        
        // Reset count if it's been more than an hour since first regeneration
        if (Date.now() - regenData.timestamp > ONE_HOUR_MS) {
          regenData = { count: 0, timestamp: Date.now() };
        }
      } catch (error) {
        console.error("Error parsing regeneration data:", error);
        regenData = { count: 0, timestamp: Date.now() };
      }
    }
    
    // Check if limit reached
    if (regenData.count >= REGEN_LIMIT) {
      const timeLeft = Math.ceil((regenData.timestamp + ONE_HOUR_MS - Date.now()) / (60 * 1000));
      showToast(`Regeneration limit reached. Please try again in ${timeLeft} minutes.`);
      setRegenLimitReached(true);
      return false;
    }
    
    // Increment count and save
    regenData.count++;
    localStorage.setItem('positionkit_regen_limit', JSON.stringify(regenData));
    return true;
  };

  // Handle regeneration
  const handleRegenerate = () => {
    if (formData) {
      // Check regeneration limit
      if (!checkRegenerationLimit()) {
        return;
      }
      
      // Set loading and scroll to results section
      setLoading(true);
      setRegenerating(true);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Trigger the API call
      generateMutation.mutate(formData);
      
      // Log regeneration
      console.log("User regenerated content", {
        timestamp: new Date().toISOString(),
        feature: "regenerate"
      });
    }
  };
  
  // Handle document download
  const handleDownload = () => {
    if (positioningOutput && formData) {
      // Log the download interest
      console.log("User clicked on download document button", {
        timestamp: new Date().toISOString(),
        feature: "download",
        data: {
          hasPositioningOutput: !!positioningOutput,
          hasFormData: !!formData
        }
      });
      
      // Log the download click (this is just for tracking interest)
      downloadMutation.mutate({ requestData: formData });
    }
  };
  
  // Handle email sending
  const handleSendEmail = (email: string) => {
    if (positioningOutput && formData) {
      // Log the email interest
      console.log("User clicked on email button", {
        timestamp: new Date().toISOString(),
        feature: "email",
        data: {
          hasPositioningOutput: !!positioningOutput,
          hasFormData: !!formData,
          email: email  // Log the email address to measure interest
        }
      });
      
      // Track email interest
      emailMutation.mutate({ 
        email, 
        requestData: formData,
        output: positioningOutput
      });
    }
  };

  // Show toast notification
  const showToast = (message: string) => {
    setToast({ visible: true, message });
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section - Only show when form is visible */}
      {!showLanding && (
        <header className="max-w-5xl mx-auto text-center py-8 px-4">
          <a href="/" className="inline-block" onClick={(e) => {
            e.preventDefault();
            setShowLanding(true);
          }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-transform hover:scale-105">PositionKit</h1>
          </a>
          {!positioningOutput && (
            <p className="text-gray-600 max-w-xl mx-auto">Step-by-step positioning to help you stand out in your market</p>
          )}
        </header>
      )}

      {/* Main Content */}
      <main>
        {/* Landing Page */}
        <AnimatePresence mode="wait">
          {showLanding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onGetStarted={handleGetStarted} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form and Results Section */}
        {!showLanding && (
          <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            {/* Form Section - Show only if no results yet */}
            {!positioningOutput && (
              <div ref={formRef}>
                <AnimatePresence mode="wait">
                  {!loading ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <StepForm 
                            onSubmit={handleSubmit} 
                            loading={generateMutation.isPending} 
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-8">
                          <LoadingState />
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Generation Success message */}
            <AnimatePresence>
              {showSuccess && positioningOutput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert className="bg-green-50 border-green-200 text-green-800 rounded-lg shadow-sm mb-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-1 rounded-full mr-2">
                        <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <AlertDescription className="font-medium">
                        Your positioning kit is ready! Check out your results below.
                      </AlertDescription>
                    </div>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Section */}
            <div ref={resultsRef} className="scroll-mt-4">
              <AnimatePresence mode="wait">
                {/* Show loading state when regenerating */}
                {positioningOutput && loading && regenerating && (
                  <motion.div
                    key="regenerating-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="p-8">
                        <LoadingState />
                        <p className="text-center text-gray-600 mt-4">
                          Regenerating your positioning content...
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Show results when not loading */}
                {positioningOutput && !loading && formData && (
                  <motion.div
                    key="results-state"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <Card className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                      <div className="p-6 md:p-8">
                        <PositioningResults 
                          output={positioningOutput}
                          formData={formData}
                          onDownload={handleDownload}
                          onEmailSend={handleSendEmail}
                          onRegenerate={handleRegenerate}
                        />
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ToastNotification 
              message={toast.message} 
              visible={toast.visible} 
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
