import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TooltipWalkthrough } from "@/components/ui/tooltip-walkthrough";
import { WalkthroughProvider, useWalkthrough } from "@/hooks/use-walkthrough";
import Dashboard from "@/pages/dashboard";
import Generate from "@/pages/generate";
import Library from "@/pages/library";
import Trending from "@/pages/trending";
import Analytics from "@/pages/analytics";
import BrandProfile from "@/pages/brand-profile";
import AgencyDashboard from "@/pages/agency-dashboard";
import CanvasEditor from "@/pages/canvas-editor";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/generate" component={Generate} />
      <Route path="/library" component={Library} />
      <Route path="/trending" component={Trending} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/brand-profile" component={BrandProfile} />
      <Route path="/agency" component={AgencyDashboard} />
      <Route path="/canvas-editor" component={CanvasEditor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function WalkthroughWrapper() {
  const { isActive, currentSteps, completeWalkthrough, skipWalkthrough, currentWalkthrough } = useWalkthrough();
  
  return (
    <>
      <Router />
      <TooltipWalkthrough
        steps={currentSteps}
        isActive={isActive}
        onComplete={() => completeWalkthrough(currentWalkthrough || 'main')}
        onSkip={() => skipWalkthrough(currentWalkthrough || 'main')}
        autoStart={true}
        showProgress={true}
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WalkthroughProvider>
          <Toaster />
          <WalkthroughWrapper />
        </WalkthroughProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
Add main App component with routing and walkthrough
