# ChatFlow AI - Frontend Testing Dashboard

A comprehensive React-based testing dashboard for the ChatFlow AI backend API.

## 🚀 Features

### Complete API Coverage
- **🌐 Scraping**: Test website scraping with AI analysis
- **💬 Chat**: Ask AI questions about scraped content
- **🔐 Authentication**: Register, login, profile management
- **📊 SEO Tools**: Keyword research, domain analysis, backlinks
- **🔑 API Keys**: Generate, validate, and manage API keys
- **📁 Files**: View, manage, and delete scraped files

### Modern UI/UX
- ✨ Glassmorphism design with dark theme
- 🎨 Vibrant gradient accents
- 🌊 Smooth animations and transitions
- 📱 Fully responsive design
- ⚡ Real-time backend status indicator

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on `http://localhost:5173`

## 🔧 Configuration

The frontend is configured to proxy API requests to `http://localhost:3000` (your backend server).

Make sure your ChatFlow AI backend is running before using the frontend.

## 📚 Available Endpoints

### Scraping
- `POST /api/scrape/save` - Scrape and save website
- `POST /api/scrape/url` - Scrape with AI analysis
- `POST /api/scrape/chat` - Chat with website content
- `GET /api/scrape/files` - Get all scraped files
- `GET /api/scrape/files/:id` - Get specific file
- `DELETE /api/scrape/files/:id` - Delete file
- `GET /api/scrape/stats` - Get storage statistics

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/check` - Check auth status
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### API Keys
- `POST /api/auth/api-key/generate` - Generate new API key
- `GET /api/auth/api-key` - Get current API key
- `DELETE /api/auth/api-key` - Revoke API key
- `POST /api/auth/validate-api-key` - Validate API key

### SEO Tools
- `POST /api/keyword-research` - Research keywords
- `POST /api/domain-keywords` - Get domain keywords
- `POST /api/domain-pages` - Get domain pages
- `POST /api/domain-backlinks` - Analyze backlinks
- `POST /api/keyword-data` - Get keyword data
- `POST /api/domain-analysis` - Analyze domain

## 🎯 Usage

1. **Check Backend Status**: The header shows if your backend is online
2. **Select a Tab**: Choose from Scrape, Chat, Auth, SEO, API Keys, or Files
3. **Fill in the Form**: Enter required information
4. **Execute**: Click the action button
5. **View Response**: See the JSON response below

### Quick Test URLs
- Example.com (simple test)
- Wikipedia AI article (complex content)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Vanilla CSS** - Styling with CSS variables
- **Google Fonts (Inter)** - Typography

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 💻 Desktop (1400px+)
- 📱 Tablet (768px - 1400px)
- 📱 Mobile (< 768px)

## 🎨 Design System

### Colors
- Primary: Indigo (#6366f1)
- Secondary: Purple (#8b5cf6)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Background: Dark (#0a0e1a)

### Effects
- Glassmorphism cards with backdrop blur
- Gradient accents
- Smooth transitions (150-350ms)
- Glow effects on hover
- Pulsing status indicators

## 📄 License

Part of the ChatFlow AI project.
