import React, { useState } from 'react';
import { Calculator, Smartphone } from 'lucide-react';

interface PriceCalculatorProps {
  onPriceCalculated: (price: number) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onPriceCalculated }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    storage: '',
    condition: '',
    age: ''
  });

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const conditionOptions = [
    { value: 'excellent', label: 'Excellent', multiplier: 1.0 },
    { value: 'good', label: 'Good', multiplier: 0.8 },
    { value: 'fair', label: 'Fair', multiplier: 0.6 },
    { value: 'poor', label: 'Poor', multiplier: 0.4 }
  ];
  const ageOptions = [
    { value: 'new', label: 'Brand New', multiplier: 1.0 },
    { value: '6months', label: '0-6 months', multiplier: 0.9 },
    { value: '1year', label: '6-12 months', multiplier: 0.75 },
    { value: '2years', label: '1-2 years', multiplier: 0.6 },
    { value: '3years', label: '2+ years', multiplier: 0.4 }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    const { brand, model, storage, condition, age } = formData;
    
    if (!brand || !model || !storage || !condition || !age) {
      alert('Please fill in all fields');
      return;
    }

    // Base price calculation logic
    let basePrice = 500; // Default base price

    // Brand multipliers
    const brandMultipliers: { [key: string]: number } = {
      'Apple': 1.5,
      'Samsung': 1.2,
      'Google': 1.1,
      'OnePlus': 1.0,
      'Xiaomi': 0.8,
      'Huawei': 0.9,
      'Sony': 1.0,
      'LG': 0.7
    };

    // Storage multipliers
    const storageMultipliers: { [key: string]: number } = {
      '64GB': 1.0,
      '128GB': 1.2,
      '256GB': 1.5,
      '512GB': 1.8,
      '1TB': 2.2
    };

    basePrice *= brandMultipliers[brand] || 1.0;
    basePrice *= storageMultipliers[storage] || 1.0;

    const conditionMultiplier = conditionOptions.find(c => c.value === condition)?.multiplier || 1.0;
    const ageMultiplier = ageOptions.find(a => a.value === age)?.multiplier || 1.0;

    const finalPrice = Math.round(basePrice * conditionMultiplier * ageMultiplier);
    
    setCalculatedPrice(finalPrice);
    onPriceCalculated(finalPrice);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-card-foreground">Price Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Brand
            </label>
            <select
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="Enter model name"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Storage
            </label>
            <select
              value={formData.storage}
              onChange={(e) => handleInputChange('storage', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Storage</option>
              {storageOptions.map(storage => (
                <option key={storage} value={storage}>{storage}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Condition
            </label>
            <select
              value={formData.condition}
              onChange={(e) => handleInputChange('condition', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Condition</option>
              {conditionOptions.map(condition => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Age
            </label>
            <select
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Age</option>
              {ageOptions.map(age => (
                <option key={age.value} value={age.value}>
                  {age.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculatePrice}
            className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            Calculate Price
          </button>
        </div>
      </div>

      {calculatedPrice !== null && (
        <div className="mt-6 p-6 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Estimated Price
              </h3>
              <p className="text-3xl font-bold text-primary">
                ${calculatedPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            This is an estimated price based on current market conditions and device specifications.
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;