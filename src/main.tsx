import React, { ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in Malala App:', error, errorInfo);
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
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
