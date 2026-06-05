import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, AlertTriangle, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isWarning?: boolean;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am Alex Mercer's Interactive Consulting Agent proxy, powered by Gemini. I have deep-learning indices on Alex's actual services, architectural designs, and active workflows. \n\nHow can I help you design, scale, or automate your company's AI applications today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "Design a custom table RAG configuration",
    "Tell me about the Zendesk Shopify bot (CSAT 92%)",
    "How do we cut LLM API token bills by 65%?",
    "We need an operational MVP in 4 weeks. Best approach?",
  ];

  // Auto scroll down to newest bubble on chat appendation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        isWarning: !!data.warning
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.warn("API route not available, failing back to high-fidelity client-side knowledge engine:", err);
      
      // Smart local keymatcher matching the backend's knowledge base
      const fallbackReplies: { keywords: string[]; reply: string }[] = [
        {
          keywords: ["hello", "hi", "hey", "who are you"],
          reply: "Hello! I am Alex Mercer's AI Consulting Agent representative. I can advise you on our vector search architectures, automated operational pipelines, custom Shopify integrations, or any of the 10 real-world case studies in our portfolio. How can I assist with your engineering or AI strategy today?"
        },
        {
          keywords: ["rag", "vector", "search", "qdrant", "pinecone", "kb"],
          reply: "We have comprehensive experience with Retrieval-Augmented Generation (RAG). In our portfolio, Case Study #2 details an Internal Knowledge Base Search system utilizing Qdrant and a 'Late Chunking' strategy over scientific PDFs. This reduced research lookup times from 8 hours per week to under 4 minutes with 99.1% accurate citations."
        },
        {
          keywords: ["support", "bot", "ticket", "zendesk", "shopify", "92%"],
          reply: "Our Shopify-Zendesk support agent (Case Study #1) automates 68% of e-commerce support tickets safely with a secure human handoff. It retrieves order tracking statistics, changes statuses via API, and boasts an audited 92% Customer Satisfaction (CSAT) rating."
        },
        {
          keywords: ["automation", "webhook", "salesforce", "docusign", "flow", "operations"],
          reply: "We specialize in state-authoritative workflows. For example, our Lead Qualification Assistant (Case Study #4) enriches anonymous signups in real-time using search grounding, and our Workflow Operations Automator (Case Study #7) connects Salesforce update events directly to custom PDF generators and DocuSign triggers."
        },
        {
          keywords: ["bill", "cost", "cut", "save", "65%", "token"],
          reply: "We optimize LLM API spend by implementing semantic token cache layering, customized prompt compilers, and small fine-tuned SLMs for routine classification Tasks. This typical system architecture saves clients up to 65% on monthly token bills."
        },
        {
          keywords: ["mvp", "4 weeks", "schedule", "week", "timeline"],
          reply: "For high-impact startups, we deliver fully typed, functional MVPs in strict 4-week modules (Case Study #8). We design, code, build, and deploy a secure beta with real database integrations to test product-market-fit before massive overhead."
        },
        {
          keywords: ["table", "excel", "sheet", "quant", "math"],
          reply: "For tabular and Excel spreadsheet RAG pipelines (Case studies #2 & #5), we convert structured data layouts into predictable intermediate JSON before feeding the context window. This ensures LLM summarizations never hallucinate basic math."
        },
        {
          keywords: ["call", "book", "schedule", "contact", "discovery", "email"],
          reply: "Excellent! You can schedule a 15-minute consulting discovery call with Alex by choosing a slot in the interactive calendar below, or submitting a project intake form. Alternatively, feel free to email directly at alex.mercer.solutions@gmail.com!"
        }
      ];

      const q = textToSend.toLowerCase();
      let matchedReply = "";

      for (const item of fallbackReplies) {
        if (item.keywords.some(kw => q.includes(kw))) {
          matchedReply = item.reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = "That sounds like a compelling use case! In brief, we offer custom strategy, workflow operations automations, and quick-turn full-stack MVPs. I recommend scrolling down to our interactive calendar to schedule a discovery call so we can map out a specific execution plan for your exact tech stack.";
      }

      const fallbackMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: matchedReply,
        isWarning: true
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I am Alex Mercer's Interactive Consulting Agent proxy, powered by Gemini. I have deep-learning indices on Alex's actual services, architectural designs, and active workflows. \n\nHow can I help you design, scale, or automate your company's AI applications today?"
      }
    ]);
  };

  return (
    <section id="ai-agent" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800 relative bg-zinc-50/10 dark:bg-zinc-950/10">
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12 border-l-2 border-teal-500 pl-4">
          <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">INTERACTIVE QUERY</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            AI advisory assistant proxy
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Query Alex's agentic engineering schemas, ask about custom implementation steps, or get immediate architectural recommendations in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Explanatory Info Card Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-805 bg-white dark:bg-zinc-900/40 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2 uppercase tracking-wide border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Agent Capability Scope</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-450 mb-4 leading-relaxed font-normal">
                This assistant utilizes custom schema indices covering Alex's actual developments in vector search pipelines, multi-tool webhooks, and secure API caching.
              </p>
              <ul className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-teal-555 mt-0.5">•</span>
                  <span>Explains code, challenge and technical metrics of all 10 case studies in depth.</span>
                </li>
                <li className="flex items-start gap-1.5 animate-pulse">
                  <span className="text-teal-555 mt-0.5">•</span>
                  <span>Provides design and optimization guidelines tailored for your specific tech stack.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-555 mt-0.5">•</span>
                  <span>Maintains session state indices to assist in step-by-step product MVP scoping.</span>
                </li>
              </ul>
            </div>

            {/* In-demand queries suggestions list */}
            <div className="hidden lg:flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5 font-bold">SUGGESTED DISCOVERY QUERIES</span>
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="text-left text-xs text-zinc-750 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 p-2.5 rounded-md bg-white dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/80 transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Board Column */}
          <div className="lg:col-span-8">
            <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden flex flex-col h-[520px]">
              
              {/* Terminal Title Bar */}
              <div className="bg-zinc-50 dark:bg-zinc-900 px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Alex Mercer Proxy Agent</h4>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono leading-none block mt-0.5">Gemini-Engine Offline-Index hybrid mode</span>
                  </div>
                </div>
                {/* Reset button */}
                <button
                  onClick={handleResetChat}
                  title="Reset dialog history"
                  className="p-1 px-2 text-xs rounded border border-zinc-200 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="text-[10px] font-mono">Reset</span>
                </button>
              </div>

              {/* Chat history logs frame */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50/15 dark:bg-zinc-900/10 leading-relaxed scrollbar-thin"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.role === 'user' ? 'ml-auto items-end animate-fade-in' : 'mr-auto items-start animate-fade-in'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-teal-600 dark:bg-teal-500 text-white dark:text-zinc-950 rounded-tr-none shadow-sm font-medium'
                          : 'bg-zinc-50 dark:bg-zinc-90 w-auto border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-250 rounded-tl-none font-normal'
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.content}</p>
                    </div>

                    {msg.isWarning && (
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-mono mt-1 font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>CONSULTANT OFFLINE: REVERTED TO TECHNICAL RULES INDEX MEMORY.</span>
                      </div>
                    )}
                    
                    <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-wider block font-bold px-1">
                      {msg.role === 'user' ? 'You' : 'Advisor proxy'}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col items-start mr-auto max-w-[85%]">
                    <div className="px-4 py-3 rounded-2xl rounded-tl-none text-xs bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-tight">Proxy agent is writing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile suggestions container */}
              <div className="lg:hidden px-4 pt-2.5 pb-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 overflow-x-auto whitespace-nowrap flex gap-1.5">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="inline-block text-[10px] text-zinc-600 dark:text-zinc-350 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 px-2.5 py-1.5 rounded-full"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Control Console */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-3 sm:p-4 border-t border-zinc-200 dark:border-zinc-850">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    id="ai-agent-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about table RAG pipelines, API cost reduction setups..."
                    className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg px-4 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400"
                  />
                  <button
                    id="ai-agent-submit"
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600 dark:text-zinc-950 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
