"use client";

import type React from "react"
import { DollarSign } from "lucide-react"
import dynamic from "next/dynamic"

const PDFDownloadButton = dynamic(() => import("./PDFDownloadButton"), {
  ssr: false,
  loading: () => <p>Loading PDF generator...</p>,
})

interface TotalCostProps {
  totalCost: number
  userData: any
  plantData: any
  equipmentData: any
}

const TotalCost: React.FC<TotalCostProps> = ({ totalCost, userData, plantData, equipmentData }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Total Cost Summary</h2>
        <PDFDownloadButton
          userData={userData}
          plantData={plantData}
          equipmentData={equipmentData}
          totalCost={totalCost}
        />
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-medium text-gray-600">Total Equipment Cost</p>
            <p className="text-sm text-gray-500">Including all selected items</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 p-3 rounded-lg mr-4">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">₹{totalCost.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalCost

