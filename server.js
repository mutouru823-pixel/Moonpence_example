import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// 作家数据库
const authors = [
  {
    id: 'jiangnan',
    name: '江南',
    nameEn: 'Jiang Nan',
    description: '热血奇幻，宏大叙事，少年意气，情感充沛',
    characteristics: ['诗意比喻', '节奏明快', '对话生动', '情感真挚'],
    styleProfile: { rhythm: 88, lexical: 75, emotional: 92, depth: 85 },
    tags: ['热血', '奇幻', '青春']
  },
  {
    id: 'murakami',
    name: '村上春树',
    nameEn: 'Haruki Murakami',
    description: '孤独哲学，隐喻丰富，超现实元素，日常中的荒诞',
    characteristics: ['意识流', '超现实主义', '孤独主题', '爵士乐'],
    styleProfile: { rhythm: 70, lexical: 85, emotional: 60, depth: 95 },
    tags: ['孤独', '超现实', '日本文学']
  },
  {
    id: 'dostoevsky',
    name: '陀思妥耶夫斯基',
    nameEn: 'Fyodor Dostoevsky',
    description: '深刻心理，存在主义探讨，灵魂拷问，道德挣扎',
    characteristics: ['心理深度', '哲学思考', '宗教关怀', '苦难描写'],
    styleProfile: { rhythm: 65, lexical: 90, emotional: 98, depth: 100 },
    tags: ['深刻', '心理', '经典']
  },
  {
    id: 'sanmao',
    name: '三毛',
    nameEn: 'San Mao',
    description: '浪漫漂泊，异域风情，真诚纯粹，生命感悟',
    characteristics: ['浪漫主义', '异域文化', '真实情感', '自由精神'],
    styleProfile: { rhythm: 75, lexical: 70, emotional: 95, depth: 80 },
    tags: ['浪漫', '旅行', '真诚']
  },
  {
    id: 'yuqiuyu',
    name: '余秋雨',
    nameEn: 'Yu Qiuyu',
    description: '文化散文，历史感怀，诗意表达，典雅精致',
    characteristics: ['文化底蕴', '历史思考', '典雅文字', '艺术品味'],
    styleProfile: { rhythm: 68, lexical: 95, emotional: 75, depth: 90 },
    tags: ['文化', '散文', '历史']
  },
  {
    id: 'yuhua',
    name: '余华',
    nameEn: 'Yu Hua',
    description: '深刻苦难，宿命感，黑色幽默，冷峻笔触',
    characteristics: ['简洁有力', '苦难叙事', '黑色幽默', '社会批判'],
    styleProfile: { rhythm: 80, lexical: 60, emotional: 90, depth: 95 },
    tags: ['现实', '深刻', '中国当代']
  },
  {
    id: 'hemingway',
    name: 'Ernest Hemingway',
    nameEn: 'Ernest Hemingway',
    description: '短句子，直接意象，冰山原则，硬汉精神',
    characteristics: ['简洁有力', '冰山原则', '硬汉主题', '旅行元素'],
    styleProfile: { rhythm: 92, lexical: 55, emotional: 45, depth: 75 },
    tags: ['简洁', '硬汉', '经典']
  },
  {
    id: 'wangxiaobo',
    name: '王小波',
    nameEn: 'Wang Xiaobo',
    description: '黑色幽默，智性思考，独特格调，自由精神',
    characteristics: ['幽默讽刺', '智性写作', '荒诞感', '特立独行'],
    styleProfile: { rhythm: 78, lexical: 82, emotional: 65, depth: 88 },
    tags: ['幽默', '智性', '独特']
  }
];

// 润色文本的函数
function polishText(text, author, intensity) {
  const authorData = authors.find(a => a.id === author) || authors[6];
  
  // 根据百分比强度调整文本
  let resultText = text;
  const adjustedIntensity = intensity || 50;
  
  if (adjustedIntensity >= 30) {
    resultText = text
      .replace(/的/g, Math.random() > 0.5 ? '的' : '之')
      .replace(/了/g, Math.random() > 0.5 ? '了' : '矣');
  }
  if (adjustedIntensity >= 60) {
    const adjectives = ['深邃', '璀璨', '静谧', '炽热', '轻灵'];
    resultText = adjectives[Math.floor(Math.random() * adjectives.length)] + resultText;
  }
  if (adjustedIntensity >= 90) {
    resultText = "【" + resultText + "】";
  }
  
  // 根据强度计算风格参数
  const intensityFactor = (adjustedIntensity - 50) / 50; // -1 到 1 的范围
  
  // 生成风格分析
  const analysisPoints = [
    { title: '句式韵律', description: `模仿${authorData.name}的节奏感，长短句错落有致，营造独特的叙事节奏` },
    { title: '词汇选择', description: `采用${authorData.name}的用词习惯，${authorData.characteristics.slice(0, 2).join('、')}` },
    { title: '氛围营造', description: `融入${authorData.characteristics.slice(2).join('、')}的特质` }
  ];

  // 根据强度确定标签
  let intensityTag = '轻微调整';
  if (adjustedIntensity >= 90) intensityTag = '强烈风格化';
  else if (adjustedIntensity >= 70) intensityTag = '重度风格化';
  else if (adjustedIntensity >= 40) intensityTag = '温和润色';

  return {
    polishedText: resultText,
    styleProfile: {
      rhythm: Math.min(100, Math.max(20, authorData.styleProfile.rhythm + intensityFactor * 30)),
      lexical: Math.min(100, Math.max(20, authorData.styleProfile.lexical + intensityFactor * 30)),
      emotional: Math.min(100, Math.max(20, authorData.styleProfile.emotional + intensityFactor * 30)),
      depth: Math.min(100, Math.max(20, authorData.styleProfile.depth + intensityFactor * 30))
    },
    analysis: analysisPoints,
    tags: [...authorData.tags, intensityTag]
  };
}

