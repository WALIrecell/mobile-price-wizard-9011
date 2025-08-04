import React, { useState } from 'react';
import { Smartphone, QrCode, DollarSign, Zap } from 'lucide-react';
import PriceCalculator from './PriceCalculator';
import QRCodeGenerator from './QRCodeGenerator';

const MobilePriceWizard = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smartphone className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Mobile Price Wizard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Calculate mobile device prices and generate QR codes instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                  activeTab === 'calculator'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                Price Calculator
              </button>
              <button
                onClick={() => setActiveTab('qr')}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                  activeTab === 'qr'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <QrCode className="h-5 w-5" />
                QR Code Generator
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'calculator' && (
                <PriceCalculator onPriceCalculated={setCalculatedPrice} />
              )}
              {activeTab === 'qr' && (
                <QRCodeGenerator calculatedPrice={calculatedPrice} />
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Quick Calculation
              </h3>
              <p className="text-muted-foreground">
                Get instant price estimates based on device specifications
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                QR Code Generation
              </h3>
              <p className="text-muted-foreground">
                Generate QR codes for easy price sharing and verification
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Mobile Optimized
              </h3>
              <p className="text-muted-foreground">
                Fully responsive design works perfectly on all devices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePriceWizard;