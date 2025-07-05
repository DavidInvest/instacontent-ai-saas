# InstaContent AI - Professional SaaS Platform

A comprehensive AI-powered SaaS platform for intelligent Instagram content creation featuring real-time collaboration, trend detection, and PostNitro-inspired visual editing capabilities.

## 🚀 Features

### AI Content Generation
- **Multi-format Support**: Posts (1080x1080), Stories (1080x1920), Carousels (up to 10 slides)
- **GPT-4o Mini Integration**: Cost-efficient AI content generation
- **Multi-source Input**: Topic, Article URL, Twitter, Manual text
- **Performance Prediction**: Engagement scoring and reach estimation

### PostNitro-Inspired Canvas Editor
- **AI Generation Panel**: Multi-source content creation workflow
- **Advanced Color Management**: Brand themes, custom palettes, and color tools
- **Typography Controls**: Complete font management with live preview
- **Branding Controls**: Logo upload, watermark placement, social handle integration
- **Professional Interface**: Tabbed sidebar layout matching industry standards

### Real-time Collaboration
- **Google Docs-style Editing**: Multi-user collaborative content creation
- **AI Merge Assistance**: Intelligent conflict resolution
- **Live Presence**: Real-time user indicators and typing status
- **Threaded Comments**: Collaborative feedback system

### Trend Intelligence
- **Multi-platform Detection**: Instagram, TikTok, Twitter trend aggregation
- **Safety Scoring**: AI-powered content moderation and brand alignment
- **Business Relevance**: Industry-specific trend recommendations
- **Real-time Updates**: Live trending hashtag integration

### Performance Analytics
- **Engagement Metrics**: Comprehensive performance tracking
- **Industry Benchmarks**: Comparative analytics dashboard
- **Predictive Modeling**: AI-powered performance forecasting
- **Visual Charts**: Interactive analytics visualization

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** + shadcn/ui components
- **TanStack Query** for state management
- **Wouter** for lightweight routing
- **React Hook Form** + Zod validation
- **Vite** for fast development

### Backend
- **Node.js** + Express.js
- **TypeScript** end-to-end
- **PostgreSQL** with Drizzle ORM
- **Neon Database** serverless hosting
- **JWT Authentication** with refresh tokens

### AI & Services
- **OpenAI GPT-4o Mini** for content generation
- **Stable Diffusion v2.1** for image generation
- **Multi-platform APIs** for trend detection
- **Advanced web scraping** for content extraction

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)
- OpenAI API key
- Stable Diffusion API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/instacontent-ai.git
cd instacontent-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file with:
```env
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
STABLE_DIFFUSION_API_KEY=your_stable_diffusion_key
```

4. **Database Setup**
```bash
npm run db:push
```

5. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:5000` to access the application.

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── services/           # Business logic services
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data access layer
│   └── db.ts               # Database configuration
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── README.md
```

## 🎨 Canvas Editor Features

### Professional Interface
- **Four-tab Sidebar**: AI, Brand, Colors, Text controls
- **Template Library**: Professional starting templates
- **Multi-slide Management**: Carousel creation and editing
- **Real-time Preview**: Live design updates

### AI Generation Capabilities
- **Topic-based Generation**: Create content from business topics
- **URL Import**: Extract and transform web articles
- **Social Media Integration**: Import from Twitter and other platforms
- **Custom Text Input**: Manual content creation

### Design Tools
- **Color Management**: Professional brand themes and custom palettes
- **Typography System**: Advanced font controls and text styling
- **Brand Assets**: Logo, watermark, and social handle management
- **Export Options**: Multiple format output capabilities

## 🔧 API Endpoints

### Content Generation
```
POST /api/generate-content    # AI content generation
POST /api/generate-image      # Image generation
GET  /api/trends             # Trending hashtags
```

### Content Management
```
GET    /api/content          # List user content
POST   /api/content          # Create new content
PUT    /api/content/:id      # Update content
DELETE /api/content/:id      # Delete content
```

### Collaboration
```
GET  /api/collaboration/:id  # Get active collaborators
POST /api/collaboration      # Start collaboration session
PUT  /api/collaboration/:id  # Update collaboration
```

## 🚀 Deployment

### Replit Deployment
This application is optimized for Replit deployment:

1. Push your code to GitHub
2. Import repository into Replit
3. Configure environment variables
4. Click "Deploy" to go live

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@instacontent-ai.com or create an issue in this repository.

## 🙏 Acknowledgments

- Inspired by PostNitro's professional design interface
- Built with modern web technologies and AI capabilities
- Powered by OpenAI and Stable Diffusion APIs

---

**InstaContent AI** - Transform your social media strategy with AI-powered content creation.
Add comprehensive README documentation
