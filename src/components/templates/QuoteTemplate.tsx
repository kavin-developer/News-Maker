import React from 'react';
import { NewsData, CATEGORY_COLORS } from '../../types';
import { Quote } from 'lucide-react';

interface TemplateProps {
  data: NewsData;
}

const QuoteTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    photo,
    zoom,
    categoryLabel,
    categoryColor,
    headline,
    highlightStyle,
    sourceName,
    sourceLogo,
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
    <div className="w-[400px] h-[500px] bg-black relative overflow-hidden text-white font-sans shrink-0 flex flex-col items-center justify-center p-8 text-center">
      {/* Background Image Layer (blurred) */}
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        {photo ? (
          <img
            src={photo}
            className="w-full h-full object-cover blur-sm opacity-40 scale-110"
            style={{ 
              transform: `scale(${(zoom / 100) + 0.1})`, // slight extra zoom for blur edges
              transformOrigin: 'center center' 
            }}
            alt="News Background"
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
      </div>

       {/* Gradient Overlay */}
       <div 
        className="absolute inset-0 pointer-events-none bg-black/50"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full justify-center">
          <Quote 
            size={48} 
            className="mb-6 opacity-80" 
            style={{ color: CATEGORY_COLORS[categoryColor] }} 
            fill={CATEGORY_COLORS[categoryColor]}
          />
          
          <h1 className="text-2xl font-serif italic leading-relaxed text-gray-100 mb-8">
            "{renderHeadline()}"
          </h1>

          <div className="mt-auto flex flex-col items-center gap-2">
            <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: CATEGORY_COLORS[categoryColor] }} />
            
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                {categoryLabel || 'QUOTE OF THE DAY'}
            </span>

            <div className="flex items-center gap-2 mt-2 opacity-70">
                {sourceLogo && <img src={sourceLogo} className="w-4 h-4 object-contain bg-white rounded-sm" />}
                <span className="text-[10px] font-mono uppercase">{sourceName}</span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default QuoteTemplate;
