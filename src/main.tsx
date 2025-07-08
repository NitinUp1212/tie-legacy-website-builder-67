
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary for better error handling
class ErrorBoundary {
  static getDerivedStateFromError(error: Error) {
    console.error('Application Error:', error);
    return { hasError: true };
  }
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found. Make sure you have a div with id="root" in your index.html');
}

const root = createRoot(container);

// Enhanced error handling and performance
try {
  root.render(<App />);
} catch (error) {
  console.error('Failed to render application:', error);
  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, sans-serif;">
      <div style="text-align: center; padding: 2rem; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
        <h1 style="color: #dc2626; margin-bottom: 1rem;">Application Error</h1>
        <p style="color: #64748b;">Please refresh the page or contact support if the problem persists.</p>
      </div>
    </div>
  `;
}

// Performance monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    console.log('Application loaded successfully');
  });
}
