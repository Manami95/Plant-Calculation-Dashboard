// File: components/Dashboard.tsx
"use client"

import { useState, useEffect } from "react"
import UserInfo from "./UserInfo"
import PlantInfo from "./PlantInfo"
import TankInfo from "./TankInfo";
import EquipmentList from "./EquipmentList"
import TotalCost from "./TotalCost"
import Sidebar from "./Sidebar"
import { calculateTotalCost, updateDynamicCapacities, initializeDashboard } from "../utils/calculations"
import { TankData } from "../types/TankData";
import * as TankCalculation from "../utils/TankCalculation";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const [plantData, setPlantData] = useState({
    type: "STP",
    capacity: 5,
    BOD: 0,
    COD: 0,
    pH: 0,
    TSS: 0,
    OilGrease: 0,
    Nitrogen: 0,
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
    length: 3,
    height: 3,
  });


  const [equipmentData, setEquipmentData] = useState(initializeDashboard())
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    const updatedEquipmentData = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipmentData)
  }, [plantData])

  useEffect(() => {
    const flowRate = TankCalculation.calculateFlowRate(plantData.capacity);
    const peakFactor = 2.25; // You can adjust this value or make it dynamic based on requirements
    const peakFlow = flowRate * peakFactor;

    const updatedTankData: TankData = {
      ...tankData,
      BarScreen: TankCalculation.calculateBarScreenVolume(flowRate, peakFlow),
      OilGreaseTank: TankCalculation.calculateOilGreaseVolume(flowRate, peakFlow),
      EqualizationTank: TankCalculation.calculateEqualizationTankVolume(flowRate),
      AnoxicTank: TankCalculation.calculateAnoxicTankVolume(flowRate),
      MBBRTank: TankCalculation.calculateMBBRTankVolume(
        plantData.capacity, 
        plantData.BOD || 0
      ),
      TubeSettle: TankCalculation.calculateTubeSettleVolume(flowRate),
      FilterFeedTank: TankCalculation.calculateFilterFeedTankVolume(flowRate),
      TreatedWaterTank: TankCalculation.calculateTreatedWaterTankVolume(flowRate),
      UFWaterTank: TankCalculation.calculateUFWaterTankVolume(flowRate),
      SludgeHoldingTank: TankCalculation.calculateSludgeHoldingTankVolume(
        plantData.capacity,
        plantData.BOD || 0,
        plantData.TSS || 0
      ),
      length: 3,
      height: 3,
      volume: 0,
      type: "STP"
    };

    console.log('Updated Tank Data:', {
      flowRate,
      peakFlow,
      BOD: plantData.BOD,
      TSS: plantData.TSS,
      capacity: plantData.capacity,
      volumes: {
        barScreen: updatedTankData.BarScreen,
        oilGrease: updatedTankData.OilGreaseTank,
        mbbr: updatedTankData.MBBRTank,
        sludge: updatedTankData.SludgeHoldingTank
      }
    });

    setTankData(updatedTankData);
  }, [plantData]);

  useEffect(() => {
    const newTotalCost = calculateTotalCost(equipmentData)
    setTotalCost(newTotalCost)
  }, [equipmentData])

  const handleUserDataChange = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }))
  }

  const handlePlantDataChange = (newData) => {
    setPlantData((prevData) => ({ ...prevData, ...newData }))
  }

  const handleEquipmentDataChange = (id, quantity) => {
    const updatedEquipmentData = updateDynamicCapacities(plantData, {
      ...equipmentData,
      [id]: { ...equipmentData[id], quantity: Number(quantity) }
    });
    setEquipmentData(updatedEquipmentData);
  }

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
        </div>
      </div>
    </div>
  )
}

export default Dashboard