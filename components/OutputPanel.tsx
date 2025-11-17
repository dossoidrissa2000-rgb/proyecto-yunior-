
import React from 'react';
import { OutputType } from '../types';
import { ExportIcon } from './icons/ExportIcon';

interface OutputPanelProps {
  generatedContent: string;
  isLoading: boolean;
  error: string | null;
  outputType: OutputType;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    <div className="mt-8 h-4 bg-gray-700 rounded w-1/3"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

const renderMarkdown = (markdown: string) => {
  const lines = markdown.split('\n');
  return lines.map((line, index) => {
    // Basic Markdown processing for demonstration
    if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold text-white mt-4 mb-2">{line.substring(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-semibold text-white mt-3 mb-1.5">{line.substring(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold text-gray-200 mt-2 mb-1">{line.substring(4)}</h3>;
    if (line.startsWith('* ') || line.startsWith('- ')) return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
    if (line.match(/^\d+\.\s/)) return <li key={index} className="ml-5 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
    if (line.trim() === '---') return <hr key={index} className="my-4 border-gray-700" />;
    
    // Process **bold** text
    const parts = line.split('**');
    const processedLine = parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
    
    return <p key={index} className="my-1.5 leading-relaxed">{processedLine}</p>;
  });
};

export const OutputPanel: React.FC<OutputPanelProps> = ({
  generatedContent,
  isLoading,
  error,
  outputType,
}) => {
  const handleExport = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${outputType}_${new Date().toISOString()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const hasContent = generatedContent && !isLoading && !error;

  return (
    <div className="bg-brand-surface rounded-lg border border-gray-800 p-4 md:p-6 flex flex-col h-full shadow-2xl relative">
      {hasContent && (
        <button
          onClick={handleExport}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-brand-blue text-white font-bold p-2 rounded-full transition-colors duration-200"
          title="Export as Markdown"
        >
          <ExportIcon />
        </button>
      )}
      <h2 className="text-lg font-semibold text-white mb-3 capitalize">{outputType}</h2>
      <div className="flex-grow bg-gray-900 border border-gray-700 rounded-md p-4 overflow-y-auto text-gray-300 prose prose-invert prose-sm max-w-none">
        {isLoading && <LoadingSkeleton />}
        {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
        {!isLoading && !error && !generatedContent && (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <p>Your generated document will appear here.</p>
          </div>
        )}
        {hasContent && <div className="whitespace-pre-wrap">{renderMarkdown(generatedContent)}</div>}
      </div>
    </div>
  );
};
