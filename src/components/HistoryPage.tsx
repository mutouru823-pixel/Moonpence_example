import { Page } from '../App';
import BottomNav from './BottomNav';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

export default function HistoryPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { 
    historyRecords, 
    removeHistoryRecord, 
    clearHistoryRecords,
    setOriginalText,
    setPolishResult,
    setSelectedAuthor,
    setPolishIntensity,
    setPolishMode
  } = useAppContext();
  
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  const handleUseAgain = (record: any) => {
    setOriginalText(record.originalText);
    setPolishResult(record.polishResult);
    setSelectedAuthor(record.selectedAuthor);
    setPolishIntensity(record.polishIntensity);
    setPolishMode(record.polishMode);
    onNavigate('editor');
  };

  const handleViewDetail = (record: any) => {
    setSelectedRecord(record);
    setShowDetail(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      removeHistoryRecord(id);
    }
  };

  const handleClearAll = () => {
    if (historyRecords.length === 0) return;
    if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
      clearHistoryRecords();
    }
  };

  return (
    <div className="font-body-md text-on-surface min-h-screen pb-20 bg-white" style={{ backgroundColor: '#fdf8f8' }}>
      <header className="bg-white/80 backdrop-blur-md flex justify-between items-center px-4 md:px-container-margin h-14 md:h-16 w-full fixed top-0 z-50 border-t-0 border-x-0 border-b border-on-surface/5 safe-area-top">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">history</span>
          <h1 className="font-label-md text-base md:text-title-md text-primary tracking-widest uppercase italic">
            润色历史
          </h1>
        </div>
        {historyRecords.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors text-2xl"
            title="清空全部"
          >
            delete_sweep
          </button>
        )}
      </header>

      <main className="pt-20 md:pt-24 px-4 md:px-container-margin max-w-2xl mx-auto space-y-4">
        {historyRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-6xl text-outline-variant/30 mb-4">history_off</span>
            <h3 className="text-lg font-medium text-on-surface mb-2">暂无润色记录</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              开始使用润色功能后，您的作品将被保存到这里
            </p>
            <button 
              onClick={() => onNavigate('editor')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              开始润色
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-on-surface-variant">
                共 {historyRecords.length} 条记录
              </span>
            </div>
            
            {historyRecords.map((record, index) => (
              <div 
                key={record.id}
                className="bg-white/80 rounded-lg border border-outline-variant/20 overflow-hidden shadow-sm"
              >
                <div className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 bg-tertiary-fixed/30 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-primary text-sm">
                        {record.selectedAuthor.startsWith('custom_') ? '自定义风格' : record.selectedAuthor}
                      </span>
                      <span className="text-[10px] text-on-surface-variant bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
                        {record.polishIntensity}%
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-2">
                      {formatDate(record.createdAt)}
                    </p>
                    <p className="text-sm text-on-surface line-clamp-2">
                      {record.originalText}
                    </p>
                  </div>
                </div>
                <div className="flex border-t border-outline-variant/10">
                  <button 
                    onClick={() => handleViewDetail(record)}
                    className="flex-1 py-3 text-sm text-primary hover:bg-tertiary-fixed/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                    查看详情
                  </button>
                  <button 
                    onClick={() => handleUseAgain(record)}
                    className="flex-1 py-3 text-sm text-primary hover:bg-tertiary-fixed/10 transition-colors flex items-center justify-center gap-1 border-x border-outline-variant/10"
                  >
                    <span className="material-symbols-outlined text-base">refresh</span>
                    再次使用
                  </button>
                  <button 
                    onClick={() => handleDelete(record.id)}
                    className="flex-1 py-3 text-sm text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    删除
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        <footer className="text-center py-8 border-t border-outline-variant/10 mt-6">
          <blockquote className="font-quote-block text-lg text-on-surface-variant/40 italic">
            "历史是最好的老师。"
          </blockquote>
        </footer>
      </main>

      {/* Detail Modal */}
      {showDetail && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center" onClick={() => setShowDetail(false)}>
          <div className="bg-white w-full md:w-[600px] md:max-h-[80vh] rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h3 className="text-title-md font-medium text-primary">润色记录详情</h3>
                <p className="text-xs text-on-surface-variant mt-1">{formatDate(selectedRecord.createdAt)}</p>
              </div>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4">
              <div>
                <h4 className="text-sm font-medium text-on-surface-variant mb-2">原文</h4>
                <div className="bg-surface-container-low p-3 rounded-lg text-sm">
                  {selectedRecord.originalText}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-on-surface-variant mb-2">润色结果</h4>
                <div className="bg-tertiary-fixed/10 p-3 rounded-lg text-sm text-primary">
                  {selectedRecord.polishResult?.polishedText || '无结果'}
                </div>
              </div>
              {selectedRecord.polishResult?.analysis && (
                <div>
                  <h4 className="text-sm font-medium text-on-surface-variant mb-2">润色分析</h4>
                  <div className="bg-surface-container-low p-3 rounded-lg text-sm text-on-surface-variant">
                    {selectedRecord.polishResult.analysis}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-outline-variant/10">
                <div className="text-sm">
                  <span className="text-on-surface-variant">作家：</span>
                  <span className="text-primary">{selectedRecord.selectedAuthor.startsWith('custom_') ? '自定义风格' : selectedRecord.selectedAuthor}</span>
                </div>
                <div className="text-sm">
                  <span className="text-on-surface-variant">强度：</span>
                  <span className="text-primary">{selectedRecord.polishIntensity}%</span>
                </div>
                <div className="text-sm col-span-2">
                  <span className="text-on-surface-variant">模式：</span>
                  <span className="text-primary">{selectedRecord.polishMode === 'Plain' ? '纯文本' : selectedRecord.polishMode === 'Side-by-side' ? '逐段对照' : '润色+解析'}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant/20 flex gap-3">
              <button 
                onClick={() => setShowDetail(false)}
                className="flex-1 py-2.5 border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors"
              >
                关闭
              </button>
              <button 
                onClick={() => {
                  handleUseAgain(selectedRecord);
                  setShowDetail(false);
                }}
                className="flex-1 py-2.5 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                再次使用
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav currentPage="history" onNavigate={onNavigate} />
    </div>
  );
}
