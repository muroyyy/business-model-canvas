import React from 'react';
import { Theme, themes, CanvasFormat } from '../types/canvas';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  selectedFormat: CanvasFormat;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange, selectedFormat }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <Palette className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Choose Your Theme {selectedFormat === 'apu' && '(Academic Format)'}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              selectedTheme.id === theme.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{theme.icon}</div>
              <div className="font-semibold text-gray-800 mb-1">{theme.name}</div>
              <div className="text-xs text-gray-600 mb-3">{theme.description}</div>
              
              {/* Color preview */}
              <div className="flex justify-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;