"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  BackgroundVariant,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
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
type LayerConfig = Record<
  LayerType,
  { color: string; bg: string; icon: string }
>;

const LAYER_CONFIG: LayerConfig = {
  Sources: { color: "#4F8EF7", bg: "bg-blue-500/10", icon: "🔵" },
  Orchestration: { color: "#F5A623", bg: "bg-amber-500/10", icon: "🟡" },
  Insights: { color: "#A855F7", bg: "bg-purple-500/10", icon: "🟣" },
};

const MODULE_DATA: Record<string, ModuleData> = {
  tasks: {
    id: "tasks",
    name: "Tasks",
    icon: CheckSquare,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Everything you need to get done. Create tasks with priorities, due dates, and subtasks — they automatically create Reminders and feed progress into your Goals.",
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
      "Never miss a moment. Reminders fire at exactly the right time and are auto-created when you add Tasks or set up Loan repayment schedules.",
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
      "Log once, reflected everywhere. Every expense you record automatically updates your Budget Planner — Subscriptions and Loans also push charges here automatically.",
    connections: [
      { id: "subscriptions", dir: "←" },
      { id: "loans", dir: "←" },
      { id: "budget", dir: "→" },
    ],
  },
  loans: {
    id: "loans",
    name: "Loans",
    icon: Landmark,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Stay on top of what you owe. Loans auto-schedule Reminders for upcoming EMIs and can automatically log repayments as Expenses.",
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
      "Small actions, big results. Track daily routines and each check-in automatically contributes momentum toward any Goal you've linked.",
    connections: [{ id: "goals", dir: "→" }],
  },
  budget: {
    id: "budget",
    name: "Budget Planner",
    icon: PieChart,
    layer: "Insights",
    color: LAYER_CONFIG.Insights.color,
    description:
      "Your financial clarity engine. Set spending limits per category and Budget Planner automatically tracks actuals from Expenses, Subscriptions, and Goal savings targets.",
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
      "Capture anything, instantly. A free-form space for raw thoughts, ideas, and context — the universal entry point that requires no structure.",
    connections: [],
  },
  subscriptions: {
    id: "subscriptions",
    name: "Subscriptions",
    icon: RefreshCw,
    layer: "Sources",
    color: LAYER_CONFIG.Sources.color,
    description:
      "Never forget a renewal. Subscriptions auto-logs charges as Expenses and feeds your fixed monthly costs into Budget Planner.",
    connections: [
      { id: "expenses", dir: "→" },
      { id: "budget", dir: "→" },
    ],
  },
  goals: {
    id: "goals",
    name: "Goals",
    icon: Target,
    layer: "Insights",
    color: LAYER_CONFIG.Insights.color,
    description:
      "Your north star. Set targets with deadlines, link Habits and Tasks to drive progress automatically, and connect financial goals to Budget Planner for savings tracking.",
    connections: [
      { id: "habits", dir: "←" },
      { id: "tasks", dir: "←" },
      { id: "budget", dir: "→" },
    ],
  },
};

const INITIAL_NODES: Node[] = [
  // Column 1: Sources (x: 50)
  {
    id: "notes",
    type: "custom",
    position: { x: 50, y: 50 },
    data: MODULE_DATA.notes as any as Record<string, unknown>,
  },
  {
    id: "habits",
    type: "custom",
    position: { x: 50, y: 127 },
    data: MODULE_DATA.habits as any as Record<string, unknown>,
  },
  {
    id: "tasks",
    type: "custom",
    position: { x: 50, y: 204 },
    data: MODULE_DATA.tasks as any as Record<string, unknown>,
  },
  {
    id: "subscriptions",
    type: "custom",
    position: { x: 50, y: 281 },
    data: MODULE_DATA.subscriptions as any as Record<string, unknown>,
  },
  {
    id: "loans",
    type: "custom",
    position: { x: 50, y: 358 },
    data: MODULE_DATA.loans as any as Record<string, unknown>,
  },

  // Column 2: Orchestration (x: 380)
  {
    id: "expenses",
    type: "custom",
    position: { x: 450, y: 50 },
    data: MODULE_DATA.expenses as any as Record<string, unknown>,
  },
  {
    id: "reminders",
    type: "custom",
    position: { x: 500, y: 358 },
    data: MODULE_DATA.reminders as any as Record<string, unknown>,
  },

  // Column 3: Insights (x: 700)
  {
    id: "budget",
    type: "custom",
    position: { x: 700, y: 281 },
    data: MODULE_DATA.budget as any as Record<string, unknown>,
  },
  {
    id: "goals",
    type: "custom",
    position: { x: 400, y: 127 },
    data: MODULE_DATA.goals as any as Record<string, unknown>,
  },
];

