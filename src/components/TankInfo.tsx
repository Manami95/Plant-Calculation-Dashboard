import { Box } from "lucide-react";
import { TankData } from "../types/TankData"; 
import * as TankCalculation from "../utils/TankCalculation";
import { ExtendedTankData } from "../types/ExtendedTankData";

// Define tank items
const tankItems = [
  "BarScreen",
  "OilGreaseTank",
  "EqualizationTank",
  "AnoxicTank",
  "MBBRTank",
  "TubeSettle",
  "FilterFeedTank",
  "TreatedWaterTank",
  "UFWaterTank",
  "SludgeHoldingTank",
];

const TankInfo = ({ tankData }: { tankData: ExtendedTankData }) => {


  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tank Details</h2>
      {tankItems.map((tankName) => (
        <div key={tankName} className="mb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{tankName}</h3>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Box className="h-5 w-5 text-blue-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Volume (m³)</label>
            <input
              type="text"
              value={tankData.volume ?? 0}
              readOnly
              className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breath (m)</label>
            <input
              type="text"
              value={tankData.breath[tankName.toLowerCase()] ?? 0}
              readOnly
              className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Length (m)</label>
            <input
              type="text"
              value={tankData.length ?? 0} 
              readOnly
              className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
            <input
              type="text"
              value={tankData.height ?? 0} 
              readOnly
              className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TankInfo;