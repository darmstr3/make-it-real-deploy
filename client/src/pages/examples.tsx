import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Examples() {
  const [, setLocation] = useLocation();

  // Examples of positioning statements
  const examples = [
    {
      title: "Business Coach",
      audience: "Small business owners who struggle with growth",
      description: "I help small business owners double their revenue in 12 months by implementing proven growth systems without working more hours.",
      headline: "Scale Your Business, Not Your Working Hours",
      socialBio: "Business growth strategist helping small businesses double revenue in 12 months through streamlined systems & proven frameworks. 200+ businesses transformed.",
      ctaText: "Ready to grow without burnout?"
    },
    {
      title: "Health Coach",
      audience: "Busy professionals with fatigue and stress",
      description: "I help busy professionals overcome chronic fatigue and burnout through personalized nutrition and lifestyle changes that fit into their hectic schedules.",
      headline: "Reclaim Your Energy Without Quitting Your Career",
      socialBio: "Fatigue specialist for high achievers. I help busy professionals overcome burnout through evidence-based nutrition & sustainable lifestyle shifts. Former burnout survivor.",
      ctaText: "End exhaustion for good"
    },
    {
      title: "Financial Coach",
      audience: "Creative entrepreneurs with inconsistent income",
      description: "I help creative entrepreneurs create financial stability from unpredictable income through custom cash flow systems and mindset shifts about money.",
      headline: "Turn Unpredictable Income Into Consistent Profit",
      socialBio: "Financial strategist for creatives. I transform feast-or-famine income cycles into stable profits through practical systems & money mindset work. Former artist who paid off $87K debt.",
      ctaText: "Master your money flow"
    },
    {
      title: "Leadership Coach",
      audience: "New managers in tech companies",
      description: "I help first-time tech managers transition from individual contributor to inspiring leader through practical leadership frameworks and emotional intelligence training.",
      headline: "Lead Confidently Without Losing Your Authenticity",
      socialBio: "Leadership mentor helping tech professionals excel in their first management role. Practical frameworks, real-world scenarios, and emotional intelligence training. 15+ years in Silicon Valley.",
      ctaText: "Build your leadership toolkit"
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="max-w-5xl mx-auto text-center py-8 px-4">
        <a href="/" className="inline-block" onClick={(e) => {
          e.preventDefault();
          setLocation("/");
        }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-transform hover:scale-105">PositionKit</h1>
        </a>
        <p className="text-gray-600 max-w-xl mx-auto">
          Examples of effective positioning statements for different niches
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Positioning Examples
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Strong positioning clearly communicates who you help, how you help them, and what makes your approach unique. Below are examples of effective positioning for different coaching niches to inspire your own messaging.
            </p>
          </Card>
        </motion.div>
        
        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-full">
                <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800">{example.title}</h3>
                      <p className="text-xs text-gray-500">Target: {example.audience}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-600 mb-1">Core Positioning</h4>
                    <p className="text-gray-800">{example.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-600 mb-1">Website Headline</h4>
                    <p className="text-gray-800 font-medium">{example.headline}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-600 mb-1">Social Bio</h4>
                    <p className="text-gray-800">{example.socialBio}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-600 mb-1">Call-to-Action</h4>
                    <p className="text-gray-800 font-medium">{example.ctaText}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to craft your own positioning?</h3>
          <Button
            onClick={() => setLocation("/")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Create Your Positioning Now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}