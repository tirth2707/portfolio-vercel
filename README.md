# Senior Software Engineer Portfolio

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. Features dark mode, smooth animations, and a professional design.

## Features

- 🎨 **Modern Design** - Clean, professional aesthetic with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🔍 **SEO Optimized** - Meta tags and structured data included
- 📊 **Analytics Ready** - Google Analytics integration placeholder

## Sections

- **Hero** - Eye-catching introduction with call-to-action buttons
- **About** - Personal introduction and background
- **Experience** - Work experience timeline
- **Projects** - Featured projects showcase
- **Skills** - Technical skills and technologies
- **Education** - Educational background
- **Blog** - Blog posts listing
- **Contact** - Contact form and information

## Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Router** - Routing (for future blog pages)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Update Your Information

1. **Personal Info**: Edit the Hero section in `src/components/sections/Hero.jsx`
2. **About Section**: Update `src/components/sections/About.jsx`
3. **Experience**: Modify `src/data/experience.js`
4. **Projects**: Update `src/data/projects.js`
5. **Skills**: Edit `src/data/skills.js`
6. **Education**: Update `src/components/sections/Education.jsx`
7. **Contact**: Update email and social links in `src/components/sections/Contact.jsx` and `src/components/Layout/Footer.jsx`

### Styling

- Tailwind configuration: `tailwind.config.js`
- Global styles: `src/index.css`
- Color scheme: Customize primary colors in `tailwind.config.js`

### Analytics

To enable Google Analytics:

1. Get your Google Analytics Measurement ID
2. Uncomment the analytics script in `index.html`
3. Replace `GA_MEASUREMENT_ID` with your actual ID

### Contact Form

The contact form currently uses a placeholder. To enable form submission:

1. **Option 1**: Use [Formspree](https://formspree.io/)
   - Sign up and get your form endpoint
   - Update the form action in `src/components/sections/Contact.jsx`

2. **Option 2**: Use [EmailJS](https://www.emailjs.com/)
   - Install: `npm install @emailjs/browser`
   - Configure and update the form handler

3. **Option 3**: Set up your own backend API
   - Create an API endpoint
   - Update the form submission handler

## Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── Layout/      # Header, Footer, Navigation
│   │   ├── sections/    # Page sections
│   │   └── ui/          # Reusable UI components
│   ├── contexts/        # React contexts (Theme)
│   ├── data/            # Data files (experience, projects, skills)
│   ├── hooks/           # Custom hooks
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Built with:
- [React](https://react.dev)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
