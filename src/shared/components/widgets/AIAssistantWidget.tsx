import { Sparkles, CornerDownLeft } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";
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
    <WidgetWrapper id="ai-assistant">
      <WidgetHeader
        title="Orbit AI"
        icon={Sparkles}
        iconColorClass="text-blue-500"
        iconBgClass="bg-blue-600/10"
        linkText="Ask anything"
        onLinkClick={() => {}}
      />

      <WidgetBody id="ai-assistant">
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
      </WidgetBody>
    </WidgetWrapper>
  );
}
