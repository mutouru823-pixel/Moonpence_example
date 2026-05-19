import { Page } from '../App';
import BottomNav from './BottomNav';
import { useState, useEffect } from 'react';

export default function LabPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [polygon, setPolygon] = useState('50% 15%, 85% 45%, 65% 80%, 30% 75%, 20% 40%');
  const [baseWeight, setBaseWeight] = useState(70);
  const [overlayWeight, setOverlayWeight] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      const points = [
        `50% ${10 + Math.floor(Math.random() * 15)}%`,
        `${80 + Math.floor(Math.random() * 15)}% ${40 + Math.floor(Math.random() * 15)}%`,
        `${60 + Math.floor(Math.random() * 20)}% ${75 + Math.floor(Math.random() * 15)}%`,
        `${25 + Math.floor(Math.random() * 15)}% ${70 + Math.floor(Math.random() * 15)}%`,
        `${15 + Math.floor(Math.random() * 15)}% ${35 + Math.floor(Math.random() * 15)}%`
      ].join(', ');
      setPolygon(points);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        alert(`分析中: ${target.files[0].name}...`);
      }
    };
    input.click();
  };

  return (
    <div className="font-body-md text-body-md min-h-screen pb-20 bg-white selection:bg-tertiary-fixed" style={{
      backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCXlVXfs5sWIz6FJ4hlUYZ2JLVZQi1wCdnRlqUZn56MJIKoCoC1qqojVa2kOVWeGzyAX05V-NIZ4EdMv8UQ6eMEVqtRd0oei9aTT1WS6z5TCWWUC84NPlRYgKz1ml6aYvwXcWHXfaBV0MjnqtkcBDY5EQTR-R9X8_2wNmKu2l8LfhitPEs8V7KLOArONMBr_sedamj8mobtqtIqMii0SUNrxu6OFaZVDl36b6lKOSq7b4vs4HRUkZhBjK4Okn_4cMQBYnQ2abU5N9g)',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
    }}>
      {/* TopAppBar */}
      <header className="bg-white/80 backdrop-blur-md flex justify-between items-center px-4 md:px-container-margin h-14 md:h-16 w-full fixed top-0 z-50 border-b border-on-surface/10 safe-area-top">
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity text-2xl">menu</button>
          <h1 className="font-label-md text-base md:text-title-md text-primary tracking-widest uppercase italic">
            风格实验室
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity text-2xl">account_circle</button>
        </div>
      </header>

      <main className="pt-20 md:pt-24 px-4 md:px-container-margin max-w-2xl mx-auto space-y-6 md:space-y-stack-lg bg-white/60 backdrop-blur-md rounded-xl py-8 md:py-12 shadow-sm border border-white/40 mt-4 md:mt-0">
        
        {/* Hero Introduction */}
        <section className="space-y-2 md:space-y-stack-sm text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-xl md:text-headline-lg-mobile md:text-headline-lg text-primary italic">
            风格调配与创作
          </h2>
          <p className="text-on-surface-variant font-body-md text-sm md:text-body-md max-w-md mx-auto italic">
            "文学是灵魂的调色盘。"——在这里，您可以解构经典，或通过混合不同的文学基因来创造全新的叙事指纹。
          </p>
        </section>

        {/* Section 1: Analyze New Samples */}
        <section className="space-y-2 md:space-y-stack-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <label className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
              分析新样本 / ANALYZE NEW SAMPLES
            </label>
            <span className="text-[10px] text-on-surface-variant font-medium">创建自定义文学基因</span>
          </div>
          <div 
            onClick={handleUploadClick}
            className="dashed-border min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center p-4 md:p-stack-md transition-all hover:bg-surface-container-low group cursor-pointer bg-white/40 rounded-lg"
          >
            <span className="material-symbols-outlined text-3xl md:text-4xl text-outline-variant mb-3 md:mb-stack-sm group-hover:scale-110 transition-transform">
              history_edu
            </span>
            <p className="text-on-surface-variant text-center px-2 md:px-stack-md text-sm">
              拖拽文稿至此，或 <span className="text-primary font-bold underline underline-offset-4">点击浏览</span>
            </p>
            <p className="text-[10px] mt-2 tracking-widest uppercase text-on-surface-variant">
              Recommended 500+ words
            </p>
          </div>
        </section>

        {/* Section 2: Style Mixer */}
        <section className="space-y-3 md:space-y-stack-md">
          <h3 className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
            风格调配 / STYLE MIXER
          </h3>
          <div className="bg-surface-container-low p-4 md:p-container-margin rounded-lg border border-on-surface/5 space-y-4 md:space-y-6 bg-white/80">
            
            {/* Mix Slot 1 */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  基础风格 / BASE STYLE
                </span>
                <button className="text-primary text-[10px] md:text-xs font-bold underline">
                  更改
                </button>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-white rounded border border-outline-variant/30">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/5 rounded flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">auto_stories</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-bold">19世纪浪漫主义</p>
                  <p className="text-[10px] md:text-xs text-on-surface-variant line-clamp-1">
                    特点：华丽辞藻、强烈情感、自然崇拜
                  </p>
                </div>
              </div>
              <input 
                className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary" 
                type="range" 
                value={baseWeight}
                onChange={e => setBaseWeight(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] md:text-xs text-on-surface-variant">
                <span>减弱影响</span>
                <span>当前权重: {baseWeight}%</span>
              </div>
            </div>

            {/* Mix Slot 2 */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  叠加风格 / OVERLAY STYLE
                </span>
                <button className="text-primary text-[10px] md:text-xs font-bold underline">
                  更改
                </button>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-white rounded border border-outline-variant/30">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/5 rounded flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">architecture</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-bold">现代极简主义</p>
                  <p className="text-[10px] md:text-xs text-on-surface-variant line-clamp-1">
                    特点：短句、去形容词化、硬朗结构
                  </p>
                </div>
              </div>
              <input 
                className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary" 
                type="range" 
                value={overlayWeight}
                onChange={e => setOverlayWeight(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] md:text-xs text-on-surface-variant">
                <span>减弱影响</span>
                <span>当前权重: {overlayWeight}%</span>
              </div>
            </div>

            <div className="pt-3 md:pt-4 border-t border-outline-variant/20 flex flex-col md:flex-row gap-2 md:gap-3">
              <button className="flex-1 py-2.5 md:py-3 bg-primary text-on-primary font-label-md text-sm md:text-label-md rounded-[0.5rem] hover:opacity-90 active:scale-95 transition-all ink-shadow">
                生成混合预览
              </button>
              <button className="px-4 md:px-4 py-2.5 md:py-3 border border-primary text-primary font-label-md text-sm md:text-label-md rounded-[0.5rem] hover:bg-primary/5 transition-all">
                保存为我的风格
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Blend Characteristics */}
        <section className="space-y-3 md:space-y-stack-md">
          <h3 className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
            混合特性分析 / CHARACTERISTICS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-gutter">
            
            {/* Radar Chart */}
            <div className="bg-surface-container-low border border-on-surface/5 p-4 md:p-container-margin rounded-lg flex flex-col items-center bg-white/80">
              <p className="font-label-md text-[10px] md:text-xs mb-4 md:mb-6 self-start text-on-surface uppercase font-bold">
                新混合文学指纹 / NEW HYBRID FINGERPRINT
              </p>
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                <div className="absolute inset-0 border border-outline-variant radar-grid opacity-20"></div>
                <div className="absolute inset-3 md:inset-4 border border-outline-variant radar-grid opacity-20"></div>
                <div className="absolute inset-6 md:inset-8 border border-outline-variant radar-grid opacity-20"></div>
                
                <div 
                  className="absolute inset-1 md:inset-2 bg-on-tertiary-container/20 radar-grid animate-ink" 
                  style={{ clipPath: `polygon(${polygon})`, transition: 'clip-path 2s ease' }}
                ></div>
              </div>
              <div className="mt-4 md:mt-6 w-full space-y-2">
                <div className="flex justify-between text-[10px] md:text-xs font-bold text-on-surface">
                  <span>结构平衡度</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-outline-variant/30 h-[2px]">
                  <div className="bg-primary h-full w-[68%]"></div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-surface-container-low border border-on-surface/5 p-4 md:p-container-margin rounded-lg space-y-3 md:space-y-stack-md bg-white/80">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-[10px] md:text-xs text-on-surface-variant font-bold">
                    预期阅读节奏 / RHYTHM
                  </span>
                  <span className="text-[10px] md:text-xs font-bold">中等偏快 / MODERATE FAST</span>
                </div>
                <div className="h-5 md:h-6 flex items-end gap-1 overflow-hidden" style={{ alignItems: 'center' }}>
                  <div className="h-1.5 md:h-2 w-3 md:w-4 bg-primary/40"></div>
                  <div className="h-3 md:h-4 w-3 md:w-4 bg-primary/60"></div>
                  <div className="h-4.5 md:h-6 w-3 md:w-4 bg-primary"></div>
                  <div className="h-3 md:h-4 w-3 md:w-4 bg-primary/60"></div>
                  <div className="h-1.5 md:h-2 w-3 md:w-4 bg-primary/40"></div>
                  <div className="h-3 md:h-4 w-3 md:w-4 bg-primary/60"></div>
                  <div className="h-2 md:h-3 w-3 md:w-4 bg-primary/40"></div>
                  <div className="h-3.5 md:h-5 w-3 md:w-4 bg-primary/80"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-[10px] md:text-xs text-on-surface-variant font-bold">
                    预测情感张力 / TENSION
                  </span>
                </div>
                <div className="relative h-1.5 md:h-2 w-full bg-outline-variant/20 rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary/80 w-[45%]" title="Cold"></div>
                  <div className="h-full bg-outline-variant w-[55%]" title="Warm"></div>
                </div>
                <div className="flex justify-between text-[10px] md:text-xs mt-1 text-on-surface-variant font-medium">
                  <span>克制 (45%)</span>
                  <span>澎湃 (55%)</span>
                </div>
              </div>
              
              <div>
                <span className="font-label-md text-[10px] md:text-xs text-on-surface-variant block mb-1 font-bold">
                  混合风格描述 / DESCRIPTION
                </span>
                <p className="text-[10px] md:text-xs leading-relaxed text-on-surface-variant italic">
                  此混合风格在保持浪漫主义情感核心的同时，通过极简主义削减了过度的修辞。产生的文体既具有深度感，又不失现代阅读的流畅。
                </p>
              </div>
            </div>

          </div>
        </section>

        <footer className="text-center py-4 md:py-stack-lg border-t border-outline-variant/10 mt-2">
          <blockquote className="font-quote-block text-lg md:text-[22px] leading-7 md:leading-[32px] text-on-surface-variant/40 italic">
            "每一个词，都是一次呼吸。"
          </blockquote>
        </footer>
      </main>

      <BottomNav currentPage="lab" onNavigate={onNavigate} />
    </div>
  );
}
