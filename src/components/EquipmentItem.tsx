"use client";

import { Box, Hash, DollarSign } from "lucide-react";

const EquipmentItem = ({ id, data, onDataChange }) => {
  const handleQuantityChange = (e) => {
    let value = e.target.value;
    let newQuantity = id === "mbbr-media" ? parseFloat(value) : parseInt(value, 10);

    // Allow empty input for smooth user input handling
    if (value === "") {
      onDataChange(id, "");
      return;
    }

    // Ensure valid non-negative number
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onDataChange(id, newQuantity);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
        <div className="bg-blue-100 p-2 rounded-lg">
          <Box className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {/* Capacity Display */}
      {data.capacity !== undefined && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Capacity (M³/HR)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Box className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={data.capacity?.toFixed(2) || "N/A"}
              readOnly
              className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700"
            />
          </div>
        </div>
      )}

      {/* Quantity Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Hash className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="number"
            value={data.quantity || ""}
            onChange={handleQuantityChange}
            min="0"
            step={id === "mbbr-media" ? "0.1" : "1"}
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Total Price Display */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Total Price (₹)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={data.totalPrice?.toLocaleString() || "0"}
            readOnly
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentItem;