// Serve static files from the dist directory (for production)
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Moonpence server is running' });
});

// 获取作家列表
app.get('/api/authors', (req, res) => {
  res.json({
    authors: authors.map(author => ({
      id: author.id,
      name: author.name,
      nameEn: author.nameEn,
      description: author.description,
      characteristics: author.characteristics,
      tags: author.tags
    }))
  });
});

// 获取单个作家详情
app.get('/api/authors/:id', (req, res) => {
  const author = authors.find(a => a.id === req.params.id);
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  res.json({ author });
});

// Endpoint to polish text
app.post('/api/polish', async (req, res) => {
  try {
    const { text, author, intensity, mode } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    console.log('Polishing text:', { text: text.substring(0, 50), author, intensity, mode });
    
    const result = polishText(text, author, intensity || 50);
    res.json(result);
    
  } catch (error) {
    console.error('Error in polish endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to polish text', 
      message: error.message 
    });
  }
});

// Endpoint to analyze text style
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const sentenceLengths = text.split(/[.?!。？！]/).filter(s => s.trim()).map(s => s.split(/\s+/).length);
    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const uniqueWords = new Set(text.split(/\s+/)).size;
    
    let tone = "Formal";
    if (text.includes("!") || text.includes("？")) tone = "Emotional";
    if (text.includes("~") || text.includes("哈哈")) tone = "Casual";
    
    res.json({
      styleAnalysis: {
        sentenceLength: avgLength > 20 ? "Long" : avgLength > 10 ? "Medium" : "Short",
        vocabularyLevel: uniqueWords > 50 ? "Advanced" : uniqueWords > 20 ? "Moderate" : "Simple",
        tone,
        dominantEmotion: "Reflective"
      },
      recommendations: [
        "Consider varying sentence length for better rhythm",
        "Incorporate more sensory details"
      ]
    });
    
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

// Endpoint to mix styles
app.post('/api/mix-styles', async (req, res) => {
  try {
    const { baseStyle, overlayStyle, baseWeight, overlayWeight } = req.body;
    
    const baseAuthor = authors.find(a => a.id === baseStyle);
    const overlayAuthor = authors.find(a => a.id === overlayStyle);
    
    if (!baseAuthor || !overlayAuthor) {
      return res.status(400).json({ error: 'Author not found' });
    }
    
    res.json({
      mixedStyle: {
        name: `${baseAuthor.name} + ${overlayAuthor.name} Blend`,
        characteristics: [
          ...baseAuthor.characteristics.slice(0, 2),
          ...overlayAuthor.characteristics.slice(0, 2)
        ],
        metrics: {
          structureBalance: Math.round((baseWeight * 68 + overlayWeight * 72) / (baseWeight + overlayWeight)),
          rhythm: "Moderate Fast",
          tension: Math.round((baseWeight * 45 + overlayWeight * 55) / (baseWeight + overlayWeight))
        }
      },
      preview: "这是一个融合了两种写作风格的文本示例，既有第一位作家的特色，又融入了第二位作家的文风..."
    });
    
  } catch (error) {
    console.error('Error in mix-styles endpoint:', error);
    res.status(500).json({ error: 'Failed to mix styles' });
  }
});

// Catch all route: serve index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🌙 Moonpence Server Started`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`🎯 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`\n📝 Endpoints available:`);
  console.log(`   - GET  /api/authors        - 获取作家列表`);
  console.log(`   - GET  /api/authors/:id    - 获取作家详情`);
  console.log(`   - POST /api/polish         - 润色文本`);
  console.log(`   - POST /api/analyze        - 分析文本风格`);
  console.log(`   - POST /api/mix-styles     - 混合风格`);
  console.log(`\n📚 Available authors: ${authors.map(a => a.name).join(', ')}`);
  console.log(`\n`);
});