const INITIAL_EDGES = [
  { id: "e-sub-exp", source: "subscriptions", target: "expenses" },
  { id: "e-sub-bud", source: "subscriptions", target: "budget" },
  { id: "e-loan-rem", source: "loans", target: "reminders" },
  { id: "e-loan-exp", source: "loans", target: "expenses" },
  { id: "e-task-rem", source: "tasks", target: "reminders" },
  { id: "e-task-goal", source: "tasks", target: "goals" },
  { id: "e-habit-goal", source: "habits", target: "goals" },
  { id: "e-exp-bud", source: "expenses", target: "budget" },
  { id: "e-goal-bud", source: "goals", target: "budget" },
].map((e) => ({
  ...e,
  type: "smoothstep",
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: MODULE_DATA[e.source]!.color,
  },
  style: { stroke: "#ffffff25", strokeWidth: 1.5 },
}));

// --- Custom Node ---
interface CustomNodeType {
  data: ModuleData;
  selected?: boolean;
}

const CustomNode = ({ data, selected }: CustomNodeType) => {
  const Icon = data.icon;
  const accent = data.color;

  return (
    <div
      className={cn(
        "relative md:w-48 w-fit bg-[#1a1a1f] border border-white/10 rounded-xl md:px-4 md:py-3 px-2 py-2 shadow-xl transition-all duration-300",
        selected ? "brightness-110" : "hover:border-white/20",
      )}
      style={{
        borderLeft: `4px solid ${accent}`,
        boxShadow: selected ? `0 0 0 2px ${accent}` : undefined,
        backgroundColor: selected ? "#22222a" : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="bg-current! border-none! w-2! h-2!"
        style={{ color: accent }}
      />
      <div className="flex md:items-center items-start md:gap-3 gap-1 select-none">
        <div className="text-white/80 shrink-0 md:mt-0 mt-1">
          <Icon className="md:size-5 size-4" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="md:text-sm text-xs font-bold text-white truncate">
            {data.name}
          </span>
          <span className="md:text-[9px] text-[7px] text-white/40 uppercase tracking-widest font-bold">
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
}

const PopupAtNode = ({ nodeId, onClose, onNavigate }: PopupProps) => {
  const data = MODULE_DATA[nodeId];
  if (!data) return null;

  const [pos, setPos] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const updatePos = () => {
      if (!popupRef.current) return;

      const nodeElement = document.querySelector(`[data-id="${nodeId}"]`);
      if (!nodeElement) return;

      const anchorRect = nodeElement.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = anchorRect.bottom + 12;
      let left = anchorRect.left + anchorRect.width / 2 - popupRect.width / 2;

      if (top + popupRect.height > viewportHeight - 20) {
        top = anchorRect.top - popupRect.height - 12;
      }
      if (left + popupRect.width > viewportWidth - 20) {
        left = anchorRect.right - popupRect.width;
      }
      if (left < 20) {
        left = anchorRect.left;
      }

      setPos({ top, left });
      rafId = requestAnimationFrame(updatePos);
    };

    rafId = requestAnimationFrame(updatePos);
    return () => cancelAnimationFrame(rafId);
  }, [nodeId]);

  return (
    <motion.div
      ref={popupRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-100 w-72 bg-[#1a1a1f] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl pointer-events-auto overflow-hidden"
      style={{
        top: pos.top,
        left: pos.left,
        boxShadow: `0 0 0 1px ${data.color}80, 0 10px 40px rgba(0,0,0,0.5)`,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute cursor-pointer top-3 right-3 p-1 text-white/30 hover:text-white transition-colors z-10"
      >
        <X className="size-4" />
      </button>

      <div className="flex items-center gap-3 mb-3 relative">
        <div style={{ color: data.color }}>
          <data.icon className="size-5" />
        </div>
        <h3 className="text-base font-bold text-white">{data.name}</h3>
      </div>

      <p className="text-xs text-white/70 leading-relaxed mb-4 relative">
        {data.description}
      </p>

      <div className="h-px bg-white/10 mb-4" />

      <div className="relative">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">
          Connects with:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {data.connections.length > 0 ? (
            data.connections.map((conn) => {
              const target = MODULE_DATA[conn.id];
              if (!target) return null;
              return (
                <button
                  key={conn.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(conn.id);
                  }}
                  title={`Jump to ${target.name}`}
                  className="px-2 py-1 cursor-pointer bg-white/5 border border-white/5 rounded-md text-[10px] font-semibold text-white/60 hover:brightness-125 transition-all flex items-center gap-1"
                >
                  <span style={{ color: target.color }}>{conn.dir}</span>
                  {target.name}
                </button>
              );
            })
          ) : (
            <span className="text-[10px] text-white/40 italic font-medium">
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

  useEffect(() => {
    if (flowRef.current) {
      const { width, height } = flowRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
      // setNodes(getInitialNodes(width, height)); // 👈 add this line
    }
  }, []);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setActiveId(node.id);
      setPopupAnchor(rect);
      setNodes((nds) => nds.map((n) => ({ ...n, selected: n.id === node.id })));
    },
    [setNodes],
  );

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

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClosePopup();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClosePopup]);

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
                stroke: sourceNode!.color,
                strokeWidth: 2,
                opacity: 1,
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
          style: { stroke: "#ffffff", strokeWidth: 1.5, opacity: 0.15 },
        };
      }),
    );
  }, [activeId, setEdges]);

  const flowRef = useRef<HTMLDivElement>(null);

  const onNodeDrag = useCallback(
    (_: React.MouseEvent, node: any) => {
      const container = flowRef.current;
      if (!container) return;

      const { width: cW, height: cH } = container.getBoundingClientRect();
      const nodeW = 192; // w-48 = 192px
      const nodeH = 64; // approximate node height

      const clampedX = Math.max(0, Math.min(node.position.x, cW - nodeW));
      const clampedY = Math.max(0, Math.min(node.position.y, cH - nodeH));

      if (clampedX !== node.position.x || clampedY !== node.position.y) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? { ...n, position: { x: clampedX, y: clampedY } }
              : n,
          ),
        );
      }
    },
    [setNodes],
  );

  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    if (flowRef.current) {
      const { width, height } = flowRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, []);

  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });

  const onMove = useCallback((_: any, newViewport: any) => {
    // If viewport tries to move from origin, reset it immediately
    if (newViewport.x !== 0 || newViewport.y !== 0) {
      setViewport({ x: 0, y: 0, zoom: newViewport.zoom });
    }
  }, []);

  return (
    <div ref={flowRef} className="w-full h-full relative bg-[#0d0d0f]">
      <ReactFlow
        viewport={viewport}
        onViewportChange={setViewport}
        onMove={onMove}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={handleClosePopup}
        fitView
        onNodeDrag={onNodeDrag}
        colorMode="dark"
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        selectionOnDrag={false}
        multiSelectionKeyCode={null}
        panOnDrag={false}
        panOnScroll={false}
        proOptions={{ hideAttribution: true }}
        nodeExtent={[
          [0, 0],
          [containerSize.width - 0, containerSize.height - 0],
        ]}
        translateExtent={[
          [0, 0],
          [containerSize.width, containerSize.height],
        ]}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={32}
          size={1}
          color="#ffffff10"
        />
      </ReactFlow>

      <AnimatePresence>
        {activeId && popupAnchor && (
          <PopupAtNode
            nodeId={activeId}
            onClose={handleClosePopup}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServiceNodeMap() {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-[#0d0d0f]">
        <ReactFlowProvider>
          <FlowMap />
        </ReactFlowProvider>
      </div>

      <div className="text-center md:hidden">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
          Tip: Tap a node to explore. Tap a connection pill to jump to that
          module.
        </p>
      </div>
    </div>
  );
}
