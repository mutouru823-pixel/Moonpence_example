import { Page } from '../App';
import BottomNav from './BottomNav';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ResultPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: Page) => void }) {
  const [copied, setCopied] = useState(false);
  const { polishResult } = useAppContext();

  const defaultResult = {
    polishedText: "The intersection of digital precision and classical literature creates a unique space for the modern scholar. Within this digital sanctuary, the weight of a word is measured not just by its definition, but by its resonant frequency within the architecture of a sentence. We find that the most profound insights often reside in the quietest transitions, where ink meets digital parchment.",
    styleProfile: {
      rhythm: 92,
      lexical: 85,
      emotional: 78,
      depth: 94
    },
    analysis: [
      {
        title: "Syntactic Rhythms",
        description: "Enhanced the cadence by varying sentence lengths, mirroring the ebb and flow of classical philosophical treatises."
      },
      {
        title: "Lexical Precision",
        description: "Substituted generic verbs with precise, evocative terminology to heighten the intellectual authority of the passage."
      },
      {
        title: "Atmospheric Cohesion",
        description: "Aligned metaphors with the 'Modern Bibliophile' aesthetic, ensuring consistent imagery of physical craft and digital space."
      }
    ],
    tags: ["Academic Refinement", "重度风格化"]
  };

  const result = polishResult || defaultResult;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.polishedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-on-surface relative bg-surface selection:bg-tertiary-fixed pb-20" style={{ backgroundColor: '#fdf8f8' }}>
      
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-container-margin h-14 md:h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 safe-area-top">
        <div className="flex items-center gap-2 md:gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
          <h1 className="text-xl md:text-headline-lg-mobile md:text-headline-lg font-bold md:font-headline-lg-mobile md:font-headline-lg text-primary italic">
            Moonpence
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-150 text-2xl">
            account_circle
          </button>
        </div>
      </header>

      <main className="pt-20 md:pt-24 pb-8 px-4 md:px-container-margin max-w-2xl mx-auto relative z-10">
        
        <div className="flex flex-col gap-2 md:gap-unit mb-6 md:mb-stack-lg animate-fade-in">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            <span className="font-label-md text-xs md:text-label-md uppercase tracking-widest">润色成果 / Polished Result</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-stack-sm items-center mt-2">
            {result.tags.map((tag, index) => (
              <span key={index} className="bg-primary-container text-on-primary-container px-3 md:px-4 py-1 rounded-full font-label-md text-xs md:text-label-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <article className="bg-surface-container-lowest paper-border ink-shadow rounded-lg p-4 md:p-stack-md mb-6 md:mb-stack-lg relative overflow-hidden group animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundColor: '#1c1b1b' }}></div>
          <div className="relative z-10">
            <p className="font-quote-block text-lg md:text-quote-block leading-relaxed text-on-surface italic first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left first-letter:mt-1">
              {result.polishedText}
            </p>
            <div className="mt-4 md:mt-stack-md pt-4 md:pt-stack-md border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-end gap-4">
              <div className="flex flex-col">
                <span className="font-label-md text-xs md:text-label-md text-on-surface-variant opacity-60">最后修订</span>
                <span className="font-body-md text-sm md:text-body-md">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex gap-2 md:gap-stack-sm">
                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors material-symbols-outlined text-xl" title="Share">share</button>
                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors material-symbols-outlined text-xl" title="Save as Image">image</button>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-6 md:mt-stack-lg space-y-4 md:space-y-stack-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-title-md text-base md:text-title-md border-b border-primary/10 pb-2">多维风格画像 / Multi-dimensional Style Profile</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            
            <div className="bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg">rebase_edit</span>
                <span className="font-label-md text-xs md:text-label-md uppercase">句式韵律</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{result.styleProfile.rhythm}</span>
                  <span className="text-[10px] md:text-xs opacity-60">Rhythm Index</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${result.styleProfile.rhythm}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg">temp_preferences_custom</span>
                <span className="font-label-md text-xs md:text-label-md uppercase">用词丰度</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{result.styleProfile.lexical}</span>
                  <span className="text-[10px] md:text-xs opacity-60">Lexical richness</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${result.styleProfile.lexical}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg">psychology_alt</span>
                <span className="font-label-md text-xs md:text-label-md uppercase">情感基调</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{result.styleProfile.emotional}</span>
                  <span className="text-[10px] md:text-xs opacity-60">Emotional Tone</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${result.styleProfile.emotional}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg">book_2</span>
                <span className="font-label-md text-xs md:text-label-md uppercase">学术深度</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{result.styleProfile.depth}</span>
                  <span className="text-[10px] md:text-xs opacity-60">Depth</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${result.styleProfile.depth}%` }}></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-6 md:mt-stack-lg space-y-3 md:space-y-stack-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-title-md text-base md:text-title-md border-b border-primary/10 pb-2">文墨赏析 / Stylistic Analysis</h3>
          <div className="grid gap-3 md:gap-stack-sm">
            
            {result.analysis.map((item, index) => (
              <div key={index} className="flex gap-3 md:gap-4 items-start group">
                <span className="material-symbols-outlined text-tertiary mt-0.5">{index === 0 ? 'architecture' : index === 1 ? 'ink_pen' : 'texture'}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-md text-sm md:text-label-md text-primary">{item.title}</h4>
                  <p className="font-body-md text-sm md:text-body-md text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            ))}

          </div>
        </section>

        <div className="mt-6 md:mt-stack-lg flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={handleCopy}
            className={`w-full py-3 md:py-4 px-6 rounded-lg md:rounded-[0.5rem] font-label-md text-sm md:text-label-md flex justify-center items-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] ${copied ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary text-on-primary'}`}
          >
            <span className="material-symbols-outlined text-lg">{copied ? 'check' : 'content_copy'}</span>
            {copied ? '已复制' : '复制到剪贴板'}
          </button>
          <button 
            onClick={onBack}
            className="w-full border border-outline/30 py-3 md:py-4 px-6 rounded-lg md:rounded-[0.5rem] font-label-md text-sm md:text-label-md flex justify-center items-center gap-2 hover:bg-surface-container-low transition-all active:scale-[0.98] text-primary"
          >
            <span className="material-symbols-outlined text-lg">history_edu</span>
            重新润色
          </button>
        </div>
      </main>

      <div className="fixed top-[20%] -right-24 opacity-[0.04] pointer-events-none select-none z-0 rotate-12 hidden md:block">
        <span className="material-symbols-outlined text-[200px] text-primary">auto_stories</span>
      </div>

      <BottomNav currentPage="result" onNavigate={onNavigate} />
    </div>
  );
}
