import React, { useRef, useState } from 'react';
import { BusinessModelCanvas, Theme, CanvasFormat } from '../types/canvas';
import { Download, FileImage, FileText, Edit3, Maximize2, Minimize2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CanvasVisualizationProps {
  canvas: BusinessModelCanvas;
  format: CanvasFormat;
  selectedTheme: Theme;
  onEdit: () => void;
  isPreview?: boolean;
}

const CanvasVisualization: React.FC<CanvasVisualizationProps> = ({ 
  canvas, 
  format,
  selectedTheme, 
  onEdit, 
  isPreview = false 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const downloadAsImage = async (imageFormat: 'png' | 'jpeg') => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        width: format === 'apu' ? 2400 : 1920,
        height: format === 'apu' ? 1697 : 1357,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `business-model-canvas-${format}-${selectedTheme.name.toLowerCase()}.${imageFormat}`;
      link.href = canvas.toDataURL(`image/${imageFormat}`, 0.95);
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
      pdf.save(`business-model-canvas-${format}-${selectedTheme.name.toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const sectionStyle = "border-2 p-4 rounded-xl h-full min-h-[120px] transition-all duration-300 hover:shadow-lg";
  const titleStyle = "font-bold text-sm mb-3 uppercase tracking-wide flex items-center";
  const contentStyle = `${format === 'apu' ? 'text-xs' : 'text-sm'} leading-relaxed whitespace-pre-line`;
  const citationStyle = "text-xs text-gray-500 mt-2 italic border-t pt-2";

  const renderSectionContent = (key: keyof BusinessModelCanvas, content: string, citation?: string) => (
    <>
      <div className={contentStyle} style={{ color: selectedTheme.colors.text }}>
        {content || (isPreview ? `Add your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}...` : '')}
      </div>
      {format === 'apu' && citation && (
        <div className={citationStyle}>
          <strong>References:</strong> {citation}
        </div>
      )}
    </>
  );

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white overflow-auto' : 'max-w-7xl mx-auto'} p-6`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: selectedTheme.colors.text }}>
            {isPreview ? 'Canvas Preview' : `Your ${format === 'apu' ? 'APU Academic' : 'General'} Business Model Canvas`}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{selectedTheme.icon}</span>
            <span className="text-gray-600">{selectedTheme.name} Theme • {format.toUpperCase()} Format</span>
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
            {format === 'apu' ? 'APU Academic' : 'General'} Business Model Canvas
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">{selectedTheme.icon}</span>
            <span style={{ color: selectedTheme.colors.text }}>{selectedTheme.name} Theme • {format.toUpperCase()}</span>
          </div>
        </div>
        
        {format === 'general' ? (
          <div className="grid grid-cols-5 grid-rows-3 gap-4 h-full font-bold">
            {/* Key Partnerships */}
            <div 
              className={`${sectionStyle} row-span-2`}
              style={{ 
                backgroundColor: selectedTheme.colors.sections.keyPartnerships,
                borderColor: selectedTheme.colors.primary + '40'
              }}
            >
              <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                Key Partnerships
              </div>
              {renderSectionContent('keyPartnerships', canvas.keyPartnerships, canvas.citations?.keyPartnerships)}
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
                Key Activities
              </div>
              {renderSectionContent('keyActivities', canvas.keyActivities, canvas.citations?.keyActivities)}
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
                Value Proposition
              </div>
              {renderSectionContent('valueProposition', canvas.valueProposition, canvas.citations?.valueProposition)}
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
                Customer Relationships
              </div>
              {renderSectionContent('customerRelationships', canvas.customerRelationships, canvas.citations?.customerRelationships)}
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
                Customer Segments
              </div>
              {renderSectionContent('customerSegments', canvas.customerSegments, canvas.citations?.customerSegments)}
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
                Key Resources
              </div>
              {renderSectionContent('keyResources', canvas.keyResources, canvas.citations?.keyResources)}
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
                Channels
              </div>
              {renderSectionContent('channels', canvas.channels, canvas.citations?.channels)}
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
                Cost Structure
              </div>
              {renderSectionContent('costStructure', canvas.costStructure, canvas.citations?.costStructure)}
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
                Revenue Streams
              </div>
              {renderSectionContent('revenueStreams', canvas.revenueStreams, canvas.citations?.revenueStreams)}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Core Business Model Sections */}
            <div className="grid grid-cols-3 gap-4">
              {/* Key Partnerships */}
              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.keyPartnerships,
                  borderColor: selectedTheme.colors.primary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.keyPartnerships}</span>
                  Key Partnerships
                </div>
                {renderSectionContent('keyPartnerships', canvas.keyPartnerships, canvas.citations?.keyPartnerships)}
              </div>

              {/* Value Proposition */}
              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.valueProposition,
                  borderColor: selectedTheme.colors.accent + '60'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.valueProposition}</span>
                  Value Proposition
                </div>
                {renderSectionContent('valueProposition', canvas.valueProposition, canvas.citations?.valueProposition)}
              </div>

              {/* Customer Segments */}
              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.customerSegments,
                  borderColor: selectedTheme.colors.secondary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.customerSegments}</span>
                  Customer Segments
                </div>
                {renderSectionContent('customerSegments', canvas.customerSegments, canvas.citations?.customerSegments)}
              </div>
            </div>

            {/* Activities, Resources, Channels, Relationships */}
            <div className="grid grid-cols-4 gap-4">
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
                {renderSectionContent('keyActivities', canvas.keyActivities, canvas.citations?.keyActivities)}
              </div>

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
                {renderSectionContent('keyResources', canvas.keyResources, canvas.citations?.keyResources)}
              </div>

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
                {renderSectionContent('channels', canvas.channels, canvas.citations?.channels)}
              </div>

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
                {renderSectionContent('customerRelationships', canvas.customerRelationships, canvas.citations?.customerRelationships)}
              </div>
            </div>

            {/* APU-Specific Sections */}
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.ipProtection,
                  borderColor: selectedTheme.colors.primary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.ipProtection}</span>
                  IP Protection
                </div>
                {renderSectionContent('ipProtection', canvas.ipProtection || '', canvas.citations?.ipProtection)}
              </div>

              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.technologyTransfer,
                  borderColor: selectedTheme.colors.secondary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.technologyTransfer}</span>
                  Technology Transfer
                </div>
                {renderSectionContent('technologyTransfer', canvas.technologyTransfer || '', canvas.citations?.technologyTransfer)}
              </div>

              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.regulatoryRequirements,
                  borderColor: selectedTheme.colors.accent + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.regulatoryRequirements}</span>
                  Regulatory Requirements
                </div>
                {renderSectionContent('regulatoryRequirements', canvas.regulatoryRequirements || '', canvas.citations?.regulatoryRequirements)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.leanStartup,
                  borderColor: selectedTheme.colors.primary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.leanStartup}</span>
                  Lean Startup
                </div>
                {renderSectionContent('leanStartup', canvas.leanStartup || '', canvas.citations?.leanStartup)}
              </div>

              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.marketPresence,
                  borderColor: selectedTheme.colors.secondary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.marketPresence}</span>
                  Market Presence
                </div>
                {renderSectionContent('marketPresence', canvas.marketPresence || '', canvas.citations?.marketPresence)}
              </div>

              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.organizationalCulture,
                  borderColor: selectedTheme.colors.accent + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.organizationalCulture}</span>
                  Organizational Culture
                </div>
                {renderSectionContent('organizationalCulture', canvas.organizationalCulture || '', canvas.citations?.organizationalCulture)}
              </div>
            </div>

            {/* Cost Structure and Revenue Streams */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.costStructure,
                  borderColor: selectedTheme.colors.secondary + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.costStructure}</span>
                  Cost Structure
                </div>
                {renderSectionContent('costStructure', canvas.costStructure, canvas.citations?.costStructure)}
              </div>

              <div 
                className={sectionStyle}
                style={{ 
                  backgroundColor: selectedTheme.colors.sections.revenueStreams,
                  borderColor: selectedTheme.colors.accent + '40'
                }}
              >
                <div className={titleStyle} style={{ color: selectedTheme.colors.text }}>
                  <span className="mr-2">{sectionIcons.revenueStreams}</span>
                  Revenue Streams
                </div>
                {renderSectionContent('revenueStreams', canvas.revenueStreams, canvas.citations?.revenueStreams)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasVisualization;