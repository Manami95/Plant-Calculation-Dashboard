"use client";

import type React from "react"
import { Droplet, ThermometerSun, Activity, Minimize2 } from "lucide-react"

interface PlantData {
  type: string
  capacity: number
  BOD: number
  COD: number
  pH: number
  TSS: number
  OilGrease: number
  Nitrogen: number
}

interface PlantInfoProps {
  plantData: PlantData
  onDataChange: (newData: Partial<PlantData>) => void
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantData, onDataChange }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Plant Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="plant-type" className="block text-sm font-medium text-gray-700 mb-1">
            Plant Type
          </label>
          <select
            id="plant-type"
            value={plantData.type}
            onChange={(e) => onDataChange({ type: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="STP">STP</option>
            <option value="ETP">ETP</option>
          </select>
        </div>
        <div>
          <label htmlFor="plant-capacity" className="block text-sm font-medium text-gray-700 mb-1">
            Plant Capacity (KLD)
          </label>
          <select
            id="plant-capacity"
            value={plantData.capacity}
            onChange={(e) => onDataChange({ capacity: Number(e.target.value) })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {[5, 10, 20, 40, 50, 75, 100].map((capacity) => (
              <option key={capacity} value={capacity}>
                {capacity} KLD
              </option>
            ))}
          </select>
        </div>
        {(["BOD", "COD", "pH", "TSS", "OilGrease", "Nitrogen"] as const).map((param) => (
          <div key={param}>
            <label htmlFor={param} className="block text-sm font-medium text-gray-700 mb-1">
              {param} (ppm)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {param === "BOD" && <Droplet className="h-5 w-5 text-gray-400" />}
                {param === "COD" && <ThermometerSun className="h-5 w-5 text-gray-400" />}
                {param === "pH" && <Activity className="h-5 w-5 text-gray-400" />}
                {param === "TSS" && <Minimize2 className="h-5 w-5 text-gray-400" />}
                {param === "OilGrease" && <Droplet className="h-5 w-5 text-gray-400" />}
                {param === "Nitrogen" && <Droplet className="h-5 w-5 text-gray-400" />}
              </div>
              <input
                type="number"
                id={param}
                value={plantData[param]}
                onChange={(e) => onDataChange({ [param]: Number(e.target.value) })}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlantInfo

