import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
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
          Privacy Policy
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
              Privacy Policy
            </h2>
            
            <div className="prose max-w-none text-gray-700">
              <p className="text-sm text-gray-500 mb-6">Last Updated: April {currentYear}</p>
              
              <p className="mb-4">
                At PositionKit, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Important Information and Who We Are</h3>
              <p>
                PositionKit is the controller and responsible for your personal data (collectively referred to as "we", "us" or "our" in this privacy policy). If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact us at privacy@positionkit.com.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. The Data We Collect About You</h3>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. How We Use Your Personal Data</h3>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Data Security</h3>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Data Retention</h3>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Your Legal Rights</h3>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. Third-party Links</h3>
              <p>
                This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. Changes to the Privacy Policy</h3>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this policy.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">9. Contact Us</h3>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@positionkit.com
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