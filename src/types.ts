export type CategoryColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'teal'
  | 'gray';

export type HighlightStyle = 'bold-white' | 'bold-color' | 'highlight' | 'underline';

export type TemplateType = 'classic' | 'modern' | 'breaking' | 'quote' | 'broadcast' | 'minimal';

export interface NewsData {
  photo: string | null;
  zoom: number;
  categoryLabel: string;
  categoryColor: CategoryColor;
  headline: string;
  highlightStyle: HighlightStyle;
  sourceName: string;
  sourceLogo: string | null;
  date: string;
  template: TemplateType;
}

export const CATEGORY_COLORS: Record<CategoryColor, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  orange: '#f97316',
  purple: '#a855f7',
  teal: '#14b8a6',
  gray: '#4b5563',
};

export const COLOR_CLASSES: Record<CategoryColor, string> = {
  red: 'bg-red-500 text-red-500',
  blue: 'bg-blue-500 text-blue-500',
  green: 'bg-green-500 text-green-500',
  orange: 'bg-orange-500 text-orange-500',
  purple: 'bg-purple-500 text-purple-500',
  teal: 'bg-teal-500 text-teal-500',
  gray: 'bg-gray-600 text-gray-600',
};
