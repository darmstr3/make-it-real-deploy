import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/footer";

export default function Blog() {
  const [, setLocation] = useLocation();

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "5 Common Positioning Mistakes Coaches Make",
      excerpt: "Discover the most common positioning errors that prevent coaches from standing out in a crowded market, and learn how to avoid them.",
      date: "April 12, 2025",
      category: "Positioning",
      readTime: "7 min read"
    },
    {
      id: 2,
      title: "How to Identify Your Unique Value Proposition",
      excerpt: "Learn a step-by-step process to uncover what truly makes your coaching practice different from competitors in ways that matter to clients.",
      date: "April 8, 2025",
      category: "Marketing",
      readTime: "9 min read"
    },
    {
      id: 3,
      title: "Crafting an Irresistible Offer Based on Your Positioning",
      excerpt: "Once you've clarified your positioning, the next step is creating an offer that perfectly aligns with it. Here's how to do it right.",
      date: "March 28, 2025",
      category: "Offers",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The Psychology Behind Effective Coach Positioning",
      excerpt: "Understanding how your target clients think is critical to positioning. Explore the psychological principles that make positioning stick.",
      date: "March 15, 2025",
      category: "Psychology",
      readTime: "11 min read"
    },
    {
      id: 5,
      title: "From Generalist to Specialist: A Positioning Case Study",
      excerpt: "Follow the journey of a life coach who transformed her practice by niching down and developing crystal-clear positioning.",
      date: "March 5, 2025",
      category: "Case Study",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "How to Test if Your Positioning is Working",
      excerpt: "Positioning isn't just theory—it needs to work in the real world. Here are practical ways to test and validate your positioning strategy.",
      date: "February 22, 2025",
      category: "Strategy",
      readTime: "10 min read"
    }
  ];

  const categoryColors: Record<string, string> = {
    "Positioning": "bg-blue-100 text-blue-800",
    "Marketing": "bg-emerald-100 text-emerald-800",
    "Offers": "bg-purple-100 text-purple-800",
    "Psychology": "bg-amber-100 text-amber-800",
    "Case Study": "bg-rose-100 text-rose-800",
    "Strategy": "bg-indigo-100 text-indigo-800"
  };

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
          Insights and strategies to help you clarify your positioning
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-8 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              The Positioning Blog
            </h2>
            
            <p className="text-lg text-gray-700">
              Practical advice and insights to help coaches and solopreneurs develop strong positioning that attracts ideal clients and commands premium rates.
            </p>
          </Card>
        </motion.div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <Badge className={`px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}>
                      {post.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-100 p-8 mt-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to clarify your positioning?
            </h3>
            <p className="text-gray-600 mb-6">
              Try our positioning generator to create clear, compelling messaging that resonates with your ideal clients.
            </p>
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}