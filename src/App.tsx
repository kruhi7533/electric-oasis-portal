
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  // This component is now just a wrapper for the custom HTML/CSS/JS implementation
  return (
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div id="root"></div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
