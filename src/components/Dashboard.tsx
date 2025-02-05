"use client"

import { useState, useEffect } from "react"
import UserInfo from "./UserInfo"
import PlantInfo from "./PlantInfo"
import EquipmentList from "./EquipmentList"
import TotalCost from "./TotalCost";
import Sidebar from "./Sidebar"
import { calculateTotalCost, updateDynamicCapacities } from "../utils/calculations"
import equipmentInitialState from "../data/equipmentInitialState"

// Define the Dashboard component
const Dashboard = () => {
  // State definitions
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [plantData, setPlantData] = useState({
    type: "STP",
    capacity: 5,
    BOD: 0,
    COD: 0,
    pH: 0,
    TSS: 0,
    OilGrease: 0,
    Nitrogen: 0,
  });

  const [equipmentData, setEquipmentData] = useState(equipmentInitialState);
  const [totalCost, setTotalCost] = useState<number>(0); // Ensure totalCost is a number

  useEffect(() => {
    const updatedEquipmentData = updateDynamicCapacities(plantData, equipmentData);
    setEquipmentData(updatedEquipmentData);
    const newTotalCost = calculateTotalCost(updatedEquipmentData);
    setTotalCost(newTotalCost);
  }, [plantData, equipmentData]);

  const handleUserDataChange = (newData: Partial<typeof userData>) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  const handlePlantDataChange = (newData: Partial<typeof plantData>) => {
    setPlantData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleEquipmentDataChange = (id: string, quantity: number, Volume: number, Diameter: number, Piece: number) => {
    setEquipmentData((prevData) => {
      const updatedEquipment = {
        ...prevData[id],
        quantity,
        Volume,
        Diameter,
        Piece,
      };

      // Calculate the new total price based on the equipment type
      if (updatedEquipment.costPerCapacity) {
        updatedEquipment.totalPrice = quantity * updatedEquipment.costPerCapacity * plantData.capacity;
      } else if (updatedEquipment.costPerDiameter) {
        updatedEquipment.totalPrice = quantity * updatedEquipment.costPerDiameter * (updatedEquipment.Diameter || 1);
      } else if (updatedEquipment.costPerVolume) {
        updatedEquipment.totalPrice = updatedEquipment.costPerVolume * (updatedEquipment.Volume || 1);
      } else if (updatedEquipment.costPerPiece) {
        updatedEquipment.totalPrice = updatedEquipment.costPerPiece * (updatedEquipment.Piece || 1);
      } else if (updatedEquipment.costPerSize) {
        updatedEquipment.totalPrice = quantity * updatedEquipment.costPerSize * (updatedEquipment.size || 1);
      } else if (updatedEquipment.costPerFlow) {
        updatedEquipment.totalPrice = quantity * updatedEquipment.costPerFlow * (updatedEquipment.Flow || 1);
      }

      return {
        ...prevData,
        [id]: updatedEquipment,
      };
    });
  };

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
          <EquipmentList
            equipmentData={equipmentData}
            plantData={plantData}
            onDataChange={handleEquipmentDataChange}
            onPlantDataChange={handlePlantDataChange}
          />
          <TotalCost 
            totalCost={totalCost} 
            userData={userData} 
            plantData={plantData} 
            equipmentData={equipmentData} 
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;