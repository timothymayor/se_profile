import { useState } from 'react';
import { INSIGHTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { ArrowRight, BookOpen, Clock, Calendar, X } from 'lucide-react';

export default function BlogInsights() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="insights" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/10 dark:bg-zinc-950/10">
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16 border-l-2 border-teal-500 pl-4">
          <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">WRITING & ESSAYS</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Engineering essays & playbooks
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Hands-on technical guides, concrete database architectures, API benchmarking reports, and strategic consulting blueprints.
          </p>
        </div>

        {/* Articles List Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 p-5 flex flex-col justify-between cursor-pointer hover:border-teal-500/40 hover:bg-zinc-50/15 dark:hover:bg-zinc-850/10 transition-all duration-250 group shadow-sm"
            >
              <div>
                {/* Meta details row */}
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-400 dark:text-zinc-550 mb-3.5">
                  <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-500/10 text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400-custom" /> {post.readTime}</span>
                </div>

                {/* Heading */}
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-zinc-500 dark:text-zinc-405 leading-relaxed mb-6 font-normal">
                  {post.summary}
                </p>
              </div>

              {/* Read button */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:underline transition-all pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Dynamic Reader Overlay Modal */}
        {activePost && (
          <div
            id="article-reading-modal"
            className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 w-full max-w-3xl rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-5 duration-300">
              
              {/* Modal Header bar */}
              <div className="px-6 py-4.5 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-900 z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-405">
                  <BookOpen className="w-4 h-4 text-teal-605" />
                  <span className="text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">{activePost.category}</span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                </div>
                {/* Close Button */}
                <button
                  id="close-reading-modal"
                  onClick={() => setActivePost(null)}
                  className="text-zinc-400 hover:text-teal-650 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1.5 rounded-full transition-colors cursor-pointer"
                  title="Close Reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Body content reader */}
              <div className="p-6 sm:p-10 flex-1 overflow-y-auto">
                {/* Main Heading display */}
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-tight pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  {activePost.title}
                </h1>

                {/* Content columns */}
                <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed space-y-5 font-normal">
                  {/* Parsing paragraphs cleanly */}
                  {activePost.content.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('## ')) {
                      return (
                        <h2 key={pIdx} className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 pt-4 pb-1 border-b border-zinc-100 dark:border-zinc-800/60 mt-6 mb-3">
                          {para.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (para.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-sm font-semibold text-teal-600 dark:text-teal-450 mt-4 mb-2">
                          {para.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (para.startsWith('```')) {
                      // Format code snippet elegantly
                      const lines = para.split('\n');
                      const codeLines = lines.slice(1, lines.length - 1).join('\n');
                      return (
                        <pre key={pIdx} className="bg-zinc-50/80 dark:bg-zinc-950 p-4 rounded-lg font-mono text-xs overflow-x-auto text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800/80 leading-normal my-4">
                          <code>{codeLines}</code>
                        </pre>
                      );
                    }
                    if (para.startsWith('1. ') || para.startsWith('- ')) {
                      return (
                        <ul key={pIdx} className="list-disc list-inside space-y-1.5 pl-4 py-1">
                          {para.split('\n').map((li, lIdx) => (
                            <li key={lIdx} className="text-zinc-650 dark:text-zinc-350 list-none flex items-start gap-2">
                              <span className="text-teal-500 mt-1.5 shrink-0 select-none">•</span>
                              <span>{li.replace(/^(1\. |\- )/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Reader footer panel */}
              <div className="bg-zinc-50 dark:bg-zinc-900/60 px-6 sm:px-10 py-4 border-t border-zinc-150 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1.5 uppercase tracking-wide">
                  <Calendar className="w-3.5 h-3.5 text-teal-605" />
                  Origin: {activePost.date} / Rev 2.40
                </span>
                
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    setActivePost(null);
                  }}
                  className="px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-700 dark:bg-teal-555 dark:hover:bg-teal-600 text-white dark:text-zinc-950 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Schedule followup details
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
