"use client"

import type React from "react"
import { useState } from "react"

interface PDFDownloadButtonProps {
  userData: any
  plantData: any
  equipmentData: any
  totalCost: number
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ userData, plantData, equipmentData, totalCost }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData, plantData, equipmentData, totalCost }),
      })

      if (response.ok) {
        // Create a Blob from the PDF Stream
        const blob = await response.blob()
        // Create a link element, use it to download the blob, then remove it
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = "plant_price_calculator_report.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        console.error("PDF generation failed")
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? "Generating PDF..." : "Download PDF Report"}
    </button>
  )
}

export default PDFDownloadButton

