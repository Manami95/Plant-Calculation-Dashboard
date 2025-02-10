"use client"

import type React from "react"
import { useState } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PDFDocument from "./PDFDocument"

interface PDFDownloadButtonProps {
  userData: any
  plantData: any
  equipmentData: any
  tankData: any
  totalCost: number
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  userData, 
  plantData, 
  equipmentData,
  tankData, 
  totalCost 
}) => {
  return (
    <PDFDownloadLink
      document={
        <PDFDocument
          userData={userData}
          plantData={plantData}
          equipmentData={equipmentData}
          tankData={tankData}
          totalCost={totalCost}
        />
      }
      fileName="plant_price_calculator_report.pdf"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      {({ loading }) =>
        loading ? "Generating PDF..." : "Download PDF Report"
      }
    </PDFDownloadLink>
  )
}

export default PDFDownloadButton

