import { useState } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { Project, ArchitectureNode } from '../types';
import * as Icons from 'lucide-react';

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProjectId, setActiveProjectId] = useState<string>("cs-support-assistant");
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  const categories = ['ALL', 'AI Agents', 'RAG & Search', 'Workflows', 'Pipelines', 'Analytics'];

  const filteredProjects = selectedCategory === 'ALL'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(p => p.category === selectedCategory);

  const activeProject = CASE_STUDIES.find(p => p.id === activeProjectId) || CASE_STUDIES[0];

  // Helper code to map icon strings safely
  const renderIcon = (iconName: string, className = "w-4 h-4", works = false) => {
    const LucideIcon = (Icons as any)[iconName];
    if (LucideIcon) {
      return <LucideIcon className={`${className} ${works ? 'text-teal-600 dark:text-teal-400' : 'text-zinc-500'}`} />;
    }
    return <Icons.FileText className={`${className} ${works ? 'text-teal-600 dark:text-teal-400' : 'text-zinc-500'}`} />;
  };

  // Select node details inside diagram
  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNode(node);
  };

  return (
    <section id="cases" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl text-left mb-16 border-l-2 border-teal-500 pl-4">
          <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">CASE STUDIES</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 animate-fade-in">
            Intellectual systems architecture
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            A comprehensive look at 10 production-grade solutions designed for performance, correctness, data compliance, and high efficiency under heavy load.
          </p>
        </div>

        {/* Category horizontal scroll selection filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-zinc-150 dark:border-zinc-800 whitespace-nowrap scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedNode(null);
                const matched = cat === 'ALL' ? CASE_STUDIES : CASE_STUDIES.filter(p => p.category === cat);
                if (matched.length > 0) setActiveProjectId(matched[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-teal-600 border-teal-600 text-white dark:bg-teal-555 dark:border-teal-400 dark:text-zinc-950 font-bold'
                  : 'bg-zinc-50 dark:bg-zinc-90 w-auto border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350 hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-400/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Core Layout Split */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Case studies list (10 cards) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1.5 scrollbar-thin">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1 font-bold">PROJECT LIST ({filteredProjects.length})</span>
            {filteredProjects.map((p) => {
              const works = p.id === activeProjectId;
              return (
                <button
                  key={p.id}
                  id={`case-item-${p.id}`}
                  onClick={() => {
                    setActiveProjectId(p.id);
                    setSelectedNode(null);
                  }}
                  className={`text-left p-3.5 rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    works
                      ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-500/55 text-zinc-900 dark:text-zinc-50 font-semibold'
                      : 'bg-white dark:bg-zinc-900/10 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${works ? 'bg-teal-100/60 dark:bg-teal-900/40' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                      {renderIcon(p.icon, "w-4 h-4", works)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-tight leading-tight">{p.title}</h4>
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{p.category}</span>
                    </div>
                  </div>
                  <Icons.ChevronRight className={`w-3.5 h-3.5 transition-transform ${works ? 'translate-x-0.5 text-teal-600 dark:text-teal-400' : 'text-zinc-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Core Workspace: Selected Detailed Case Study Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 p-6 sm:p-8 flex flex-col gap-8 shadow-sm">
              
              {/* Header Title with Primary ROI metrics */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-150 dark:border-zinc-800/80 pb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">ARCHITECTURAL BLUEPRINT</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">{activeProject.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{activeProject.subtitle}</p>
                </div>
                {/* Tech tags list */}
                <div className="flex flex-wrap gap-1.5 self-start">
                  <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 text-[10px] font-mono uppercase rounded-md border border-teal-500/20">
                    {activeProject.category}
                  </span>
                </div>
              </div>

              {/* Bold Executive ROI Outcomes Cards Box */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-3 font-bold">MEASURABLE OUTCOMES</span>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeProject.measurableResults.map((res, i) => (
                    <div key={i} className="bg-zinc-50/50 dark:bg-[#1E1E20]/20 border border-zinc-200/80 dark:border-zinc-800/80 rounded-lg p-4 flex items-start gap-3">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive SVG Architecture Schema Component */}
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block font-bold">PROCESS FLOW GRAPH</span>
                  <span className="text-[9px] font-mono text-teal-655 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/20 px-2 py-0.5 rounded border border-teal-500/10 uppercase tracking-wide">
                    Tap nodes to query specifications
                  </span>
                </div>
                
                {/* Visual Canvas containing SVG Nodes */}
                <div className="rounded-lg bg-zinc-50 dark:bg-[#1E1E20]/40 border border-zinc-200 dark:border-zinc-805 p-4 overflow-x-auto scrollbar-thin flex justify-center shadow-inner">
                  <div className="min-w-[760px] relative">
                    <svg viewBox="0 0 800 320" className="w-full h-auto">
                      {/* Define custom markers and layout definitions */}
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0d9488" />
                        </marker>
                      </defs>

                      {/* Render Connections/Edges */}
                      {activeProject.architecture.edges.map((edge, idx) => {
                        const fromNode = activeProject.architecture.nodes.find(n => n.id === edge.from);
                        const toNode = activeProject.architecture.nodes.find(n => n.id === edge.to);
                        if (!fromNode || !toNode) return null;

                        const midX = (fromNode.x + toNode.x) / 2;
                        const midY = (fromNode.y + toNode.y) / 2;

                        return (
                          <g key={idx}>
                            <line
                              x1={fromNode.x}
                              y1={fromNode.y}
                              x2={toNode.x}
                              y2={toNode.y}
                              stroke="#a1a1aa"
                              strokeWidth="1.5"
                              markerEnd="url(#arrow)"
                              className="stroke-zinc-300 dark:stroke-zinc-700"
                            />
                            {edge.label && (
                              <g>
                                <rect
                                  x={midX - 50}
                                  y={midY - 10}
                                  width="100"
                                  height="18"
                                  fill="#f4f4f5"
                                  className="fill-zinc-100 dark:fill-zinc-800"
                                  stroke="#e4e4e7"
                                  strokeWidth="1"
                                  rx="3"
                                />
                                <text
                                  x={midX}
                                  y={midY + 2}
                                  className="text-[9px] font-mono fill-zinc-500 dark:fill-zinc-400 text-center"
                                  textAnchor="middle"
                                >
                                  {edge.label}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}

                      {/* Render Nodes layout */}
                      {activeProject.architecture.nodes.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        
                        const getNodeStyles = (selected: boolean) => {
                          if (selected) {
                            return 'fill-teal-100 border dark:fill-teal-950/60 stroke-2 stroke-teal-500 dark:stroke-teal-400';
                          }
                          return 'fill-white dark:fill-zinc-900 stroke-1 stroke-zinc-200 dark:stroke-zinc-800 hover:stroke-teal-500 hover:fill-teal-50/20';
                        };

                        return (
                          <g
                            key={node.id}
                            onClick={() => handleNodeClick(node)}
                            className="cursor-pointer transition-all duration-200"
                          >
                            {/* Node rectangle with beautiful rounded corners */}
                            <rect
                              x={node.x - 70}
                              y={node.y - 25}
                              width="140"
                              height="50"
                              rx="6"
                              className={`${getNodeStyles(isSelected)} transition-colors`}
                            />
                            {/* Type badge label */}
                            <text
                              x={node.x}
                              y={node.y - 8}
                              className={`text-[9px] font-mono tracking-wider text-center font-bold ${
                                isSelected ? 'fill-teal-700 dark:fill-teal-300' : 'fill-zinc-400'
                              }`}
                              textAnchor="middle"
                            >
                              {node.type.toUpperCase()}
                            </text>
                            {/* Title text label */}
                            <text
                              x={node.x}
                              y={node.y + 11}
                              className={`text-[10px] font-sans font-bold text-center ${
                                isSelected ? 'fill-teal-950 dark:fill-zinc-50' : 'fill-zinc-800 dark:fill-zinc-200'
                              }`}
                              textAnchor="middle"
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Expandable descriptive node diagnostic card block */}
                    <div className="mt-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs">
                      {selectedNode ? (
                        <div className="animate-in fade-in duration-200">
                          <div className="flex items-center gap-2 mb-1.5 border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
                            <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono text-[9px] border border-teal-500/20 uppercase tracking-wide">
                              {selectedNode.type}
                            </span>
                            <span className="font-sans font-bold text-zinc-900 dark:text-zinc-50">{selectedNode.label}</span>
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedNode.description || "Active production subsystem running sub-second state synchronizations and schemas validation checks."}</p>
                        </div>
                      ) : (
                        <div className="text-zinc-400 dark:text-zinc-400 font-mono text-center flex items-center justify-center gap-2 py-1">
                          <Icons.Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-pulse shrink-0" />
                          <span>Tap on process diagram nodes above to load system specifications.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications split details columns */}
              <div className="grid md:grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                {/* Left Side: Challenge and Solution */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                      <Icons.AlertTriangle className="w-3.5 h-3.5 text-yellow-500/85" />
                      <span>1. Core Business Challenge</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-normal">{activeProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                      <Icons.Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>2. Engineering Solution</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-normal">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Right Side: Implementation Depth and contributions */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                      <Icons.Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>3. AI / Automation Layer</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-normal">{activeProject.aiAutomationLayer}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                      <Icons.UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>4. Direct Contributions</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-655 dark:text-zinc-400">
                      {activeProject.contributions.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-500 mt-1 font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lessons and Tools line */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2 font-bold">LESSONS SHIPPED</span>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {activeProject.lessonsLearned.map((les, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                        <span>{les}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2 font-bold">SYSTEMS STACK</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tools.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-[10px] text-zinc-600 dark:text-zinc-450 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 dark:hover:border-teal-500 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
