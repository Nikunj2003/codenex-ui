import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import HexGridBackground from "@/components/HexGridBackground";

export function PublicLayout() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HexGridBackground />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
}
