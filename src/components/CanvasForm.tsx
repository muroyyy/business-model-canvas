import React, { useState } from 'react';
import { BusinessModelCanvas, Theme, sectionGuides } from '../types/canvas';
import { Save, Eye, Sparkles } from 'lucide-react';
import SectionTooltip from './SectionTooltip';

interface CanvasFormProps {
  canvas: BusinessModelCanvas;
  onChange: (field: keyof BusinessModelCanvas, value: string) => void;
  onGenerate: () => void;
  onPreview: () => void;
  selectedTheme: Theme;
}

const CanvasForm: React.FC<CanvasFormProps> = ({ 
  canvas, 
  onChange, 
  onGenerate, 
  onPreview, 
  selectedTheme 
}) => {
  const [focusedField, setFocusedField] = useState<keyof BusinessModelCanvas | null>(null);

  const sections = [
    { key: 'keyPartnerships', label: 'Key Partnerships', icon: '🤝' },
    { key: 'keyActivities', label: 'Key Activities', icon: '⚡' },
    { key: 'keyResources', label: 'Key Resources', icon: '🎯' },
    { key: 'valueProposition', label: 'Value Proposition', icon: '💎' },
    { key: 'customerRelationships', label: 'Customer Relationships', icon: '❤️' },
    { key: 'channels', label: 'Channels', icon: '📢' },
    { key: 'customerSegments', label: 'Customer Segments', icon: '👥' },
    { key: 'costStructure', label: 'Cost Structure', icon: '💰' },
    { key: 'revenueStreams', label: 'Revenue Streams', icon: '💵' },
  ] as const;

  const isFormComplete = Object.values(canvas).every(value => value.trim() !== '');
  const completedSections = Object.values(canvas).filter(value => value.trim() !== '').length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
             style={{ backgroundColor: selectedTheme.colors.primary }}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: selectedTheme.colors.text }}>
          Business Model Canvas Generator
        </h1>
        <p className="text-gray-600 mb-4">
          Create your comprehensive business model with interactive guidance
        </p>
        
        {/* Progress indicator */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedSections}/9 sections</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(completedSections / 9) * 100}%`,
                backgroundColor: selectedTheme.colors.primary
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sections.map(({ key, label, icon }) => {
          const guide = sectionGuides[key];
          const isCompleted = canvas[key].trim() !== '';
          const isFocused = focusedField === key;
          
          return (
            <div 
              key={key} 
              className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-300 hover:shadow-xl ${
                isFocused 
                  ? 'border-blue-400 shadow-blue-100' 
                  : isCompleted 
                    ? 'border-green-300 shadow-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{
                borderColor: isFocused ? selectedTheme.colors.primary : undefined
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{icon}</span>
                  <label className="block text-sm font-semibold" style={{ color: selectedTheme.colors.text }}>
                    {label}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  {isCompleted && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                  <SectionTooltip guide={guide} />
                </div>
              </div>
              
              <textarea
                value={canvas[key]}
                onChange={(e) => onChange(key, e.target.value)}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                placeholder={`Describe your ${label.toLowerCase()}...`}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:border-transparent text-sm transition-all duration-200"
                style={{
                  focusRingColor: selectedTheme.colors.primary,
                  backgroundColor: isFocused ? selectedTheme.colors.sections[key] + '20' : 'white'
                }}
              />
              
              {/* Character count */}
              <div className="text-xs text-gray-500 mt-2 text-right">
                {canvas[key].length} characters
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={onPreview}
            disabled={completedSections === 0}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              completedSections > 0
                ? 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview Canvas
          </button>
          
          <button
            onClick={onGenerate}
            disabled={!isFormComplete}
            className={`inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isFormComplete
                ? 'text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: isFormComplete ? selectedTheme.colors.primary : undefined
            }}
          >
            <Save className="w-5 h-5 mr-2" />
            Generate Final Canvas
          </button>
        </div>
        
        {!isFormComplete && (
          <p className="text-sm text-gray-500">
            Complete all {9 - completedSections} remaining sections to generate your final canvas
          </p>
        )}
      </div>
    </div>
  );
};

export default CanvasForm;