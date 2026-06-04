import { Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  onNavClick: (sect: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="portfolio-footer-board" className="py-12 bg-[#FCFBF9] dark:bg-[#121214] border-t border-zinc-200 dark:border-zinc-800 text-center">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand and credentials */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-teal-605" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight block">Alex Mercer</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-550 font-mono block uppercase">Secure Parsing & AI Advisory</span>
            </div>
          </div>

          {/* Inline navigation list */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-zinc-650 dark:text-zinc-350">
            <button onClick={() => onNavClick('cases')} className="hover:text-teal-600 dark:hover:text-teal-405 transition-colors cursor-pointer">Case studies</button>
            <button onClick={() => onNavClick('services')} className="hover:text-teal-600 dark:hover:text-teal-405 transition-colors cursor-pointer">Services</button>
            <button onClick={() => onNavClick('about')} className="hover:text-teal-600 dark:hover:text-teal-405 transition-colors cursor-pointer">About</button>
            <button onClick={() => onNavClick('insights')} className="hover:text-teal-600 dark:hover:text-teal-405 transition-colors cursor-pointer">Insights</button>
            <button onClick={() => onNavClick('booking')} className="hover:text-teal-600 dark:hover:text-teal-405 transition-colors cursor-pointer">Strategy</button>
          </div>

          {/* Downloadable résumé asset placeholder link */}
          <div>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                onNavClick('booking');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-950/40 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-md hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 dark:hover:text-zinc-950 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resume / CV</span>
            </a>
          </div>

        </div>

        {/* Legal copyright line */}
        <div className="mt-8 pt-8 border-t border-zinc-150 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-404 text-zinc-400 dark:text-zinc-500 font-mono gap-4">
          <span>&copy; {currentYear} Alex Mercer. Software Engineering &amp; AI Systems practice. All rights reserved.</span>
          <span className="uppercase text-[9px] tracking-wider">System Rev: v1.80  / Secure Sandbox Integration</span>
        </div>

      </div>
    </footer>
  );
}
