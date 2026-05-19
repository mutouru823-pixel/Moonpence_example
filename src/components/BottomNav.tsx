import { Page } from '../App';

export default function BottomNav({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (page: Page) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-t border-on-surface/5 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] flex justify-around items-center pt-1 md:pt-unit pb-[env(safe-area-inset-bottom)] px-2 md:px-container-margin h-16 md:h-16">
      <button 
        onClick={() => onNavigate('editor')}
        className={`flex flex-col items-center justify-center transition-all flex-1 py-2 ${currentPage === 'editor' ? 'text-primary font-bold transform translate-y-[-2px]' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: currentPage === 'editor' ? "'FILL' 1" : "" }}>
          edit_note
        </span>
        <span className="font-label-md text-[10px] md:text-[10px] uppercase mt-1">
          润色
        </span>
      </button>
      <button 
        onClick={() => onNavigate('result')}
        className={`flex flex-col items-center justify-center transition-all flex-1 py-2 ${currentPage === 'result' ? 'text-primary font-bold transform translate-y-[-2px]' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: currentPage === 'result' ? "'FILL' 1" : "" }}>
          auto_awesome
        </span>
        <span className="font-label-md text-[10px] md:text-[10px] uppercase mt-1">
          成果
        </span>
      </button>
      <button 
        onClick={() => onNavigate('lab')}
        className={`flex flex-col items-center justify-center transition-all flex-1 py-2 ${currentPage === 'lab' ? 'text-primary font-bold transform translate-y-[-2px]' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: currentPage === 'lab' ? "'FILL' 1" : "" }}>
          science
        </span>
        <span className="font-label-md text-[10px] md:text-[10px] uppercase mt-1">
          实验室
        </span>
      </button>
    </nav>
  );
}
