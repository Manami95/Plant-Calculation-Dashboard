import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { Download } from 'lucide-react';

interface PDFDownloadButtonProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  plantData: {
    type: string;
    capacity: number;
    BOD: number;
    COD: number;
    pH: number;
    TSS: number;
    OilGrease: number;
    Nitrogen: number;
  };
  equipmentData: Record<string, any>;
  totalCost: number;
}

const PDFDownloadButton = ({ userData, plantData, equipmentData, totalCost }: PDFDownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <PDFDocument
          userData={userData}
          plantData={plantData}
          equipmentData={equipmentData}
          totalCost={totalCost}
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `plant-price-calculator-${userData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors duration-200"
    >
      <Download className="w-5 h-5 mr-2" />
      {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
    </button>
  );
};

export default PDFDownloadButton;
