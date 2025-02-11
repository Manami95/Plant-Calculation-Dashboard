// File: components/Dashboard.tsx
"use client"

import React, { useState, useEffect } from "react"
import UserInfo from "./UserInfo"
import PlantInfo from "./PlantInfo"
import TankInfo from "./TankInfo"
import EquipmentList from "./EquipmentList"
import TotalCost from "./TotalCost"
import Sidebar from "./Sidebar"
import { calculateTotalCost, updateDynamicCapacities, initializeDashboard } from "../utils/calculations"
import { TankData } from "../types/TankData"
import * as TankCalculation from "../utils/TankCalculation"
import { PlantData } from "../types/PlantData"

interface Equipment {
  id: string
  name: string
  basePrice: number
  quantity: number
  totalPrice: number
  type: string
}

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const [plantData, setPlantData] = useState<PlantData>({
    type: "STP",
    capacity: 0,
    BOD: 0,
    COD: 0,
    TSS: 0,
    pH: 0,
    OilGrease: 0,
    Nitrogen: 0,
    PeakFlow: 0,
  })

  const [tankData, setTankData] = useState<TankData>({
    type: "STP",
    BarScreen: 0,
    OilGreaseTank: 0,
    EqualizationTank: 0,
    AnoxicTank: 0,
    MBBRTank: 0,
    TubeSettle: 0,
    FilterFeedTank: 0,
    TreatedWaterTank: 0,
    UFWaterTank: 0,
    SludgeHoldingTank: 0,
    volume: 0,
    breath: {
      barScreen: 0,
      oilGrease: 0,
      equalization: 0,
      anoxic: 0,
      mbbr: 0,
      tubeSettle: 0,
      filterFeed: 0,
      treatedWater: 0,
      uf: 0,
      sludge: 0,
    },
    length: 3,
    height: 3,
  })

  const [equipmentData, setEquipmentData] = useState<Record<string, Equipment>>(initializeDashboard())
  const [totalCost, setTotalCost] = useState(0)

  const isSTP = plantData.type === "STP"

  // Update equipment data when plant data changes
  useEffect(() => {
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipment)
  }, [plantData])

  // Update tank calculations when plant data changes
  useEffect(() => {
    if (plantData.capacity <= 0) return

    const flowRate = TankCalculation.calculateFlowRate(plantData.capacity)
    const peakFlow = plantData.PeakFlow || flowRate * 1.5

    const updatedTankData: TankData = {
      ...tankData,
      BarScreen: TankCalculation.calculateBarScreenVolume(flowRate, peakFlow),
      OilGreaseTank: TankCalculation.calculateOilGreaseVolume(flowRate, peakFlow),
      EqualizationTank: TankCalculation.calculateEqualizationTankVolume(flowRate),
      AnoxicTank: TankCalculation.calculateAnoxicTankVolume(flowRate),
      MBBRTank: TankCalculation.calculateMBBRTankVolume(plantData.capacity, plantData.BOD),
      TubeSettle: TankCalculation.calculateTubeSettleVolume(flowRate),
      FilterFeedTank: TankCalculation.calculateFilterFeedTankVolume(flowRate),
      TreatedWaterTank: TankCalculation.calculateTreatedWaterTankVolume(flowRate),
      UFWaterTank: TankCalculation.calculateUFWaterTankVolume(flowRate),
      SludgeHoldingTank: TankCalculation.calculateSludgeHoldingTankVolume(
        plantData.capacity,
        plantData.BOD,
        plantData.TSS
      ),
    }

    setTankData(updatedTankData)
    updateEquipmentPrices(updatedTankData)
  }, [plantData])

  const updateEquipmentPrices = (updatedTankData: TankData) => {
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipment)
    setTotalCost(calculateTotalCost(updatedEquipment))
  }

  const handleUserDataChange = (newData: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...newData }))
  }

  const handlePlantDataChange = (field: string, value: number | string) => {
    if (field === "type") {
      setPlantData(prev => ({ ...prev, type: value as "STP" | "ETP" }))
    } else {
      const numericValue = value === "" ? 0 : Number(value)
      if (!isNaN(numericValue)) {
        setPlantData(prev => ({ ...prev, [field]: numericValue }))
      }
    }
  }

  const handleEquipmentDataChange = (id: string, quantity: number) => {
    const equipment = equipmentData[id];
    const basePrice = equipment?.basePrice || 0;
    
    const updatedEquipmentData = {
      ...equipmentData,
      [id]: {
        ...equipment,
        quantity: quantity,
        totalPrice: basePrice * quantity
      }
    };
    
    setEquipmentData(updatedEquipmentData);

    // Recalculate total cost immediately
    const newTotalCost = Object.values(updatedEquipmentData).reduce((sum, item) => {
      return sum + (item.basePrice * item.quantity);
    }, 0);
    
    setTotalCost(newTotalCost);
  };

  // Add useEffect to update total cost when equipment data changes
  useEffect(() => {
    const newTotalCost = Object.values(equipmentData).reduce((sum, equipment) => {
      return sum + (equipment.totalPrice || 0);
    }, 0);
    setTotalCost(newTotalCost);
  }, [equipmentData]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plant Price Calculator</h1>
            <p className="text-gray-500 mt-2">
              Calculate and generate detailed price estimates for water treatment plants
            </p>
          </div>

          <UserInfo userData={userData} onDataChange={handleUserDataChange} />
          <PlantInfo plantData={plantData} onDataChange={handlePlantDataChange} />
          
          {isSTP && (
            <>
              <TankInfo tankData={tankData} />
              <EquipmentList
                equipmentData={equipmentData}
                plantData={plantData}
                onDataChange={handleEquipmentDataChange}
              />
              <TotalCost
                totalCost={totalCost} 
                userData={userData} 
                plantData={plantData} 
                equipmentData={equipmentData}
                tankData={tankData}
              />
            </>
          )}

          {!isSTP && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-800">ETP Calculations Coming Soon</h3>
              <p className="text-yellow-600 mt-2">
                ETP calculations are currently under development. Please select STP for available calculations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard