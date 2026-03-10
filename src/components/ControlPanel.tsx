import React from 'react';
import { Camera, Image as ImageIcon, Download, Layers, Loader2 } from 'lucide-react';
import { NewsData, CATEGORY_COLORS, CategoryColor, HighlightStyle } from '../types';
import { cn } from '../utils/cn';

interface ControlPanelProps {
  data: NewsData;
  onChange: (key: keyof NewsData, value: any) => void;
  onDownload: () => void;
  isBulk?: boolean;
  bulkCount?: number;
  isDownloading?: boolean;
  downloadProgress?: { current: number; total: number } | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  onChange,
  onDownload,
  isBulk = false,
  bulkCount = 1,
  isDownloading = false,
  downloadProgress = null,
}) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('sourceLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const highlightStyles: { id: HighlightStyle; label: string; class: string }[] = [
    { id: 'bold-white', label: 'Bold White', class: 'bg-gray-800 text-white border-gray-700' },
    { id: 'bold-color', label: 'Bold Color', class: 'bg-gray-800 text-red-500 border-red-500/50' },
    { id: 'highlight', label: 'Highlight', class: 'bg-yellow-200 text-black border-yellow-400 font-bold' },
    { id: 'underline', label: 'Underline', class: 'bg-gray-800 text-white underline decoration-2 border-gray-700' },
  ];

  return (
    <div className="w-full max-w-md bg-[#111111] text-gray-300 p-6 rounded-xl border border-gray-800/50 shadow-2xl h-full overflow-y-auto scrollbar-hide">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800/50">
        <div className="w-5 h-5 bg-gray-200 rounded-sm flex items-center justify-center">
            <div className="w-3 h-1 bg-black rounded-full" />
        </div>
        <h2 className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase font-mono">News Post Maker</h2>
      </div>

      {/* Template Selector */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Template</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['classic', 'modern', 'breaking', 'quote', 'broadcast', 'minimal'].map((t) => (
                <button
                    key={t}
                    onClick={() => onChange('template', t)}
                    className={cn(
                        "py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all duration-200",
                        data.template === t
                            ? "bg-red-900/20 border-red-500 text-red-400"
                            : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
                    )}
                >
                    {t}
                </button>
            ))}
        </div>
      </div>

      {/* Photo Upload */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Photo</label>
        <div className="relative group">
           <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
           <div className={cn(
             "border border-dashed border-red-900/30 bg-red-950/5 rounded-lg h-24 flex flex-col items-center justify-center text-red-500/50 group-hover:border-red-500/50 group-hover:bg-red-950/10 group-hover:text-red-400 transition-all duration-300",
             data.photo ? "border-solid border-green-900/30 bg-green-950/5 text-green-500/50" : ""
           )}>
              <Camera className="w-5 h-5 mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{data.photo ? "Change Photo" : "Upload Photo"}</span>
           </div>
        </div>
      </div>

      {/* Zoom */}
      <div className="mb-8 flex items-center gap-4">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 w-16 font-mono">Zoom</label>
        <div className="flex-1 relative h-6 flex items-center">
            <input 
            type="range" 
            min="10" 
            max="200" 
            value={data.zoom} 
            onChange={(e) => onChange('zoom', Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
        </div>
        <span className="text-xs font-mono text-red-500 w-10 text-right">{data.zoom}%</span>
      </div>

      {/* Category */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Category Label</label>
        <input 
          type="text" 
          value={data.categoryLabel}
          onChange={(e) => onChange('categoryLabel', e.target.value)}
          className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors uppercase font-bold tracking-wider font-mono placeholder-gray-700"
          placeholder="WORLD"
        />
      </div>

      {/* Category Color */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Category Color</label>
        <div className="flex gap-3 flex-wrap">
          {(Object.keys(CATEGORY_COLORS) as CategoryColor[]).map((color) => (
             <button
               key={color}
               onClick={() => onChange('categoryColor', color)}
               className={cn(
                 "w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 border-2 border-transparent",
                 data.categoryColor === color ? "ring-2 ring-white scale-110 border-black" : "opacity-70 hover:opacity-100"
               )}
               style={{ backgroundColor: CATEGORY_COLORS[color] }}
             />
          ))}
        </div>
      </div>

      {/* Headline */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 font-mono">Headline</label>
            <span className="text-[9px] text-gray-600 font-mono">**BOLD** · USE / FOR BULK</span>
        </div>

        {/* Bulk Mode Banner */}
        {isBulk && (
          <div className="mb-3 bg-red-950/20 border border-red-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
            <Layers className="w-3 h-3 text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
                Bulk Mode Active — {bulkCount} posts
              </p>
              <p className="text-[9px] text-gray-600 font-mono mt-0.5">
                Each segment separated by / will become its own post
              </p>
            </div>
          </div>
        )}

        <textarea 
          value={data.headline}
          onChange={(e) => onChange('headline', e.target.value)}
          className={cn(
            "w-full h-32 bg-[#0a0a0a] border rounded-lg p-4 text-sm text-gray-300 focus:outline-none transition-colors resize-none leading-relaxed font-serif placeholder-gray-700",
            isBulk ? "border-red-900/50 focus:border-red-500" : "border-gray-800 focus:border-red-500"
          )}
          placeholder={"Headline one / Headline two / Headline three\n\nOr use **asterisks** to bold words."}
        />

        {/* Post list preview in bulk mode */}
        {isBulk && (
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto scrollbar-hide">
            {data.headline.split(/(?<!\*)\s*\/\s*(?!\*)/).filter(h => h.trim()).map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px] font-mono text-gray-600">
                <span className="text-red-500 shrink-0 font-bold mt-0.5">#{i + 1}</span>
                <span className="line-clamp-1">{h.replace(/\*\*/g, '').trim()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Highlight Style */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Bold / Highlight Style</label>
        <div className="grid grid-cols-2 gap-3">
           {highlightStyles.map((style) => (
             <button
               key={style.id}
               onClick={() => onChange('highlightStyle', style.id)}
               className={cn(
                 "py-3 px-2 rounded-lg text-xs font-bold border transition-all duration-200",
                 style.class,
                 data.highlightStyle === style.id 
                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#111] opacity-100" 
                    : "opacity-40 hover:opacity-80 border-transparent bg-gray-800"
               )}
               style={style.id === 'bold-color' ? { color: CATEGORY_COLORS[data.categoryColor] } : {}}
             >
               {style.label}
             </button>
           ))}
        </div>
      </div>

      {/* Source */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Source / Channel Name</label>
        <input 
          type="text" 
          value={data.sourceName}
          onChange={(e) => onChange('sourceName', e.target.value)}
          className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors uppercase font-bold tracking-wider font-mono placeholder-gray-700"
          placeholder="CANADA 24"
        />
      </div>

      {/* Logo Upload */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Channel Logo (Optional)</label>
        <div className="relative group">
           <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
           <div className={cn(
             "border border-dashed border-red-900/30 bg-red-950/5 rounded-lg h-16 flex items-center justify-center gap-3 text-red-500/50 group-hover:border-red-500/50 group-hover:bg-red-950/10 group-hover:text-red-400 transition-all duration-300",
             data.sourceLogo ? "border-solid border-green-900/30 bg-green-950/5 text-green-500/50" : ""
           )}>
              <ImageIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{data.sourceLogo ? "Change Logo" : "Upload Logo"}</span>
           </div>
        </div>
      </div>

      {/* Date */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-gray-500 font-mono">Date / Time</label>
        <input 
          type="text" 
          value={data.date}
          onChange={(e) => onChange('date', e.target.value)}
          className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-mono placeholder-gray-700"
          placeholder="March 5, 2026"
        />
      </div>
      
      {/* Footer Button */}
      <button 
        onClick={onDownload}
        disabled={isDownloading}
        className={cn(
          "w-full font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group",
          isBulk
            ? "bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white shadow-red-900/30"
            : "bg-red-600 hover:bg-red-500 text-white shadow-red-900/20",
          isDownloading ? "opacity-70 cursor-not-allowed" : ""
        )}
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {downloadProgress
              ? `Saving ${downloadProgress.current} / ${downloadProgress.total}...`
              : 'Preparing...'}
          </>
        ) : isBulk ? (
          <>
            <Layers className="w-4 h-4" />
            Download {bulkCount} Posts
          </>
        ) : (
          <>
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            Download Image
          </>
        )}
      </button>

      {isBulk && !isDownloading && (
        <p className="text-center text-[9px] font-mono text-gray-700 mt-2 uppercase tracking-widest">
          Files will save as bulk-news-###-1.png, bulk-news-###-2.png…
        </p>
      )}
    </div>
  );
}

export default ControlPanel;
