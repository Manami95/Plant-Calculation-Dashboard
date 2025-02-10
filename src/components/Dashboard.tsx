import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import PlantInfo from "./PlantInfo";
import TankInfo from "./TankInfo";
import EquipmentList from "./EquipmentList";
import TotalCost from "./TotalCost";
import Sidebar from "./Sidebar";
import { calculateTotalCost, updateDynamicCapacities } from "../utils/calculations";
import equipmentInitialState from "../data/equipmentInitialState";
import { TankData } from "../types/TankData";
import * as TankCalculation from "../utils/TankCalculation";

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
    BOD: 100,
    COD: 100,
    pH: 7,
    TSS: 50,
    OilGrease: 500,
    Nitrogen: 500,
    PeakFlow: 2,
  });

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
});

  const [equipmentData, setEquipmentData] = useState(equipmentInitialState);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Effect to update tank data based on plant data
  useEffect(() => {
    const flowRate = TankCalculation.calculateFlowRate(plantData.capacity);
    const updatedTankData: TankData = {
      ...tankData,
      BarScreen: TankCalculation.calculateBarScreenVolume(flowRate, plantData.PeakFlow),
      OilGreaseTank: TankCalculation.calculateOilGreaseVolume(flowRate, plantData.PeakFlow),
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
      length: 3,
      height: 3,
    };

    // Calculate breaths for each tank
    const newBreathData = {
      barScreen: TankCalculation.calculateBarScreenBreath(updatedTankData.BarScreen),
      oilGrease: TankCalculation.calculateOilGreaseBreath(updatedTankData.OilGreaseTank),
      equalization: TankCalculation.calculateEqualizationTankBreath(updatedTankData.EqualizationTank),
      anoxic: TankCalculation.calculateAnoxicTankBreath(updatedTankData.AnoxicTank),
      mbbr: TankCalculation.calculateMBBRTankBreath(updatedTankData.MBBRTank),
      tubeSettle: TankCalculation.calculateTubeSettleBreath(updatedTankData.TubeSettle),
      filterFeed: TankCalculation.calculateFilterFeedTankBreath(updatedTankData.FilterFeedTank),
      treatedWater: TankCalculation.calculateTreatedWaterTankBreath(updatedTankData.TreatedWaterTank),
      uf: TankCalculation.calculateUFWaterTankBreath(updatedTankData.UFWaterTank),
      sludge: TankCalculation.calculateSludgeHoldingTankBreath(updatedTankData.SludgeHoldingTank),
    };

    // Update tankData with new breath values
    setTankData({ ...updatedTankData, breath: newBreathData });
  }, [plantData]);

  // Effect to update equipment data and total cost
  useEffect(() => {
    const updatedEquipmentData = updateDynamicCapacities(plantData, equipmentData);
    setEquipmentData(updatedEquipmentData);
    
    const newTotalCost = calculateTotalCost(updatedEquipmentData);
    setTotalCost(newTotalCost);
  }, [plantData, equipmentData]);

  const handleUserDataChange = (newData: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const handlePlantDataChange = (newData: Partial<typeof plantData>) => {
    setPlantData(prev => ({ ...prev, ...newData }));
  };

  const handleEquipmentDataChange = (
    id: string,
    quantity: number,
    volume: number,
    diameter: number,
    piece: number,
    size: number
  ) => {
    setEquipmentData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity,
        volume,
        diameter,
        piece,
        size,
      }
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plant Price Calculator</h1>
            <p className="text-gray-500 mt-2">
              Calculate and generate detailed price estimates for water treatment plants.
            </p>
          </div>

          <UserInfo userData={userData} onDataChange={handleUserDataChange} />
          <PlantInfo plantData={plantData} onDataChange={handlePlantDataChange} />
          <TankInfo tankData={tankData} />
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
};

export default Dashboard;