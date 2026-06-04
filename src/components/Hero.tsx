import { ArrowRight, Sparkles, Code2, Server, Briefcase, Play, Github, Linkedin, Mail } from 'lucide-react';

interface HeroProps {
  onNavClick: (sect: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const credibilitySignals = [
    { value: '8+', label: 'Years Of Systems Engineering', sub: 'Lead Arch & DevOps roles' },
    { value: '10', label: 'Real Case Studies', sub: 'Shipped & fully audited' },
    { value: '65%', label: 'Avg LLM Cost Reduction', sub: 'With semantic caching query proxy' },
    { value: '94%', label: 'Support AI Agent CSAT', sub: 'Secure tool-calling auto-loops' }
  ];

  return (
    <section id="hero-welcome-board" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      {/* Soft Decorative Grid, very low opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] dark:bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Tania-style Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Soft Green/Teal Alive Indicator */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-650/20 dark:border-teal-400/20 text-teal-800 dark:text-teal-350 text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="font-medium">Active practice • Available for selective technical consulting</span>
            </div>

            {/* Warm, Literary Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-[1.1]">
              Hey, I'm Alex. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 dark:from-teal-400 dark:via-teal-300 dark:to-emerald-400 font-extrabold">
                I build robust, stable AI integrations & systems.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mb-8 leading-relaxed font-normal">
              I blend principal developer roles with pragmatic AI strategy. I design and code secure, deterministic RAG pipelines, worker task queues, and custom LLM microservices engineered carefully to respect data privacy and protect your operating margins.
            </p>

            {/* Quick social links */}
            <div className="flex items-center gap-4 mb-8">
              <a href="mailto:alex.mercer.solutions@gmail.com" className="text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" title="Email Coordinate">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">San Francisco & Remote</span>
            </div>

            {/* Minimalist CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-cta-booking"
                onClick={() => onNavClick('booking')}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white dark:text-zinc-950 font-medium text-sm transition-colors cursor-pointer shadow-sm"
              >
                <span>Book discovery call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-cases"
                onClick={() => onNavClick('cases')}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-sm font-medium transition-colors cursor-pointer"
              >
                <span>View case studies</span>
              </button>
            </div>
          </div>

          {/* Right Column: Code/Log Diagnostics card styled as a clean modern dev snippet */}
          <div className="lg:col-span-5 w-full flex flex-col pt-4 lg:pt-0">
            <div className="w-full rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              {/* Header Tab */}
              <div className="bg-zinc-100/80 dark:bg-zinc-900 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  <span className="text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400 ml-2">alex-advisor-core.ts</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Node REST OK</span>
              </div>

              {/* Classic Monospace Console */}
              <div className="p-5 font-mono text-xs text-zinc-800 dark:text-zinc-300 space-y-3 max-h-[300px] overflow-y-auto leading-relaxed">
                <div>
                  <span className="text-zinc-400 font-normal">~$ </span>
                  <span className="text-teal-600 dark:text-teal-400">npx initialize-practice --interactive</span>
                </div>
                <div className="text-zinc-500 dark:text-zinc-400">
                  Initializing RAG systems coordinator... Done. <br />
                  Connecting dynamic schema structures: <span className="text-emerald-600 dark:text-emerald-400">Zod verified</span>
                </div>
                <div className="p-2 border-l-2 border-teal-500/50 bg-teal-50/50 dark:bg-teal-950/20 rounded-r-md text-[11px] text-zinc-650 dark:text-zinc-400 space-y-0.5">
                  <div>• Loaded cs_support_assistant.json</div>
                  <div>• Loaded background_worker_queues.bin</div>
                  <div>• Semantic proxy cache hits: 65% saving</div>
                </div>
                <div className="text-zinc-550 dark:text-zinc-400">
                  <span className="text-teal-600 dark:text-teal-400">[READY]</span> Live consult router listening in iframe tab port 3000.
                </div>
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest">SLA LOG STATUS</span>
                  <button
                    onClick={() => onNavClick('ai-agent')}
                    className="flex items-center gap-1 text-[10px] text-teal-600 dark:text-teal-400 hover:underline font-bold uppercase cursor-pointer"
                  >
                    <span>Try Assistant</span>
                    <Play className="w-2 h-2 fill-current stroke-none" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Minimalist Credibility Ledger */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-zinc-200 dark:border-zinc-800">
          {credibilitySignals.map((sig, i) => (
            <div 
              key={i} 
              className="flex flex-col items-start bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-teal-50/30 dark:hover:bg-teal-950/10 hover:border-teal-600/20 dark:hover:border-teal-400/20 transition-all duration-300 group"
            >
              <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 tracking-tight transition-colors">
                {sig.value}
              </span>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 mt-1 font-bold">{sig.label}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{sig.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
