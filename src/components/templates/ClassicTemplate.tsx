import React from 'react';
import { NewsData, CATEGORY_COLORS } from '../../types';

interface TemplateProps {
  data: NewsData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    photo,
    zoom,
    categoryLabel,
    categoryColor,
    headline,
    highlightStyle,
    sourceName,
    sourceLogo,
    date,
  } = data;

  const renderHeadline = () => {
    const parts = headline.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        let className = '';
        let style = {};

        switch (highlightStyle) {
          case 'bold-white':
            className = 'font-bold text-white';
            break;
          case 'bold-color':
            className = 'font-bold';
            style = { color: CATEGORY_COLORS[categoryColor] };
            break;
          case 'highlight':
            className = 'font-bold text-black px-1 mx-0.5 box-decoration-clone';
            style = { backgroundColor: '#fde047' }; 
            break;
          case 'underline':
            className = 'underline decoration-2 underline-offset-4';
            style = { textDecorationColor: CATEGORY_COLORS[categoryColor] };
            break;
        }

        return (
          <span key={index} className={className} style={style}>
            {content}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-[400px] h-[500px] bg-black relative overflow-hidden text-white font-sans shrink-0 selection:bg-transparent">
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        {photo ? (
          <img
            src={photo}
            className="w-full h-full object-cover transition-transform duration-200"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center' 
            }}
            alt="News Background"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-sm">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,1) 100%)'
        }}
      />

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        
        {/* Category Tag */}
        <div className="mb-4">
          <span
            className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white inline-block"
            style={{ backgroundColor: CATEGORY_COLORS[categoryColor] }}
          >
            {categoryLabel || 'CATEGORY'}
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="text-[28px] leading-[1.2] font-serif mb-6 text-gray-100"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          {renderHeadline()}
        </h1>

        {/* Footer Bar */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-3 mt-2">
          <div className="flex items-center gap-2">
            {sourceLogo && (
               <div className="w-4 h-4 bg-white rounded-sm overflow-hidden flex items-center justify-center">
                  <img src={sourceLogo} className="w-full h-full object-contain" alt="Source Logo" />
               </div>
            )}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 font-mono">
              {sourceName || 'NEWS CHANNEL'}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono tracking-wider">
            {date}
          </span>
        </div>
      </div>

      {/* Floating Logo (Top Left) */}
      <div className="absolute top-5 left-5 z-20">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded w-16 h-16 flex flex-col items-center justify-center overflow-hidden shadow-lg">
           {sourceLogo ? (
             <img src={sourceLogo} className="w-full h-full object-cover" alt="Source Logo Main" />
           ) : (
             <div className="text-center text-white flex flex-col items-center justify-center h-full w-full p-1">
                <span className="text-[10px] font-black leading-none block w-full text-left pl-1">THE</span>
                <span className="text-xl font-black leading-none tracking-tighter block">NEWS</span>
             </div>
           )}
        </div>
      </div>

    </div>
  );
};

export default ClassicTemplate;
