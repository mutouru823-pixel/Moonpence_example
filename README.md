<div align="center">

# 🌙 Moonpence

### 开启您的文学实验室

A literary polish and style mixing tool powered by AI.

</div>

## 📋 Project Overview

Moonpence is a full-stack web application that allows users to:
- Polish text in the style of famous authors
- Adjust style intensity levels
- Analyze text characteristics
- Mix different writing styles
- View detailed stylistic analysis and improvements

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React (for icons)

### Backend
- Node.js
- Express.js
- Google Gemini API (planned for production)

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (optional for demo):
```bash
# Copy the example and add your API key
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

3. Start the application:

#### Option 1: Start both frontend and backend (concurrently)
```bash
# First install concurrently if not present
npm install -D concurrently

# Then run
npm run dev:full
```

#### Option 2: Start separately
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

#### Option 3: Production build
```bash
# Build frontend first
npm run build

# Start backend server (serves both API and frontend)
npm run server
```

### Access the Application

- **Frontend (Dev):** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/health

## 📡 API Endpoints

### `POST /api/polish`
Polish text with specified style and intensity.

**Request:**
```json
{
  "text": "Your text here",
  "author": "Ernest Hemingway",
  "intensity": 2,
  "mode": "Plain"
}
```

**Response:**
```json
{
  "polishedText": "...",
  "styleProfile": {
    "rhythm": 92,
    "lexical": 85,
    "emotional": 78,
    "depth": 94
  },
  "analysis": [...],
  "tags": [...]
}
```

### `POST /api/analyze`
Analyze text style characteristics.

### `POST /api/mix-styles`
Mix multiple writing styles.

### `GET /api/health`
Health check endpoint.

## 📁 Project Structure

```
/workspace
├── src/
│   ├── components/
│   │   ├── SetupPage.tsx      # Initial setup screen
│   │   ├── EditorPage.tsx     # Main text editor
│   │   ├── ResultPage.tsx     # Results display
│   │   ├── LabPage.tsx        # Style lab
│   │   └── BottomNav.tsx      # Navigation
│   ├── context/
│   │   └── AppContext.tsx     # Global state management
│   ├── services/
│   │   └── api.ts             # API client
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server.js                  # Express backend server
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

## 🎨 Features

1. **Setup Page**: Configure API settings
2. **Editor Page**:
   - Text input with character/word count
   - Author style selection
   - Intensity slider (Light → Moderate → Heavy)
   - Output mode options
3. **Result Page**:
   - Polished text display
   - Multi-dimensional style profile
   - Stylistic analysis
   - Copy to clipboard
4. **Style Lab**: Style mixing and experimentation

## 🔧 Configuration

### Environment Variables
```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

### Vite Proxy
The frontend is configured to proxy `/api` requests to the backend server automatically during development.

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run server` | Start Express backend |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove build artifacts |
| `npm run lint` | Run TypeScript check |

## 🚧 Current Status

✅ **Done**:
- Full frontend UI implementation
- Backend API server with mock responses
- State management and API integration
- Build and deployment configuration

🔄 **Todo**:
- Integrate real Google Gemini API
- Add more author styles
- Implement local caching
- Add user authentication
- Save and load history

## 📝 Notes

- The current version uses mock responses for demonstration purposes
- To use real AI features, add your Gemini API key to the `.env` file
- Get your API key from: https://aistudio.google.com/app/apikey

## 📄 License

Built with AI Studio.
