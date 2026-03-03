"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  CheckCircle2,
  Bell,
  Target,
  NotebookPen,
  RefreshCw,
  Target as GoalIcon,
  Search,
  PieChart,
  Wallet,
  ArrowRight,
  Database,
  Orbit as OrbitIcon,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Constants ---

interface NodePosition {
  x: number;
  y: number;
}

interface NodeData {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  group: "planning" | "execution" | "system" | "analysis";
  description: string;
  bullets: string[];
}

const MODULES: NodeData[] = [
  // Planning Group
  {
    id: "goals",
    name: "Goals",
    icon: GoalIcon,
    color: "emerald",
    group: "planning",
    description:
      "Define long-term objectives and track progress towards major milestones.",
    bullets: ["Milestone tracking", "Visual progress", "Hierarchical goals"],
  },
  {
    id: "tasks",
    name: "Tasks",
    icon: CheckCircle2,
    color: "blue",
    group: "planning",
    description:
      "Manage your daily work with intelligent prioritization and subtask management.",
    bullets: ["Hierarchical projects", "Recurring logic", "Smart due dates"],
  },
  // Execution Group
  {
    id: "reminders",
    name: "Reminders",
    icon: Bell,
    color: "amber",
    group: "execution",
    description:
      "Time-sensitive alerts that ensure you never miss a deadline or appointment.",
    bullets: ["Auto-Reminders", "Voice alerts", "Focus modes"],
  },
  {
    id: "habits",
    name: "Habits",
    icon: RefreshCw,
    color: "pink",
    group: "execution",
    description:
      "Build lasting consistency with streak tracking and behavioral nudges.",
    bullets: ["Streak defense", "Progress insights", "Habit stacking"],
  },
  {
    id: "notes",
    name: "Quick Notes",
    icon: NotebookPen,
    color: "violet",
    group: "execution",
    description:
      "Capture inspiration instantly with a minimal, focused writing environment.",
    bullets: ["Instant capture", "Cloud sync", "Markdown support"],
  },
  // System Group
  {
    id: "core",
    name: "Orbit Core",
    icon: OrbitIcon,
    color: "brand",
    group: "system",
    description:
      "The intelligent hub that synchronizes data and predicts your next best action.",
    bullets: ["Real-time sync", "AI predictions", "System health"],
  },
  // Analysis Group
  {
    id: "expenses",
    name: "Expenses",
    icon: Wallet,
    color: "rose",
    group: "analysis",
    description:
      "Track spending patterns automatically with intelligent categorization.",
    bullets: ["Auto-Categorization", "Digital receipts", "Shared ledgers"],
  },
  {
    id: "budget",
    name: "Budget",
    icon: PieChart,
    color: "cyan",
    group: "analysis",
    description:
      "Plan your financial future with dynamic budget allocations and goal links.",
    bullets: ["Zero-based logic", "Savings goals", "Trend analysis"],
  },
];

const CONNECTIONS = [
  { from: "goals", to: "tasks" },
  { from: "tasks", to: "reminders" },
  { from: "tasks", to: "habits" },
  { from: "reminders", to: "core" },
  { from: "habits", to: "core" },
  { from: "notes", to: "core" },
  { from: "core", to: "budget" },
  { from: "budget", to: "expenses" },
];

const COLOR_MAP: Record<
  string,
  { brand: string; light: string; bg: string; border: string }
> = {
  emerald: {
    brand: "text-emerald-500",
    light: "bg-emerald-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
  },
  blue: {
    brand: "text-blue-500",
    light: "bg-blue-500",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
  },
  amber: {
    brand: "text-amber-500",
    light: "bg-amber-500",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
  },
  pink: {
    brand: "text-pink-500",
    light: "bg-pink-500",
    bg: "bg-pink-500/5",
    border: "border-pink-500/20",
  },
  violet: {
    brand: "text-violet-500",
    light: "bg-violet-500",
    bg: "bg-violet-500/5",
    border: "border-violet-500/20",
  },
  brand: {
    brand: "text-brand",
    light: "bg-brand",
    bg: "bg-brand/5",
    border: "border-brand/20",
  },
  rose: {
    brand: "text-rose-500",
    light: "bg-rose-500",
    bg: "bg-rose-500/5",
    border: "border-rose-500/20",
  },
  cyan: {
    brand: "text-cyan-500",
    light: "bg-cyan-500",
    bg: "bg-cyan-500/5",
    border: "border-cyan-500/20",
  },
};

