import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function VisitorTracker() {
  useEffect(() => {
    const payload = JSON.stringify({
      referrer: document.referrer,
      page: window.location.href,
      userAgent: navigator.userAgent,
    });
    fetch("https://n8n.srv1305072.hstgr.cloud/webhook/portfolio-visitor", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: payload,
      keepalive: true,
      mode: "no-cors",
    }).catch(() => {});
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VisitorTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
