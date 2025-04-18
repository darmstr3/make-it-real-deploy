import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Footer from "@/components/footer";

export default function PositioningGuide() {
  const [, setLocation] = useLocation();

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
          A comprehensive guide to effective positioning for coaches and solopreneurs
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              The Ultimate Positioning Guide
            </h2>
            
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Strong positioning is the foundation of a successful coaching or consulting business. It helps you stand out in a crowded market, attract ideal clients, and command premium rates for your services.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">What is Positioning?</h3>
              <p>
                Positioning is how you occupy a distinctive place in the mind of your prospect. It's the unique value you offer to a specific audience that differentiates you from competitors. Good positioning answers the question: "Why should I choose you over everyone else offering something similar?"
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Key Elements of Effective Positioning</h3>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">1. Target Audience Clarity</h4>
              <p>
                The more specific you can be about who you serve, the more powerful your positioning becomes. Generic audiences lead to generic messaging. Define your ideal client with precision: their industry, role, challenges, aspirations, and pain points.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2. Unique Value Proposition</h4>
              <p>
                Articulate the specific value and transformation you deliver. What results can clients expect? How is your approach different? Your UVP should clearly communicate why you're the best choice for your specific audience.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">3. Authentic Differentiation</h4>
              <p>
                Identify what truly sets you apart from competitors. This could be your methodology, experience, perspective, or a combination of factors. Effective differentiation must be meaningful to your audience and defensible.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">4. Consistent Messaging</h4>
              <p>
                Once you've established your positioning, reinforce it consistently across all channels – your website, social media, speaking engagements, and client interactions. Consistency builds recognition and trust.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">The Positioning Process</h3>
              <p>
                Effective positioning doesn't happen overnight. It's an iterative process that involves:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Market Research:</strong> Understanding your market, competitors, and target audience deeply.</li>
                <li><strong>Self-Assessment:</strong> Identifying your unique strengths, expertise, and passion.</li>
                <li><strong>Gap Analysis:</strong> Finding unmet needs or underserved segments in your market.</li>
                <li><strong>Testing and Refinement:</strong> Gathering feedback and optimizing your positioning over time.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Common Positioning Mistakes</h3>
              
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Being Too Broad:</strong> Trying to appeal to everyone usually means connecting deeply with no one.</li>
                <li><strong>Focusing on Services Instead of Outcomes:</strong> Clients care about results, not your methodology.</li>
                <li><strong>Copying Competitors:</strong> Me-too positioning fails to give prospects a reason to choose you.</li>
                <li><strong>Changing Too Frequently:</strong> Positioning needs time to take root in the market.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Ready to Define Your Positioning?</h3>
              <p>
                PositionKit helps you develop clear, compelling positioning through a guided process. Try our positioning generator to create a foundation for your brand messaging.
              </p>
              
              <div className="mt-8">
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/");
                  }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Try PositionKit Now
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}