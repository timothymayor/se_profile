import { TESTIMONIALS } from '../data/portfolioData';
import { Quote, Sparkles, Building2 } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800 relative bg-zinc-50/10 dark:bg-zinc-950/10">
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16 border-l-2 border-teal-500 pl-4">
          <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">ENDORSEMENTS</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Client testimonials & feedback
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Direct descriptions of operational partnerships, integration deliveries, and measurable business improvements authored by collaborating product leaders.
          </p>
        </div>

        {/* Corporate Logo Board (Credibility markers) */}
        <div className="mb-16 border-y border-zinc-200 dark:border-zinc-800/85 py-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block text-center mb-4 font-bold">REPRESENTATIVE PARTNERSHIPS</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-75">
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-bold text-xs tracking-tight hover:text-teal-605 transition-colors">
              <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>VeloRetail Global</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-bold text-xs tracking-tight hover:text-teal-605 transition-colors">
              <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Pharmadoc Systems</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-bold text-xs tracking-tight hover:text-teal-605 transition-colors">
              <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>TalentGroup Corp</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-bold text-xs tracking-tight hover:text-teal-605 transition-colors">
              <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Aura Creative Inc</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 p-6 sm:p-8 flex flex-col justify-between relative shadow-sm hover:border-teal-500/20 transition-all duration-300"
            >
              <div>
                {/* Metric Outcome Badge */}
                {test.metric && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 dark:bg-teal-950 border border-teal-500/20 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold uppercase rounded-md mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{test.metric}</span>
                  </div>
                )}

                {/* Quote Header */}
                <div className="mb-6 flex justify-between items-center">
                  <Quote className="w-7 h-7 text-teal-500/15" />
                  <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-bold bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded uppercase">
                    {test.type} Endorsement
                  </span>
                </div>

                {/* Body Text */}
                <p className="text-sm leading-relaxed text-zinc-750 dark:text-zinc-300 font-normal italic mb-8">
                  "{test.content}"
                </p>
              </div>

              {/* Avatar Profile Footer */}
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-5 mt-3">
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-100 tracking-tight leading-none mb-1">{test.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono leading-none">
                      {test.role} / <span className="text-zinc-700 dark:text-zinc-300 font-bold">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Out of scale summary block */}
        <div className="mt-12 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-left flex flex-col items-start gap-3 shadow-inner">
          <span className="text-xs font-mono text-teal-605 dark:text-teal-400 font-bold tracking-wide uppercase">Audited Performance Log</span>
          <h3 className="text-sm sm:text-base tracking-tight text-zinc-800 dark:text-zinc-250 leading-relaxed font-normal max-w-2xl">
            "Over $650,000 in staffing hours saved across 12,000 processed weekly invoices using advanced node OCR model pipelines."
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono tracking-wide">
            <span>Verified System Ledger</span>
            <span>•</span>
            <span>Historical stats verified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
