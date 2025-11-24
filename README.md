# Food Hub - Food Delivery App

A modern food delivery application built with React, TypeScript, and Vite.

## Features

- 🍕 Browse restaurants and menu items
- 🛒 Shopping cart functionality
- 📦 Order tracking
- ⭐ Ratings and reviews
- 👤 User authentication (Customer & Admin)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Food-Hub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
Food-Hub/
├── components/          # React components
│   ├── ui/             # UI component library
│   └── ...             # Feature components
├── data/               # Mock data
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
├── AppRouter.tsx       # Router configuration
├── main.tsx            # Entry point
└── index.html          # HTML template
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

#### Option 1: Using Netlify Dashboard (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://www.netlify.com/) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect the settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

The `netlify.toml` file is already configured, so Netlify will automatically:
- Use the correct build command
- Set the publish directory
- Handle SPA routing with redirects

#### Option 2: Using Netlify CLI

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
# Follow the prompts, or use:
netlify deploy --prod
```

The project is already configured with `netlify.toml`, so it will work automatically!

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

### Deploy to Any Static Host

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your static hosting service (AWS S3, Cloudflare Pages, etc.)

## Environment Variables

No environment variables are required for basic functionality. The app uses mock data for demonstration purposes.

## Demo Accounts

- **Customer**: `customer@demo.com` / `demo123`
- **Admin**: `admin@demo.com` / `demo123`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

