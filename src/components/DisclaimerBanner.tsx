import React, { useState } from 'react';
import { X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-slate-900/40 border-b border-slate-800/60 px-4 py-2 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-300">Methodology Framework</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Observed Market Median (non-absolute proxy)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Local Sourcing Availability (indicative wholesale proximity)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>On-demand budget control (max 4 queries per uncached SKU)</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-500 hover:text-slate-300 p-1 transition-colors cursor-pointer"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
