import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { AudienceModeProvider } from './contexts/AudienceModeContext';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AudienceModeProvider>
        <BrowserRouter>
          <Analytics />
          <App />
        </BrowserRouter>
      </AudienceModeProvider>
    </ThemeProvider>
  </StrictMode>,
);
