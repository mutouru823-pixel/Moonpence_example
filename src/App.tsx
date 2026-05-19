import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider } from './context/AppContext';
import SetupPage from './components/SetupPage';
import EditorPage from './components/EditorPage';
import ResultPage from './components/ResultPage';
import LabPage from './components/LabPage';
import HistoryPage from './components/HistoryPage';

export type Page = 'setup' | 'editor' | 'result' | 'lab' | 'history';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('setup');

  const goToPage = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'setup' && (
        <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <SetupPage onEnter={() => goToPage('editor')} />
        </motion.div>
      )}
      {currentPage === 'editor' && (
        <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <EditorPage onPolish={() => goToPage('result')} onNavigate={goToPage} />
        </motion.div>
      )}
      {currentPage === 'result' && (
        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultPage onBack={() => goToPage('editor')} onNavigate={goToPage} />
        </motion.div>
      )}
      {currentPage === 'lab' && (
        <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LabPage onNavigate={goToPage} />
        </motion.div>
      )}
      {currentPage === 'history' && (
        <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HistoryPage onNavigate={goToPage} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