// --- Custom Components ---

const NodeCard = ({
  node,
  isActive,
  isHovered,
  onSelect,
  onHover,
}: {
  node: NodeData;
  isActive: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hovering: boolean) => void;
}) => {
  const colors = COLOR_MAP[node.color];
  const isSpecial = node.id === "core";

  return (
    <motion.div
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        "relative rounded-xl border p-3 flex flex-col gap-2 transition-all duration-300 cursor-pointer w-48",
        isActive
          ? "bg-bg-card border-brand shadow-[0_0_20px_rgba(var(--brand-rgb),0.2)]"
          : "bg-bg-card/50 border-border-subtle hover:border-border-medium",
        isSpecial && "w-52 p-4 border-brand/40 bg-brand/5",
      )}
      layout
    >
      {/* Connector Ports */}
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-border-subtle bg-bg-base z-10" />
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-border-subtle bg-bg-base z-10" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-8 md:size-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
            colors.bg,
            colors.brand,
          )}
        >
          <node.icon className="size-5 md:size-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider leading-none">
            {node.group}
          </span>
          <span className="text-sm md:text-base font-bold text-text-primary truncate">
            {node.name}
          </span>
        </div>
        {isActive && (
          <motion.div
            layoutId="node-pulse"
            className="ml-auto size-2 rounded-full bg-brand animate-pulse"
          />
        )}
      </div>

      {/* Indicators */}
      <div className="flex gap-1 mt-auto">
        <div
          className={cn(
            "h-1 flex-1 rounded-full",
            isHovered || isActive ? colors.light : "bg-border-subtle/30",
          )}
        />
        <div
          className={cn(
            "h-1 flex-1 rounded-full",
            isHovered || isActive ? "bg-brand/40" : "bg-border-subtle/30",
          )}
        />
      </div>
    </motion.div>
  );
};

// --- Main Flow Map ---

