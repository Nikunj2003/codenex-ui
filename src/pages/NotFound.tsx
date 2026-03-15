import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard } from "lucide-react";
import HexGridBackground from "@/components/HexGridBackground";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <HexGridBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md relative z-10"
      >
        <p className="text-6xl font-display font-bold text-gradient-brand mb-4">404</p>
        <h1 className="text-2xl font-display font-bold mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Home className="h-4 w-4" /> Back to Home
          </Button>
          <Button variant="outline" onClick={() => navigate("/app")} className="gap-2">
            <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
