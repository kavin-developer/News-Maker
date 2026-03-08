import { forwardRef } from 'react';
import { NewsData } from '../types';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import BreakingTemplate from './templates/BreakingTemplate';
import QuoteTemplate from './templates/QuoteTemplate';
import { BroadcastTemplate } from './templates/BroadcastTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CATEGORY_COLORS } from '../types';

interface NewsPreviewProps {
  data: NewsData;
}

const NewsPreview = forwardRef<HTMLDivElement, NewsPreviewProps>(({ data }, ref) => {
  const renderHeadline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        let className = '';
        let style = {};

        switch (data.highlightStyle) {
          case 'bold-white':
            className = 'font-bold text-white';
            break;
          case 'bold-color':
            className = 'font-bold';
            style = { color: CATEGORY_COLORS[data.categoryColor] };
            break;
          case 'highlight':
            className = 'font-bold text-black px-1 mx-0.5 box-decoration-clone';
            style = { backgroundColor: '#fde047' }; 
            break;
          case 'underline':
            className = 'underline decoration-2 underline-offset-4';
            style = { textDecorationColor: CATEGORY_COLORS[data.categoryColor] };
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
    <div ref={ref} className="bg-black inline-block shadow-2xl overflow-hidden w-[400px] h-[500px]">
      {data.template === 'classic' && <ClassicTemplate data={data} />}
      {data.template === 'modern' && <ModernTemplate data={data} />}
      {data.template === 'breaking' && <BreakingTemplate data={data} formatText={renderHeadline as any} />}
      {data.template === 'quote' && <QuoteTemplate data={data} />}
      {data.template === 'broadcast' && <BroadcastTemplate data={data} formatText={renderHeadline as any} />}
      {data.template === 'minimal' && <MinimalTemplate data={data} formatText={renderHeadline as any} />}
    </div>
  );
});

export default NewsPreview;
