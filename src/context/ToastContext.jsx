import React, { createContext, useState, useContext, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 p-4 bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl pointer-events-auto animate-[slideIn_0.2s_ease-out_forwards]"
          >
            {toast.type === 'success' && <CheckCircle className="text-accent-green w-5 h-5 flex-shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="text-accent-amber w-5 h-5 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="text-accent-red w-5 h-5 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="text-accent-blue w-5 h-5 flex-shrink-0" />}
            
            <p className="text-sm font-medium text-zinc-200 flex-grow">{toast.message}</p>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
