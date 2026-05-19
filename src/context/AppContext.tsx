import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PolishedResult, Author } from '../services/api';

interface CustomStyle {
  id: string;
  name: string;
  baseStyle: string;
  overlayStyle: string;
  baseWeight: number;
  overlayWeight: number;
  characteristics: string[];
  tags: string[];
  createdAt: number;
}

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
  customStyles: CustomStyle[];
  addCustomStyle: (style: Omit<CustomStyle, 'id' | 'createdAt'>) => void;
  removeCustomStyle: (id: string) => void;
  getCustomStyleById: (id: string) => CustomStyle | undefined;
  getAllAuthors: (defaultAuthors: Author[]) => Author[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'moonpence_custom_styles';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');
  const [originalText, setOriginalText] = useState<string>('');
  const [polishIntensity, setPolishIntensity] = useState<number>(50);
  const [polishMode, setPolishMode] = useState<string>('Plain');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('hemingway');
  const [polishResult, setPolishResult] = useState<PolishedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customStyles, setCustomStyles] = useState<CustomStyle[]>([]);

  // 加载保存的自定义风格
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomStyles(parsed);
      }
    } catch (error) {
      console.error('加载自定义风格失败:', error);
    }
  }, []);

  // 保存自定义风格到localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customStyles));
    } catch (error) {
      console.error('保存自定义风格失败:', error);
    }
  }, [customStyles]);

  const addCustomStyle = (style: Omit<CustomStyle, 'id' | 'createdAt'>) => {
    const newStyle: CustomStyle = {
      ...style,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now()
    };
    setCustomStyles(prev => [...prev, newStyle]);
  };

  const removeCustomStyle = (id: string) => {
    setCustomStyles(prev => prev.filter(s => s.id !== id));
    if (selectedAuthor === id) {
      setSelectedAuthor('hemingway');
    }
  };

  const getCustomStyleById = (id: string) => {
    return customStyles.find(s => s.id === id);
  };

  const getAllAuthors = (defaultAuthors: Author[]): Author[] => {
    // 将自定义风格转换为Author格式
    const customAuthors: Author[] = customStyles.map(style => ({
      id: style.id,
      name: style.name,
      nameEn: '自定义风格',
      description: `${style.baseStyle} + ${style.overlayStyle} 混合`,
      characteristics: style.characteristics,
      tags: ['自定义', ...style.tags]
    }));

    return [...defaultAuthors, ...customAuthors];
  };

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
      customStyles,
      addCustomStyle,
      removeCustomStyle,
      getCustomStyleById,
      getAllAuthors,
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
