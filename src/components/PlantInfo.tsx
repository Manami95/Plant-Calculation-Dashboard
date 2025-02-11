// File: components/PlantInfo.tsx
"use client";

import React from "react";
import { Box } from "lucide-react";

interface PlantData {
  type: "STP" | "ETP";
  capacity: number;
  BOD: number;
  COD: number;
  TSS: number;
  pH: number;
  OilGrease: number;
  Nitrogen: number;
  PeakFlow: number;
}

interface PlantInfoProps {
  plantData: PlantData;
  onDataChange: (field: string, value: number | string) => void;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantData, onDataChange }) => {
  const fields = [
    { name: "Capacity", key: "capacity", unit: "m³/day" },
    { name: "BOD", key: "BOD", unit: "mg/L" },
    { name: "COD", key: "COD", unit: "mg/L" },
    { name: "TSS", key: "TSS", unit: "mg/L" },
    { name: "pH", key: "pH", unit: "" },
    { name: "Oil & Grease", key: "OilGrease", unit: "mg/L" },
    { name: "Nitrogen", key: "Nitrogen", unit: "mg/L" },
    { name: "Peak Flow", key: "PeakFlow", unit: "m³/hr" },
  ] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    onDataChange({
      ...plantData,
      [name]: numValue
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Plant Parameters</h2>

      {/* Plant Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plant Type
        </label>
        <select
          value={plantData.type}
          onChange={(e) => onDataChange("type", e.target.value)}
          className="block w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="STP">STP (Sewage Treatment Plant)</option>
          <option value="ETP">ETP (Effluent Treatment Plant)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Capacity (m³/day)</label>
          <input
            type="number"
            name="capacity"
            value={plantData.capacity || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {fields.map(({ name, key, unit }) => (
          <div
            key={key}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Box className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name={key}
                value={plantData[key] || ''}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${name.toLowerCase()}`}
                min="0"
                step="any"
              />
              {unit && (
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantInfo;