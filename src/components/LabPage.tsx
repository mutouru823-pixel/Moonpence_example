import { Page } from '../App';
import BottomNav from './BottomNav';
import { useState, useEffect } from 'react';
import { apiService, Author } from '../services/api';
import { useAppContext } from '../context/AppContext';

export default function LabPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { customStyles, addCustomStyle, removeCustomStyle, setSelectedAuthor } = useAppContext();
  
  const [baseWeight, setBaseWeight] = useState(70);
  const [overlayWeight, setOverlayWeight] = useState(30);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedBase, setSelectedBase] = useState<Author | null>(null);
  const [selectedOverlay, setSelectedOverlay] = useState<Author | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [mixedResult, setMixedResult] = useState<any>(null);
  const [showBaseSelector, setShowBaseSelector] = useState(false);
  const [showOverlaySelector, setShowOverlaySelector] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [customStyleName, setCustomStyleName] = useState('');

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    // 保持权重总和为100
    const total = baseWeight + overlayWeight;
    if (total !== 100) {
      setOverlayWeight(100 - baseWeight);
    }
  }, [baseWeight]);

  const loadAuthors = async () => {
    try {
      const data = await apiService.getAuthors();
      setAuthors(data);
      if (data.length >= 2) {
        setSelectedBase(data[0]);
        setSelectedOverlay(data[1]);
      }
    } catch (error) {
      console.error('加载作家失败:', error);
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.doc,.docx';
    input.onchange = e => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        alert(`正在分析: ${target.files[0].name}...\n\n这是一项高级功能，敬请期待！`);
      }
    };
    input.click();
  };

  const handleGeneratePreview = async () => {
    if (!selectedBase || !selectedOverlay) {
      alert('请先选择两种文学风格');
      return;
    }

    try {
      const result = await apiService.mixStyles({
        baseStyle: selectedBase.id,
        overlayStyle: selectedOverlay.id,
        baseWeight,
        overlayWeight
      });
      setMixedResult(result);
      setShowPreview(true);
    } catch (error) {
      console.error('生成预览失败:', error);
      alert('生成失败，请重试');
    }
  };

  const handleSaveStyle = () => {
    if (!selectedBase || !selectedOverlay) {
      alert('请先选择两种文学风格并生成预览');
      return;
    }
    if (!showPreview) {
      alert('请先生成混合预览');
      return;
    }
    setCustomStyleName(`${selectedBase.name} + ${selectedOverlay.name}`);
    setShowNameDialog(true);
  };

  const handleConfirmSave = () => {
    if (!customStyleName.trim()) {
      alert('请输入风格名称');
      return;
    }

    addCustomStyle({
      name: customStyleName.trim(),
      baseStyle: selectedBase!.name,
      overlayStyle: selectedOverlay!.name,
      baseWeight,
      overlayWeight,
      characteristics: mixedResult?.mixedStyle?.characteristics || [],
      tags: mixedResult?.mixedStyle?.metrics ? [
        `${mixedResult.mixedStyle.metrics.structureBalance}%结构`,
        mixedResult.mixedStyle.metrics.rhythm
      ] : []
    });

    alert(`风格"${customStyleName}"已保存到您的创作库中！\n您可以在润色页面选择这个风格。`);
    setShowNameDialog(false);
    setCustomStyleName('');
  };

  const handleSelectStyle = (styleId: string) => {
    setSelectedAuthor(styleId);
    onNavigate('editor');
  };

  const handleDeleteStyle = (styleId: string, styleName: string) => {
    if (confirm(`确定要删除风格"${styleName}"吗？`)) {
      removeCustomStyle(styleId);
    }
  };

  const selectNewBase = (author: Author) => {
    if (author.id !== selectedOverlay?.id) {
      setSelectedBase(author);
      setShowPreview(false);
    } else {
      alert('不能选择与叠加风格相同的作家');
    }
    setShowBaseSelector(false);
  };

  const selectNewOverlay = (author: Author) => {
    if (author.id !== selectedBase?.id) {
      setSelectedOverlay(author);
      setShowPreview(false);
    } else {
      alert('不能选择与基础风格相同的作家');
    }
    setShowOverlaySelector(false);
  };

  return (
    <div className="font-body-md text-body-md min-h-screen pb-20 bg-white selection:bg-tertiary-fixed" style={{ backgroundColor: '#fdf8f8' }}>
      <header className="bg-white/80 backdrop-blur-md flex justify-between items-center px-4 md:px-container-margin h-14 md:h-16 w-full fixed top-0 z-50 border-t-0 border-x-0 border-b border-on-surface/5 safe-area-top">
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

      <main className="pt-20 md:pt-24 px-4 md:px-container-margin max-w-2xl mx-auto space-y-6 md:space-y-stack-lg bg-white/60 backdrop-blur-md rounded-lg py-8 md:py-12 shadow-sm border border-white/40 mt-4 md:mt-0">
        
        <section className="space-y-2 md:space-y-stack-sm text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-xl md:text-headline-lg-mobile md:text-headline-lg text-primary italic">
            风格调配与创作
          </h2>
          <p className="text-on-surface-variant font-body-md text-sm md:text-body-md max-w-md mx-auto italic">
            "每一个词，都是一次呼吸。"在这里，您可以解构经典，通过混合不同的文学基因来创造全新的叙事指纹。
          </p>
        </section>

        {/* 已保存的自定义风格 */}
        {customStyles.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
              我的创作风格
            </h3>
            <div className="bg-white/80 rounded-lg border border-outline-variant/20 overflow-hidden">
              {customStyles.map((style, index) => (
                <div 
                  key={style.id}
                  className={`p-4 flex items-center gap-3 ${index !== 0 ? 'border-t border-outline-variant/10' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-primary">{style.name}</span>
                      <span className="text-xs text-on-surface-variant bg-tertiary-fixed px-2 py-0.5 rounded-full">自定义</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {style.baseStyle} ({style.baseWeight}%) + {style.overlayStyle} ({style.overlayWeight}%)
                    </p>
                  </div>
                  <button 
                    onClick={() => handleSelectStyle(style.id)}
                    className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:opacity-90"
                  >
                    使用
                  </button>
                  <button 
                    onClick={() => handleDeleteStyle(style.id, style.name)}
                    className="px-2 py-1.5 text-on-surface-variant hover:text-error"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-3 md:space-y-stack-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <label className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
              分析新样本
            </label>
            <span className="text-[10px] md:text-xs text-on-surface-variant font-medium">创建自定义文学基因</span>
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
            <p className="text-[10px] md:text-xs mt-2 tracking-widest uppercase text-on-surface-variant">
              推荐 500+ 字
            </p>
          </div>
        </section>

        <section className="space-y-3 md:space-y-stack-md">
          <h3 className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
            风格调配
          </h3>
          <div className="bg-surface-container-low p-4 md:p-container-margin rounded-lg border border-on-surface/5 space-y-4 md:space-y-6 bg-white/80">
            
            {/* Base Style */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  基础风格
                </span>
              </div>
              <div 
                onClick={() => setShowBaseSelector(true)}
                className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-white rounded border border-outline-variant/30 cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/5 rounded flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">auto_stories</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-bold">{selectedBase?.name || '请选择基础风格'}</p>
                  <p className="text-[10px] md:text-xs text-on-surface-variant line-clamp-1">
                    {selectedBase?.description || '点击选择作家'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline-variant">expand_more</span>
              </div>
              <input 
                className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary" 
                type="range" 
                min="10" 
                max="90" 
                step="5" 
                value={baseWeight}
                onChange={e => {
                  setBaseWeight(Number(e.target.value));
                  setShowPreview(false);
                }}
              />
              <div className="flex justify-between text-[10px] md:text-xs text-on-surface-variant">
                <span>减弱影响</span>
                <span>当前权重: {baseWeight}%</span>
              </div>
            </div>

            {/* Overlay Style */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  叠加风格
                </span>
              </div>
              <div 
                onClick={() => setShowOverlaySelector(true)}
                className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-white rounded border border-outline-variant/30 cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/5 rounded flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">architecture</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-bold">{selectedOverlay?.name || '请选择叠加风格'}</p>
                  <p className="text-[10px] md:text-xs text-on-surface-variant line-clamp-1">
                    {selectedOverlay?.description || '点击选择作家'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline-variant">expand_more</span>
              </div>
              <input 
                className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary" 
                type="range" 
                min="10" 
                max="90" 
                step="5" 
                value={overlayWeight}
                onChange={e => {
                  setOverlayWeight(Number(e.target.value));
                  setShowPreview(false);
                }}
              />
              <div className="flex justify-between text-[10px] md:text-xs text-on-surface-variant">
                <span>减弱影响</span>
                <span>当前权重: {overlayWeight}%</span>
              </div>
            </div>

            <div className="pt-3 md:pt-4 border-t border-outline-variant/20 flex flex-col md:flex-row gap-2 md:gap-3">
              <button 
                onClick={handleGeneratePreview}
                className="flex-1 py-2.5 md:py-3 bg-primary text-on-primary font-label-md text-sm md:text-label-md rounded-[0.5rem] hover:opacity-90 active:scale-95 transition-all ink-shadow"
              >
                生成混合预览
              </button>
              <button 
                onClick={handleSaveStyle}
                className="px-4 md:px-4 py-2.5 md:py-3 border border-primary text-primary font-label-md text-sm md:text-label-md rounded-[0.5rem] hover:bg-primary/5 transition-all"
              >
                保存为我的风格
              </button>
            </div>
          </div>
        </section>

        {showPreview && mixedResult && (
          <section className="space-y-3 md:space-y-stack-md">
            <h3 className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
              混合特性分析
            </h3>
            <div className="bg-white/80 rounded-lg p-4 border border-outline-variant/20 space-y-3">
              <div className="text-sm">
                <span className="font-bold">混合风格：</span>
                <span>{mixedResult.mixedStyle.name}</span>
              </div>
              <div className="text-xs text-on-surface-variant">
                <span className="font-bold">特点：</span>
                {mixedResult.mixedStyle.characteristics.join('、')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-bold">结构平衡度：</span>
                  {mixedResult.mixedStyle.metrics.structureBalance}%
                </div>
                <div>
                  <span className="font-bold">阅读节奏：</span>
                  {mixedResult.mixedStyle.metrics.rhythm}
                </div>
                <div>
                  <span className="font-bold">情感张力：</span>
                  {mixedResult.mixedStyle.metrics.tension}%
                </div>
              </div>
              <div className="pt-2 border-t border-outline-variant/20">
                <p className="text-xs text-on-surface-variant italic">"{mixedResult.preview}"</p>
              </div>
            </div>
          </section>
        )}

        {showPreview && mixedResult && (
          <section className="space-y-3 md:space-y-stack-md">
            <h3 className="font-label-md text-xs md:text-label-md text-on-surface uppercase tracking-wider block">
              风格雷达图
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-gutter">
              
              <div className="bg-surface-container-low border border-on-surface/5 p-4 md:p-container-margin rounded-lg flex flex-col items-center bg-white/80">
                <p className="font-label-md text-[10px] md:text-xs mb-4 md:mb-6 self-start text-on-surface uppercase font-bold">
                  新混合文学指纹
                </p>
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                  <div className="absolute inset-0 border border-outline-variant radar-grid opacity-20"></div>
                  <div className="absolute inset-3 md:inset-4 border border-outline-variant radar-grid opacity-20"></div>
                  <div className="absolute inset-6 md:inset-8 border border-outline-variant radar-grid opacity-20"></div>
                  
                  <div 
                    className="absolute inset-1 md:inset-2 bg-on-tertiary-container/20 radar-grid" 
                    style={{ 
                      clipPath: `polygon(50% ${100 - mixedResult.mixedStyle.metrics.structureBalance * 0.8}%, ${50 + mixedResult.mixedStyle.metrics.tension * 0.4}% 50%, 50% ${20 + mixedResult.mixedStyle.metrics.structureBalance * 0.6}%, ${20 + (100 - mixedResult.mixedStyle.metrics.tension) * 0.3}% 70%, 30% 30%)`,
                      transition: 'clip-path 0.5s ease' 
                    }}
                  ></div>
                </div>
                <div className="mt-4 md:mt-6 w-full space-y-2">
                  <div className="flex justify-between text-[10px] md:text-xs font-bold text-on-surface">
                    <span>结构平衡度</span>
                    <span>{mixedResult.mixedStyle.metrics.structureBalance}%</span>
                  </div>
                  <div className="w-full bg-outline-variant/30 h-[2px]">
                    <div 
                      className="bg-primary h-full transition-all duration-300" 
                      style={{ width: `${mixedResult.mixedStyle.metrics.structureBalance}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low border border-on-surface/5 p-4 md:p-container-margin rounded-lg space-y-3 md:space-y-stack-md bg-white/80">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-md text-[10px] md:text-xs text-on-surface-variant font-bold">
                      预期阅读节奏
                    </span>
                    <span className="text-[10px] md:text-xs font-bold">{mixedResult.mixedStyle.metrics.rhythm}</span>
                  </div>
                  <div className="h-1.5 md:h-2 w-full bg-outline-variant/30 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-primary/80 transition-all duration-300" 
                      style={{ width: `${mixedResult.mixedStyle.metrics.restraintPercent}%` }}
                      title="克制"
                    ></div>
                    <div 
                      className="h-full bg-outline-variant transition-all duration-300" 
                      style={{ width: `${mixedResult.mixedStyle.metrics.passionPercent}%` }}
                      title="澎湃"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs mt-1 text-on-surface-variant font-medium">
                    <span>克制 ({mixedResult.mixedStyle.metrics.restraintPercent}%)</span>
                    <span>澎湃 ({mixedResult.mixedStyle.metrics.passionPercent}%)</span>
                  </div>
                </div>
                
                <div>
                  <span className="font-label-md text-[10px] md:text-xs text-on-surface-variant block mb-1 font-bold">
                    混合风格描述
                  </span>
                  <p className="text-[10px] md:text-xs leading-relaxed text-on-surface-variant italic">
                    {mixedResult.mixedStyle.description}
                  </p>
                </div>
              </div>

            </div>
          </section>
        )}

        <footer className="text-center py-4 md:py-stack-lg border-t border-outline-variant/10 mt-2">
          <blockquote className="font-quote-block text-lg md:text-[22px] leading-7 md:leading-[32px] text-on-surface-variant/40 italic">
            "每一个词，都是一次呼吸。"
          </blockquote>
        </footer>
      </main>

      {/* Base Style Selector Modal */}
      {showBaseSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center" onClick={() => setShowBaseSelector(false)}>
          <div className="bg-surface w-full md:w-[450px] md:max-h-[70vh] rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
              <div>
                <h3 className="text-title-md font-medium text-primary">选择基础风格</h3>
              </div>
              <button onClick={() => setShowBaseSelector(false)} className="p-2 hover:bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="space-y-2">
                {authors.map(author => (
                  <div
                    key={author.id}
                    onClick={() => selectNewBase(author)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedBase?.id === author.id
                        ? 'border-primary bg-primary-container/20'
                        : 'border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${selectedBase?.id === author.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                        <span className="material-symbols-outlined text-xl">person</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-primary">{author.name}</h4>
                        <p className="text-xs text-on-surface-variant truncate">{author.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Style Selector Modal */}
      {showOverlaySelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center" onClick={() => setShowOverlaySelector(false)}>
          <div className="bg-surface w-full md:w-[450px] md:max-h-[70vh] rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
              <div>
                <h3 className="text-title-md font-medium text-primary">选择叠加风格</h3>
              </div>
              <button onClick={() => setShowOverlaySelector(false)} className="p-2 hover:bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="space-y-2">
                {authors.map(author => (
                  <div
                    key={author.id}
                    onClick={() => selectNewOverlay(author)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedOverlay?.id === author.id
                        ? 'border-primary bg-primary-container/20'
                        : 'border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${selectedOverlay?.id === author.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                        <span className="material-symbols-outlined text-xl">person</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-primary">{author.name}</h4>
                        <p className="text-xs text-on-surface-variant truncate">{author.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Name Dialog */}
      {showNameDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowNameDialog(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-title-md font-medium text-primary mb-4">保存自定义风格</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                风格名称
              </label>
              <input
                type="text"
                value={customStyleName}
                onChange={e => setCustomStyleName(e.target.value)}
                placeholder="例如：江南+村上混搭风"
                className="w-full px-4 py-3 border border-outline-variant/30 rounded-lg focus:outline-none focus:border-primary"
                autoFocus
              />
            </div>
            <div className="mb-4 text-sm text-on-surface-variant">
              <p><strong>基础风格：</strong>{selectedBase?.name} ({baseWeight}%)</p>
              <p><strong>叠加风格：</strong>{selectedOverlay?.name} ({overlayWeight}%)</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameDialog(false)}
                className="flex-1 py-2.5 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirmSave}
                className="flex-1 py-2.5 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentPage="lab" onNavigate={onNavigate} />
    </div>
  );
}
