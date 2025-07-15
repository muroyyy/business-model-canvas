import React from 'react';
import { Download, Maximize2, Edit3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CanvasData, Theme, CanvasFormat } from '../types/canvas';

interface CanvasVisualizationProps {
  data: CanvasData;
  theme: Theme;
  format: CanvasFormat;
  onEdit: () => void;
  isPreview?: boolean; 
}

export const CanvasVisualization: React.FC<CanvasVisualizationProps> = ({
  data,
  theme,
  format,
  onEdit,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  // Helper function to format text with proper line breaks for bullet points
  const formatTextContent = (text: string) => {
    if (!text) return text;
    
    // Split by common bullet point patterns and join with line breaks
    const bulletPatterns = [
      /\s*[-•·*]\s*/g,  // Dash, bullet, middle dot, asterisk
      /\s*\d+\.\s*/g,   // Numbered lists (1. 2. 3.)
      /\s*[a-zA-Z]\.\s*/g, // Lettered lists (a. b. c.)
    ];
    
    let formattedText = text;
    
    // Process each bullet pattern
    bulletPatterns.forEach(pattern => {
      const parts = formattedText.split(pattern);
      if (parts.length > 1) {
        // Rejoin with line breaks, keeping the bullet markers
        const matches = formattedText.match(pattern) || [];
        formattedText = parts[0]; // First part (before any bullets)
        
        for (let i = 1; i < parts.length; i++) {
          const bullet = matches[i - 1] || '• ';
          formattedText += '\n' + bullet.trim() + ' ' + parts[i].trim();
        }
      }
    });
    
    return formattedText;
  };

  const renderCanvasSection = (
    key: string,
    title: string,
    content: string,
    placeholder: string,
    icon: string,
    className: string = ''
  ) => (
    <div key={key} className={`p-4 rounded-lg border-2 ${className}`} style={{ 
      backgroundColor: theme.colors.cardBg,
      borderColor: theme.colors.border 
    }}>
      <div className="text-xs font-medium mb-2 flex items-center" style={{ color: theme.colors.text }}>
        <span className="mr-1">{icon}</span>
        {title}
      </div>
      <div className="text-xs leading-relaxed whitespace-pre-line" style={{ color: theme.colors.text }}>
        {content ? formatTextContent(content) : placeholder}
      </div>
      {format === 'apu' && data.citations?.[key as keyof typeof data.citations] && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Citations:</div>
          <div className="text-xs text-gray-600 italic whitespace-pre-line">
            {formatTextContent(data.citations[key as keyof typeof data.citations] || '')}
          </div>
        </div>
      )}
    </div>
  );

  const exportCanvas = async (format: 'png' | 'jpeg' | 'pdf') => {
    if (!canvasRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1190,
        height: 842,
      });

      if (format === 'pdf') {
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
        pdf.save(`business-model-canvas-${theme.name.toLowerCase()}-${data.format}.pdf`);
      } else {
        const link = document.createElement('a');
        link.download = `business-model-canvas-${theme.name.toLowerCase()}-${data.format}.${format}`;
        link.href = canvas.toDataURL(`image/${format}`, 0.95);
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const canvasContent = (
    <div className="w-full max-w-[1190px] mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.colors.text }}>
          {format === 'apu' ? 'APU Academic Business Model Canvas' : 'Business Model Canvas'}
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: theme.colors.text }}>
          <span style={{ color: theme.colors.primary }}>🎨</span>
          <span>{theme.name} Theme • {format.toUpperCase()}</span>
        </div>
      </div>

      {/* Canvas Grid */}
      {format === 'general' ? (
        <div className="grid grid-cols-5 gap-3 h-[600px]">
          {/* Row 1 */}
          <div className="col-span-1">
            {renderCanvasSection('keyPartnerships', 'KEY PARTNERSHIPS', data.keyPartnerships, 'Add your key partnerships...', '🤝', 'h-full')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('keyActivities', 'KEY ACTIVITIES', data.keyActivities, 'Add your key activities...', '⚡', 'h-full')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('valueProposition', 'VALUE PROPOSITION', data.valueProposition, 'Add your value proposition...', '💎', 'h-full')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('customerRelationships', 'CUSTOMER RELATIONSHIPS', data.customerRelationships, 'Add your customer relationships...', '💝', 'h-full')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('customerSegments', 'CUSTOMER SEGMENTS', data.customerSegments, 'Add your customer segments...', '👥', 'h-full')}
          </div>

          {/* Row 2 */}
          <div className="col-span-1">
            {renderCanvasSection('keyResources', 'KEY RESOURCES', data.keyResources, 'Add your key resources...', '🎯', 'h-full')}
          </div>
          <div className="col-span-2">
            {renderCanvasSection('channels', 'CHANNELS', data.channels, 'Add your channels...', '📡', 'h-full')}
          </div>
          <div className="col-span-2">
            {renderCanvasSection('costStructure', 'COST STRUCTURE', data.costStructure, 'Add your cost structure...', '💰', 'h-full')}
          </div>

          {/* Row 3 */}
          <div className="col-span-3">
            {renderCanvasSection('revenueStreams', 'REVENUE STREAMS', data.revenueStreams, 'Add your revenue streams...', '💵', 'h-full')}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          {/* APU Format - Row 1 */}
          <div className="col-span-1">
            {renderCanvasSection('keyPartnerships', 'KEY PARTNERSHIPS', data.keyPartnerships, 'Add your key partnerships...', '🤝')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('valueProposition', 'VALUE PROPOSITION', data.valueProposition, 'Add your value proposition...', '💎')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('customerSegments', 'CUSTOMER SEGMENTS', data.customerSegments, 'Add your customer segments...', '👥')}
          </div>

          {/* APU Format - Row 2 */}
          <div className="col-span-1">
            {renderCanvasSection('keyActivities', 'KEY ACTIVITIES', data.keyActivities, 'Add your key activities...', '⚡')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('keyResources', 'KEY RESOURCES', data.keyResources, 'Add your key resources...', '🎯')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('channels', 'CHANNELS', data.channels, 'Add your channels...', '📡')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('customerRelationships', 'CUSTOMER RELATIONSHIPS', data.customerRelationships, 'Add your customer relationships...', '💝')}
          </div>

          {/* APU Format - Row 3 */}
          <div className="col-span-2">
            {renderCanvasSection('costStructure', 'COST STRUCTURE', data.costStructure, 'Add your cost structure...', '💰')}
          </div>
          <div className="col-span-2">
            {renderCanvasSection('revenueStreams', 'REVENUE STREAMS', data.revenueStreams, 'Add your revenue streams...', '💵')}
          </div>

          {/* APU Format - Additional Sections */}
          <div className="col-span-1">
            {renderCanvasSection('ipProtection', 'IP PROTECTION', data.ipProtection || '', 'Add IP protection details...', '🛡️')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('technologyTransfer', 'TECHNOLOGY TRANSFER', data.technologyTransfer || '', 'Add technology transfer details...', '🔄')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('regulatoryRequirements', 'REGULATORY REQUIREMENTS', data.regulatoryRequirements || '', 'Add regulatory requirements...', '📋')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('leanStartup', 'LEAN STARTUP', data.leanStartup || '', 'Add lean startup approach...', '🚀')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('marketPresence', 'MARKET PRESENCE', data.marketPresence || '', 'Add market presence strategy...', '🌍')}
          </div>
          <div className="col-span-1">
            {renderCanvasSection('organizationalCulture', 'ORGANIZATIONAL CULTURE', data.organizationalCulture || '', 'Add organizational culture...', '🏢')}
          </div>
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Canvas Preview - Fullscreen</h2>
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Exit Fullscreen
            </button>
          </div>
          <div ref={canvasRef} className="bg-white p-8">
            {canvasContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Canvas Preview</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <span style={{ color: theme.colors.primary }}>🎨</span>
            {theme.name} Theme • {format.toUpperCase()} Format
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Maximize2 size={16} />
            Fullscreen
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Edit3 size={16} />
            Edit Canvas
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div ref={canvasRef} className="bg-white p-8 rounded-lg shadow-lg">
        {canvasContent}
      </div>

      {/* Export Options */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => exportCanvas('png')}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
        >
          <Download size={16} />
          {isExporting ? 'Exporting...' : 'Download PNG'}
        </button>
        <button
          onClick={() => exportCanvas('jpeg')}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
        >
          <Download size={16} />
          {isExporting ? 'Exporting...' : 'Download JPEG'}
        </button>
        <button
          onClick={() => exportCanvas('pdf')}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
        >
          <Download size={16} />
          {isExporting ? 'Exporting...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
};