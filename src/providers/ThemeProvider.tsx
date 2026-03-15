import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("codenex-theme") as Theme;
    return saved || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Disable all CSS transitions during theme switch to prevent
    // staggered updates where some components transition and others snap.
    root.classList.add("disable-transitions");

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("codenex-theme", theme);

    // Re-enable transitions after the browser has painted the new theme.
    const raf = requestAnimationFrame(() => {
      // Double-rAF ensures the paint has completed before re-enabling.
      requestAnimationFrame(() => {
        root.classList.remove("disable-transitions");
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
