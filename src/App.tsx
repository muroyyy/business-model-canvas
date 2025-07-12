import React, { useState } from 'react';
import CanvasForm from './components/CanvasForm';
import CanvasVisualization from './components/CanvasVisualization';
import ThemeSelector from './components/ThemeSelector';
import { BusinessModelCanvas, initialCanvas, themes, Theme } from './types/canvas';
import { ArrowLeft, Sparkles } from 'lucide-react';

type ViewMode = 'form' | 'preview' | 'final';

function App() {
  const [canvas, setCanvas] = useState<BusinessModelCanvas>(initialCanvas);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('form');

  const handleCanvasChange = (field: keyof BusinessModelCanvas, value: string) => {
    setCanvas(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreview = () => {
    setViewMode('preview');
  };

  const handleGenerate = () => {
    setViewMode('final');
  };

  const handleEdit = () => {
    setViewMode('form');
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, ${selectedTheme.colors.background} 0%, ${selectedTheme.colors.primary}10 100%)`
      }}
    >
      {viewMode === 'form' && (
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
              style={{ backgroundColor: selectedTheme.colors.primary }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4" style={{ color: selectedTheme.colors.text }}>
              Business Model Canvas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create stunning, professional business model canvases with interactive guidance, 
              beautiful themes, and export capabilities
            </p>
          </div>
          
          <ThemeSelector 
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
          />
          
          <CanvasForm 
            canvas={canvas}
            onChange={handleCanvasChange}
            onGenerate={handleGenerate}
            onPreview={handlePreview}
            selectedTheme={selectedTheme}
          />
        </div>
      )}

      {(viewMode === 'preview' || viewMode === 'final') && (
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </button>
          </div>
          
          <CanvasVisualization 
            canvas={canvas}
            selectedTheme={selectedTheme}
            onEdit={handleEdit}
            isPreview={viewMode === 'preview'}
          />
        </div>
      )}
    </div>
  );
}

export default App;