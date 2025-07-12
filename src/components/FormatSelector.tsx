import React from 'react';
import { CanvasFormat } from '../types/canvas';
import { BookOpen, Building2 } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: CanvasFormat;
  onFormatChange: (format: CanvasFormat) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ selectedFormat, onFormatChange }) => {
  const formats = [
    {
      id: 'general' as CanvasFormat,
      name: 'General Format',
      description: 'Standard 9-block Business Model Canvas for general business planning',
      icon: Building2,
      features: [
        'Classic 9-section layout',
        'Streamlined input process',
        'Quick canvas generation',
        'Perfect for startups and SMEs'
      ]
    },
    {
      id: 'apu' as CanvasFormat,
      name: 'APU Academic Format',
      description: 'Extended format with detailed justifications and academic requirements',
      icon: BookOpen,
      features: [
        'Extended justification areas',
        'Citation and reference fields',
        'Academic discussion prompts',
        'IP, Technology Transfer, and Regulatory sections',
        'Lean Startup methodology integration'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Canvas Format</h3>
        <p className="text-gray-600">Select the format that best fits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formats.map((format) => {
          const IconComponent = format.icon;
          return (
            <button
              key={format.id}
              onClick={() => onFormatChange(format.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  selectedFormat === format.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    selectedFormat === format.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{format.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{format.description}</p>
                  
                  <ul className="space-y-1">
                    {format.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FormatSelector;