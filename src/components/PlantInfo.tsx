// File: components/PlantInfo.tsx
import React from "react"

const PlantInfo = ({ plantData, onDataChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    onDataChange({ [name]: name === "type" ? value : Number(value) })
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Plant Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render input fields for each plantData property */}
        {Object.entries(plantData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {key === "type" ? (
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="STP">STP</option>
                <option value="ETP">ETP</option>
              </select>
            ) : (
              <input
                type="number"
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlantInfo