import { useState, useRef } from 'react';
import { Page } from '../App';
import BottomNav from './BottomNav';
import { useAppContext } from '../context/AppContext';
import { apiService } from '../services/api';

export default function EditorPage({ onPolish, onNavigate }: { onPolish: () => void, onNavigate: (page: Page) => void }) {
  const { 
    originalText, 
    setOriginalText, 
    polishIntensity, 
    setPolishIntensity, 
    polishMode, 
    setPolishMode,
    selectedAuthor,
    setSelectedAuthor,
    setPolishResult,
    setIsLoading
  } = useAppContext();
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const intensityMap: Record<number, string> = { 1: "轻度", 2: "适中", 3: "重度" };
  const wordCount = originalText.trim().length > 0 ? originalText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const charCount = originalText.length;

  const handlePolishClick = async () => {
    if (!originalText.trim()) return;
    
    try {
      setIsLoading(true);
      const result = await apiService.polishText(
        originalText, 
        selectedAuthor, 
        polishIntensity, 
        polishMode
      );
      setPolishResult(result);
      onPolish();
    } catch (error) {
      console.error('Failed to polish text:', error);
      alert('文本润色失败，请检查网络连接或重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-body-md text-on-surface min-h-screen relative" style={{ backgroundImage: 'radial-gradient(#e5e2e1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', backgroundColor: '#fdf8f8' }}>
      <div className="grain-overlay pointer-events-none fixed inset-0 opacity-[0.02]" style={{ zIndex: 9999, backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuA_BCPYivQqTzC_tbO-u7Y7irYB9NB2qx75Tp1W_5OvNOAvgHcfSx-JWRj98tofQ0L4vIERExEodm0vczNdYkv1nirHipFZOVbMj2reRKG7ipx1-jY9ojz-3D0NYHr97MQhcfrzZEnAiutTRNfnvdoiFP6HdSZFACDSgn-_OofQUK3XOnAVcIA1bg-bR8ELi42MkN23fcQQs26PRU5FBsdnhpJJkqPc5Uwx4tz2mNdpjBE3RrulJZheXiO8GfnOIOvA7XgZzIq2LY)' }}></div>
      
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">menu_book</span>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary italic">Moonpence</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 items-center">
            <span className="text-label-md text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">Library</span>
            <span className="text-label-md text-primary font-bold hover:opacity-80 transition-opacity cursor-pointer">Editor</span>
          </nav>
          <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80">account_circle</span>
        </div>
      </header>

      <main className="pt-24 pb-32 px-container-margin max-w-[680px] mx-auto min-h-screen flex flex-col relative z-10">
        
        {/* Author Selection */}
        <section className="mb-stack-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-stack-sm">
            <span className="text-label-md text-on-surface-variant uppercase tracking-widest">作家选择 / WRITER SELECTION</span>
            <button className="text-label-md text-on-surface-variant flex items-center gap-1 hover:text-primary transition-colors group">
              更换作家
              <span className="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">history_edu</span>
            </button>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low ink-shadow cursor-pointer hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest grayscale contrast-125 shrink-0">
              <img className="w-full h-full object-cover" alt="Ernest Hemingway portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGaUGVsaAZVVxMU4oyagUZBPy95jJ11FOC-sJ6bb92EqjDYkWDdt94XAW_rCetcFzSj2I_ommNo9Jfr5KYVW3V9E_5kyzcLcuu4iMVfM2iEE92IkWR7QW7pl7nE_BRO-7caOYcdMOipIL-rLOZC_m952tCZwVdTUXWXbeSeOLbdnnftKLxglrg4_TSCNereNivZZrts-J8VDuoWacxUNsgqdEWcvVHGPu5lGxCjjDRj1dv9pT_KmDwRPYMys4Tj3ZuMUuM8MWC34"/>
            </div>
            <div className="flex-grow">
              <h2 className="text-title-md text-primary mb-1">Ernest Hemingway</h2>
              <p className="text-label-md text-on-surface-variant italic font-normal">Short, rhythmic sentences. Direct imagery.</p>
            </div>
            <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
          </div>
        </section>

        {/* Main Editor Section */}
        <section className="flex-grow flex flex-col mb-stack-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <label className="text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="editor">原文输入 / ORIGINAL TEXT</label>
            <span className="text-label-md text-outline-variant font-normal">{charCount} 字符 / {wordCount} 词</span>
          </div>
          <div className="relative group flex-grow">
            <textarea 
              id="editor"
              ref={textareaRef}
              className="w-full min-h-[300px] h-full bg-transparent border-none border-b border-outline-variant/30 font-quote-block text-quote-block text-primary placeholder:text-outline-variant/50 resize-none transition-all duration-300 pb-12 focus:ring-0 focus:outline-none focus:border-primary" 
              placeholder="在此处键入您的初稿..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />
            <div className={`absolute bottom-4 right-0 pointer-events-none transition-opacity duration-300 ${originalText ? 'opacity-100 text-primary' : 'opacity-20 text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-[32px]">edit_note</span>
            </div>
          </div>
        </section>

        {/* Controls Bento Grid */}
        <section className="space-y-stack-md mb-stack-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Intensity Slider */}
          <div className="p-6 rounded-xl border border-outline-variant/10 bg-surface-container-lowest ink-shadow">
            <div className="flex justify-between items-center mb-6">
              <label className="text-label-md text-on-surface-variant">文风强度 / STYLE INTENSITY</label>
              <span className="text-label-md text-primary bg-tertiary-fixed px-3 py-1 rounded-full">{intensityMap[polishIntensity]}</span>
            </div>
            <input 
              className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer" 
              type="range" 
              min="1" 
              max="3" 
              step="1" 
              value={polishIntensity}
              onChange={(e) => setPolishIntensity(Number(e.target.value))}
            />
            <div className="flex justify-between mt-3 text-[10px] text-outline-variant uppercase tracking-wider font-bold">
              <span>轻度 (Light)</span>
              <span>重度 (Heavy)</span>
            </div>
          </div>

          {/* Output Mode */}
          <div className="p-6 rounded-xl border border-outline-variant/10 bg-surface-container-lowest ink-shadow">
            <label className="text-label-md text-on-surface-variant block mb-4">输出模式 / OUTPUT MODE</label>
            <div className="flex p-1 bg-surface-container-high rounded-xl">
              {['Plain', 'Side-by-side', 'Analysis'].map((m) => (
                <button 
                  key={m}
                  onClick={() => setPolishMode(m)}
                  className={`flex-1 py-2 text-label-md rounded-lg transition-all ${polishMode === m ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {m === 'Plain' ? '纯文本' : m === 'Side-by-side' ? '逐段对照' : '润色+解析'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Action */}
        <footer className="mt-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={handlePolishClick}
            disabled={originalText.trim().length === 0}
            className="w-full bg-primary text-surface py-5 rounded-xl text-label-md flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all ink-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="tracking-widest">开始润色 (Start Polishing)</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
          </button>
          <p className="text-center mt-6 text-label-md text-outline-variant italic opacity-60 font-quote-block">
            "There is nothing to writing. All you do is sit down at a typewriter and bleed."
          </p>
        </footer>
      </main>

      {/* Contextual FAB */}
      <button 
        className={`fixed bottom-24 right-8 w-14 h-14 bg-primary text-surface rounded-full flex items-center justify-center ink-shadow hover:scale-105 active:scale-95 transition-all z-40 ${originalText.length > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined">ink_pen</span>
      </button>

      <BottomNav currentPage="editor" onNavigate={onNavigate} />
    </div>
  );
}
