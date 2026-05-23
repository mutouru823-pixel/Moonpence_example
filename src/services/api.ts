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
  styleProfile?: StyleProfile;
}

export const FALLBACK_AUTHORS: Author[] = [
  {
    id: 'jiangnan',
    name: '江南',
    nameEn: 'Jiang Nan',
    description: '热血奇幻，宏大叙事，少年意气，情感充沛',
    characteristics: ['诗意比喻', '节奏明快', '对话生动', '情感真挚'],
    tags: ['热血', '奇幻', '青春'],
    styleProfile: { rhythm: 88, lexical: 75, emotional: 92, depth: 85 }
  },
  {
    id: 'murakami',
    name: '村上春树',
    nameEn: 'Haruki Murakami',
    description: '孤独哲学，隐喻丰富，超现实元素，日常中的荒诞',
    characteristics: ['意识流', '超现实主义', '孤独主题', '爵士乐'],
    tags: ['孤独', '超现实', '日本文学'],
    styleProfile: { rhythm: 70, lexical: 85, emotional: 60, depth: 95 }
  },
  {
    id: 'dostoevsky',
    name: '陀思妥耶夫斯基',
    nameEn: 'Fyodor Dostoevsky',
    description: '深刻心理，存在主义探讨，灵魂拷问，道德挣扎',
    characteristics: ['心理深度', '哲学思考', '宗教关怀', '苦难描写'],
    tags: ['深刻', '心理', '经典'],
    styleProfile: { rhythm: 65, lexical: 90, emotional: 98, depth: 100 }
  },
  {
    id: 'sanmao',
    name: '三毛',
    nameEn: 'San Mao',
    description: '浪漫漂泊，异域风情，真诚纯粹，生命感悟',
    characteristics: ['浪漫主义', '异域文化', '真实情感', '自由精神'],
    tags: ['浪漫', '旅行', '真诚'],
    styleProfile: { rhythm: 75, lexical: 70, emotional: 95, depth: 80 }
  },
  {
    id: 'yuqiuyu',
    name: '余秋雨',
    nameEn: 'Yu Qiuyu',
    description: '文化散文，历史感怀，诗意表达，典雅精致',
    characteristics: ['文化底蕴', '历史思考', '典雅文字', '艺术品味'],
    tags: ['文化', '散文', '历史'],
    styleProfile: { rhythm: 68, lexical: 95, emotional: 75, depth: 90 }
  },
  {
    id: 'yuhua',
    name: '余华',
    nameEn: 'Yu Hua',
    description: '深刻苦难，宿命感，黑色幽默，冷峻笔触',
    characteristics: ['简洁有力', '苦难叙事', '黑色幽默', '社会批判'],
    tags: ['现实', '深刻', '中国当代'],
    styleProfile: { rhythm: 80, lexical: 60, emotional: 90, depth: 95 }
  },
  {
    id: 'hemingway',
    name: '海明威',
    nameEn: 'Ernest Hemingway',
    description: '短句子，直接意象，冰山原则，硬汉精神',
    characteristics: ['简洁有力', '冰山原则', '硬汉主题', '旅行元素'],
    tags: ['简洁', '硬汉', '经典'],
    styleProfile: { rhythm: 92, lexical: 55, emotional: 45, depth: 75 }
  },
  {
    id: 'wangxiaobo',
    name: '王小波',
    nameEn: 'Wang Xiaobo',
    description: '黑色幽默，智性思考，独特格调，自由精神',
    characteristics: ['幽默讽刺', '智性写作', '荒诞感', '特立独行'],
    tags: ['幽默', '智性', '独特'],
    styleProfile: { rhythm: 78, lexical: 82, emotional: 65, depth: 88 }
  },
  {
    id: 'luotuo',
    name: '老舍',
    nameEn: 'Lao She',
    description: '京味十足，幽默讽刺，世态炎凉，人情练达',
    characteristics: ['北京方言', '市民文学', '幽默讽刺', '人文关怀'],
    tags: ['京味', '幽默', '现代文学'],
    styleProfile: { rhythm: 72, lexical: 65, emotional: 70, depth: 85 }
  },
  {
    id: 'luxun',
    name: '鲁迅',
    nameEn: 'Lu Xun',
    description: '深刻批判，思想启蒙，冷峻犀利，民族脊梁',
    characteristics: ['杂文犀利', '国民性批判', '思想深邃', '战斗精神'],
    tags: ['批判', '思想', '文学大师'],
    styleProfile: { rhythm: 68, lexical: 88, emotional: 85, depth: 98 }
  },
  {
    id: 'jinyong',
    name: '金庸',
    nameEn: 'Jin Yong',
    description: '武侠宗师，历史文化，家国情怀，江湖侠义',
    characteristics: ['武侠世界', '历史融合', '侠义精神', '情节跌宕'],
    tags: ['武侠', '历史', '侠义'],
    styleProfile: { rhythm: 85, lexical: 78, emotional: 88, depth: 82 }
  },
  {
    id: 'kawabata',
    name: '川端康成',
    nameEn: 'Yasunari Kawabata',
    description: '物哀美学，细腻婉约，古典优雅，虚无之美',
    characteristics: ['物哀美学', '细腻描写', '古典意象', '淡雅风格'],
    tags: ['物哀', '细腻', '日本文学'],
    styleProfile: { rhythm: 62, lexical: 92, emotional: 72, depth: 90 }
  },
  {
    id: 'marquez',
    name: '马尔克斯',
    nameEn: 'Gabriel García Márquez',
    description: '魔幻现实主义，时间循环，家族史诗，孤独主题',
    characteristics: ['魔幻现实', '时间循环', '史诗叙事', '象征隐喻'],
    tags: ['魔幻现实', '史诗', '诺奖'],
    styleProfile: { rhythm: 75, lexical: 90, emotional: 80, depth: 95 }
  },
  {
    id: 'boorges',
    name: '博尔赫斯',
    nameEn: 'Jorge Luis Borges',
    description: '哲学幻想，迷宫隐喻，宇宙玄思，微型史诗',
    characteristics: ['哲学幻想', '迷宫意象', '时间哲学', '书籍主题'],
    tags: ['哲学', '幻想', '大师'],
    styleProfile: { rhythm: 65, lexical: 95, emotional: 45, depth: 100 }
  },
  {
    id: 'calvino',
    name: '卡尔维诺',
    nameEn: 'Italo Calvino',
    description: '轻盈智慧，童话寓言，后现代实验，宇宙诗意',
    characteristics: ['轻盈风格', '寓言叙事', '想象力丰富', '智性趣味'],
    tags: ['轻盈', '寓言', '后现代'],
    styleProfile: { rhythm: 82, lexical: 85, emotional: 55, depth: 88 }
  },
  {
    id: 'salinger',
    name: '塞林格',
    nameEn: 'J.D. Salinger',
    description: '青春叛逆，精神困惑，纯真守护，疏离孤独',
    characteristics: ['青春视角', '口语化', '纯真主题', '疏离感'],
    tags: ['青春', '叛逆', '经典'],
    styleProfile: { rhythm: 78, lexical: 60, emotional: 75, depth: 78 }
  }
];

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
    mode: string = 'Plain',
    customApiKey?: string,
    customBaseUrl?: string,
    customModelName?: string
  ): Promise<PolishedResult> {
    const response = await fetch(`${this.baseUrl}/api/polish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': customApiKey || '',
        'X-Base-Url': customBaseUrl || '',
        'X-Model-Name': customModelName || ''
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
    try {
      const response = await fetch(`${this.baseUrl}/api/authors`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      
      const data = await response.json();
      return data.authors;
    } catch (error) {
      console.warn('API error fetching authors, falling back to static list:', error);
      return FALLBACK_AUTHORS;
    }
  }

  async getAuthor(id: string): Promise<Author> {
    try {
      const response = await fetch(`${this.baseUrl}/api/authors/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch author');
      }
      
      const data = await response.json();
      return data.author;
    } catch (error) {
      console.warn(`API error fetching author ${id}, falling back to static data:`, error);
      const fallback = FALLBACK_AUTHORS.find(a => a.id === id);
      if (!fallback) {
        throw new Error(`Author not found: ${id}`);
      }
      return fallback;
    }
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
