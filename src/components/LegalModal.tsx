import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { legalContent } from '../data/legal';

interface LegalModalProps {
  type: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact';
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const content = legalContent[type];
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pt-20">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-orbitron text-gray-900">
              {content.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="prose prose-blue max-w-none">
            {content.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.includes('\n')) {
                // Handle lists or multi-line paragraphs
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
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
