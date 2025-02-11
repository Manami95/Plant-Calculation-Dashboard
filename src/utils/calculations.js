import equipmentInitialState from '../data/equipmentInitialState';

// Helper function to ensure a number is not NaN, replacing with 0 if it is
const ensureNumber = (value) => (isNaN(value) ? 0 : value);

// Function to check if a value is serializable
const isSerializable = (value) => {
    return typeof value !== 'function' && !(value instanceof HTMLElement) && !(value instanceof Window);
};

// Deep clone function to filter out non-serializable properties
const deepCloneSerializable = (data) => {
    if (Array.isArray(data)) {
        return data.map(deepCloneSerializable);
    } else if (data !== null && typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            if (isSerializable(data[key])) {
                acc[key] = deepCloneSerializable(data[key]);
            }
            return acc;
        }, {});
    }
    return data; // Return primitive values as is
};

// Function to save equipment data to local storage
const saveEquipmentData = (equipmentData) => {
    const serializableData = deepCloneSerializable(equipmentData);
    console.log("Saving equipment data to local storage:", serializableData);
    localStorage.setItem('equipmentData', JSON.stringify(serializableData));
};

// Function to load equipment data from local storage
const loadEquipmentData = () => {
    const data = localStorage.getItem('equipmentData');
    console.log("Loaded equipment data from local storage:", data);
    return data ? JSON.parse(data) : {};
};

// Calculate total cost for all equipment
export function calculateTotalCost(equipmentData) {
    return Object.values(equipmentData).reduce((total, equipment) => total + equipment.totalPrice, 0);
}

// Calculate flow rate based on plant capacity
export function calculateFlowRate(plantCapacity) {
    return plantCapacity / 20;
}

// Calculate the total cost of raw sewage
export function calculateRawSewageTotalCost(flowRate) {
    return getRawSewageTotalCost(flowRate);
}

// Calculate oil skimmer total cost
export function calculateOilSkimmerTotalCost(quantity) {
    return 32000 * ensureNumber(quantity);
}

// Get total cost for raw sewage
export function getRawSewageTotalCost(flowRate) {
    if (flowRate >= 8.23) return 21660;
    if (flowRate >= 4.3) return 17521;
    if (flowRate >= 0.1) return 15000;
    return 0;
}

// Calculate equivalent tank size
export function calculateEquivalentTank(flowRate) {
    return flowRate * 8;
}

// Calculate MBBR tank volume
export function calculateMBBRTankVolume(BOD, plantCapacity) {
    return ((BOD / 1000) * plantCapacity * 2.5) / 0.89;
}

// Calculate nitrogen removal
export function calculateNitrogenRemoval(Nitrogen, plantCapacity) {
    return ((Nitrogen / 1000) * plantCapacity * 4.3) / 0.89;
}

// Calculate sludge holding tank size
export function calculateSludgeHoldingTank(plantCapacity, BOD, TSS) {
    const sludgeHolder = (plantCapacity * (BOD * 0.15 + TSS * 0.6)) / 100000;
    return sludgeHolder * 4;
}

// Get total cost for sludge holding tank
export function getSludgeHoldingTankTotalCost(sludgeHoldingTank) {
    if (sludgeHoldingTank >= 8.23) return 21660;
    if (sludgeHoldingTank >= 4.3) return 17521;
    if (sludgeHoldingTank >= 0.1) return 15000;
    return 0;
}

// Calculate blower capacity
export function calculateBlowerCapacity(equivalentTank, MBBRTankVolume, nitrogenRemoval, sludgeHoldingTank) {
    return (equivalentTank * 0.6) + MBBRTankVolume + nitrogenRemoval + (sludgeHoldingTank * 0.6);
}

// Get total cost for blower
export function getBlowerTotalCost(blowerCapacity) {
    if (blowerCapacity >= 100) return 46392;
    if (blowerCapacity >= 80) return 40533;
    if (blowerCapacity >= 40) return 38165;
    if (blowerCapacity >= 30) return 34157;
    if (blowerCapacity >= 12) return 32874;
    return 31081;
}

// Calculate MBBR media volume
export function calculateMBBRMedia(BOD, plantCapacity) {
    return (BOD * plantCapacity) / 4000;
}

// Calculate diffuser course piece count
export function calculateDiffuserCoursePiece(equivalentTank, sludgeHoldingTank) {
    return ((equivalentTank * 0.6) / 3) + ((sludgeHoldingTank * 0.6) / 3);
}

// Calculate diffuser fine piece count
export function calculateDiffuserFinePiece(MBBRTankVolume, nitrogenRemoval) {
    return (MBBRTankVolume + nitrogenRemoval) / 5;
}

// Calculate filter feed pump capacity
export function calculateFilterFeedPumpCapacity(plantCapacity) {
    return plantCapacity / 16;
}

// Calculate total cost for filter feed pump
export function calculateFilterFeedPumpTotalCost(filterFeedPumpCapacity) {
    if (filterFeedPumpCapacity >= 6.4) return 14881;
    if (filterFeedPumpCapacity >= 5.4) return 11340;
    if (filterFeedPumpCapacity >= 0.1) return 9621;
    return 0;
}

// Calculate MGF capacity
export function calculateMGFDiameter(flowRate) {
  return Math.sqrt(flowRate * 0.10615) * 1000;
}

