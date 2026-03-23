import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { createRoot } from 'react-dom/client';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react';
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: keyof NewsData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // Parse headlines split by " / " or "/"
  const parseHeadlines = (headline: string): string[] => {
    return headline
      .split(/(?<!\*)\s*\/\s*(?!\*)/) // split on / not inside **
      .map(h => h.trim())
      .filter(h => h.length > 0);
  };

  const captureElement = (el: HTMLElement): Promise<string> => {
    return toPng(el, { cacheBust: true, pixelRatio: 3 });
  };

  const renderAndCapture = (singleData: NewsData): Promise<string> => {
    return new Promise((resolve, reject) => {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.zIndex = '-1';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);

      const root = createRoot(container);
      root.render(<NewsPreview data={singleData} />);

      // Wait for render + fonts
      setTimeout(async () => {
        try {
          const el = container.firstElementChild as HTMLElement;
          if (!el) throw new Error('No element rendered');
          const dataUrl = await captureElement(el);
          root.unmount();
          document.body.removeChild(container);
          resolve(dataUrl);
        } catch (err) {
          root.unmount();
          if (document.body.contains(container)) document.body.removeChild(container);
          reject(err);
        }
      }, 600);
    });
  };

  const downloadDataUrl = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    const headlines = parseHeadlines(data.headline);

    if (headlines.length <= 1) {
      // Single post download
      if (previewRef.current) {
        try {
          setIsDownloading(true);
          const dataUrl = await captureElement(previewRef.current);
          downloadDataUrl(dataUrl, `news-${Date.now()}.png`);
        } catch (err) {
          console.error('Failed to generate image', err);
        } finally {
          setIsDownloading(false);
        }
      }
    } else {
      // Bulk download
      setIsDownloading(true);
      const batchId = Math.floor(Math.random() * 900) + 100;
      const batchName = `bulk-news-${batchId}`;

      try {
        for (let i = 0; i < headlines.length; i++) {
          setDownloadProgress({ current: i + 1, total: headlines.length });
          const singleData: NewsData = { ...data, headline: headlines[i] };
          const dataUrl = await renderAndCapture(singleData);
          downloadDataUrl(dataUrl, `${batchName}-${i + 1}.png`);
          // Small delay between downloads to avoid browser blocking
          if (i < headlines.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 400));
          }
        }
      } catch (err) {
        console.error('Bulk download failed', err);
      } finally {
        setIsDownloading(false);
        setDownloadProgress(null);
      }
    }
  };

  const headlines = parseHeadlines(data.headline);
  const isBulk = headlines.length > 1;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row items-start justify-center p-4 md:p-8 gap-8 overflow-hidden font-sans">
      {/* Control Panel */}
      <div className="w-full md:w-[400px] h-auto md:h-[calc(100vh-4rem)] shrink-0 flex flex-col">
        <ControlPanel
          data={data}
          onChange={handleChange}
          onDownload={handleDownload}
          isBulk={isBulk}
          bulkCount={headlines.length}
          isDownloading={isDownloading}
          downloadProgress={downloadProgress}
        />
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

        {/* Bulk indicator */}
        {isBulk && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-900/30 border border-red-500/30 rounded-full px-3 py-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
              Bulk · {headlines.length} posts · Previewing #1
            </span>
          </div>
        )}

        {/* The Card — always previews the first headline */}
        <div className="shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] rounded-none overflow-hidden ring-1 ring-white/10 scale-[0.8] md:scale-100 transition-transform origin-center">
             <NewsPreview ref={previewRef} data={{ ...data, headline: headlines[0] || data.headline }} />
        </div>

        <p className="mt-8 text-[10px] text-gray-700 font-mono tracking-widest text-center max-w-sm uppercase">
           • Generated locally in your browser •
        </p>
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
