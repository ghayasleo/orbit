import { Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { useState } from "react";

const mockHistory = [
  { role: "user", text: "What's my spending this week?" },
  {
    role: "assistant",
    text: "You've spent \u20A8 4,500 so far this week, mostly on Groceries.",
  },
];

export function AIAssistantWidget() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(mockHistory);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I can help with that! However, I am just a demo in this widget.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <WidgetWrapper id="ai-chat">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-3 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)] bg-linear-to-b from-white to-indigo-50/30 dark:from-zinc-950 dark:to-indigo-950/10">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-linear-to-br from-[#5B6AF0] to-[#9B6BF2]">
              <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-[14px] font-bold text-transparent bg-clip-text bg-linear-to-r from-[#5B6AF0] to-[#9B6BF2] font-jakarta">
              Orbit AI
            </h3>
          </div>
          <button className="flex items-center gap-1 text-[11px] font-medium text-text-muted hover:text-[#5B6AF0] transition-colors cursor-pointer">
            Open Full Chat
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
              <div
                className={`py-2 px-3 rounded-2xl text-[13px] ${
                  msg.role === "user"
                    ? "bg-[#5B6AF0]/10 text-[#5B6AF0] rounded-tr-sm"
                    : "bg-bg-subtle text-text-primary border border-border-subtle rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col max-w-[85%] mr-auto">
              <div className="py-2.5 px-3 rounded-2xl rounded-tl-sm bg-bg-subtle border border-border-subtle text-text-muted flex items-center gap-1 w-12 justify-center">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Orbit anything..."
            className="w-full h-10 rounded-full bg-bg-base border border-border-subtle pl-4 pr-10 text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#5B6AF0] focus:ring-1 focus:ring-[#5B6AF0]/50 transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center rounded-full bg-[#5B6AF0] text-white hover:bg-[#4a58e8] disabled:opacity-50 disabled:hover:bg-[#5B6AF0] transition-colors cursor-pointer"
          >
            <CornerDownLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </WidgetWrapper>
  );
}
