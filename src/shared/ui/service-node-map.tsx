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
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { X, Info } from "lucide-react";
import { cn } from "@/shared/lib";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/shared/store";
import { APP_MODULES, LAYER_CONFIG, type AppModule } from "@/shared/config";

// --- Local Connections Data ---
const CONNECTIONS: Record<string, { id: string; dir: "→" | "←" }[]> = {
  tasks: [
    { id: "reminders", dir: "→" },
    { id: "goals", dir: "→" },
    { id: "circle", dir: "←" },
  ],
  reminders: [
    { id: "tasks", dir: "←" },
    { id: "loans", dir: "←" },
    { id: "events", dir: "←" },
  ],
  expenses: [
    { id: "subscriptions", dir: "←" },
    { id: "loans", dir: "←" },
    { id: "circle", dir: "←" },
    { id: "events", dir: "←" },
    { id: "budget", dir: "→" },
  ],
  loans: [
    { id: "reminders", dir: "→" },
    { id: "expenses", dir: "→" },
  ],
  habits: [{ id: "goals", dir: "→" }],
  budget: [
    { id: "expenses", dir: "←" },
    { id: "subscriptions", dir: "←" },
    { id: "goals", dir: "←" },
  ],
  notes: [],
  subscriptions: [
    { id: "expenses", dir: "→" },
    { id: "budget", dir: "→" },
  ],
  goals: [
    { id: "habits", dir: "←" },
    { id: "tasks", dir: "←" },
    { id: "budget", dir: "→" },
    { id: "circle", dir: "←" },
  ],
  circle: [
    { id: "expenses", dir: "→" },
    { id: "goals", dir: "→" },
    { id: "tasks", dir: "→" },
  ],
  events: [
    { id: "reminders", dir: "→" },
    { id: "expenses", dir: "→" },
  ],
  dashboard: [],
};

// --- Helper type for Custom Node ---
type NodeData = AppModule & {
  connections: { id: string; dir: "→" | "←" }[];
};

const INITIAL_NODES: Node[] = [
  // Column 1: Sources (x: 50)
  {
    id: "notes",
    type: "custom",
    position: { x: 50, y: 50 },
    data: { ...APP_MODULES.notes, connections: CONNECTIONS.notes } as any as Record<string, unknown>,
  },
  {
    id: "habits",
    type: "custom",
    position: { x: 50, y: 127 },
    data: { ...APP_MODULES.habits, connections: CONNECTIONS.habits } as any as Record<string, unknown>,
  },
  {
    id: "tasks",
    type: "custom",
    position: { x: 50, y: 204 },
    data: { ...APP_MODULES.tasks, connections: CONNECTIONS.tasks } as any as Record<string, unknown>,
  },
  {
    id: "subscriptions",
    type: "custom",
    position: { x: 50, y: 281 },
    data: { ...APP_MODULES.subscriptions, connections: CONNECTIONS.subscriptions } as any as Record<string, unknown>,
  },
  {
    id: "loans",
    type: "custom",
    position: { x: 50, y: 358 },
    data: { ...APP_MODULES.loans, connections: CONNECTIONS.loans } as any as Record<string, unknown>,
  },
  {
    id: "events",
    type: "custom",
    position: { x: 50, y: 435 },
    data: { ...APP_MODULES.events, connections: CONNECTIONS.events } as any as Record<string, unknown>,
  },

  // Column 2: Orchestration (x: 350 - 500)
  {
    id: "expenses",
    type: "custom",
    position: { x: 450, y: 50 },
    data: { ...APP_MODULES.expenses, connections: CONNECTIONS.expenses } as any as Record<string, unknown>,
  },
  {
    id: "circle",
    type: "custom",
    position: { x: 350, y: 204 },
    data: { ...APP_MODULES.circle, connections: CONNECTIONS.circle } as any as Record<string, unknown>,
  },
  {
    id: "reminders",
    type: "custom",
    position: { x: 500, y: 358 },
    data: { ...APP_MODULES.reminders, connections: CONNECTIONS.reminders } as any as Record<string, unknown>,
  },

  // Column 3: Insights (x: 700)
  {
    id: "budget",
    type: "custom",
    position: { x: 700, y: 281 },
    data: { ...APP_MODULES.budget, connections: CONNECTIONS.budget } as any as Record<string, unknown>,
  },
  {
    id: "goals",
    type: "custom",
    position: { x: 400, y: 127 },
    data: { ...APP_MODULES.goals, connections: CONNECTIONS.goals } as any as Record<string, unknown>,
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
  { id: "e-circle-exp", source: "circle", target: "expenses" },
  { id: "e-circle-goal", source: "circle", target: "goals" },
  { id: "e-circle-task", source: "circle", target: "tasks" },
  { id: "e-evt-rem", source: "events", target: "reminders" },
  { id: "e-evt-exp", source: "events", target: "expenses" },
].map((e) => ({
  ...e,
  type: "smoothstep",
  animated: true,
  className: "!stroke-gray-400 dark:!stroke-gray-500",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#9ca3af",
  },
  style: { strokeWidth: 1.5 },
}));

