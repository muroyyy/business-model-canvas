import React, { useState } from 'react';
import { SectionGuide } from '../types/canvas';
import { HelpCircle, X, Lightbulb, CheckCircle } from 'lucide-react';

interface SectionTooltipProps {
  guide: SectionGuide;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const SectionTooltip: React.FC<SectionTooltipProps> = ({ guide, position = 'top' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
        type="button"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Tooltip */}
          <div className={`absolute z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 ${positionClasses[position]}`}>
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-800 text-sm">{guide.title}</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-gray-600 text-xs mb-3">{guide.description}</p>
            
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-3 h-3 mr-1 text-yellow-500" />
                <span className="text-xs font-medium text-gray-700">Examples:</span>
              </div>
              <ul className="space-y-1">
                {guide.examples.map((example, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs font-medium text-gray-700">Tips:</span>
              </div>
              <ul className="space-y-1">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SectionTooltip;