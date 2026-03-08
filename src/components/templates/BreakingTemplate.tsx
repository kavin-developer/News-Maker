import React from 'react';
import { NewsData, CATEGORY_COLORS } from '../../types';

interface TemplateProps {
  data: NewsData;
  formatText?: (text: string) => React.ReactNode;
}

const BreakingTemplate: React.FC<TemplateProps> = ({ data, formatText }) => {
  const {
    categoryLabel,
    categoryColor,
    headline,
    sourceName,
    sourceLogo,
    date,
    photo,
  } = data;

  const color = CATEGORY_COLORS[categoryColor];
  
  // If we have an image, we use it as background with an overlay.
  // If not, we use the category color as the background.
  const hasImage = !!photo;

  return (
    <div 
      className="w-[400px] h-[500px] relative overflow-hidden text-white font-sans shrink-0 flex flex-col p-8"
      style={{ backgroundColor: color }}
    >
        {/* Background Image */}
        {photo && (
          <div className="absolute inset-0 z-0">
             <img src={photo} className="w-full h-full object-cover" alt="Background" />
             {/* Gradient Overlay to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
             {/* Color tint overlay */}
             <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundColor: color }} />
          </div>
        )}

        {/* Background Texture/Noise (only if no image, or subtle if image) */}
        <div className={`absolute inset-0 ${hasImage ? 'opacity-10' : 'opacity-20'} bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0`} />
        
        {/* Big Alert Header */}
        <div className="relative z-10 flex justify-between items-center border-b-2 border-white/20 pb-4 mb-auto">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${hasImage ? 'bg-red-600' : 'bg-black'} text-white flex items-center justify-center font-black rounded-sm shadow-xl`}>
                    !
                </div>
                <span className={`text-xl font-black italic uppercase tracking-tighter ${hasImage ? 'text-white' : 'text-black/80'}`}>
                    {categoryLabel || 'BREAKING'}
                </span>
            </div>
            <div className={`${hasImage ? 'bg-red-600/80 text-white' : 'bg-black/20 text-black/60'} px-2 py-1 rounded text-xs font-mono font-bold`}>
                LIVE
            </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 my-auto">
            <h1 className="text-[32px] font-black uppercase leading-[1.1] text-white drop-shadow-lg">
                {formatText ? formatText(headline) : headline.replace(/\*\*/g, '')}
            </h1>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-auto pt-6 border-t border-white/20 flex justify-between items-end">
            <div>
                 <p className={`text-xs font-bold ${hasImage ? 'text-white/70' : 'text-black/60'} uppercase tracking-widest mb-1`}>Source</p>
                 <div className="flex items-center gap-2">
                    {sourceLogo && <img src={sourceLogo} className="w-6 h-6 object-contain bg-white rounded-sm" />}
                    <span className={`font-black text-lg ${hasImage ? 'text-white' : 'text-black'}`}>{sourceName}</span>
                 </div>
            </div>
            <div className="text-right">
                <p className={`text-xs font-bold ${hasImage ? 'text-white/70' : 'text-black/60'} uppercase tracking-widest mb-1`}>Date</p>
                <p className={`font-mono text-sm font-bold ${hasImage ? 'text-white' : 'text-black'}`}>{date}</p>
            </div>
        </div>
    </div>
  );
};

export default BreakingTemplate;
