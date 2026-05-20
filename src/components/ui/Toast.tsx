'use client';

import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { activeToast, hideToast } = useUIStore();

  if (!activeToast) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${activeToast.type}`}>
        {icons[activeToast.type]}
        <span style={{ flex: 1 }}>{activeToast.message}</span>
        <button onClick={hideToast} aria-label="Close notification" style={{ color: 'inherit', opacity: 0.7 }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
