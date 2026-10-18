import React, { ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in Malala App:', error, errorInfo);
    // If it's a chunk load or dynamic import error after a new deployment, auto-recover once
    const msg = error?.message || '';
    if (msg.includes('dynamically imported module') || msg.includes('Loading chunk') || msg.includes('Failed to fetch')) {
      const retryKey = 'malala_chunk_retry';
      const lastRetry = sessionStorage.getItem(retryKey);
      if (!lastRetry || Date.now() - parseInt(lastRetry, 10) > 10000) {
        sessionStorage.setItem(retryKey, Date.now().toString());
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center font-jakarta">
          <div className="max-w-md bg-gray-800 border border-red-600/50 p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="text-4xl">⚠️</div>
            <h1 className="font-orbitron font-extrabold text-lg uppercase text-red-400">
              MALALA Sumbar Portal
            </h1>
            <p className="text-xs text-gray-300">
              Terjadi penyesuaian aplikasi. Klik tombol di bawah untuk memuat ulang aplikasi secara normal:
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch (e) {}
                window.location.href = window.location.origin + window.location.pathname + '?refresh=' + Date.now();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              🔄 Muat Ulang Website
            </button>
            {this.state.error?.message && (
              <details className="text-left text-[11px] text-gray-400 bg-gray-900/80 p-2.5 rounded-lg border border-gray-700/60 mt-3">
                <summary className="cursor-pointer text-[10px] text-gray-400 hover:text-white uppercase font-bold tracking-wider">
                  Detail Teknis (Info Error)
                </summary>
                <p className="mt-1 font-mono text-[10px] text-red-300 break-words">
                  {this.state.error.message}
                </p>
              </details>
            )}
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

// Handle Vite dynamic import chunk preload errors on client when new build is deployed
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    console.warn('[Vite] Preload chunk error detected, reloading page to fetch latest assets:', event);
    window.location.reload();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

// Register PWA Service Worker with Tiered Caching Lifecycle for Flipbook (Production only)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('[PWA] ServiceWorker registration error:', err);
    });
  });
}

