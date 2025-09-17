# WEGRAM - Web3 SocialFi App Prototype

A modern, dark-themed social media application built for Web3 with a focus on social finance features. This is a fully functional MVP with dummy data that can easily be connected to any backend database.

## Features

- **Dark Mode Interface** with custom color system
- **Social Media Core**: Post creation, feed, profile management
- **Web3 Integration Ready**: Wallet interface, rewards system
- **AI Assistant**: Built-in AI chat functionality  
- **Live Streaming**: Go-live functionality
- **Analytics Dashboard**: User engagement metrics
- **Responsive Design**: Mobile-first with desktop support

## 🚀 MVP Status & Database Integration

**This is a working MVP with dummy data for demonstration purposes.**

### Current State:
- ✅ Fully functional UI and user interactions
- ✅ Complete component architecture
- ✅ Dummy data for realistic demonstration
- ✅ Ready for backend integration

### Database Flexibility:
- **Any Database Supported**: PostgreSQL, MySQL, MongoDB, Firebase, Supabase, or any REST/GraphQL API
- **Clean Data Layer**: All data interactions are abstracted through hooks (`useAuth`, `usePosts`, etc.)
- **Easy Integration**: Replace mock data functions with your API calls
- **No Vendor Lock-in**: Not tied to any specific database or backend service

### Dummy Data Purpose:
The app includes realistic dummy data to:
- Demonstrate full functionality during MVP phase
- Show what the app looks like with real user content
- Enable testing of all features and user flows
- Provide a complete user experience for stakeholders

**All dummy data is clearly marked and easily replaceable with real database calls.**

## Quick Start

1. **Development**:
   ```bash
   npm install
   npm run dev
   ```

2. **Build for Production**:
   ```bash
   npm run build
   ```

## 🗄️ Database Integration Guide

### Option 1: Use Any Database/API
1. **Replace Mock Functions**: Update files in `src/hooks/` to call your API
2. **Update Data Types**: Modify interfaces in `src/data/mockData.ts` to match your schema
3. **Environment Variables**: Add your API endpoints to `.env`
4. **Remove Mock Data**: Delete or comment out dummy data once real data is flowing

### Option 2: Quick Start with Supabase (Optional)
If you want to use Supabase for quick setup:
1. Follow `SUPABASE_SETUP.md` for 5-minute setup
2. Run the provided SQL migrations
3. Add your Supabase credentials to `.env`
4. The app will automatically switch from dummy to real data

### Key Integration Files:
- `src/hooks/useAuth.ts` - Authentication logic
- `src/hooks/usePosts.ts` - Post management
- `src/data/mockData.ts` - All dummy data (replace with API calls)
- `src/lib/supabase.ts` - Database client (adapt for your backend)

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with default settings
4. Add your database environment variables in Vercel dashboard

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components (TopBar, BottomNav, etc.)
│   └── Post/           # Post-related components
├── hooks/              # Data management hooks (replace with your API calls)
├── pages/              # Route pages
├── data/               # Mock data (REPLACE with your API calls)
├── lib/                # Database/API clients (adapt for your backend)
├── styles/             # Global styles and theme
└── App.tsx             # Main application component
```

## 🔄 Converting from MVP to Production

### Step 1: Database Setup
- Set up your preferred database (PostgreSQL, MySQL, MongoDB, etc.)
- Create your schema based on the interfaces in `mockData.ts`
- Set up your API endpoints or GraphQL schema

### Step 2: Replace Mock Data
- Update `src/hooks/useAuth.ts` to call your authentication API
- Update `src/hooks/usePosts.ts` to call your posts API  
- Replace functions in `src/data/mockData.ts` with real API calls
- Update `src/lib/supabase.ts` to use your database client

### Step 3: Environment Variables
```env
# Replace with your database/API credentials
VITE_API_URL=your_api_endpoint
VITE_DATABASE_URL=your_database_url
# Add any other required environment variables
```

### Step 4: Test & Deploy
- Test all functionality with real data
- Verify user registration, posts, wallet features work
- Deploy to your preferred hosting platform

## Design System

- **Colors**: Dark theme with purple accents
- **Typography**: System fonts with 14px base size
- **Spacing**: 8px base unit system  
- **Components**: Consistent card-based layout
- **Animations**: Subtle hover states and transitions

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

## Production Readiness

This prototype is structured for easy conversion to a production app:

1. **Database Agnostic**: Works with any backend - PostgreSQL, MySQL, MongoDB, Firebase, etc.
2. **Clean Architecture**: Mock data clearly separated from UI components
2. **Component Architecture**: Clean separation of concerns
3. **Responsive Design**: Works on all device sizes
4. **Performance Optimized**: Lazy loading and efficient rendering
5. **Accessibility**: WCAG compliant with proper contrast ratios
6. **Easy Integration**: Replace mock functions with your API calls

## 📋 For Developers

### Understanding the Codebase:
- **Dummy Data**: All located in `src/data/mockData.ts` and clearly marked
- **Data Hooks**: `src/hooks/` contains all data management logic
- **Database Client**: `src/lib/supabase.ts` (rename/adapt for your database)
- **Components**: Pure UI components that work with any data source

### Integration Checklist:
- [ ] Set up your database/API
- [ ] Replace mock functions in hooks with real API calls
- [ ] Update environment variables
- [ ] Test user registration and authentication
- [ ] Test post creation and social features
- [ ] Test wallet functionality
- [ ] Remove or comment out dummy data
- [ ] Deploy to production

**The app is designed to work immediately as an MVP, with seamless transition to any backend database or API.**