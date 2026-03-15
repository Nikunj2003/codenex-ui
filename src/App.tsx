import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AppLayout } from "@/layouts/AppLayout";

import Landing from "./pages/Landing";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectOverview from "./pages/ProjectOverview";
import Builder from "./pages/Builder";
import ProjectFiles from "./pages/ProjectFiles";
import ProjectPreview from "./pages/ProjectPreview";
import ProjectMembers from "./pages/ProjectMembers";
import ProjectSettings from "./pages/ProjectSettings";

import Notifications from "./pages/Notifications";
import Usage from "./pages/Usage";
import Billing from "./pages/Billing";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Authenticated routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:projectId" element={<ProjectOverview />} />
              <Route path="projects/:projectId/files" element={<ProjectFiles />} />
              <Route path="projects/:projectId/preview" element={<ProjectPreview />} />
              <Route path="projects/:projectId/members" element={<ProjectMembers />} />
              <Route path="projects/:projectId/settings" element={<ProjectSettings />} />
              <Route path="inbox" element={<Navigate to="/app/notifications" replace />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="usage" element={<Usage />} />
              <Route path="billing" element={<Billing />} />
              <Route path="account" element={<Account />} />
            </Route>

            {/* Builder - full page outside AppLayout */}
            <Route path="/app/projects/:projectId/builder" element={<Builder />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
