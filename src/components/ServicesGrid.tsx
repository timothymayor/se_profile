import { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import * as Icons from 'lucide-react';

export default function ServicesGrid() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  // Helper to dynamically render Lucide icons by name safely
  const renderIcon = (iconName: string, invertColor: boolean) => {
    const LucideIcon = (Icons as any)[iconName];
    if (LucideIcon) {
      return <LucideIcon className={`w-4 h-4 ${invertColor ? 'text-teal-650 dark:text-teal-200' : 'text-teal-600 dark:text-teal-400'}`} />;
    }
    return <Icons.HelpCircle className={`w-4 h-4 ${invertColor ? 'text-teal-650 dark:text-teal-200' : 'text-teal-600 dark:text-teal-400'}`} />;
  };

  return (
    <section id="services" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16 border-l-2 border-teal-500 pl-4">
          <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">SERVICES</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Technical delivery & advisory scopes
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Highly focused implementation blocks. Click on any card below to expand details, specific deliverables, and verified business outcomes.
          </p>
        </div>

        {/* Dynamic Minimalist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((serv) => {
            const isActive = activeServiceId === serv.id;
            return (
              <div
                key={serv.id}
                id={`service-card-${serv.id}`}
                onClick={() => setActiveServiceId(isActive ? null : serv.id)}
                className={`group rounded-lg p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer focus:outline-none ${
                  isActive
                    ? 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-500/50 shadow-sm'
                    : 'bg-white dark:bg-zinc-900/20 border-zinc-200 dark:border-zinc-800 hover:border-teal-500/30 hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20'
                }`}
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-teal-100 dark:bg-teal-900/40' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                      {renderIcon(serv.icon, isActive)}
                    </div>
                    {/* Compact Expand Label */}
                    <span className="text-[10px] font-mono text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {isActive ? 'Fold [-]' : 'Expand [+]'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    {serv.description}
                  </p>
                </div>

                {/* Expanded Details Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-[380px] pt-3 border-t border-zinc-205/60 dark:border-zinc-805/60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-teal-655 dark:text-teal-400 uppercase tracking-widest block font-bold mb-0.5">Ideal Client Profile</span>
                      <span className="text-zinc-650 dark:text-zinc-400 font-medium">{serv.forWho}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-teal-655 dark:text-teal-400 uppercase tracking-widest block font-bold mb-1">Key Deliverables</span>
                      <ul className="space-y-1 text-zinc-600 dark:text-zinc-450">
                        {serv.deliverables.map((del, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 dark:text-teal-450">•</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded bg-teal-50/50 dark:bg-teal-950/20 border border-teal-500/10 text-teal-800 dark:text-teal-300 font-mono text-[11px]">
                      <span className="uppercase text-[9px] text-teal-600 dark:text-teal-400 block font-bold mb-0.5">Business ROI Outcome</span>
                      <span>{serv.businessValue}</span>
                    </div>
                  </div>
                </div>

                {!isActive && (
                  <div className="flex items-center gap-1 text-[10px] text-teal-600 dark:text-teal-405 font-mono font-bold uppercase mt-2 group-hover:underline">
                    <span>View outputs</span>
                    <Icons.ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