// --- Custom Node ---
interface CustomNodeType {
  data: NodeData;
  selected?: boolean;
}

const LAYER_BG: Record<string, { base: string; active: string; border: string; activeBorder: string }> = {
  Sources:       { base: "#dbeafe", active: "#bfdbfe", border: "#93c5fd", activeBorder: "#4F8EF7" },
  Orchestration: { base: "#fef3c7", active: "#fde68a", border: "#fcd34d", activeBorder: "#F5A623" },
  Insights:      { base: "#f3e8ff", active: "#e9d5ff", border: "#d8b4fe", activeBorder: "#A855F7" },
  Core:          { base: "#e0e7ff", active: "#c7d2fe", border: "#a5b4fc", activeBorder: "#5B6AF0" },
};

const LAYER_BG_DARK: Record<string, { base: string; active: string; border: string; activeBorder: string }> = {
  Sources:       { base: "#172554", active: "#1e3a5f", border: "#1e40af", activeBorder: "#4F8EF7" },
  Orchestration: { base: "#451a03", active: "#78350f", border: "#92400e", activeBorder: "#F5A623" },
  Insights:      { base: "#3b0764", active: "#581c87", border: "#6b21a8", activeBorder: "#A855F7" },
  Core:          { base: "#1e1b4b", active: "#312e81", border: "#3730a3", activeBorder: "#5B6AF0" },
};

