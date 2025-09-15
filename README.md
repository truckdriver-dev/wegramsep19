# WEGRAM - Web3 SocialFi App Prototype

A modern, dark-themed social media application built for Web3 with a focus on social finance features.

## Features

- **Dark Mode Interface** with custom color system
- **Social Media Core**: Post creation, feed, profile management
- **Web3 Integration Ready**: Wallet interface, rewards system
- **AI Assistant**: Built-in AI chat functionality  
- **Live Streaming**: Go-live functionality
- **Analytics Dashboard**: User engagement metrics
- **Responsive Design**: Mobile-first with desktop support

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

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with default settings
4. For database integration, add environment variables in Vercel dashboard

## Database Integration

This prototype uses mock data that can easily be replaced with real database calls. Key files for database integration:

- `src/data/mockData.ts` - Replace mock data with API calls
- Add database environment variables to `.env`
- Replace mock functions with actual database operations

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components (TopBar, BottomNav, etc.)
│   └── Post/           # Post-related components
├── pages/              # Route pages
├── data/               # Mock data (replace with API calls)
├── styles/             # Global styles and theme
└── App.tsx             # Main application component
```

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

1. **Database Ready**: Mock data structure matches expected API responses
2. **Component Architecture**: Clean separation of concerns
3. **Responsive Design**: Works on all device sizes
4. **Performance Optimized**: Lazy loading and efficient rendering
5. **Accessibility**: WCAG compliant with proper contrast ratios

The app is designed to work immediately after deployment to Vercel, with easy database integration through environment variables.