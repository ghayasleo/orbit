"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  ReactFlowProvider,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  LayoutDashboard,
  CheckSquare,
  Bell,
  Receipt,
  Landmark,
  Flame,
  PieChart,
  NotebookPen,
  RefreshCw,
  Target,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---

type LayerType = "Sources" | "Orchestration" | "Insights";

interface ModuleData {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  layer: LayerType;
  description: string;
  color: string;
  connections: { id: string; dir: "→" | "←" }[];
}

// --- Data ---

const LAYER_CONFIG: Record<LayerType, { color: string; bg: string }> = {
  Sources: { color: "#4F8EF7", bg: "bg-blue-500/10" },
  Orchestration: { color: "#F5A623", bg: "bg-amber-500/10" },
  Insights: { color: "#A855F7", bg: "bg-purple-500/10" },
};

const MODULE_DATA: Record<string, ModuleData> = {
  dashboard: {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    layer: "Insights",
    color: LAYER_CONFIG.Insights.color,
    description:
      "Your command center. Dashboard surfaces live data from every module so you always know what needs attention right now — no digging required.",
    connections: [
      { id: "expenses", dir: "←" },
      { id: "tasks", dir: "←" },
      { id: "habits", dir: "←" },
      { id: "reminders", dir: "←" },
    ],
  },
  tasks: {
    id: "tasks",
    name: "Tasks",
    icon: CheckSquare,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Actionable to-dos with priorities, due dates, and subtasks. Tasks plug into Reminders for alerts and into Goals to track meaningful progress.",
    connections: [
      { id: "reminders", dir: "→" },
      { id: "goals", dir: "→" },
    ],
  },
  reminders: {
    id: "reminders",
    name: "Reminders",
    icon: Bell,
    layer: "Orchestration",
    color: LAYER_CONFIG.Orchestration.color,
    description:
      "Precision alerts that fire at exactly the right time. Reminders are auto-created by Tasks and Loans so nothing is manually re-entered.",
    connections: [
      { id: "tasks", dir: "←" },
      { id: "loans", dir: "←" },
    ],
  },
  expenses: {
    id: "expenses",
    name: "Expenses",
    icon: Receipt,
    layer: "Orchestration",
    color: LAYER_CONFIG.Orchestration.color,
    description:
      "The hub for all outgoing money. Every expense instantly updates your Budget Planner and Dashboard — log once, reflected everywhere.",
    connections: [
      { id: "subscriptions", dir: "←" },
      { id: "loans", dir: "←" },
      { id: "budget", dir: "→" },
      { id: "dashboard", dir: "→" },
    ],
  },
  loans: {
    id: "loans",
    name: "Loans",
    icon: Landmark,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Track borrowed money and repayment schedules. Loans auto-generate Reminders for due dates and optionally log repayments as Expenses.",
    connections: [
      { id: "reminders", dir: "→" },
      { id: "expenses", dir: "→" },
    ],
  },
  habits: {
    id: "habits",
    name: "Habits",
    icon: Flame,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Daily routines that compound over time. Each habit check-in automatically moves the needle on any linked Goal.",
    connections: [{ id: "goals", dir: "→" }],
  },
  budget: {
    id: "budget",
    name: "Budget Planner",
    icon: PieChart,
    layer: "Insights",
    color: LAYER_CONFIG.Insights.color,
    description:
      "Your financial clarity engine. Budget Planner aggregates data from Expenses, Subscriptions, and Goals to give you a real-time health score.",
    connections: [
      { id: "expenses", dir: "←" },
      { id: "subscriptions", dir: "←" },
      { id: "goals", dir: "←" },
    ],
  },
  notes: {
    id: "notes",
    name: "Notes",
    icon: NotebookPen,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Capture anything, instantly. Notes is the free-form entry point for raw thoughts, ideas, and context that doesn't fit anywhere else.",
    connections: [],
  },
  subscriptions: {
    id: "subscriptions",
    name: "Subscriptions",
    icon: RefreshCw,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Never forget a renewal. Subscriptions auto-logs charges as Expenses and feeds fixed costs into your Budget Planner automatically.",
    connections: [
      { id: "expenses", dir: "→" },
      { id: "budget", dir: "→" },
    ],
  },
  goals: {
    id: "goals",
    name: "Goals",
    icon: Target,
    layer: "Orchestration",
    color: LAYER_CONFIG.Orchestration.color,
    description:
      "Your north star. Goals track long-term progress driven by Habits and Tasks, and can link to Budget Planner for financial targets.",
    connections: [
      { id: "habits", dir: "←" },
      { id: "tasks", dir: "←" },
      { id: "budget", dir: "→" },
    ],
  },
};

