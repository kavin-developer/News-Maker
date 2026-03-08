import React from 'react';
import { CATEGORY_COLORS, NewsData } from '../../types';

interface MinimalTemplateProps {
  data: NewsData;
  formatText: (text: string) => React.ReactNode;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, formatText }) => {
  return (
    <div className="w-full h-full bg-white text-zinc-900 p-8 flex flex-col justify-between font-serif relative overflow-hidden">
      
      {/* Top Section: Date & Category */}
      <div className="flex justify-between items-center border-b border-zinc-200 pb-4 mb-6">
         <span className="text-xs font-sans font-medium tracking-widest text-zinc-400 uppercase">
           {data.date}
         </span>
         <span 
           className="text-xs font-sans font-bold tracking-widest uppercase"
           style={{ color: CATEGORY_COLORS[data.categoryColor] }}
         >
           {data.categoryLabel}
         </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Headline */}
        <h1 className="text-4xl font-serif font-medium leading-snug text-zinc-900">
          {formatText(data.headline)}
        </h1>

        {/* Image (if available) */}
        {data.photo && (
          <div className="flex-1 w-full relative overflow-hidden bg-zinc-100 rounded-sm">
            <img
              src={data.photo}
              alt="News"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              style={{
                transform: `scale(${data.zoom / 100})`,
                transformOrigin: 'center center',
              }}
            />
          </div>
        )}
      </div>

      {/* Footer: Source */}
      <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {data.sourceLogo && (
             <img src={data.sourceLogo} alt="Logo" className="h-6 w-auto object-contain opacity-80" />
          )}
          <span className="font-sans font-bold text-sm tracking-tight text-zinc-800 uppercase">
            {data.sourceName}
          </span>
        </div>
        <div className="w-8 h-[1px] bg-zinc-300"></div>
      </div>
      
    </div>
  );
};
