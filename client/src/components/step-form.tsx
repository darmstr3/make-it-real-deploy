import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { motion, AnimatePresence } from "framer-motion";

// Define the form schema based on our updated data model
const formSchema = z.object({
  workDescription: z.string().min(3, { message: "Please describe what you do" }),
  service: z.string().min(3, { message: "Please describe your current service or offer" }),
  transformation: z.string().min(3, { message: "Please describe the outcome you deliver" }),
  audience: z.string().min(3, { message: "Please describe your target audience" }),
  painPoints: z.string().min(3, { message: "Please describe common pain points" }),
  misunderstanding: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

// Question definitions with explanations, examples, and coaching tips
const questions = [
  {
    id: "workDescription",
    question: "What do you do?",
    explanation: "Start with a simple description of your work",
    placeholder: "e.g., I'm a business coach for creative entrepreneurs",
    inputType: "input",
    tips: [
      "Be specific rather than using general terms",
      "Focus on the main role you play for your clients",
      "Avoid industry jargon that clients might not understand"
    ],
    icon: "👩‍💼"
  },
  {
    id: "service",
    question: "What service or offer are you currently selling?",
    explanation: "Focus on your main product or service",
    placeholder: "e.g., 1:1 coaching program called 'Creative Clarity'",
    inputType: "input",
    tips: [
      "Name your specific offer (if it has a name)",
      "Describe the format (course, coaching, consulting, etc.)",
      "Include the timeframe if relevant (6-week, monthly, etc.)"
    ],
    icon: "🛍️"
  },
  {
    id: "transformation",
    question: "What outcome or transformation do you deliver?",
    explanation: "Describe the specific results clients can expect",
    placeholder: "e.g., Help clients double their income while working fewer hours",
    inputType: "input",
    tips: [
      "Focus on measurable results when possible (numbers, percentages)",
      "Include both tangible and emotional outcomes",
      "Think about the before/after state of your clients"
    ],
    icon: "✨"
  },
  {
    id: "audience",
    question: "What niche or audience do you serve?",
    explanation: "Be as specific as possible about who your ideal clients are",
    placeholder: "e.g., Female photographers who have been in business 2-5 years",
    inputType: "input",
    tips: [
      "The more specific you are, the more your message will resonate",
      "Include demographics, psychographics, or industry details",
      "Think about where they are in their journey"
    ],
    icon: "👥"
  },
  {
    id: "painPoints",
    question: "What are common pain points they experience daily?",
    explanation: "These are the frustrations that drive them to seek your help",
    placeholder: "e.g., Feeling overwhelmed by admin tasks and unable to focus on creative work",
    inputType: "textarea",
    tips: [
      "What keeps your clients up at night?",
      "What frustrations do they mention in initial calls?",
      "What have they tried that hasn't worked?"
    ],
    icon: "😟"
  },
  {
    id: "misunderstanding",
    question: "What do people misunderstand or undervalue about what you do?",
    explanation: "This helps address objections in your positioning",
    placeholder: "e.g., They think they need more clients, but actually need better systems",
    inputType: "textarea",
    tips: [
      "What do prospects often get wrong about your services?",
      "What objection do you hear most frequently?",
      "What value do you provide that isn't immediately obvious?"
    ],
    icon: "🤔"
  }
];

interface StepFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export default function StepForm({ onSubmit, loading }: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTips, setShowTips] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workDescription: "",
      service: "",
      transformation: "",
      audience: "",
      painPoints: "",
      misunderstanding: "",
    },
    mode: "onChange",
  });

  // Field value for current step
  const currentFieldId = questions[currentStep].id as keyof FormData;
  const currentFieldValue = form.watch(currentFieldId);
  const isCurrentFieldValid = !form.formState.errors[currentFieldId];
  const isLastQuestion = currentStep === questions.length - 1;
  
  // Auto-show tips after a delay
  useEffect(() => {
    setShowTips(false);
    const timer = setTimeout(() => {
      setShowTips(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentStep]);
  
  // Handle next step logic
  const handleNextStep = async () => {
    // Validate current field
    const result = await form.trigger(currentFieldId);
    
    if (result) {
      if (isLastQuestion) {
        form.handleSubmit((data) => onSubmit(data))();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };
  
  // Handle key press (Enter to go to next step)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && isCurrentFieldValid && currentFieldValue) {
      e.preventDefault();
      handleNextStep();
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleNextStep();
        }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {/* Progress Indicator */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-700 ease-in-out" 
            style={{ width: `${(currentStep / (questions.length - 1)) * 100}%` }}
          ></div>
          <div className="flex justify-between mt-2">
            <p className="text-sm font-medium text-gray-600">Step {currentStep + 1} of {questions.length}</p>
            <p className="text-sm font-medium text-indigo-600">{Math.round((currentStep / (questions.length - 1)) * 100)}% complete</p>
          </div>
        </div>
        
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Question Header */}
            <div className="flex gap-4 items-start">
              <div className="text-4xl bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-blue-200">
                <span role="img" aria-label="question icon" className="text-2xl">
                  {currentQuestion.icon}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {currentQuestion.question}
                </h2>
                <p className="text-gray-600 text-base">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg">
              <FormField
                control={form.control}
                name={currentQuestion.id as any}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-700 font-medium">
                      Your answer:
                    </FormLabel>
                    <FormControl>
                      {currentQuestion.inputType === "textarea" ? (
                        <Textarea
                          placeholder={currentQuestion.placeholder}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm min-h-[150px] text-base"
                          {...field}
                          onKeyDown={handleKeyPress}
                        />
                      ) : (
                        <Input
                          placeholder={currentQuestion.placeholder}
                          className="w-full px-4 py-5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-base"
                          {...field}
                          onKeyDown={handleKeyPress}
                        />
                      )}
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">
                      Press Enter to continue
                    </FormDescription>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Coaching Tips */}
            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100"
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-indigo-900 mb-2">Coaching Tips</h3>
                      <ul className="space-y-2">
                        {currentQuestion.tips.map((tip, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="flex items-start text-indigo-800"
                          >
                            <svg className="h-4 w-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{tip}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0 || loading}
            className="px-6 py-3 text-base border border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
          
          <Button
            type={isLastQuestion ? "submit" : "button"}
            onClick={handleNextStep}
            disabled={!isCurrentFieldValid || !currentFieldValue || loading}
            className={`px-8 py-3 text-base font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] ${
              isLastQuestion 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            } text-white`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Your Positioning...
              </div>
            ) : (
              <>
                {isLastQuestion ? "Generate Positioning Kit" : "Continue"}
                {!isLastQuestion && (
                  <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                )}
                {isLastQuestion && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}