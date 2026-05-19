export interface PolishedResult {
  polishedText: string;
  styleProfile: {
    rhythm: number;
    lexical: number;
    emotional: number;
    depth: number;
  };
  analysis: Array<{
    title: string;
    description: string;
  }>;
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
    };
  };
  preview: string;
}

class ApiService {
  private baseUrl = '/api';

  async polishText(
    text: string, 
    author: string = "Ernest Hemingway", 
    intensity: number = 2, 
    mode: string = "Plain"
  ): Promise<PolishedResult> {
    const response = await fetch(`${this.baseUrl}/polish`, {
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

  async analyzeText(text: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/analyze`, {
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
    const response = await fetch(`${this.baseUrl}/mix-styles`, {
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
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error('Server is not healthy');
    }
    return response.json();
  }
}

export const apiService = new ApiService();
