import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Analytics } from "@vercel/analytics/react"
import ControlPanel from './components/ControlPanel';
import NewsPreview from './components/NewsPreview';
import { NewsData } from './types';

const INITIAL_DATA: NewsData = {
  photo: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop',
  zoom: 100,
  categoryLabel: 'WORLD',
  categoryColor: 'red',
  headline: 'Former hostage discusses life in **Evin prison** – and his fears for **Iran\'s future**',
  highlightStyle: 'bold-color',
  sourceName: 'CANADA 24',
  sourceLogo: null,
  date: 'March 5, 2026',
  template: 'classic',
};

export function App() {
  const [data, setData] = useState<NewsData>(INITIAL_DATA);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: keyof NewsData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        // We use a small delay to ensure fonts are rendered if changed recently, though not strictly necessary here
        const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 3 });
        const link = document.createElement('a');
        link.download = `news-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row items-start justify-center p-4 md:p-8 gap-8 overflow-hidden font-sans">
      {/* Control Panel */}
      <div className="w-full md:w-[400px] h-auto md:h-[calc(100vh-4rem)] shrink-0 flex flex-col">
        <ControlPanel data={data} onChange={handleChange} onDownload={handleDownload} />
      </div>

      {/* Preview Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[600px] md:h-[calc(100vh-4rem)] relative bg-[#0a0a0a] rounded-3xl border border-gray-800/30 p-8 shadow-inner">
        
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 flex gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500/20" />
           <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
           <div className="w-2 h-2 rounded-full bg-green-500/20" />
        </div>
        <div className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.2em] text-gray-800 uppercase font-mono">
           Live Preview
        </div>

        {/* The Card */}
        <div className="shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] rounded-none overflow-hidden ring-1 ring-white/10 scale-[0.8] md:scale-100 transition-transform origin-center">
             <NewsPreview ref={previewRef} data={data} />
        </div>

        <p className="mt-8 text-[10px] text-gray-700 font-mono tracking-widest text-center max-w-sm uppercase">
           • Generated locally in your browser •
        </p>
      </div>
      <Analytics />
    </div>
  );
}


