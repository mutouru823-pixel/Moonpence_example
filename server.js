import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'X-Base-Url', 'X-Model-Name']
}));

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
    name: '海明威',
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
  },
  {
    id: 'luotuo',
    name: '老舍',
    nameEn: 'Lao She',
    description: '京味十足，幽默讽刺，世态炎凉，人情练达',
    characteristics: ['北京方言', '市民文学', '幽默讽刺', '人文关怀'],
    styleProfile: { rhythm: 72, lexical: 65, emotional: 70, depth: 85 },
    tags: ['京味', '幽默', '现代文学']
  },
  {
    id: 'luxun',
    name: '鲁迅',
    nameEn: 'Lu Xun',
    description: '深刻批判，思想启蒙，冷峻犀利，民族脊梁',
    characteristics: ['杂文犀利', '国民性批判', '思想深邃', '战斗精神'],
    styleProfile: { rhythm: 68, lexical: 88, emotional: 85, depth: 98 },
    tags: ['批判', '思想', '文学大师']
  },
  {
    id: 'jinyong',
    name: '金庸',
    nameEn: 'Jin Yong',
    description: '武侠宗师，历史文化，家国情怀，江湖侠义',
    characteristics: ['武侠世界', '历史融合', '侠义精神', '情节跌宕'],
    styleProfile: { rhythm: 85, lexical: 78, emotional: 88, depth: 82 },
    tags: ['武侠', '历史', '侠义']
  },
  {
    id: 'kawabata',
    name: '川端康成',
    nameEn: 'Yasunari Kawabata',
    description: '物哀美学，细腻婉约，古典优雅，虚无之美',
    characteristics: ['物哀美学', '细腻描写', '古典意象', '淡雅风格'],
    styleProfile: { rhythm: 62, lexical: 92, emotional: 72, depth: 90 },
    tags: ['物哀', '细腻', '日本文学']
  },
  {
    id: 'marquez',
    name: '马尔克斯',
    nameEn: 'Gabriel García Márquez',
    description: '魔幻现实主义，时间循环，家族史诗，孤独主题',
    characteristics: ['魔幻现实', '时间循环', '史诗叙事', '象征隐喻'],
    styleProfile: { rhythm: 75, lexical: 90, emotional: 80, depth: 95 },
    tags: ['魔幻现实', '史诗', '诺奖']
  },
  {
    id: 'boorges',
    name: '博尔赫斯',
    nameEn: 'Jorge Luis Borges',
    description: '哲学幻想，迷宫隐喻，宇宙玄思，微型史诗',
    characteristics: ['哲学幻想', '迷宫意象', '时间哲学', '书籍主题'],
    styleProfile: { rhythm: 65, lexical: 95, emotional: 45, depth: 100 },
    tags: ['哲学', '幻想', '大师']
  },
  {
    id: 'calvino',
    name: '卡尔维诺',
    nameEn: 'Italo Calvino',
    description: '轻盈智慧，童话寓言，后现代实验，宇宙诗意',
    characteristics: ['轻盈风格', '寓言叙事', '想象力丰富', '智性趣味'],
    styleProfile: { rhythm: 82, lexical: 85, emotional: 55, depth: 88 },
    tags: ['轻盈', '寓言', '后现代']
  },
  {
    id: 'salinger',
    name: '塞林格',
    nameEn: 'J.D. Salinger',
    description: '青春叛逆，精神困惑，纯真守护，疏离孤独',
    characteristics: ['青春视角', '口语化', '纯真主题', '疏离感'],
    styleProfile: { rhythm: 78, lexical: 60, emotional: 75, depth: 78 },
    tags: ['青春', '叛逆', '经典']
  }
];

