import React, { useState } from 'react';
import { BusinessModelCanvas, Theme, sectionGuides, CanvasFormat } from '../types/canvas';
import { Save, Eye, Sparkles, Quote } from 'lucide-react';
import SectionTooltip from './SectionTooltip';

interface CanvasFormProps {
  canvas: BusinessModelCanvas;
  format: CanvasFormat;
  onChange: (field: keyof BusinessModelCanvas, value: string) => void;
  onCitationChange: (field: keyof BusinessModelCanvas, value: string) => void;
  onGenerate: () => void;
  onPreview: () => void;
  selectedTheme: Theme;
}

const CanvasForm: React.FC<CanvasFormProps> = ({ 
  canvas, 
  format,
  onChange, 
  onCitationChange,
  onGenerate, 
  onPreview, 
  selectedTheme 
}) => {
  const [focusedField, setFocusedField] = useState<keyof BusinessModelCanvas | null>(null);

  const generalSections = [
    { key: 'keyPartnerships', label: 'Key Partnerships'},
    { key: 'keyActivities', label: 'Key Activities'},
    { key: 'keyResources', label: 'Key Resources'},
    { key: 'valueProposition', label: 'Value Proposition'},
    { key: 'customerRelationships', label: 'Customer Relationships'},
    { key: 'channels', label: 'Channels'},
    { key: 'customerSegments', label: 'Customer Segments'},
    { key: 'costStructure', label: 'Cost Structure'},
    { key: 'revenueStreams', label: 'Revenue Streams'},
  ] as const;

  const apuAdditionalSections = [
    { key: 'ipProtection', label: 'IP Protection', icon: '🛡️' },
    { key: 'technologyTransfer', label: 'Technology Transfer', icon: '🔬' },
    { key: 'regulatoryRequirements', label: 'Regulatory Requirements', icon: '📋' },
    { key: 'leanStartup', label: 'Lean Startup', icon: '🚀' },
    { key: 'marketPresence', label: 'Market Presence', icon: '🌐' },
    { key: 'organizationalCulture', label: 'Organizational Culture', icon: '🏢' },
  ] as const;

  const sections = format === 'apu' ? [...generalSections, ...apuAdditionalSections] : generalSections;
  
  const requiredFields = format === 'apu' 
    ? [...generalSections.map(s => s.key), ...apuAdditionalSections.map(s => s.key)]
    : generalSections.map(s => s.key);
    
  const isFormComplete = requiredFields.every(field => canvas[field]?.trim() !== '');
  const completedSections = requiredFields.filter(field => canvas[field]?.trim() !== '').length;
  const totalSections = requiredFields.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
             style={{ backgroundColor: selectedTheme.colors.primary }}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: selectedTheme.colors.text }}>
          {format === 'apu' ? 'APU Academic' : 'General'} Business Model Canvas
        </h1>
        <p className="text-gray-600 mb-4">
          {format === 'apu' 
            ? 'Create your academic business model with detailed justifications and citations'
            : 'Create your comprehensive business model with interactive guidance'
          }
        </p>
        
        {/* Progress indicator */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedSections}/{totalSections} sections</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(completedSections / totalSections) * 100}%`,
                backgroundColor: selectedTheme.colors.primary
              }}
            />
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${format === 'apu' ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 mb-8`}>
        {sections.map(({ key, label, icon }) => {
          const guide = sectionGuides[key];
          const isCompleted = canvas[key]?.trim() !== '';
          const isFocused = focusedField === key;
          
          return (
            <div 
              key={key} 
              className={`bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-300 hover:shadow-xl ${format === 'apu' ? 'min-h-[300px]' : ''} ${
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
                  <SectionTooltip guide={guide} format={format} />
                </div>
              </div>
              
              <textarea
                value={canvas[key] || ''}
                onChange={(e) => onChange(key, e.target.value)}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                placeholder={format === 'apu' 
                  ? `Provide detailed analysis of your ${label.toLowerCase()} with justifications...`
                  : `Describe your ${label.toLowerCase()}...`
                }
                className={`w-full ${format === 'apu' ? 'h-40' : 'h-32'} p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:border-transparent text-sm transition-all duration-200`}
                style={{
                  focusRingColor: selectedTheme.colors.primary,
                  backgroundColor: isFocused ? (selectedTheme.colors.sections[key as keyof typeof selectedTheme.colors.sections] || selectedTheme.colors.background) + '20' : 'white'
                }}
              />
              
              {/* Citation field for APU format */}
              {format === 'apu' && (
                <div className="mt-3">
                  <div className="flex items-center mb-2">
                    <Quote className="w-3 h-3 mr-1 text-gray-500" />
                    <label className="text-xs font-medium text-gray-600">Citations & References</label>
                  </div>
                  <textarea
                    value={canvas.citations?.[key] || ''}
                    onChange={(e) => onCitationChange(key, e.target.value)}
                    placeholder="Add citations, references, and sources..."
                    className="w-full h-16 p-2 border border-gray-200 rounded-md resize-none text-xs text-gray-600 focus:ring-1 focus:border-blue-300"
                  />
                </div>
              )}
              
              {/* Character count */}
              <div className="text-xs text-gray-500 mt-2 text-right">
                {canvas[key]?.length || 0} characters
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
            Complete all {totalSections - completedSections} remaining sections to generate your final canvas
          </p>
        )}
      </div>
    </div>
  );
};

export default CanvasForm;