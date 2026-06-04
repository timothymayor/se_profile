import { Award, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  const credibilityMarkers = [
    { label: 'Technical Systems Excellence', detail: '8+ years shipping custom distributed Express microservices, high-throughput Node.js workers, Docker containers, and robust cloud deployments.' },
    { label: 'Strategic AI Guidance', detail: 'Guided over 15 startups and enterprise dev divisions in establishing clean, safe LLM integrations, citation-supported indices, and cost-effective semantic caches.' },
    { label: 'Rigorous Software Practices', detail: 'Guaranteed 0% hallucination rates in live production assistants via schema-pinning, strict unit testing, and Zod validator parameters.' },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative description */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-3">ABOUT ME</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Bridging robust software systems with intelligent integrations.
            </h2>

            <div className="space-y-4 text-zinc-650 dark:text-zinc-350 leading-relaxed text-sm">
              <p>
                My practice as a full-stack engineer and AI consultant relies on a singular engineering rule: <strong className="text-zinc-900 dark:text-zinc-50 font-semibold">Verify the economic business outcome first.</strong> I prioritize stability over hype. I design, program, and ship tailored pipelines that reduce manual employee workflows, automate queries securely, and cut API overheads by caching repeats.
              </p>
              <p>
                As a systems architect with lead roles in DevOps, I know that introducing an intelligent feature is rarely about the raw prompt; the majority of efforts reside in data parsing, schema validation, serverless task triggers, and stable error handling.
              </p>
              <p>
                I partner with product leaders to provide unbiased advisory on model limitations, compile bulletproof 4-week MVP blueprints, and optimize existing vector search environments to reduce lookup costs and ensure clean citations.
              </p>
            </div>

            {/* Ethos Quote Callout */}
            <div className="mt-8 p-5 rounded-lg bg-teal-50/20 dark:bg-zinc-900/40 border border-teal-500/10 dark:border-teal-400/10 w-full text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 block mb-1 font-bold">THE CORE PHILOSOPHY</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 italic font-medium leading-relaxed">
                "Do not write arbitrary queries or spin up GPUs until you have verified the exact schema boundaries. A stable integration serves quietly as an invisible, self-correcting element in a company's architecture."
              </p>
            </div>
          </div>

          {/* Right Column: Key credibility indicators */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full pt-4 lg:pt-0">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 p-6 flex flex-col gap-6 shadow-sm">
              <h3 className="text-xs font-bold text-zinc-850 dark:text-zinc-200 font-mono tracking-wider uppercase border-b border-zinc-150 dark:border-zinc-800/80 pb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>MEMBERSHIP & MARKERS</span>
              </h3>

              <div className="space-y-5">
                {credibilityMarkers.map((marker, idx) => (
                  <div key={idx} className="border-l-2 border-teal-500 pl-4 py-0.5">
                    <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">
                      {marker.label}
                    </span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-normal">
                      {marker.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Education footer specs */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md font-mono text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between border border-zinc-200/50 dark:border-zinc-800/50">
                <span>BS IN COMPUTER SCIENCE</span>
                <span>•</span>
                <span>BASED IN CALIFORNIA</span>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
