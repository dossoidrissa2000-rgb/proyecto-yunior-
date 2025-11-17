
import React from 'react';
import { OutputType } from '../types';
import { BoltIcon } from './icons/BoltIcon';
import { BudgetIcon } from './icons/BudgetIcon';
import { MilestoneIcon } from './icons/MilestoneIcon';
import { UserStoryIcon } from './icons/UserStoryIcon';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputType: OutputType;
  setOutputType: (type: OutputType) => void;
  isLoading: boolean;
  handleGenerate: () => void;
  useFastModel: boolean;
  setUseFastModel: (use: boolean) => void;
}

const ActionButton: React.FC<{
  label: string;
  type: OutputType;
  currentType: OutputType;
  setType: (type: OutputType) => void;
  icon: React.ReactNode;
}> = ({ label, type, currentType, setType, icon }) => {
  const isActive = type === currentType;
  return (
    <button
      onClick={() => setType(type)}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface ${
        isActive
          ? 'bg-brand-blue text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export const InputPanel: React.FC<InputPanelProps> = ({
  inputText,
  setInputText,
  outputType,
  setOutputType,
  isLoading,
  handleGenerate,
  useFastModel,
  setUseFastModel,
}) => {
  return (
    <div className="bg-brand-surface rounded-lg border border-gray-800 p-4 md:p-6 flex flex-col h-full shadow-2xl">
      <label htmlFor="input-text" className="text-lg font-semibold text-white mb-3">
        Meeting Notes / Project Brief
      </label>
      <textarea
        id="input-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your raw text here..."
        className="flex-grow bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors duration-200 resize-none"
        rows={15}
      />
      
      <div className="mt-6">
        <p className="text-md font-semibold text-white mb-3">Generate Document</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ActionButton label="Budget" type={OutputType.Budget} currentType={outputType} setType={setOutputType} icon={<BudgetIcon />} />
          <ActionButton label="Milestones" type={OutputType.Milestones} currentType={outputType} setType={setOutputType} icon={<MilestoneIcon />} />
          <ActionButton label="User Stories" type={OutputType.UserStories} currentType={outputType} setType={setOutputType} icon={<UserStoryIcon />} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div 
          onClick={() => setUseFastModel(!useFastModel)}
          className="flex items-center justify-between cursor-pointer bg-gray-900 p-3 rounded-lg border border-gray-700"
        >
          <div className="flex items-center gap-3">
            <BoltIcon className={`w-6 h-6 ${useFastModel ? 'text-yellow-400' : 'text-gray-500'} transition-colors`}/>
            <div>
              <p className="font-semibold text-white">Fast AI Responses</p>
              <p className="text-xs text-gray-400">Uses gemini-2.5-flash-lite for quicker results</p>
            </div>
          </div>
          <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${useFastModel ? 'bg-brand-blue' : 'bg-gray-600'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${useFastModel ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-brand-red hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
      </div>
    </div>
  );
};
