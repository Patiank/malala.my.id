import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { legalContent } from '../data/legal';

interface LegalModalProps {
  type: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact';
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const content = legalContent[type];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !content) return;
    if (!dialog.open) {
      dialog.showModal();
    }
    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [content]);

  if (!content) return null;

  return (
    <dialog
      ref={dialogRef}
      id="legal-modal"
      aria-labelledby="legal-modal-title"
      onClose={onClose}
      className="native-modal fixed inset-0 z-[100] p-0 sm:p-6 m-auto font-jakarta flex items-end sm:items-center justify-center"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[85vh] animate-slide-up sm:animate-in sm:fade-in sm:zoom-in duration-200"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Visual Grab Handle for Mobile Bottom Sheet */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 id="legal-modal-title" className="text-xl font-bold font-orbitron text-gray-900">
              {content.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup jendela informasi hukum"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="prose prose-blue max-w-none">
            {content.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.includes('\n')) {
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line font-jakarta">
                    {paragraph}
                  </p>
                );
              }
              return (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4 font-jakarta">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
}
