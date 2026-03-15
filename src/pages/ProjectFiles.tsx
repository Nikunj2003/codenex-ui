import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectSubNav } from "@/components/ProjectSubNav";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  ChevronRight, ChevronDown, FileCode, Folder, Search, File,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type TreeNode = {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: TreeNode[];
};

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

function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  for (const node of nodes) {
    if (node.type === "file") result.push(node);
    if (node.children) result.push(...flattenTree(node.children));
  }
  return result;
}

function TreeItem({
  node, depth = 0, selected, onSelect,
}: {
  node: TreeNode; depth?: number; selected: string; onSelect: (path: string) => void;
}) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => {
          if (isFolder) setOpen(!open);
          else onSelect(node.path);
        }}
        className={cn(
          "w-full flex items-center gap-1.5 py-1.5 px-2 rounded-md text-sm hover:bg-muted/50 transition-colors",
          !isFolder && selected === node.path && "bg-accent text-accent-foreground font-medium"
        )}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        {isFolder ? (
          open ? <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        ) : (
          <span className="w-3 flex-shrink-0" />
        )}
        {isFolder ? (
          <Folder className="h-3.5 w-3.5 text-primary/60 flex-shrink-0" />
        ) : (
          <FileCode className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && open && node.children?.map((c) => (
        <TreeItem key={c.path} node={c} depth={depth + 1} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function ProjectFiles() {
  const { projectId } = useParams();
  const [selected, setSelected] = useState("src/components/Dashboard.tsx");
  const [search, setSearch] = useState("");

  const allFiles = flattenTree(fileTree);
  const filteredTree = search
    ? allFiles.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : null;

  const content = fileContents[selected] || "// File not found";

  return (
    <div className="flex-1 flex flex-col">
      <ProjectSubNav projectId={projectId!} />
      <div className="h-[calc(100vh-8rem)]">
      <ResizablePanelGroup direction="horizontal">
        {/* File tree sidebar */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={35} className="hidden md:block">
          <div className="h-full flex flex-col border-r border-border bg-card">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search files…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2">
              {filteredTree
                ? filteredTree.map((node) => (
                    <TreeItem key={node.path} node={node} depth={0} selected={selected} onSelect={setSelected} />
                  ))
                : fileTree.map((node) => (
                    <TreeItem key={node.path} node={node} selected={selected} onSelect={setSelected} />
                  ))
              }
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* File content */}
        <ResizablePanel defaultSize={78} minSize={40}>
          <div className="h-full flex flex-col min-w-0">
            <div className="h-10 border-b border-border flex items-center px-4 text-sm text-muted-foreground bg-muted/30 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <File className="h-3.5 w-3.5" />
                <span className="font-mono text-xs">{selected}</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-sm leading-relaxed text-foreground/80"
              >
                {content.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-10 text-right pr-4 text-muted-foreground/40 select-none text-xs leading-relaxed">{i + 1}</span>
                    <span className="whitespace-pre">{line || '\n'}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
    </div>
  );
}
