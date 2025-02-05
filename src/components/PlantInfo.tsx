import type React from "react"
import type { PlantData } from "../types/plant"

interface PlantInfoProps {
  plantData: PlantData
  onDataChange: (newData: Partial<PlantData>) => void
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantData, onDataChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onDataChange({ [name]: name === "type" ? value : Number(value) })
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Plant Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Plant Type
          </label>
          <select
            id="type"
            name="type"
            value={plantData.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="STP">STP</option>
            <option value="ETP">ETP</option>
          </select>
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
            Capacity (KLD)
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={plantData.capacity}
            onChange={handleInputChange}
            min="0"
            step="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="BOD" className="block text-sm font-medium text-gray-700 mb-1">
            BOD (mg/L)
          </label>
          <input
            type="number"
            id="BOD"
            name="BOD"
            value={plantData.BOD}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="COD" className="block text-sm font-medium text-gray-700 mb-1">
            COD (mg/L)
          </label>
          <input
            type="number"
            id="COD"
            name="COD"
            value={plantData.COD}
            onChange={handleInputChange}
            min="0"
            step="10"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="pH" className="block text-sm font-medium text-gray-700 mb-1">
            pH
          </label>
          <input
            type="number"
            id="pH"
            name="pH"
            value={plantData.pH}
            onChange={handleInputChange}
            min="0"
            step="0.1"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="TSS" className="block text-sm font-medium text-gray-700 mb-1">
            TSS (mg/L)
          </label>
          <input
            type="number"
            id="TSS"
            name="TSS"
            value={plantData.TSS}
            onChange={handleInputChange}
            min="0"
            step="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="OilGrease" className="block text-sm font-medium text-gray-700 mb-1">
            Oil & Grease (mg/L)
          </label>
          <input
            type="number"
            id="OilGrease"
            name="OilGrease"
            value={plantData.OilGrease}
            onChange={handleInputChange}
            min="0"
            step="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="Nitrogen" className="block text-sm font-medium text-gray-700 mb-1">
            Nitrogen (mg/L)
          </label>
          <input
            type="number"
            id="Nitrogen"
            name="Nitrogen"
            value={plantData.Nitrogen}
            onChange={handleInputChange}
            min="0"
            step="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

export default PlantInfo