export function NodeFlowMap() {
  const [activeNode, setActiveNode] = useState<NodeData>(
    MODULES.find((m) => m.id === "core")!,
  );
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Layout Grid Mapping
  const nodeLayout = useMemo(() => {
    return {
      goals: { x: 10, y: 15 },
      tasks: { x: 10, y: 45 },
      reminders: { x: 35, y: 30 },
      habits: { x: 35, y: 60 },
      notes: { x: 35, y: 90 },
      core: { x: 60, y: 45 },
      budget: { x: 85, y: 30 },
      expenses: { x: 85, y: 60 },
    };
  }, []);

  const getConnectorPath = (fromId: string, toId: string) => {
    const from = (nodeLayout as any)[fromId];
    const to = (nodeLayout as any)[toId];
    if (!from || !to) return "";

    // Card width is approx 12 (scaling unit)
    const startX = from.x + 9; // Offset for right port
    const startY = from.y;
    const endX = to.x - 9; // Offset for left port
    const endY = to.y;

    const midX = (startX + endX) / 2;
    return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
  };

  return (
    <div className="relative w-full overflow-hidden min-h-[700px] flex flex-col pt-12">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--brand-rgb),0.05),transparent_70%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 container max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
        {/* Visual Engine Canvas */}
        <div className="relative aspect-[16/10] md:aspect-auto md:h-[650px] w-full bg-bg-card/30 rounded-3xl border border-border-subtle/50 overflow-hidden backdrop-blur-sm">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="glow-flow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(var(--brand-rgb),0)" />
                <stop offset="50%" stopColor="rgba(var(--brand-rgb),0.5)" />
                <stop offset="100%" stopColor="rgba(var(--brand-rgb),0)" />
              </linearGradient>
            </defs>

            {/* Render Links */}
            {CONNECTIONS.map((conn, i) => {
              const isAffectedByHover =
                hoveredNodeId === conn.from || hoveredNodeId === conn.to;
              const isAffectedByActive =
                activeNode.id === conn.from || activeNode.id === conn.to;
              const isHighlighted =
                isAffectedByHover || (isAffectedByActive && !hoveredNodeId);

              const colors =
                COLOR_MAP[
                  MODULES.find((m) => m.id === (hoveredNodeId || conn.from))
                    ?.color || "brand"
                ];

              return (
                <g key={`conn-${i}`}>
                  <motion.path
                    d={getConnectorPath(conn.from, conn.to)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={isHighlighted ? "0.6" : "0.3"}
                    strokeDasharray={isHighlighted ? "none" : "1 1"}
                    className={cn(
                      "transition-all duration-500",
                      isHighlighted ? colors.brand : "text-border-subtle/30",
                    )}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />

                  {/* Glowing Data Particle */}
                  <AnimatePresence>
                    {isHighlighted && (
                      <motion.path
                        d={getConnectorPath(conn.from, conn.to)}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        filter="url(#glow-flow)"
                        className={cn(colors.brand, "opacity-60")}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          pathLength: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          opacity: { duration: 0.3 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                </g>
              );
            })}
          </svg>

          {/* Render Nodes */}
          {MODULES.map((node, i) => {
            const pos = (nodeLayout as any)[node.id];
            return (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <NodeCard
                  node={node}
                  isActive={activeNode.id === node.id}
                  isHovered={hoveredNodeId === node.id}
                  onSelect={() => setActiveNode(node)}
                  onHover={(hovering) => setHovering(hovering ? node.id : null)}
                />
              </div>
            );
          })}
        </div>

        {/* Info Sidebar */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-bg-card border border-border-subtle rounded-3xl p-8 shadow-2xl relative overflow-hidden h-full"
            >
              {/* Header */}
              <div className="flex items-center gap-5 mb-8">
                <div
                  className={cn(
                    "size-16 rounded-2xl flex items-center justify-center border",
                    COLOR_MAP[activeNode.color].bg,
                    COLOR_MAP[activeNode.color].border,
                    COLOR_MAP[activeNode.color].brand,
                  )}
                >
                  <activeNode.icon className="size-8" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest border border-brand/20">
                      Module
                    </span>
                    <span className="size-1.5 rounded-full bg-border-medium" />
                    <span className="text-text-secondary text-xs font-semibold uppercase tracking-widest">
                      {activeNode.id === "core" ? "System Hub" : "Live Sync"}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary mt-1">
                    {activeNode.name}
                  </h3>
                </div>
              </div>

              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {activeNode.description}
              </p>

              {/* Bullets */}
              <div className="grid grid-cols-1 gap-4 mb-10">
                {activeNode.bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 group p-1"
                  >
                    <div
                      className={cn(
                        "size-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                        COLOR_MAP[activeNode.color].bg,
                        COLOR_MAP[activeNode.color].brand,
                      )}
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-text-primary font-medium">
                      {bullet}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Connections Footer */}
              <div className="pt-8 border-t border-border-subtle/50">
                <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ArrowRight className="size-3 text-brand" />
                  Active Connections
                </h4>
                <div className="flex flex-wrap gap-3">
                  {CONNECTIONS.filter(
                    (c) => c.from === activeNode.id || c.to === activeNode.id,
                  ).map((c, i) => {
                    const otherId = c.from === activeNode.id ? c.to : c.from;
                    const otherMod = MODULES.find((m) => m.id === otherId)!;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-base/50 border border-border-subtle"
                      >
                        <otherMod.icon
                          className={cn(
                            "size-4",
                            COLOR_MAP[otherMod.color].brand,
                          )}
                        />
                        <span className="text-xs font-semibold text-text-primary">
                          {otherMod.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Aesthetic Background Detail */}
              <div className="absolute -bottom-12 -right-12 size-48 bg-brand/5 blur-3xl rounded-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  function setHovering(id: string | null) {
    setHoveredNodeId(id);
  }
}
