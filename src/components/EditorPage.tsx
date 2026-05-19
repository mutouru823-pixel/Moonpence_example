import { useState, useRef, useEffect } from 'react';
import { Page } from '../App';
import BottomNav from './BottomNav';
import AuthorSelector from './AuthorSelector';
import { useAppContext } from '../context/AppContext';
import { apiService, Author } from '../services/api';

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
  const [isMobile, setIsMobile] = useState(false);
  const [authorSelectorOpen, setAuthorSelectorOpen] = useState(false);
  const [selectedAuthorData, setSelectedAuthorData] = useState<Author | null>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadSelectedAuthor();
  }, [selectedAuthor]);

  const loadSelectedAuthor = async () => {
    try {
      const author = await apiService.getAuthor(selectedAuthor);
      setSelectedAuthorData(author);
    } catch (error) {
      console.error('加载作家失败:', error);
    }
  };

  const handleAuthorSelect = (author: Author) => {
    setSelectedAuthor(author.id);
    setSelectedAuthorData(author);
  };
  
  const intensityMap: Record<number, string> = { 1: '轻度', 2: '适中', 3: '重度' };
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
      console.error('润色失败:', error);
      alert('文本润色失败，请检查网络连接或重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-body-md text-on-surface min-h-screen relative" style={{ backgroundImage: 'radial-gradient(#e5e2e1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', backgroundColor: '#fdf8f8' }}>
      <div className="grain-overlay pointer-events-none fixed inset-0 opacity-[0.015]" style={{ zIndex: 9999 }}></div>
      
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

      <main className="pt-20 md:pt-24 pb-20 md:pb-32 px-4 md:px-container-margin max-w-2xl mx-auto min-h-screen flex flex-col relative z-10">
        
        <section className="mb-6 md:mb-stack-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3 md:mb-stack-sm">
            <span className="text-xs md:text-label-md text-on-surface-variant uppercase tracking-widest">选择作家</span>
            <button 
              className="text-xs md:text-label-md text-on-surface-variant flex items-center gap-1 hover:text-primary transition-colors group"
              onClick={() => setAuthorSelectorOpen(true)}
            >
              更换作家
              <span className="material-symbols-outlined text-base group-hover:rotate-180 transition-transform duration-500">history_edu</span>
            </button>
          </div>
          <div 
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low ink-shadow cursor-pointer hover:bg-surface-container transition-colors"
            onClick={() => setAuthorSelectorOpen(true)}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden bg-surface-container-highest grayscale contrast-125 shrink-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl md:text-3xl text-primary">person</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base md:text-title-md text-primary mb-1 font-medium">
                {selectedAuthorData?.name || '加载中...'}
              </h2>
              <p className="text-xs md:text-label-md text-on-surface-variant italic font-normal truncate">
                {selectedAuthorData?.description || '正在获取作家信息'}
              </p>
            </div>
            <span className="material-symbols-outlined text-outline-variant text-xl">chevron_right</span>
          </div>
        </section>

        <section className="flex-1 flex flex-col mb-6 md:mb-stack-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <label className="text-xs md:text-label-md text-on-surface-variant uppercase tracking-widest" htmlFor="editor">
              原文输入
            </label>
            <span className="text-xs md:text-label-md text-outline-variant font-normal">
              {charCount} 字符 / {wordCount} 词
            </span>
          </div>
          <div className="relative group flex-1">
            <textarea 
              id="editor"
              ref={textareaRef}
              className="w-full min-h-[200px] md:min-h-[300px] h-full bg-transparent border-none border-b border-outline-variant/30 font-quote-block text-lg md:text-quote-block text-primary placeholder:text-outline-variant/50 resize-none transition-all duration-300 pb-12 focus:ring-0 focus:outline-none focus:border-primary" 
              placeholder="在此处键入您的初稿..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />
            <div className={`absolute bottom-4 right-0 pointer-events-none transition-opacity duration-300 ${originalText ? 'opacity-100 text-primary' : 'opacity-20 text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-2xl md:text-[32px]">edit_note</span>
            </div>
          </div>
        </section>

        <section className="space-y-4 md:space-y-stack-md mb-6 md:mb-stack-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="p-4 md:p-6 rounded-xl border border-outline-variant/10 bg-surface-container-lowest ink-shadow">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <label className="text-xs md:text-label-md text-on-surface-variant">文风强度</label>
              <span className="text-xs md:text-label-md text-primary bg-tertiary-fixed px-3 py-1 rounded-full">{intensityMap[polishIntensity]}</span>
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
            <div className="flex justify-between mt-2 md:mt-3 text-[10px] md:text-xs text-outline-variant uppercase tracking-wider font-bold">
              <span>轻度</span>
              <span>重度</span>
            </div>
          </div>

          <div className="p-4 md:p-6 rounded-xl border border-outline-variant/10 bg-surface-container-lowest ink-shadow">
            <label className="text-xs md:text-label-md text-on-surface-variant block mb-3 md:mb-4">输出模式</label>
            <div className="flex p-1 bg-surface-container-high rounded-xl">
              {['Plain', 'Side-by-side', 'Analysis'].map((m) => (
                <button 
                  key={m}
                  onClick={() => setPolishMode(m)}
                  className={`flex-1 py-2 text-xs md:text-label-md rounded-lg transition-all ${polishMode === m ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {m === 'Plain' ? '纯文本' : m === 'Side-by-side' ? '逐段对照' : '润色+解析'}
                </button>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={handlePolishClick}
            disabled={originalText.trim().length === 0}
            className="w-full bg-primary text-surface py-4 md:py-5 rounded-xl text-sm md:text-label-md flex items-center justify-center gap-2 md:gap-3 hover:opacity-90 active:scale-[0.98] transition-all ink-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="tracking-widest">开始润色</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
          </button>
          <p className="text-center mt-4 md:mt-6 text-xs md:text-label-md text-outline-variant italic opacity-60 font-quote-block">
            "写作的诀窍，就是坐下来开始写。"
          </p>
        </footer>
      </main>

      <button 
        className={`fixed bottom-20 md:bottom-24 right-4 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-primary text-surface rounded-full flex items-center justify-center ink-shadow hover:scale-105 active:scale-95 transition-all z-40 ${originalText.length > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined text-xl md:text-2xl">ink_pen</span>
      </button>

      <AuthorSelector
        isOpen={authorSelectorOpen}
        onClose={() => setAuthorSelectorOpen(false)}
        onSelect={handleAuthorSelect}
        selectedAuthorId={selectedAuthor}
      />

      <BottomNav currentPage="editor" onNavigate={onNavigate} />
    </div>
  );
}
