import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Send, Sparkles, RefreshCw, Smartphone, Monitor, Tablet,
  Code2, Eye, Rocket, ExternalLink,
  Lightbulb, ChevronRight, MessageSquare,
  ArrowLeft, FolderTree, ChevronDown, Folder, File,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

/* ── mock data ── */
const sampleMessages = [
  {
    role: "user" as const,
    content: "Create a modern SaaS dashboard with sidebar navigation, overview cards showing key metrics, and a revenue chart section.",
  },
  {
    role: "assistant" as const,
    content: "I'll build that dashboard for you. Here's what I'm creating:\n\n→ Collapsible sidebar with navigation\n→ Metric cards for MRR, users, churn, growth\n→ Revenue trend line chart\n→ Recent activity table\n\nAll files are being generated now.",
    tasks: ["Layout scaffolded", "3 components created", "Styles applied"],
  },
];

const promptStarters = [
  "Build a landing page for a fitness app",
  "Create an admin panel with user management",
  "Design a product page with reviews",
  "Make a project management board",
];

type TreeNode = { name: string; type: "file" | "folder"; path: string; children?: TreeNode[] };

const fileTree: TreeNode[] = [
  {
    name: "src", type: "folder", path: "src", children: [
      { name: "App.tsx", type: "file", path: "src/App.tsx" },
      { name: "index.css", type: "file", path: "src/index.css" },
      { name: "main.tsx", type: "file", path: "src/main.tsx" },
      {
        name: "components", type: "folder", path: "src/components", children: [
          { name: "Dashboard.tsx", type: "file", path: "src/components/Dashboard.tsx" },
          { name: "Sidebar.tsx", type: "file", path: "src/components/Sidebar.tsx" },
          { name: "Chart.tsx", type: "file", path: "src/components/Chart.tsx" },
        ],
      },
      {
        name: "pages", type: "folder", path: "src/pages", children: [
          { name: "Home.tsx", type: "file", path: "src/pages/Home.tsx" },
          { name: "Settings.tsx", type: "file", path: "src/pages/Settings.tsx" },
        ],
      },
    ],
  },
  { name: "package.json", type: "file", path: "package.json" },
  { name: "tsconfig.json", type: "file", path: "tsconfig.json" },
  { name: "index.html", type: "file", path: "index.html" },
];

const fileContents: Record<string, string> = {
  "src/App.tsx": `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Home from './pages/Home';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}`,
  "src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: 38 92% 50%;
  --background: 0 0% 100%;
  --foreground: 240 10% 8%;
}

body {
  @apply bg-background text-foreground antialiased;
  font-family: 'Inter', system-ui, sans-serif;
}`,
  "src/main.tsx": `import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);`,
  "src/components/Dashboard.tsx": `import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <h3 className="text-sm text-muted-foreground">Revenue</h3>
          <p className="text-2xl font-bold">$12,450</p>
        </div>
        <div className="rounded-xl border p-4">
          <h3 className="text-sm text-muted-foreground">Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="rounded-xl border p-4">
          <h3 className="text-sm text-muted-foreground">Growth</h3>
          <p className="text-2xl font-bold text-teal-600">+23%</p>
        </div>
      </div>
    </div>
  );
}`,
  "src/components/Sidebar.tsx": `import React from 'react';
import { Home, Settings, BarChart3, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-60 border-r p-4 space-y-1">
      <h2 className="font-bold text-lg mb-4">My App</h2>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted"
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}`,
  "src/components/Chart.tsx": `import React from 'react';

interface ChartProps {
  data: { label: string; value: number }[];
}

