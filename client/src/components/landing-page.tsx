import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl px-4 md:px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          >
            Clarify Your Brand Positioning in Minutes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          >
            Transform your services into crystal-clear messaging that makes people say "I need that!"
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 text-lg rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Clarifying My Message
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl mb-4 bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">The Problem</h2>
              <p className="text-gray-600 text-lg mb-2">Most service providers struggle to explain what they do in a way that connects with clients.</p>
              <p className="text-gray-600 text-lg">The result? Missed opportunities, confusion, and frustration when your value isn't immediately clear.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <p className="text-gray-500 italic mb-4">"I know I deliver great results, but when people ask what I do, I freeze up and my explanation falls flat."</p>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600">JM</span>
                </div>
                <div>
                  <p className="font-medium">Jane M.</p>
                  <p className="text-sm text-gray-500">Business Coach</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-100 order-2 md:order-1"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-1">
                <div className="bg-white py-6 px-6 rounded-t-xl border-b border-gray-100">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">Before ⟶ After</span>
                </div>
              </div>
              <div className="grid grid-cols-2 p-6 gap-4 bg-white">
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 text-gray-500 text-sm">
                  "I help entrepreneurs with their business challenges."
                </div>
                <div className="border border-indigo-100 rounded-lg p-4 bg-indigo-50 text-indigo-800 font-medium text-sm shadow-sm">
                  "I help course creators double their sales by fixing the gaps in their launch strategy."
                </div>
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 text-gray-500 text-sm">
                  "I'm a coach who works with women."
                </div>
                <div className="border border-indigo-100 rounded-lg p-4 bg-indigo-50 text-indigo-800 font-medium text-sm shadow-sm">
                  "I help women leaders overcome imposter syndrome so they can confidently pursue promotions."
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="text-4xl mb-4 bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">The Solution</h2>
              <p className="text-gray-600 text-lg mb-4">PositionKit guides you step-by-step to develop clear, compelling messaging that resonates with your ideal clients.</p>
              <ul className="space-y-3">
                {[
                  "Answer simple questions in a guided flow",
                  "Receive professionally crafted positioning statements",
                  "Finally explain your value in a way that connects",
                  "Use the results across your website, social profiles, and pitches"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to clarify your message?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-xl max-w-2xl mx-auto mb-8"
          >
            In just 5 minutes, you'll have clear positioning that helps you stand out and connect with clients.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 text-lg rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Clarifying My Message
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}