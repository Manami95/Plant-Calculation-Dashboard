import equipmentInitialState from '../data/equipmentInitialState';

// Helper function to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Helper function to ensure a number is not NaN, replacing with 0 if it is
const ensureNumber = (value) => (isNaN(value) ? 0 : value);

// Function to check if a value is serializable
const isSerializable = (value) => {
    if (!isBrowser) return true; // Skip detailed checks on server side
    return (
        typeof value !== 'function' && 
        !(isBrowser && value instanceof HTMLElement) && 
        !(isBrowser && value instanceof Window)
    );
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
    return data;
};

// Function to safely access localStorage
const safeLocalStorage = {
    getItem: (key) => {
        try {
            return isBrowser ? localStorage.getItem(key) : null;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            if (isBrowser) {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
    }
};

// Function to save equipment data to local storage
const saveEquipmentData = (equipmentData) => {
    const serializableData = deepCloneSerializable(equipmentData);
    console.log("Saving equipment data to local storage:", serializableData);
    safeLocalStorage.setItem('equipmentData', JSON.stringify(serializableData));
};

// Function to load equipment data from local storage
const loadEquipmentData = () => {
    const data = safeLocalStorage.getItem('equipmentData');
    console.log("Loaded equipment data from local storage:", data);
    return data ? JSON.parse(data) : {};
};

export function calculateTotalCost(equipmentData) {
    return Object.values(equipmentData).reduce((total, equipment) => total + equipment.totalPrice, 0);
}
export function calculateFlowRate(plantCapacity) {
  return plantCapacity / 20
}
export function calculateEquivalentTank(flowRate) {
  return flowRate * 8
}

export function calculateRawSewageTotalCost(flowRate) {
  return getRawSewageTotalCost(flowRate);
}
export function getRawSewageTotalCost(flowRate) {
  if (flowRate >= 8.23) return 21660;
  if (flowRate >= 4.3) return 17521;
  if (flowRate >= 0.1) return 15000;
return 0;
}

export function calculateOilSkimmerTotalCost(quantity) {
  return 32000 * ensureNumber(quantity);
}

export function calculateMBBRTankVolume(BOD, plantCapacity, depth = 4) {
  return ((BOD / 1000) * plantCapacity * 2.5) / 0.89
}

export function calculateNitrogenRemoval(Nitrogen, plantCapacity, depth = 4) {
  return ((Nitrogen / 1000) * plantCapacity * 4.3) / 0.89
}

export function calculateSludgeHoldingTank(plantCapacity, BOD, TSS) {
  const sludgeHolder = (plantCapacity * (BOD * 0.15 + TSS * 0.6)) / 100000
  return sludgeHolder * 4
}
export function getSludgeHoldingTankTotalCost(sludgeHoldingTank){
  if (sludgeHoldingTank >= 8.23) return 21660;
  if (sludgeHoldingTank >= 4.3) return 17521;
  if (sludgeHoldingTank >= 0.1) return 15000;
  return 0;
}
export function calculateBlowerCapacity(equivalentTank, MBBRTankVolume, nitrogenRemoval, sludgeHoldingTank) {
  return (equivalentTank * 0.6) + MBBRTankVolume + nitrogenRemoval + (sludgeHoldingTank * 0.6)
}

export function getBlowerTotalCost(blowerCapacity) {
  if (blowerCapacity >= 100) return 46392;
  if (blowerCapacity >= 80) return 40533;
  if (blowerCapacity >= 40) return 38165;
  if (blowerCapacity >= 30) return 34157;
  if (blowerCapacity >= 12) return 32874;
  return 31081;
}
export function calculateMBBRMedia(BOD, plantCapacity) {
  return (BOD * plantCapacity) / 4000
}
export function calculateDiffuserCoursePiece(equivalentTank, sludgeHoldingTank) {
  return ((equivalentTank * 0.6) / 3) + ((sludgeHoldingTank * 0.6) / 3)
}

export function calculateDiffuserFinePiece(MBBRTankVolume, nitrogenRemoval) {
  return (MBBRTankVolume + nitrogenRemoval) / 5
}
 export function calculateFilterFeedPumpCapacity(plantCapacity) {
  return plantCapacity / 16
}
export function calculateFilterFeedPumpTotalCost(filterFeedPumpCapacity) {
 if (filterFeedPumpCapacity >= 6.4) return 14881;
 if (filterFeedPumpCapacity >= 5.4) return 11340;
 if (filterFeedPumpCapacity >= 0.1) return 9621;
 return 0;
}
export function calculateMGFCapacity(plantCapacity) {
  return plantCapacity / (16 * 12);
}

export function calculateMGFDiameter(mgfCapacity) {
  return Math.sqrt((mgfCapacity * 4) / Math.PI) * 1000; // Multiply the result by 1000
}
export function calculateMGFVolume(mgfDiameter){
  return (3.14 * mgfDiameter * mgfDiameter * 3)
}
export function calculateACFDiameter(mgfCapacity){
  return Math.sqrt((mgfCapacity* 4) / Math.PI) * 1000; // Multiply the result by 1000
}
export function calculateACFVolume(acfDiameter){
  return(3.14 * acfDiameter * acfDiameter * 3)
}

export function calculateFlowMeterSize(waterFlowRate) {
  return Math.sqrt((waterFlowRate * 4) / (3600 * 1.5 * 3.14)) * 1000
}
export function calculationUVSystemCapacity(plantCapacity) {
  return plantCapacity / 20
}
export function calculationOzonatorCapacity(plantCapacity) {
  return (plantCapacity * 5) / 20
}
export function calculationUltraFiltrationSystemCapacity(plantCapacity) {
  return plantCapacity / 20
}
export function calculationTubeDeckMediaNumber(plantCapacity){return plantCapacity * 22.5
}
export function updateEquipmentQuantity(equipmentKey, newQuantity, equipmentData) {
  const updatedEquipmentData = { ...equipmentData };

  if (updatedEquipmentData[equipmentKey]) {
      updatedEquipmentData[equipmentKey].quantity = ensureNumber(newQuantity);
  }

  // Recalculate the total prices after updating the quantity
  return updateDynamicCapacities(updatedEquipmentData);
}
export const updateDynamicCapacities = (plantData, equipmentData) => {
  const updatedEquipmentData = { ...equipmentData };
  
  // Calculate flow rate
  const flowRate = plantData.capacity ? plantData.capacity / 24 : 0;
  
  // Calculate MGF (Multi Grade Filter) diameter
  const mgfDiameter = Math.ceil(Math.sqrt(flowRate / 8) * 1000) / 1000;
  
  // Calculate Carbon Filter diameter
  const carbonFilterDiameter = Math.ceil(Math.sqrt(flowRate / 8) * 1000) / 1000;
  
  // Calculate Tube Deck
  const TubeDeck = Math.ceil(plantData.capacity / 24 * 0.5);
  
  // Calculate MBBR Media
  const MBBRMedia = Math.ceil((plantData.capacity * plantData.BOD) / (1000 * 0.8));
  
  // Calculate UV System Capacity
  const UVCapacity = Math.ceil(plantData.capacity / 24);
  
  // Calculate UF System Capacity
  const UFCapacity = Math.ceil(plantData.capacity / 20);
  
  // Calculate Ozonator Capacity
  const OzonatorCapacity = Math.ceil((plantData.capacity / 24) * 0.015);
  
  // Calculate diffuser pieces
  const diffuserPieces = Math.ceil(MBBRMedia / 2);

  // Update equipment capacities
  if (updatedEquipmentData["feed-pump"]) {
    updatedEquipmentData["feed-pump"].capacity = plantData.capacity/24;
  }
  if (updatedEquipmentData["filter-pump"]) {
    updatedEquipmentData["filter-pump"].capacity = plantData.capacity/16;
  }
  if (updatedEquipmentData["multi-grade-filter"]) {
    updatedEquipmentData["multi-grade-filter"].diameter = mgfDiameter;
  }
  if (updatedEquipmentData["carbon-filter"]) {
    updatedEquipmentData["carbon-filter"].diameter = carbonFilterDiameter;
  }
  if (updatedEquipmentData["tube-media"]) {
    updatedEquipmentData["tube-media"].capacity = TubeDeck;
  }
  if (updatedEquipmentData["mbbr-media"]) {
    updatedEquipmentData["mbbr-media"].Volume = MBBRMedia;
  }
  if (updatedEquipmentData["uv-system"]) {
    updatedEquipmentData["uv-system"].capacity = UVCapacity;
  }
  if (updatedEquipmentData["uf-system"]) {
    updatedEquipmentData["uf-system"].capacity = UFCapacity;
  }
  if (updatedEquipmentData["ozonator"]) {
    updatedEquipmentData["ozonator"].capacity = OzonatorCapacity;
  }
  if (updatedEquipmentData["diffuser-course"]) {
    updatedEquipmentData["diffuser-course"].Piece = diffuserPieces;
  }

  // Calculate total prices
  Object.keys(updatedEquipmentData).forEach(key => {
    const equipment = updatedEquipmentData[key];
    if (equipment.basePrice) {
      equipment.totalPrice = equipment.basePrice * (equipment.quantity || 1);
    }
  });

  return updatedEquipmentData;
};

// Function to initialize the dashboard
export function initializeDashboard() {
    let equipmentData = loadEquipmentData();
    if (Object.keys(equipmentData).length === 0) {
        equipmentData = equipmentInitialState;
        saveEquipmentData(equipmentData);
    }
    return equipmentData;
}

// Example of how to handle quantity changes in the UI
const handleQuantityChange = (equipmentKey, newQuantity) => {
// Ensure newQuantity is a number
const quantityValue = ensureNumber(newQuantity);

// Update the equipment data
let updatedEquipmentData = updateEquipmentQuantity(equipmentKey, quantityValue, loadEquipmentData());

// Recalculate total prices
updatedEquipmentData = updateDynamicCapacities(plantData, updatedEquipmentData);

// Optionally, re-render the dashboard or summary
renderDashboard(updatedEquipmentData);
};

const handleInputChange = (event) => {
const { value } = event.target; // Get the value from the input
const numericValue = ensureNumber(parseFloat(value)); // Convert to number
handleQuantityChange(equipmentKey, numericValue); // Pass the numeric value
};


