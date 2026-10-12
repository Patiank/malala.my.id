import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { ToastNotice } from '../types';

interface ToastProps {
  toasts: ToastNotice[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastNotice; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-black/95 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center justify-between gap-3 pointer-events-auto border border-gray-800 backdrop-blur-md"
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
        </div>
        <p className="font-jakarta font-medium text-xs tracking-wide text-gray-100 break-words">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-white p-1 rounded transition-colors shrink-0 cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <span className="text-xs">&times;</span>
      </button>
    </motion.div>
  );
};
