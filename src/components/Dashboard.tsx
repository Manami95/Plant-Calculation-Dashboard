"use client";

import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import PlantInfo from "./PlantInfo";
import EquipmentList from "./EquipmentList";
import TotalCost from "./TotalCost";
import Sidebar from "./Sidebar";
import { calculateTotalCost, updateDynamicCapacities } from "../utils/calculations";
import equipmentInitialState from "../data/equipmentInitialState";

const Dashboard = () => {
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
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const updatedEquipmentData = updateDynamicCapacities(plantData, equipmentData);
    setEquipmentData(updatedEquipmentData);
    const newTotalCost = calculateTotalCost(updatedEquipmentData);
    setTotalCost(newTotalCost);
  }, [plantData, equipmentData]);

  const handleUserDataChange = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  const handlePlantDataChange = (newData) => {
    setPlantData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleEquipmentDataChange = (id, quantity) => {
    setEquipmentData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        quantity,
        totalPrice: calculateItemPrice(id, quantity),
      },
    }));
  };

  const calculateItemPrice = (id, quantity) => {
    // Add your price calculation logic here
    const basePrice = {
      "mbbr-media": 1000,
      "multi-grade-filter": 2000,
      "flow-meter": 1500,
    };
    return (basePrice[id] || 0) * quantity;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plant Price Calculator</h1>
            <p className="text-gray-500 mt-2">Calculate and generate detailed price estimates for water treatment plants</p>
          </div>
          
          <UserInfo userData={userData} onDataChange={handleUserDataChange} />
          <PlantInfo plantData={plantData} onDataChange={handlePlantDataChange} />
          <EquipmentList equipmentData={equipmentData} onDataChange={handleEquipmentDataChange} />
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
};

export default Dashboard;