export function Chart({ data }: ChartProps) {
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-2">
      {data.map(item => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="text-sm w-20 text-right">{item.label}</span>
          <div className="flex-1 bg-muted rounded-full h-3">
            <div
              className="bg-primary rounded-full h-3"
              style={{ width: \`\${(item.value / max) * 100}%\` }}
            />
          </div>
          <span className="text-sm font-medium w-12">{item.value}</span>
        </div>
      ))}
    </div>
  );
}`,
  "src/pages/Home.tsx": `import React from 'react';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}`,
  "src/pages/Settings.tsx": `import React from 'react';

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-medium">App Name</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1" defaultValue="My App" />
        </div>
        <div>
          <label className="text-sm font-medium">Theme</label>
          <select className="w-full border rounded-md px-3 py-2 mt-1">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}`,
  "package.json": `{
  "name": "saas-dashboard",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "lucide-react": "^0.462.0",
    "tailwindcss": "^3.4.17"
  }
}`,
  "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}`,
  "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SaaS Dashboard</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
};

function TreeItem({
  node, depth = 0, selectedFile, onSelectFile,
}: {
  node: TreeNode; depth?: number; selectedFile: string | null; onSelectFile: (path: string) => void;
}) {
  const [open, setOpen] = useState(depth < 1);
  const isFolder = node.type === "folder";
  return (
    <div>
      <button
        onClick={() => {
          if (isFolder) setOpen(!open);
          else onSelectFile(node.path);
        }}
        className={cn(
          "w-full flex items-center gap-1.5 py-[5px] px-2 rounded text-[12px] hover:bg-secondary/60 transition-colors text-left",
          !isFolder && selectedFile === node.path
            ? "bg-secondary text-foreground font-medium"
            : !isFolder && "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isFolder ? (
          open ? <ChevronDown className="h-3 w-3 text-muted-foreground/60 flex-shrink-0" /> : <ChevronRight className="h-3 w-3 text-muted-foreground/60 flex-shrink-0" />
        ) : (
          <span className="w-3 flex-shrink-0" />
        )}
        {isFolder ? <Folder className="h-3.5 w-3.5 text-primary/50 flex-shrink-0" /> : <File className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" />}
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && open && node.children?.map((c) => (
        <TreeItem key={c.path} node={c} depth={depth + 1} selectedFile={selectedFile} onSelectFile={onSelectFile} />
      ))}
    </div>
  );
}

type Device = "desktop" | "tablet" | "mobile";

export default function Builder() {
  const { projectId } = useParams();
  const [prompt, setPrompt] = useState("");
  const [device, setDevice] = useState<Device>("desktop");
  const [rightTab, setRightTab] = useState<"preview" | "code">("preview");
  const [leftTab, setLeftTab] = useState<"chat" | "files">("chat");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [generating, setGenerating] = useState(false);

  const handleSend = () => {
    if (!prompt.trim() || generating) return;
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    setGenerating(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Done. I've updated the dashboard layout and improved the card responsive behavior. Check the preview.",
          tasks: ["2 files modified", "Layout updated"],
        },
      ]);
      setGenerating(false);
    }, 2200);
  };

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    setRightTab("code");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* ── Top bar ── */}
      <header className="h-11 border-b border-border flex items-center px-3 gap-3 bg-card flex-shrink-0">
        <Link to={`/app/projects/${projectId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <img src="/logo.png" alt="Codenex" className="h-5 w-5" />
        </Link>
        <div className="h-4 w-px bg-border" />
        <span className="text-[13px] font-display font-medium truncate">SaaS Dashboard</span>
        <div className="hidden sm:flex items-center gap-0.5 ml-2">
          {[
            { label: "Files", path: `/app/projects/${projectId}/files` },
            { label: "Preview", path: `/app/projects/${projectId}/preview` },
            { label: "Members", path: `/app/projects/${projectId}/members` },
            { label: "Settings", path: `/app/projects/${projectId}/settings` },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground rounded hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        {generating && (
          <div className="flex items-center gap-1.5 text-primary">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span className="text-[11px] font-medium">Building…</span>
          </div>
        )}
        <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 px-3">
          <Rocket className="h-3 w-3" /> Publish
        </Button>
      </header>

      {/* ── Main workspace: two-panel split, no sidebar ── */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left panel: Chat / Files */}
        <ResizablePanel defaultSize={30} minSize={30}>
          <div className="flex flex-col h-full min-w-0">
            {/* Left panel toolbar with Chat/Files toggle */}
            <div className="h-9 border-b border-border flex items-center px-3 bg-card gap-1.5">
              <div className="flex gap-0.5 p-0.5 rounded-md bg-secondary">
                {[
                  { key: "chat" as const, label: "Chat", icon: MessageSquare },
                  { key: "files" as const, label: "Files", icon: FolderTree },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setLeftTab(tab.key)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors",
                      leftTab === tab.key ? "bg-card text-foreground surface-elevated" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="h-3 w-3" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {leftTab === "chat" ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-auto p-5 space-y-5">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
                      <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-5">
                        <Sparkles className="h-6 w-6 text-foreground/40" />
                      </div>
                      <h2 className="text-xl font-display font-bold mb-1.5">What are you building?</h2>
                      <p className="text-sm text-muted-foreground mb-7">Describe your app and Codenex will generate it.</p>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {promptStarters.map((s) => (
                          <button
                            key={s}
                            onClick={() => setPrompt(s)}
                            className="p-3 rounded-lg border border-border bg-card hover:bg-secondary/50 text-[13px] text-left transition-colors"
                          >
                            <Lightbulb className="h-3 w-3 text-primary mb-1.5" />
                            <span className="text-muted-foreground">{s}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "")}
                      >
                        {msg.role === "assistant" && (
                          <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles className="h-3.5 w-3.5 text-foreground/50" />
                          </div>
                        )}
                        <div className="max-w-lg">
                          <div
                            className={cn(
                              "rounded-xl px-4 py-3 text-[13px] leading-relaxed",
                              msg.role === "user"
                                ? "bg-secondary"
                                : "bg-card border border-border"
                            )}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          {"tasks" in msg && msg.tasks && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {msg.tasks.map((t) => (
                                <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-success/8 text-success border border-success/15 font-medium">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                  {generating && (
                    <div className="flex gap-3">
                      <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-primary animate-breathing" />
                      </div>
                      <div className="space-y-2 pt-1 max-w-md">
                        <div className="h-2.5 w-64 rounded bg-foreground/5 animate-breathing" />
                        <div className="h-2.5 w-48 rounded bg-foreground/4 animate-breathing" style={{ animationDelay: "0.5s" }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Prompt composer */}
                <div className="border-t border-border p-3 bg-card">
                  <div className="max-w-2xl mx-auto flex gap-2">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                      placeholder="Describe what to build or change…"
                      rows={1}
                      className="flex-1 resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/60"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!prompt.trim() || generating}
                      size="icon"
                      className="h-10 w-10 rounded-lg flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Files tab content */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-3">
                  <p className="label-caps text-muted-foreground/50 px-2 mb-2 text-[10px]">Project files</p>
                  {fileTree.map((node) => (
                    <TreeItem key={node.path} node={node} selectedFile={selectedFile} onSelectFile={handleFileSelect} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right preview panel */}
        <ResizablePanel defaultSize={70} minSize={25} maxSize={70}>
          <div className="h-full flex flex-col bg-card">
            <div className="h-9 border-b border-border flex items-center px-3 gap-1.5">
              <div className="flex gap-0.5 p-0.5 rounded-md bg-secondary">
                {[
                  { key: "preview" as const, label: "Preview", icon: Eye },
                  { key: "code" as const, label: "Code", icon: Code2 },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setRightTab(tab.key)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors",
                      rightTab === tab.key ? "bg-card text-foreground surface-elevated" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="h-3 w-3" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex-1" />
              <div className="flex gap-0.5">
                {[
                  { key: "desktop" as Device, icon: Monitor },
                  { key: "tablet" as Device, icon: Tablet },
                  { key: "mobile" as Device, icon: Smartphone },
                ].map((d) => (
                  <Button
                    key={d.key}
                    variant="ghost"
                    size="icon"
                    className={cn("h-6 w-6", device === d.key ? "text-foreground" : "text-muted-foreground/40")}
                    onClick={() => setDevice(d.key)}
                  >
                    <d.icon className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-3 overflow-auto">
              {rightTab === "preview" ? (
                <div
                  className={cn(
                    "mx-auto rounded-lg border border-border bg-background h-full min-h-[400px] flex items-center justify-center transition-all",
                    device === "mobile" ? "max-w-[375px]" : device === "tablet" ? "max-w-[768px]" : "w-full"
                  )}
                >
                  <div className="text-center p-8">
                    <Eye className="h-8 w-8 text-foreground/8 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Live preview</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Send a prompt to generate your app</p>
                  </div>
                </div>
              ) : selectedFile ? (
                <div className="rounded-lg border border-border bg-background min-h-[400px] overflow-hidden">
                  <div className="h-9 border-b border-border flex items-center px-4 bg-muted/30">
                    <div className="flex items-center gap-1.5">
                      <File className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono text-xs text-muted-foreground">{selectedFile}</span>
                    </div>
                  </div>
                  <div className="p-4 overflow-auto">
                    <motion.div
                      key={selectedFile}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="font-mono text-sm leading-relaxed text-foreground/80"
                    >
                      {(fileContents[selectedFile] || "// File not found").split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="w-10 text-right pr-4 text-muted-foreground/40 select-none text-xs leading-relaxed">{i + 1}</span>
                          <span className="whitespace-pre">{line || '\n'}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-background min-h-[400px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <Code2 className="h-8 w-8 text-foreground/8 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Select a file to view code</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Switch to Files tab to browse</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[11px] text-muted-foreground">Ready</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[11px] gap-1 px-2"
                onClick={() => window.open(`/app/projects/${projectId}/preview`, "_blank")}
              >
                <ExternalLink className="h-3 w-3" /> Open Live Preview
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
