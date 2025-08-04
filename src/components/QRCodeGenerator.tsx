import React, { useState, useRef } from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';
import QRCodeLib from 'qrcode';

interface QRCodeGeneratorProps {
  calculatedPrice: number | null;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ calculatedPrice }) => {
  const [qrCodeData, setQrCodeData] = useState('');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    let dataToEncode = customText;
    
    if (!customText && calculatedPrice) {
      dataToEncode = `Mobile Price: $${calculatedPrice.toLocaleString()}`;
    } else if (!customText && !calculatedPrice) {
      dataToEncode = 'Mobile Price Wizard - Calculate device prices instantly!';
    }

    if (!dataToEncode) {
      alert('Please enter text or calculate a price first');
      return;
    }

    try {
      const qrCodeDataURL = await QRCodeLib.toDataURL(dataToEncode, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      
      setGeneratedQR(qrCodeDataURL);
      setQrCodeData(dataToEncode);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code');
    }
  };

  const downloadQRCode = () => {
    if (!generatedQR) return;

    const link = document.createElement('a');
    link.download = 'mobile-price-qr.png';
    link.href = generatedQR;
    link.click();
  };

  const shareQRCode = async () => {
    if (!generatedQR) return;

    try {
      // Convert data URL to blob
      const response = await fetch(generatedQR);
      const blob = await response.blob();
      
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'mobile-price-qr.png', { type: 'image/png' });
        await navigator.share({
          title: 'Mobile Price QR Code',
          text: qrCodeData,
          files: [file]
        });
      } else {
        // Fallback to copying the data URL
        await navigator.clipboard.writeText(qrCodeData);
        alert('QR code data copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing QR code:', error);
      alert('Error sharing QR code');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <QrCode className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-card-foreground">QR Code Generator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Custom Text (Optional)
            </label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter custom text for QR code, or leave empty to use calculated price..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {calculatedPrice && (
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h3 className="font-medium text-card-foreground mb-2">Current Calculated Price:</h3>
              <p className="text-2xl font-bold text-primary">${calculatedPrice.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">
                This price will be used if no custom text is provided
              </p>
            </div>
          )}

          <button
            onClick={generateQRCode}
            className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <QrCode className="h-5 w-5" />
            Generate QR Code
          </button>
        </div>

        <div className="space-y-4">
          {generatedQR ? (
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg border border-border inline-block">
                <img
                  src={generatedQR}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">QR Code contains:</p>
                <p className="break-words">{qrCodeData}</p>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  onClick={shareQRCode}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">QR code will appear here after generation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;