const CustomNode = ({ data, selected }: CustomNodeType) => {
  const { theme } = useUIStore();
  const Icon = data.icon;
  const layerColor = LAYER_CONFIG[data.layer as keyof typeof LAYER_CONFIG]?.color || data.color;
  const isDark = theme === "dark";

  const handleInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nodeEl = e.currentTarget.closest(".react-flow__node");
    if (nodeEl) {
      window.dispatchEvent(
        new CustomEvent("node-info-click", {
          detail: { id: data.id, rect: nodeEl.getBoundingClientRect() },
        })
      );
    }
  };

  const defaultPalette = { base: "#e0e7ff", active: "#c7d2fe", border: "#a5b4fc", activeBorder: "#5B6AF0" };
  const defaultDarkPalette = { base: "#1e1b4b", active: "#312e81", border: "#3730a3", activeBorder: "#5B6AF0" };
  const palette = isDark
    ? (LAYER_BG_DARK[data.layer] || defaultDarkPalette)
    : (LAYER_BG[data.layer] || defaultPalette);

  return (
    <div
      className={cn(
        "group relative md:w-48 w-fit border rounded-xl md:px-4 md:py-3 px-2 py-2 shadow-xl transition-all duration-300 border-x-4",
      )}
      style={{
        backgroundColor: selected ? palette.active : palette.base,
        borderColor: selected ? palette.activeBorder : palette.border,
        boxShadow: selected ? `0 0 0 2px ${layerColor}40` : undefined,
      }}
    >
      <button
        onClick={handleInfoClick}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer z-10"
      >
        <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
      </button>
      <Handle
        type="target"
        position={Position.Left}
        className="bg-current! border-none! w-2! h-2!"
        style={{ color: layerColor }}
        isConnectable={false}
      />
      <div className="flex md:items-center items-start md:gap-3 gap-1 select-none">
        <div className="text-gray-600 dark:text-white/80 shrink-0 md:mt-0 mt-1">
          <Icon className="md:size-5 size-4" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="md:text-sm text-xs font-bold text-gray-900 dark:text-white truncate">
            {data.name}
          </span>
          <span className="md:text-[9px] text-[7px] text-gray-400 dark:text-white/40 uppercase tracking-widest font-bold">
            {data.layer}
          </span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="bg-current! border-none! w-2! h-2!"
        style={{ color: layerColor }}
        isConnectable={false}
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
  const data = APP_MODULES[nodeId as keyof typeof APP_MODULES];
  const connections = CONNECTIONS[nodeId] || [];
  if (!data) return null;

  const incoming = connections.filter((c) => c.dir === "←");
  const outgoing = connections.filter((c) => c.dir === "→");

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
      className="fixed z-100 w-72 bg-white dark:bg-[#1a1a1f] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl pointer-events-auto overflow-hidden"
      style={{
        top: pos.top,
        left: pos.left,
        boxShadow: `0 0 0 1px ${data.color}80, 0 10px 40px rgba(0,0,0,0.2)`,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute cursor-pointer top-3 right-3 p-1 text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
      >
        <X className="size-4" />
      </button>

      <div className="flex items-center gap-3 mb-3 relative">
        <div style={{ color: data.color }}>
          <data.icon className="size-5" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {data.name}
        </h3>
      </div>

      <p className="text-xs text-gray-600 dark:text-white/70 leading-relaxed mb-4 relative">
        {data.description}
      </p>

      <div className="h-px bg-gray-100 dark:bg-white/10 mb-4" />

      <div className="relative">
        {connections.length > 0 ? (
          <div className="space-y-4">
            {incoming.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest block mb-2">
                  Incoming Data:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {incoming.map((conn) => {
                    const target = APP_MODULES[conn.id as keyof typeof APP_MODULES];
                    if (!target) return null;
                    return (
                      <button
                        key={conn.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(conn.id);
                        }}
                        title={`Jump to ${target.name}`}
                        className="px-2 py-1 cursor-pointer bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-md text-[10px] font-semibold text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:brightness-125 transition-all flex items-center gap-1"
                        style={{ borderLeftColor: target.color, borderLeftWidth: 3 }}
                      >
                        <target.icon className="w-3 h-3" />
                        {target.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {outgoing.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest block mb-2">
                  Outgoing To:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {outgoing.map((conn) => {
                    const target = APP_MODULES[conn.id as keyof typeof APP_MODULES];
                    if (!target) return null;
                    return (
                      <button
                        key={conn.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(conn.id);
                        }}
                        title={`Jump to ${target.name}`}
                        className="px-2 py-1 cursor-pointer bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-md text-[10px] font-semibold text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:brightness-125 transition-all flex items-center gap-1"
                        style={{ borderLeftColor: target.color, borderLeftWidth: 3 }}
                      >
                        <target.icon className="w-3 h-3" />
                        {target.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <span className="text-[10px] text-gray-400 dark:text-white/30 italic">
            No direct connections
          </span>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Component ---

function FlowMap() {
  const { theme } = useUIStore();
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

  // Click on node -> highlight edges + select node
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      setActiveId(node.id);
      setNodes((nds) => nds.map((n) => ({ ...n, selected: n.id === node.id })));
    },
    [setNodes],
  );

  // Click on info button -> open popup
  useEffect(() => {
    const handleInfoClick = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; rect: DOMRect }>;
      setActiveId(customEvent.detail.id);
      setPopupAnchor(customEvent.detail.rect);
      setNodes((nds) => nds.map((n) => ({ ...n, selected: n.id === customEvent.detail.id })));
    };
    window.addEventListener("node-info-click", handleInfoClick);
    return () => window.removeEventListener("node-info-click", handleInfoClick);
  }, [setNodes]);

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

  // Update edges when activeId or theme changes
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const isConnected =
          edge.source === activeId || edge.target === activeId;
        const defaultStroke = theme === "dark" ? "#ffffff" : "#000000";
        const defaultArrow = "#9ca3af";
        if (activeId) {
          if (isConnected) {
            const activeModule = APP_MODULES[activeId as keyof typeof APP_MODULES];
            const activeLayerColor = LAYER_CONFIG[activeModule?.layer as keyof typeof LAYER_CONFIG]?.color || "#4F8EF7";
            return {
              ...edge,
              markerEnd: { type: MarkerType.ArrowClosed, color: activeLayerColor },
              style: {
                ...edge.style,
                stroke: activeLayerColor,
                strokeWidth: 2,
                opacity: 1,
              },
            };
          } else {
            return {
              ...edge,
              markerEnd: { type: MarkerType.ArrowClosed, color: defaultArrow },
              style: {
                ...edge.style,
                stroke: defaultStroke,
                strokeWidth: 1.5,
                opacity: 0.05,
              },
            };
          }
        }
        return {
          ...edge,
          markerEnd: { type: MarkerType.ArrowClosed, color: defaultArrow },
          style: { stroke: defaultStroke, strokeWidth: 1.5, opacity: 0.15 },
        };
      }),
    );
  }, [activeId, theme, setEdges]);

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
    <div
      ref={flowRef}
      className="w-full h-full relative bg-gray-50 dark:bg-[#0d0d0f]"
    >
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
        nodesConnectable={false}
        fitView
        onNodeDrag={onNodeDrag}
        colorMode={theme}
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
          color={theme === "dark" ? "#ffffff10" : "#00000010"}
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
      <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-2xl bg-gray-50 dark:bg-[#0d0d0f]">
        <ReactFlowProvider>
          <FlowMap />
        </ReactFlowProvider>
      </div>

      <div className="text-center md:hidden">
        <p className="text-[10px] text-gray-500 dark:text-white/30 uppercase tracking-[0.2em] font-bold">
          Tip: Tap a node to explore. Tap a connection pill to jump to that
          module.
        </p>
      </div>
    </div>
  );
}