// 使用 DeepSeek API 润色文本
async function polishText(text, author, intensity, customApiKey, customBaseUrl, customModelName) {
  const authorData = authors.find(a => a.id === author) || authors[6];
  const adjustedIntensity = intensity || 50;

  // 构建提示词
  const prompt = `请将以下文本用${authorData.name}的写作风格进行润色。

作者风格特点：${authorData.description}
风格特点：${authorData.characteristics.join('、')}
风格强度：${adjustedIntensity}% (0%=保持原样, 100%=完全该风格)

请直接返回润色后的文本，不需要其他说明。

原文：
${text}`;

  try {
    let polishedText = '';
    let success = false;

    // 尝试通道一：用户在前端设置了自定义API配置
    if (customApiKey && customBaseUrl) {
      try {
        const model = customModelName || 'gpt-3.5-turbo';
        console.log('Attempting Channel 1: Custom User API endpoint:', customBaseUrl, 'Model:', model);
        const response = await fetch(`${customBaseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${customApiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'user', content: prompt }
            ],
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          polishedText = data.choices[0]?.message?.content || text;
          success = true;
          console.log('Channel 1 succeeded!');
        } else {
          console.warn(`Channel 1 failed with status ${response.status}. Falling back...`);
        }
      } catch (err) {
        console.warn('Channel 1 error, falling back...', err.message);
      }
    }

    // 尝试通道二：服务器配置了免费的 Gemini 备份密钥
    if (!success && process.env.GEMINI_API_KEY) {
      try {
        const geminiKey = process.env.GEMINI_API_KEY;
        console.log('Attempting Channel 2: Server-side Gemini 2.5 Flash API');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          polishedText = data.candidates?.[0]?.content?.parts?.[0]?.text || text;
          success = true;
          console.log('Channel 2 succeeded!');
        } else {
          console.warn(`Channel 2 failed with status ${response.status}. Falling back...`);
        }
      } catch (err) {
        console.warn('Channel 2 error, falling back...', err.message);
      }
    }

    // 尝试通道三：使用 DeepSeek 接口
    if (!success) {
      const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-3131f75b62a2453f859f0fce6719b9b4';
      const baseUrl = 'https://api.deepseek.com';
      const modelName = 'deepseek-chat'; // 修正为正确的 deepseek-chat
      console.log('Attempting Channel 3: DeepSeek API (Model: deepseek-chat)');

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      polishedText = data.choices[0]?.message?.content || text;
      success = true;
      console.log('Channel 3 succeeded!');
    }

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

    const intensityFactor = (adjustedIntensity - 50) / 50;

    return {
      polishedText: polishedText,
      styleProfile: {
        rhythm: Math.min(100, Math.max(20, authorData.styleProfile.rhythm + intensityFactor * 30)),
        lexical: Math.min(100, Math.max(20, authorData.styleProfile.lexical + intensityFactor * 30)),
        emotional: Math.min(100, Math.max(20, authorData.styleProfile.emotional + intensityFactor * 30)),
        depth: Math.min(100, Math.max(20, authorData.styleProfile.depth + intensityFactor * 30))
      },
      analysis: analysisPoints,
      tags: [...authorData.tags, intensityTag]
    };
    
  } catch (error) {
    console.error('API 润色接口调用失败:', error);
    // 回退到简单润色
    let resultText = text;
    if (adjustedIntensity >= 30) {
      resultText = text.replace(/的/g, Math.random() > 0.5 ? '的' : '之').replace(/了/g, Math.random() > 0.5 ? '了' : '矣');
    }
    return {
      polishedText: resultText,
      styleProfile: authorData.styleProfile,
      analysis: [{ title: '本地润色', description: `本地模拟润色 (错误: ${error.message})` }],
      tags: [...authorData.tags, '本地润色']
    };
  }
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
    const customApiKey = req.headers['x-api-key'];
    const customBaseUrl = req.headers['x-base-url'];
    const customModelName = req.headers['x-model-name'];
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    console.log('Polishing text:', { text: text.substring(0, 50), author, intensity, mode });
    
    const result = await polishText(
      text, 
      author, 
      intensity || 50, 
      customApiKey, 
      customBaseUrl, 
      customModelName
    );
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
    
    // 使用真实的作家数据计算混合指标
    const totalWeight = baseWeight + overlayWeight;
    
    // 计算混合的节奏指数
    const mixedRhythm = Math.round((baseAuthor.styleProfile.rhythm * baseWeight + overlayAuthor.styleProfile.rhythm * overlayWeight) / totalWeight);
    
    // 计算结构平衡度（基于词汇复杂度和深度的混合）
    const structureBalance = Math.round(
      ((baseAuthor.styleProfile.lexical * baseWeight + overlayAuthor.styleProfile.lexical * overlayWeight) / totalWeight * 0.5 +
      (baseAuthor.styleProfile.depth * baseWeight + overlayAuthor.styleProfile.depth * overlayWeight) / totalWeight * 0.5)
    );
    
    // 计算情感张力
    const tension = Math.round((baseAuthor.styleProfile.emotional * baseWeight + overlayAuthor.styleProfile.emotional * overlayWeight) / totalWeight);
    
    // 确定节奏描述
    let rhythmDescription = "中等";
    if (mixedRhythm >= 85) rhythmDescription = "快速";
    else if (mixedRhythm >= 70) rhythmDescription = "中等偏快";
    else if (mixedRhythm >= 55) rhythmDescription = "中等";
    else if (mixedRhythm >= 40) rhythmDescription = "中等偏慢";
    else rhythmDescription = "慢速";
    
    // 计算克制/澎湃比例
    const restraintPercent = Math.round(100 - (mixedRhythm / 100 * 60));
    const passionPercent = 100 - restraintPercent;
    
    // 生成风格描述
    const styleDescription = `此混合风格融合了${baseAuthor.name}的${baseAuthor.characteristics.slice(0, 1).join('')}，同时融入${overlayAuthor.name}的${overlayAuthor.characteristics.slice(0, 1).join('')}，形成独特的叙事质感。`;
    
    res.json({
      mixedStyle: {
        name: `${baseAuthor.name} + ${overlayAuthor.name} Blend`,
        characteristics: [
          ...baseAuthor.characteristics.slice(0, 2),
          ...overlayAuthor.characteristics.slice(0, 2)
        ],
        metrics: {
          structureBalance,
          rhythm: rhythmDescription,
          tension,
          restraintPercent,
          passionPercent
        },
        description: styleDescription
      },
      preview: `这是一个融合了${baseAuthor.name}和${overlayAuthor.name}两种写作风格的文本示例，既有${baseAuthor.name}的${baseAuthor.characteristics.slice(0, 1).join('')}，又融入了${overlayAuthor.name}的${overlayAuthor.characteristics.slice(0, 1).join('')}...`
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

app.listen(PORT, '0.0.0.0', () => {
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
