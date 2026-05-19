import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PolishedResult } from '../services/api';

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  modelName: string;
  setModelName: (name: string) => void;
  originalText: string;
  setOriginalText: (text: string) => void;
  polishIntensity: number;
  setPolishIntensity: (intensity: number) => void;
  polishMode: string;
  setPolishMode: (mode: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  polishResult: PolishedResult | null;
  setPolishResult: (result: PolishedResult | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');
  const [originalText, setOriginalText] = useState<string>('');
  const [polishIntensity, setPolishIntensity] = useState<number>(2);
  const [polishMode, setPolishMode] = useState<string>('Plain');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('hemingway');
  const [polishResult, setPolishResult] = useState<PolishedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      apiKey,
      setApiKey,
      baseUrl,
      setBaseUrl,
      modelName,
      setModelName,
      originalText,
      setOriginalText,
      polishIntensity,
      setPolishIntensity,
      polishMode,
      setPolishMode,
      selectedAuthor,
      setSelectedAuthor,
      polishResult,
      setPolishResult,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
