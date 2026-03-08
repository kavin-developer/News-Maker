import React from 'react';
import { CATEGORY_COLORS, NewsData } from '../../types';

interface BroadcastTemplateProps {
  data: NewsData;
  formatText: (text: string) => React.ReactNode;
}

export const BroadcastTemplate: React.FC<BroadcastTemplateProps> = ({ data, formatText }) => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col justify-end font-sans">
      {/* Background Image */}
      {data.photo ? (
        <div className="absolute inset-0">
          <img
            src={data.photo}
            alt="Background"
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${data.zoom / 100})`,
              transformOrigin: 'center center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-700 font-mono text-sm">
          NO SIGNAL
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 w-full pb-8 px-6">
        <div className="flex items-end gap-4 mb-4">
          
          <div className="flex-1">
            {/* Category Tag */}
            <div 
              className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest uppercase text-white shadow-sm"
              style={{ backgroundColor: CATEGORY_COLORS[data.categoryColor] }}
            >
              {data.categoryLabel}
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-bold text-white leading-tight drop-shadow-lg font-sans">
              {formatText(data.headline)}
            </h1>
          </div>
        </div>

        {/* Lower Third Bar */}
        <div className="w-full bg-white text-black p-3 flex justify-between items-center shadow-lg rounded-sm">
           <div className="flex items-center gap-3">
              {/* Logo Box */}
              <div className="w-8 h-8 bg-zinc-100 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center border border-zinc-200">
                {data.sourceLogo ? (
                  <img src={data.sourceLogo} alt="Channel Logo" className="w-full h-full object-contain p-0.5" />
                ) : (
                  <div className="text-[8px] font-bold text-zinc-400">LOGO</div>
                )}
              </div>
             
             <div className="flex flex-col leading-none">
               <span className="uppercase font-bold text-sm tracking-tight">{data.sourceName}</span>
               <div className="flex items-center gap-1.5 text-[10px] font-medium text-red-600 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                  LIVE UPDATE
               </div>
             </div>
          </div>

          <div className="text-xs font-mono font-medium text-zinc-500 border-l border-zinc-300 pl-3 ml-3">
            {data.date}
          </div>
        </div>
      </div>
    </div>
  );
};