export function calculateMGFVolume(mgfDiameter) {
  return (3.14 * mgfDiameter * mgfDiameter * 3);
}
// Calculate ACF capacity
export function calculateACFDiameter(flowRate) {
  return Math.sqrt(flowRate * 0.10615) * 1000;
}
export function calculateACFVolume(acfDiameter){
  return (3.14 * acfDiameter * acfDiameter * 3);
}
// Calculate flow meter size
export function calculateFlowMeterSize(waterFlowRate) {
    return Math.sqrt((waterFlowRate * 4) / (3600 * 1.5 * 3.14)) * 1000;
}

// Calculate UV system capacity
export function calculateUVSystemCapacity(plantCapacity) {
    return plantCapacity / 20;
}

// Calculate ozonator capacity
export function calculateOzonatorCapacity(plantCapacity) {
    return plantCapacity * 0.25;
}

// Calculate ultra filtration system flow rate
export function calculateUltraFiltrationSystemFlowRate(plantCapacity) {
    return plantCapacity / 20;
}

// Calculate tube deck media number
export function calculateTubeDeckMediaNumber(plantCapacity) {
    return plantCapacity * 0.025;
}

// Update equipment quantity and recalculate costs
export function updateEquipmentQuantity(equipmentKey, newQuantity, equipmentData) {
    const updatedEquipmentData = { ...equipmentData };

    if (updatedEquipmentData[equipmentKey]) {
        updatedEquipmentData[equipmentKey].quantity = ensureNumber(newQuantity);
    }

    // Recalculate the total prices after updating the quantity
    return updateDynamicCapacities(plantData, updatedEquipmentData);
}

// Update dynamic capacities and costs
export const updateDynamicCapacities = (plantData, equipmentData) => {
  const updatedEquipmentData = { ...equipmentData };
  
  // Calculate flow rate
  const flowRate = plantData.capacity ? plantData.capacity / 24 : 0;
  
  // Calculate diameters and volumes
  const mgfDiameter = Math.ceil(Math.sqrt(flowRate / 8) * 1000) / 1000;
  const mgfVolume = Math.ceil(3.14 * Math.pow(mgfDiameter, 2) * 3);
  
  const acfDiameter = Math.ceil(Math.sqrt(flowRate / 8) * 1000) / 1000;
  const acfVolume = Math.ceil(3.14 * Math.pow(acfDiameter, 2) * 3);
  
  // Calculate other capacities
  const MBBRMedia = Math.ceil((plantData.capacity * plantData.BOD) / (1000 * 0.8));
  const TubeDeck = Math.ceil(plantData.capacity / 24 * 0.5);
  const diffuserPieces = Math.ceil(MBBRMedia / 2);
  const UVCapacity = Math.ceil(plantData.capacity / 24);
  const OzonatorCapacity = Math.ceil((plantData.capacity / 24) * 0.015);
  const UFCapacity = Math.ceil(plantData.capacity / 20);

  // Update equipment data
  if (updatedEquipmentData["raw-sewage"]) {
    updatedEquipmentData["raw-sewage"].capacity = flowRate;
  }
  if (updatedEquipmentData["filter-pump"]) {
    updatedEquipmentData["filter-pump"].capacity = plantData.capacity/16;
  }
  if (updatedEquipmentData["multi-grade-filter"]) {
    updatedEquipmentData["multi-grade-filter"].diameter = mgfDiameter;
    updatedEquipmentData["multi-grade-filter"].Volume = mgfVolume;
  }
  if (updatedEquipmentData["activated-carbon-filter"]) {
    updatedEquipmentData["activated-carbon-filter"].diameter = acfDiameter;
    updatedEquipmentData["activated-carbon-filter"].Volume = acfVolume;
  }
  if (updatedEquipmentData["tube-media"]) {
    updatedEquipmentData["tube-media"].capacity = TubeDeck;
  }
  if (updatedEquipmentData["mbbr-media"]) {
    updatedEquipmentData["mbbr-media"].Volume = MBBRMedia;
  }
  if (updatedEquipmentData["diffuser-course"]) {
    updatedEquipmentData["diffuser-course"].Piece = diffuserPieces;
  }
  if (updatedEquipmentData["uv-system"]) {
    updatedEquipmentData["uv-system"].capacity = UVCapacity;
  }
  if (updatedEquipmentData["ozonator"]) {
    updatedEquipmentData["ozonator"].capacity = OzonatorCapacity;
  }
  if (updatedEquipmentData["ultra-filtration"]) {
    updatedEquipmentData["ultra-filtration"].capacity = UFCapacity;
  }

  // Preserve quantities and prices
  Object.keys(updatedEquipmentData).forEach(key => {
    const equipment = updatedEquipmentData[key];
    if (equipment.basePrice) {
      equipment.totalPrice = equipment.basePrice * (equipment.quantity || 1);
    }
  });

  return updatedEquipmentData;
};

// Initialize the dashboard
export function initializeDashboard() {
    let equipmentData = loadEquipmentData();
    if (Object.keys(equipmentData).length === 0) {
        equipmentData = equipmentInitialState; // Now equipmentInitialState is defined
        saveEquipmentData(equipmentData);
    }
    console.log("Initializing dashboard with equipment data:", equipmentData);
    return equipmentData;
}

// Handle quantity changes in the UI
const handleQuantityChange = (equipmentKey, newQuantity) => {
    const quantityValue = ensureNumber(newQuantity);
    let updatedEquipmentData = updateEquipmentQuantity(equipmentKey, quantityValue, loadEquipmentData());
    updatedEquipmentData = updateDynamicCapacities(plantData, updatedEquipmentData);
    renderDashboard(updatedEquipmentData);
};

// Handle input changes from the UI
const handleInputChange = (event) => {
    const { value } = event.target;
    const numericValue = ensureNumber(parseFloat(value));
    handleQuantityChange(equipmentKey, numericValue);
};