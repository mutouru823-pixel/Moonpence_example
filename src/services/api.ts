export interface StyleProfile {
  rhythm: number;
  lexical: number;
  emotional: number;
  depth: number;
}

export interface AnalysisPoint {
  title: string;
  description: string;
}

export interface PolishedResult {
  polishedText: string;
  styleProfile: StyleProfile;
  analysis: AnalysisPoint[];
  tags: string[];
}

export interface Author {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  tags: string[];
}

export interface StyleMixRequest {
  baseStyle: string;
  overlayStyle: string;
  baseWeight: number;
  overlayWeight: number;
}

export interface StyleMixResult {
  mixedStyle: {
    name: string;
    characteristics: string[];
    metrics: {
      structureBalance: number;
      rhythm: string;
      tension: number;
      restraintPercent: number;
      passionPercent: number;
    };
    description: string;
  };
  preview: string;
}

export interface StyleAnalysis {
  styleAnalysis: {
    sentenceLength: string;
    vocabularyLevel: string;
    tone: string;
    dominantEmotion: string;
  };
  recommendations: string[];
}

class ApiService {
  private baseUrl = 'https://moonpenceexample-production.up.railway.app';

  async polishText(
    text: string, 
    author: string = 'hemingway', 
    intensity: number = 2, 
    mode: string = 'Plain'
  ): Promise<PolishedResult> {
    const response = await fetch(`${this.baseUrl}/api/polish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        author,
        intensity,
        mode
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to polish text');
    }

    return response.json();
  }

  async getAuthors(): Promise<Author[]> {
    const response = await fetch(`${this.baseUrl}/api/authors`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch authors');
    }
    
    const data = await response.json();
    return data.authors;
  }

  async getAuthor(id: string): Promise<Author> {
    const response = await fetch(`${this.baseUrl}/api/authors/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch author');
    }
    
    const data = await response.json();
    return data.author;
  }

  async analyzeText(text: string): Promise<StyleAnalysis> {
    const response = await fetch(`${this.baseUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze text');
    }

    return response.json();
  }

  async mixStyles(request: StyleMixRequest): Promise<StyleMixResult> {
    const response = await fetch(`${this.baseUrl}/api/mix-styles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to mix styles');
    }

    return response.json();
  }

  async checkHealth(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${this.baseUrl}/api/health`);
    if (!response.ok) {
      throw new Error('Server is not healthy');
    }
    return response.json();
  }
}

export const apiService = new ApiService();
