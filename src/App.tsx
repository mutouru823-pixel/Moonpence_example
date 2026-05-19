import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SetupPage from './components/SetupPage';
import EditorPage from './components/EditorPage';
import ResultPage from './components/ResultPage';
import LabPage from './components/LabPage';

export type Page = 'setup' | 'editor' | 'result' | 'lab';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('setup');

  const goToPage = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'setup' && <SetupPage onEnter={() => goToPage('editor')} key="setup" />}
      {currentPage === 'editor' && <EditorPage onPolish={() => goToPage('result')} onNavigate={goToPage} key="editor" />}
      {currentPage === 'result' && <ResultPage onBack={() => goToPage('editor')} onNavigate={goToPage} key="result" />}
      {currentPage === 'lab' && <LabPage onNavigate={goToPage} key="lab" />}
    </AnimatePresence>
  );
}
