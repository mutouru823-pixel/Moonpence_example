import { Page } from '../App';
import BottomNav from './BottomNav';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ResultPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: Page) => void }) {
  const [copied, setCopied] = useState(false);
  const { polishResult } = useAppContext();

  const handleCopy = () => {
    if (!polishResult) return;
    navigator.clipboard.writeText(polishResult.polishedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 如果没有润色结果，显示空状态
  if (!polishResult) {
    return (
      <div className="min-h-screen text-on-surface relative bg-surface selection:bg-tertiary-fixed pb-20" style={{ backgroundColor: '#fdf8f8' }}>
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-container-margin h-14 md:h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 safe-area-top">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
            <h1 className="text-xl md:text-headline-lg-mobile font-bold md:font-headline-lg-mobile md:font-headline-lg text-primary italic">
              Moonpence
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 text-2xl">account_circle</span>
          </div>
        </header>

        <main className="pt-20 md:pt-24 pb-8 px-4 md:px-container-margin max-w-2xl mx-auto relative z-10 min-h-[70vh] flex flex-col items-center justify-center">
          <div className="text-center space-y-6 animate-fade-in">
            <span className="material-symbols-outlined text-8xl text-outline-variant opacity-30">edit_document</span>
            <div>
              <h2 className="text-xl md:text-headline-lg text-primary font-medium mb-2">还没有润色成果</h2>
              <p className="text-body-md text-on-surface-variant">
                先去润色页面写点什么，再回来看看吧！
              </p>
            </div>
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 bg-primary text-on-primary py-3 px-6 rounded-lg font-label-md text-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined">history_edu</span>
              去润色
            </button>
          </div>
        </main>

        <BottomNav currentPage="result" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-on-surface relative bg-surface selection:bg-tertiary-fixed pb-20" style={{ backgroundColor: '#fdf8f8' }}>
      
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-container-margin h-14 md:h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 safe-area-top">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
          <h1 className="text-xl md:text-headline-lg-mobile font-bold md:font-headline-lg-mobile md:font-headline-lg text-primary italic">
            Moonpence
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 text-2xl">account_circle</span>
        </div>
      </header>

      <main className="pt-20 md:pt-24 pb-8 px-4 md:px-container-margin max-w-2xl mx-auto relative z-10">
        
        <div className="flex flex-col gap-2 md:gap-unit mb-6 md:mb-stack-lg animate-fade-in">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            <span className="font-label-md text-xs md:text-label-md uppercase tracking-widest">润色成果</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-stack-sm items-center mt-2">
            {polishResult.tags.map((tag, index) => (
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
              {polishResult.polishedText}
            </p>
            <div className="mt-4 md:mt-stack-md pt-4 md:pt-stack-md border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-end gap-4">
              <div className="flex flex-col">
                <span className="font-label-md text-xs md:text-label-md text-on-surface-variant opacity-60">最后修订</span>
                <span className="font-body-md text-sm md:text-body-md">{new Date().toLocaleString('zh-CN')}</span>
              </div>
              <div className="flex gap-2 md:gap-stack-sm">
                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors material-symbols-outlined text-xl" title="分享">share</button>
                <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors material-symbols-outlined text-xl" title="保存为图片">image</button>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-6 md:mt-stack-lg space-y-4 md:space-y-stack-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-title-md text-base md:text-title-md border-b border-primary/10 pb-2">多维风格画像</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            
            <div className="bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-lg">rebase_edit</span>
                <span className="font-label-md text-xs md:text-label-md uppercase">句式韵律</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{polishResult.styleProfile.rhythm}</span>
                  <span className="text-[10px] md:text-xs opacity-60">韵律指数</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${polishResult.styleProfile.rhythm}%` }}></div>
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
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{polishResult.styleProfile.lexical}</span>
                  <span className="text-[10px] md:text-xs opacity-60">词汇丰富度</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${polishResult.styleProfile.lexical}%` }}></div>
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
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{polishResult.styleProfile.emotional}</span>
                  <span className="text-[10px] md:text-xs opacity-60">情感指数</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${polishResult.styleProfile.emotional}%` }}></div>
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
                  <span className="text-2xl md:text-display-lg leading-none font-bold">{polishResult.styleProfile.depth}</span>
                  <span className="text-[10px] md:text-xs opacity-60">深度指数</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${polishResult.styleProfile.depth}%` }}></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-6 md:mt-stack-lg space-y-3 md:space-y-stack-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-title-md text-base md:text-title-md border-b border-primary/10 pb-2">文墨赏析</h3>
          <div className="grid gap-3 md:gap-stack-sm">
            
            {polishResult.analysis.map((item, index) => (
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
