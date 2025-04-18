import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found.tsx";
import Home from "./pages/home.tsx";
import PositioningGuide from "./pages/positioning-guide.tsx";
import Examples from "./pages/examples.tsx";
import PrivacyPolicy from "./pages/privacy-policy.tsx";
import TermsOfService from "./pages/terms-of-service.tsx";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/positioning-guide" component={PositioningGuide}/>
      <Route path="/examples" component={Examples}/>
      <Route path="/privacy-policy" component={PrivacyPolicy}/>
      <Route path="/terms-of-service" component={TermsOfService}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
