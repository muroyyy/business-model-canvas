import React, { useRef, useState } from 'react';
import { BusinessModelCanvas, Theme } from '../types/canvas';
import { Download, FileImage, FileText, Edit3, Maximize2, Minimize2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CanvasVisualizationProps {
  canvas: BusinessModelCanvas;
  selectedTheme: Theme;
  onEdit: () => void;
  isPreview?: boolean;
}

const CanvasVisualization: React.FC<CanvasVisualizationProps> = ({ 
  canvas, 
  selectedTheme, 
  onEdit, 
  isPreview = false 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const downloadAsImage = async (format: 'png' | 'jpeg') => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        width: 1920,
        height: 1357,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `business-model-canvas-${selectedTheme.name.toLowerCase()}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, 0.95);
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const downloadAsPDF = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`business-model-canvas-${selectedTheme.name.toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const sectionStyle = "border-2 p-4 rounded-xl h-full min-h-[120px] transition-all duration-300 hover:shadow-lg";
  const titleStyle = "font-bold text-sm mb-3 uppercase tracking-wide flex items-center";
  const contentStyle = "text-sm leading-relaxed";

  const sectionIcons = {
    keyPartnerships: '🤝',
    keyActivities: '⚡',
    keyResources: '🎯',
    valueProposition: '💎',
    customerRelationships: '❤️',
    channels: '📢',
    customerSegments: '👥',
    costStructure: '💰',
    revenueStreams: '💵'
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : 'max-w-7xl mx-auto'} p-6`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: selectedTheme.colors.text }}>
            {isPreview ? 'Canvas Preview' : 'Your Business Model Canvas'}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{selectedTheme.icon}</span>
            <span className="text-gray-600">{selectedTheme.name} Theme</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          
          <button
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Canvas
          </button>
          
          {!isPreview && (
            <div className="flex space-x-2">
              <button
                onClick={() => downloadAsImage('png')}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <FileImage className="w-4 h-4 mr-2" />
                PNG
              </button>
              <button
                onClick={() => downloadAsImage('jpeg')}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4 mr-2" />
                JPEG
              </button>
              <button
                onClick={downloadAsPDF}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {isExporting && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800 text-sm">Generating high-quality export...</span>
          </div>
        </div>
      )}

      <div 
        ref={canvasRef}
        className="rounded-2xl shadow-2xl p-8"
        style={{ 
          backgroundColor: selectedTheme.colors.background,
          aspectRatio: '1.414', 
          maxWidth: '100%' 
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: selectedTheme.colors.text }}>
            Business Model Canvas
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">{selectedTheme.icon}</span>
            <span style={{ color: selectedTheme.colors.text }}>{selectedTheme.name} Theme</span>
          </div>
        </div>
        
        <div className="grid grid-cols-5 grid-rows-3 gap-4 h-full">
          {/* Key Partnerships */}
          <div 
            className={`${sectionStyle} row-span-2`}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.keyPartnerships,
              borderColor: selectedTheme.colors.primary + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.keyPartnerships}</span>
              Key Partnerships
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.keyPartnerships || (isPreview ? 'Add your key partnerships...' : '')}
            </div>
          </div>

          {/* Key Activities */}
          <div 
            className={sectionStyle}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.keyActivities,
              borderColor: selectedTheme.colors.secondary + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.keyActivities}</span>
              Key Activities
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.keyActivities || (isPreview ? 'Add your key activities...' : '')}
            </div>
          </div>

          {/* Value Proposition */}
          <div 
            className={`${sectionStyle} row-span-2`}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.valueProposition,
              borderColor: selectedTheme.colors.accent + '60'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.valueProposition}</span>
              Value Proposition
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.valueProposition || (isPreview ? 'Add your value proposition...' : '')}
            </div>
          </div>

          {/* Customer Relationships */}
          <div 
            className={sectionStyle}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.customerRelationships,
              borderColor: selectedTheme.colors.primary + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.customerRelationships}</span>
              Customer Relationships
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.customerRelationships || (isPreview ? 'Add customer relationships...' : '')}
            </div>
          </div>

          {/* Customer Segments */}
          <div 
            className={`${sectionStyle} row-span-2`}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.customerSegments,
              borderColor: selectedTheme.colors.secondary + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.customerSegments}</span>
              Customer Segments
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.customerSegments || (isPreview ? 'Add customer segments...' : '')}
            </div>
          </div>

          {/* Key Resources */}
          <div 
            className={sectionStyle}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.keyResources,
              borderColor: selectedTheme.colors.accent + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.keyResources}</span>
              Key Resources
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.keyResources || (isPreview ? 'Add key resources...' : '')}
            </div>
          </div>

          {/* Channels */}
          <div 
            className={sectionStyle}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.channels,
              borderColor: selectedTheme.colors.primary + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.channels}</span>
              Channels
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.channels || (isPreview ? 'Add your channels...' : '')}
            </div>
          </div>

          {/* Cost Structure */}
          <div 
            className={`${sectionStyle} col-span-2`}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.costStructure,
              borderColor: selectedTheme.colors.secondary + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.costStructure}</span>
              Cost Structure
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.costStructure || (isPreview ? 'Add your cost structure...' : '')}
            </div>
          </div>

          {/* Revenue Streams */}
          <div 
            className={`${sectionStyle} col-span-3`}
            style={{ 
              backgroundColor: selectedTheme.colors.sections.revenueStreams,
              borderColor: selectedTheme.colors.accent + '40'
            }}
          >
            <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
              <span className="mr-2">{sectionIcons.revenueStreams}</span>
              Revenue Streams
            </div>
            <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
              {canvas.revenueStreams || (isPreview ? 'Add revenue streams...' : '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasVisualization;