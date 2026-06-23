import "./global.css";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Watch from "./pages/Watch";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/MyAccount";
import { CategoryList, CategoryVideos } from "./pages/Categories";
import {
  SubscriptionProvider,
  useSubscription,
} from "@/context/SubscriptionContext";
import VideoPlayerModal from "@/components/VideoPlayerModal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

const queryClient = new QueryClient();

function AppRoutes() {
  const { activeVideo, closePlayer } = useSubscription();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:name" element={<CategoryVideos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <AnimatePresence>
        {activeVideo && (
          <VideoPlayerModal
            key={activeVideo.id}
            video={activeVideo}
            onClose={closePlayer}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SubscriptionProvider>
          <AppRoutes />
        </SubscriptionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
