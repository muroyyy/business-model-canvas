import React, { useState } from 'react';
import FormatSelector from './components/FormatSelector';
import CanvasForm from './components/CanvasForm';
import { CanvasVisualization } from './components/CanvasVisualization';
import ThemeSelector from './components/ThemeSelector';
import { BusinessModelCanvas, initialCanvas, themes, Theme, CanvasFormat } from './types/canvas';
import { ArrowLeft, Sparkles } from 'lucide-react';

type ViewMode = 'format' | 'form' | 'preview' | 'final';

function App() {
  const [canvas, setCanvas] = useState<BusinessModelCanvas>(initialCanvas);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [selectedFormat, setSelectedFormat] = useState<CanvasFormat>('general');
  const [viewMode, setViewMode] = useState<ViewMode>('format');

  const handleCanvasChange = (field: keyof BusinessModelCanvas, value: string) => {
    setCanvas(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCitationChange = (field: keyof BusinessModelCanvas, value: string) => {
    setCanvas(prev => ({
      ...prev,
      citations: {
        ...prev.citations,
        [field]: value
      }
    }));
  };

  const handleFormatChange = (format: CanvasFormat) => {
    setSelectedFormat(format);
    setViewMode('form');
  };

  const handlePreview = () => {
    setViewMode('preview');
  };

  const handleGenerate = () => {
    setViewMode('final');
  };

  const handleEdit = () => {
    setViewMode(viewMode === 'format' ? 'format' : 'form');
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
      {viewMode === 'format' && (
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
              style={{ backgroundColor: selectedTheme.colors.primary }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4" style={{ color: selectedTheme.colors.text }}>
              Business Model Canvas Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose between General format for quick business planning or APU Academic format 
              for detailed analysis with citations and justifications
            </p>
          </div>
          
          <FormatSelector 
            selectedFormat={selectedFormat}
            onFormatChange={handleFormatChange}
          />
        </div>
      )}

      {viewMode === 'form' && (
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <button
              onClick={() => setViewMode('format')}
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Change Format
            </button>
          </div>
          
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
              style={{ backgroundColor: selectedTheme.colors.primary }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4" style={{ color: selectedTheme.colors.text }}>
              {selectedFormat === 'apu' ? 'APU Academic' : 'General'} Business Model Canvas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {selectedFormat === 'apu' 
                ? 'Create detailed academic business model with comprehensive justifications and citations'
                : 'Create stunning, professional business model canvases with interactive guidance and beautiful themes'
              }
            </p>
          </div>
          
          <ThemeSelector 
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
            selectedFormat={selectedFormat}
          />
          
          <CanvasForm 
            canvas={canvas}
            format={selectedFormat}
            onChange={handleCanvasChange}
            onCitationChange={handleCitationChange}
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
              Back to {viewMode === 'preview' ? 'Form' : 'Form'}
            </button>
          </div>
          
          <CanvasVisualization 
            canvas={canvas}
            format={selectedFormat}
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