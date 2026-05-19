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

// Serve static files from the dist directory (for production)
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Moonpence server is running' });
});

// Endpoint to polish text
app.post('/api/polish', async (req, res) => {
  try {
    const { text, author, intensity, mode } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    console.log('Polishing text:', { text: text.substring(0, 50), author, intensity, mode });
    
    // Mock response for demo purposes
    const mockResult = {
      polishedText: "The intersection of digital precision and classical literature creates a unique space for the modern scholar. Within this digital sanctuary, the weight of a word is measured not just by its definition, but by its resonant frequency within the architecture of a sentence. We find that the most profound insights often reside in the quietest transitions, where ink meets digital parchment.",
      styleProfile: {
        rhythm: 92,
        lexical: 85,
        emotional: 78,
        depth: 94
      },
      analysis: [
        {
          title: "Syntactic Rhythms",
          description: "Enhanced the cadence by varying sentence lengths, mirroring the ebb and flow of classical philosophical treatises."
        },
        {
          title: "Lexical Precision",
          description: "Substituted generic verbs with precise, evocative terminology to heighten the intellectual authority of the passage."
        },
        {
          title: "Atmospheric Cohesion",
          description: "Aligned metaphors with the 'Modern Bibliophile' aesthetic, ensuring consistent imagery of physical craft and digital space."
        }
      ],
      tags: ["Academic Refinement", "重度风格化"]
    };
    
    res.json(mockResult);
    
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
    
    res.json({
      styleAnalysis: {
        sentenceLength: "Medium",
        vocabularyLevel: "Advanced",
        tone: "Formal",
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
    
    res.json({
      mixedStyle: {
        name: `${baseStyle} + ${overlayStyle} Blend`,
        characteristics: [
          "Balanced sentence structure",
          "Controlled emotional expression",
          "Precise word choice"
        ],
        metrics: {
          structureBalance: 68,
          rhythm: "Moderate Fast",
          tension: 45
        }
      },
      preview: "This is a preview of the mixed style writing..."
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
  console.log(`   - POST /api/polish  - 润色文本`);
  console.log(`   - POST /api/analyze - 分析文本风格`);
  console.log(`   - POST /api/mix-styles - 混合风格`);
  console.log(`\n`);
});