const INITIAL_NODES = [
  // Column 1: Sources (x: 50)
  {
    id: "notes",
    type: "custom",
    position: { x: 50, y: 0 },
    data: MODULE_DATA.notes,
  },
  {
    id: "habits",
    type: "custom",
    position: { x: 50, y: 120 },
    data: MODULE_DATA.habits,
  },
  {
    id: "tasks",
    type: "custom",
    position: { x: 50, y: 240 },
    data: MODULE_DATA.tasks,
  },
  {
    id: "subscriptions",
    type: "custom",
    position: { x: 50, y: 360 },
    data: MODULE_DATA.subscriptions,
  },
  {
    id: "loans",
    type: "custom",
    position: { x: 50, y: 480 },
    data: MODULE_DATA.loans,
  },

  // Column 2: Orchestration (x: 400)
  {
    id: "expenses",
    type: "custom",
    position: { x: 400, y: 100 },
    data: MODULE_DATA.expenses,
  },
  {
    id: "goals",
    type: "custom",
    position: { x: 400, y: 250 },
    data: MODULE_DATA.goals,
  },
  {
    id: "reminders",
    type: "custom",
    position: { x: 400, y: 400 },
    data: MODULE_DATA.reminders,
  },

  // Column 3: Insights (x: 750)
  {
    id: "budget",
    type: "custom",
    position: { x: 750, y: 150 },
    data: MODULE_DATA.budget,
  },
  {
    id: "dashboard",
    type: "custom",
    position: { x: 750, y: 330 },
    data: MODULE_DATA.dashboard,
  },
];

const INITIAL_EDGES = [
  {
    id: "e-sub-exp",
    source: "subscriptions",
    target: "expenses",
    animated: true,
  },
  {
    id: "e-sub-bud",
    source: "subscriptions",
    target: "budget",
    animated: true,
  },
  { id: "e-loan-rem", source: "loans", target: "reminders", animated: true },
  { id: "e-loan-exp", source: "loans", target: "expenses", animated: true },
  { id: "e-task-rem", source: "tasks", target: "reminders", animated: true },
  { id: "e-task-goal", source: "tasks", target: "goals", animated: true },
  { id: "e-habit-goal", source: "habits", target: "goals", animated: true },
  { id: "e-exp-bud", source: "expenses", target: "budget", animated: true },
  { id: "e-exp-dash", source: "expenses", target: "dashboard", animated: true },
  { id: "e-goal-bud", source: "goals", target: "budget", animated: true },
].map((e) => ({
  ...e,
  type: "bezier",
  markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff20" },
  style: { stroke: "#ffffff20", strokeWidth: 1.5 },
}));

// --- Custom Node ---

