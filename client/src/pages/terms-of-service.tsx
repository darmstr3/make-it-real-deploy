import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Footer from "@/components/footer";

export default function TermsOfService() {
  const [, setLocation] = useLocation();
  const currentYear = new Date().getFullYear();

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
          Terms of Service
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Terms of Service
            </h2>
            
            <div className="prose max-w-none text-gray-700">
              <p className="text-sm text-gray-500 mb-6">Last Updated: April {currentYear}</p>
              
              <p className="mb-4">
                Please read these terms of service ("terms", "terms of service") carefully before using PositionKit website operated by PositionKit ("us", "we", "our").
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Conditions of Use</h3>
              <p>
                By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website. PositionKit only grants use and access of this website to those who have accepted its terms.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Privacy Policy</h3>
              <p>
                Before you continue using our website, we advise you to read our <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); setLocation("/privacy-policy"); }} className="text-indigo-600 hover:text-indigo-800">privacy policy</a> regarding our user data collection. It will help you better understand our practices.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. Age Restriction</h3>
              <p>
                You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. PositionKit assumes no responsibility for liabilities related to age misrepresentation.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Intellectual Property</h3>
              <p>
                You agree that all materials, products, and services provided on this website are the property of PositionKit, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the PositionKit's intellectual property in any way, including electronic, digital, or new trademark registrations.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. User Accounts</h3>
              <p>
                As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
              </p>
              <p className="mt-2">
                If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
              </p>
              <p className="mt-2">
                We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Applicable Law</h3>
              <p>
                By visiting this website, you agree that the laws of [your location], without regard to principles of conflict laws, will govern these terms of service and any dispute that might arise between you and PositionKit.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. Disputes</h3>
              <p>
                Any dispute related in any way to your visit to this website shall be arbitrated by state or federal court and you consent to exclusive jurisdiction and venue of such courts.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. Indemnification</h3>
              <p>
                You agree to indemnify PositionKit and its affiliates and hold PositionKit harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">9. Limitation on Liability</h3>
              <p>
                PositionKit is not liable for any damages that may occur to you as a result of your misuse of our website. PositionKit reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between PositionKit and the user, and this supersedes and replaces all prior agreements regarding the use of this website.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">10. Changes to Terms</h3>
              <p>
                PositionKit reserves the right to modify these terms of service at any time. We will notify you of any changes by posting the new terms of service on this page and updating the "Last Updated" date. You are advised to review these terms of service periodically for any changes.
              </p>
              
              <div className="mt-8 pt-4 border-t border-gray-100">
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/");
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  ← Back to Home
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