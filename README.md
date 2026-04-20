# Deepiri Landing Page

A modern, responsive landing page for Deepiri, optimized for Cloudflare Pages deployment.

## Features

- **Modern Design**: Clean, professional UI with gradient accents
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Fast Performance**: Optimized for Cloudflare Pages with static site generation
- **React + TypeScript**: Built with React 18 and TypeScript for type safety
- **Vite**: Lightning-fast build tool and dev server

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- CSS3 (no external CSS frameworks)

## Development

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: Connect via Git (Recommended)

1. Push this repository to GitHub, GitLab, or Bitbucket
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click "Save and Deploy"

### Option 2: Deploy via Wrangler CLI

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   wrangler pages deploy dist
   ```

### Option 3: Direct Upload

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to Cloudflare Dashboard → Pages → Create a project → Upload assets
3. Upload the contents of the `dist/` directory

## Project Structure

```
deepiri-landing/
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Page components
│   │   └── LandingPage.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── App.css          # App styles
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies
├── _redirects           # Cloudflare Pages redirects
└── README.md            # This file
```

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  /* ... */
}
```

### Content

- **Hero Section**: Edit `src/components/Hero.tsx`
- **Features**: Edit the `features` array in `src/components/Features.tsx`
- **Footer Links**: Edit `src/components/Footer.tsx`

## License

This project is part of the Deepiri platform.

