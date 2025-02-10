// File: components/EquipmentList.tsx
"use client"

import EquipmentItem from "./EquipmentItem"

const EquipmentList = ({ equipmentData, plantData, onDataChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment Selection</h2>
          <p className="text-gray-500 mt-1">Choose quantities and view calculations for required equipment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(equipmentData).map(([id, data]) => (
          <EquipmentItem
            key={id}
            id={id}
            data={data}
            plantData={plantData}
            onDataChange={onDataChange}
          />
        ))}
      </div>
    </div>
  )
}

export default EquipmentList