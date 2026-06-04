import { Cpu, Code2, Database, Cloud, GitMerge, Settings, LineChart, ShieldCheck } from 'lucide-react';

export default function SkillsStack() {
  const skillCategories = [
    {
      title: 'AI / LLM Integrations',
      icon: Cpu,
      skills: ['Gemini Developer SDK', 'LangChain Frameworks', 'Dynamic Function Calling', 'Semantic Token Caches', 'Vector Chunking & Ingest', 'Qdrant & Pinecone']
    },
    {
      title: 'Backend Systems',
      icon: Database,
      skills: ['Node.js Runtime', 'Express Web Server', 'TypeScript Compiler', 'FastAPI & Python Hubs', 'PostgreSQL Relational', 'MongoDB & Redis Memory']
    },
    {
      title: 'Frontend Frameworks',
      icon: Code2,
      skills: ['React Hooks & Context', 'Vite Bundler Tool', 'Tailwind CSS Stylings', 'D3.js Data Visualizations', 'Dynamic JSON Forms UI', 'Fluid Responsive Layouts']
    },
    {
      title: 'Cloud Infrastructure',
      icon: Cloud,
      skills: ['Docker (AWS ECS)', 'Google Cloud Run Compute', 'Terraform Templates S3', 'GitHub Actions Actions', 'Pulumi IaC Hubs', 'Serverless APIs Node']
    },
    {
      title: 'Automation Workers',
      icon: GitMerge,
      skills: ['BullMQ jobs manager', 'Event-Driven Webhooks', 'Zod validation compiler', 'RabbitMQ broker hub', 'OAuth credentials scopes']
    },
    {
      title: 'APIs & Integrations',
      icon: Settings,
      skills: ['Shopify Admin GraphQL', 'Zendesk SDK modules', 'Salesforce pipeline hub', 'SendGrid Transmissions', 'DocuSign API flows']
    },
    {
      title: 'Calculated Analytics',
      icon: LineChart,
      skills: ['Calculated matrices charts', 'D3 customized grids', 'Latency performance sweeps', 'Automated reports engine', 'Historical KPIs dashboard']
    },
    {
      title: 'Product & Advisory',
      icon: ShieldCheck,
      skills: ['Feasibility advisory', '4-week modular MVP scope', 'Cost metrics analysis', 'Security constraints audits', 'CSAT & conversions checks']
    }
  ];

  return (
    <section id="skills" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl text-left mb-16 border-l-2 border-teal-500 pl-4">
          <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">CAPABILITIES</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Technical stack & engineering registry
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            A comprehensive, structured breakdown of libraries, infrastructure managers, and design patterns representing active delivery capacity.
          </p>
        </div>

        {/* Skills Board Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 p-5 shadow-sm hover:border-teal-500/30 transition-all duration-200 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-150 dark:border-zinc-800">
                  <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center group-hover:bg-teal-600 transition-colors shrink-0">
                    <IconComponent className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Sub Skill Tags list */}
                <div className="flex flex-col gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-teal-50/40 dark:hover:bg-teal-950/10 transition-colors text-zinc-600 dark:text-zinc-350"
                    >
                      <span className="font-normal font-sans text-[12px]">{skill}</span>
                      <span className="font-mono text-[9px] text-teal-600 dark:text-teal-400 font-medium">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Console Footprint */}
        <div className="mt-12 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-650 dark:text-zinc-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="font-sans font-medium text-xs">All developer integrations are monitored, tested, and running under audited environments.</span>
          </div>
          <span className="text-[10px] text-teal-700 bg-teal-50 dark:bg-teal-950/50 border border-teal-500/20 px-2.5 py-1 rounded font-mono font-bold uppercase tracking-wider">
            Stable Stack Ledger v1.80
          </span>
        </div>

      </div>
    </section>
  );
}