const CustomNode = ({
  data,
  selected,
}: {
  data: ModuleData;
  selected?: boolean;
}) => {
  const Icon = data.icon;
  const accent = data.color;

  return (
    <div
      className={cn(
        "relative w-48 bg-[#1a1a1f] border border-white/10 rounded-xl px-4 py-3 shadow-xl transition-all duration-300",
        selected
          ? "ring-2 brightness-110 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          : "hover:border-white/20",
      )}
      style={{
        borderLeft: `4px solid ${accent}`,
        boxShadow: selected
          ? `0 0 0 2px ${accent}, 0 0 20px ${accent}20`
          : undefined,
        backgroundColor: selected ? "#22222a" : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="bg-current! border-none! w-2! h-2!"
        style={{ color: accent }}
      />
      <div className="flex items-center gap-3">
        <div className="text-white/80">
          <Icon className="size-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-white truncate">
            {data.name}
          </span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">
            {data.layer}
          </span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="bg-current! border-none! w-2! h-2!"
        style={{ color: accent }}
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Popup Component ---

interface PopupProps {
  nodeId: string;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
  anchorRect: DOMRect | null;
}

const PopupAtNode = ({
  nodeId,
  onClose,
  onNavigate,
  anchorRect,
}: PopupProps) => {
  const data = MODULE_DATA[nodeId];
  if (!data || !anchorRect) return null;

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    placement: "bottom" as "bottom" | "top",
  });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      const popupRect = popupRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = anchorRect.bottom + 12;
      let left = anchorRect.left + anchorRect.width / 2 - popupRect.width / 2;
      let placement: "bottom" | "top" = "bottom";

      // Flip logic
      if (top + popupRect.height > viewportHeight - 20) {
        top = anchorRect.top - popupRect.height - 12;
        placement = "top";
      }

      // Horizontal overflow logic
      if (left + popupRect.width > viewportWidth - 20) {
        left = anchorRect.right - popupRect.width;
      }
      if (left < 20) {
        left = anchorRect.left;
      }

      setPos({ top, left, placement });
    }
  }, [anchorRect]);

  return (
    <motion.div
      ref={popupRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-100 w-72 bg-[#1a1a1f] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl pointer-events-auto"
      style={{
        top: pos.top,
        left: pos.left,
        boxShadow: `0 0 0 1px ${data.color}40, 0 10px 40px rgba(0,0,0,0.5)`,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 text-white/30 hover:text-white transition-colors"
      >
        <X className="size-4" />
      </button>

      <div className="flex items-center gap-3 mb-3">
        <div style={{ color: data.color }}>
          <data.icon className="size-5" />
        </div>
        <h3 className="text-base font-bold text-white">{data.name}</h3>
      </div>

      <p className="text-xs text-white/70 leading-relaxed mb-4">
        {data.description}
      </p>

      <div className="h-px bg-white/10 mb-4" />

      <div>
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">
          Connects with:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {data.connections.length > 0 ? (
            data.connections.map((conn) => {
              const connectedNode = MODULE_DATA[conn.id];
              return (
                <button
                  key={conn.id}
                  onClick={() => onNavigate(conn.id)}
                  title={`Jump to ${connectedNode.name}`}
                  className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] font-semibold text-white/60 hover:brightness-125 transition-all flex items-center gap-1 group"
                >
                  <span style={{ color: connectedNode.color }}>{conn.dir}</span>
                  {connectedNode.name}
                </button>
              );
            })
          ) : (
            <span className="text-[10px] text-white/40 italic">
              No direct connections.
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

function FlowMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [popupAnchor, setPopupAnchor] = useState<DOMRect | null>(null);
  const { fitView } = useReactFlow();

  const handleNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setActiveId(node.id);
    setPopupAnchor(rect);
  }, []);

  const handleNavigate = useCallback(
    (targetId: string) => {
      setActiveId(null);
      setPopupAnchor(null);

      fitView({ nodes: [{ id: targetId }], duration: 600, padding: 0.5 });

      setTimeout(() => {
        const nodeElement = document.querySelector(`[data-id="${targetId}"]`);
        if (nodeElement) {
          const rect = nodeElement.getBoundingClientRect();
          setActiveId(targetId);
          setPopupAnchor(rect);
          setNodes((nds) =>
            nds.map((n) => ({ ...n, selected: n.id === targetId })),
          );
        }
      }, 650);
    },
    [fitView, setNodes],
  );

  const handleClosePopup = useCallback(() => {
    setActiveId(null);
    setPopupAnchor(null);
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
  }, [setNodes]);

  // Update edges when activeId changes
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const isConnected =
          edge.source === activeId || edge.target === activeId;
        if (activeId) {
          if (isConnected) {
            const sourceNode = MODULE_DATA[edge.source];
            return {
              ...edge,
              style: {
                ...edge.style,
                stroke: sourceNode.color,
                strokeWidth: 2,
                opacity: 0.8,
              },
            };
          } else {
            return {
              ...edge,
              style: {
                ...edge.style,
                stroke: "#ffffff",
                strokeWidth: 1.5,
                opacity: 0.05,
              },
            };
          }
        }
        return {
          ...edge,
          style: { stroke: "#ffffff20", strokeWidth: 1.5, opacity: 0.4 },
        };
      }),
    );
  }, [activeId, setEdges]);

  return (
    <div className="w-full h-full relative bg-[#0d0d0f]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={handleClosePopup}
        fitView
        colorMode="dark"
      >
        <Background variant="dots" gap={32} size={1} color="#ffffff10" />
        <Controls
          showInteractive={false}
          className="bg-[#1a1a1f]! border-white/10! fill-white/50!"
        />

        <Panel position="top-left" className="pointer-events-none">
          <div className="flex flex-col gap-6 mt-10 ml-4">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-white/10 uppercase tracking-[0.3em]">
                Capture Layer
              </div>
              <div className="w-12 h-px bg-white/5" />
            </div>
            <div className="space-y-1 mt-32">
              <div className="text-[11px] font-bold text-white/10 uppercase tracking-[0.3em]">
                Logic Layer
              </div>
              <div className="w-12 h-px bg-white/5" />
            </div>
            <div className="space-y-1 mt-40">
              <div className="text-[11px] font-bold text-white/10 uppercase tracking-[0.3em]">
                Outcome Layer
              </div>
              <div className="w-12 h-px bg-white/5" />
            </div>
          </div>
        </Panel>
      </ReactFlow>

      <AnimatePresence>
        {activeId && popupAnchor && (
          <PopupAtNode
            nodeId={activeId}
            onClose={handleClosePopup}
            onNavigate={handleNavigate}
            anchorRect={popupAnchor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServiceNodeMap() {
  return (
    <div className="flex flex-col gap-8">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {Object.entries(LAYER_CONFIG).map(([layer, config]) => (
          <div key={layer} className="flex items-center gap-2">
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              {layer}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-[#0d0d0f]">
        <ReactFlowProvider>
          <FlowMap />
        </ReactFlowProvider>
      </div>

      {/* Mobile Hint */}
      <div className="md:hidden text-center text-[10px] text-white/30 uppercase tracking-widest">
        Tip: Tap a node to explore. Tap a connection pill to jump to that
        module.
      </div>
    </div>
  );
}
