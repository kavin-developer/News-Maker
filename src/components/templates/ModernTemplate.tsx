import React from 'react';
import { NewsData, CATEGORY_COLORS } from '../../types';

interface TemplateProps {
  data: NewsData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
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
    <div className="w-[400px] h-[500px] bg-[#111] relative overflow-hidden text-white font-sans shrink-0 flex flex-col">
      {/* Top Image Area */}
      <div className="h-[60%] w-full relative overflow-hidden bg-gray-900">
        {photo ? (
          <img
            src={photo}
            className="w-full h-full object-cover"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center' 
            }}
            alt="News"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-700 font-mono text-sm">NO IMAGE</div>
        )}
        
        {/* Source Logo Overlay */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-1.5 rounded flex items-center gap-2">
            {sourceLogo && <img src={sourceLogo} className="w-5 h-5 object-contain bg-white rounded-sm" />}
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{sourceName || 'NEWS'}</span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="h-[40%] bg-[#111] p-6 flex flex-col justify-between relative">
        <div 
          className="absolute top-0 left-0 w-full h-1" 
          style={{ backgroundColor: CATEGORY_COLORS[categoryColor] }}
        />

        <div>
            <div className="flex justify-between items-center mb-3">
                <span 
                    className="text-[10px] font-bold uppercase tracking-[0.2em]" 
                    style={{ color: CATEGORY_COLORS[categoryColor] }}
                >
                    {categoryLabel || 'CATEGORY'}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">{date}</span>
            </div>

            <h1 className="text-xl font-bold leading-tight text-white line-clamp-4">
                {renderHeadline()}
            </h1>
        </div>

        {/* Decoration */}
        <div className="flex gap-1 mt-2">
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div className="w-1 h-1 rounded-full bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
