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
    const serializableData = deepCloneSerializable(equipmentData); // Use deep cloning
    console.log("Saving equipment data to local storage:", serializableData); // Debugging
    localStorage.setItem('equipmentData', JSON.stringify(serializableData));
};

// Function to load equipment data from local storage
const loadEquipmentData = () => {
    const data = localStorage.getItem('equipmentData');
    console.log("Loaded equipment data from local storage:", data); // Debugging
    return data ? JSON.parse(data) : {};
};

export function calculateTotalCost(equipmentData) {
    return Object.values(equipmentData).reduce((total, equipment) => total + equipment.totalPrice, 0);
}
export function calculateFlowRate(plantCapacity) {
  return plantCapacity / 20
}
export function calculateRawSewageTotalCost(flowRate) {
  return getRawSewageTotalCost(flowRate);
}
export function calculateOilSkimmerTotalCost(quantity) {
  return 32000 * ensureNumber(quantity);
}
export function getRawSewageTotalCost(flowRate) {
  if (flowRate >= 8.23) return 21660;
  if (flowRate >= 4.3) return 17521;
  if (flowRate >= 0.1) return 15000;
return 0;
}

export function calculateEquivalentTank(flowRate) {
  return flowRate * 8
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
export function calculateCarbonFilterDiameter(mgfCapacity) {
  return Math.sqrt((mgfCapacity * 4) / Math.PI) * 1000; // Multiply the result by 1000
}
export function calculateFlowMeterSize(waterFlowRate) {
  return Math.sqrt((waterFlowRate * 4) / (3600 * 1.5 * 3.14)) * 1000
}
export function calculationUVSystemFlowRate(plantCapacity) {
  return plantCapacity / 20
}
export function calculationOzonatorFlowRate(plantCapacity) {
  return (plantCapacity * 5) / 20
}
export function calculationUltraFiltrationSystemFlowRate(plantCapacity) {
  return plantCapacity / 20
}
export function calculationTubeDeckMediaNumber(plantCapacity){return plantCapacity * 0.025
}
export function updateEquipmentQuantity(equipmentKey, newQuantity, equipmentData) {
  const updatedEquipmentData = { ...equipmentData };

  if (updatedEquipmentData[equipmentKey]) {
      updatedEquipmentData[equipmentKey].quantity = ensureNumber(newQuantity);
  }

  // Recalculate the total prices after updating the quantity
  return updateDynamicCapacities(updatedEquipmentData);
}
export function updateDynamicCapacities(plantData, equipmentData) {
  const updatedEquipmentData = { ...equipmentData }

  const flowRate = calculateFlowRate(plantData.capacity);
  const equivalentTank = calculateEquivalentTank(flowRate);
  const MBBRTankVolume = calculateMBBRTankVolume(plantData.BOD, plantData.capacity, 4);
  const nitrogenRemoval = calculateNitrogenRemoval(plantData.Nitrogen, plantData.capacity, 4);
  const sludgeHoldingTank = calculateSludgeHoldingTank(plantData.capacity, plantData.BOD, plantData.TSS);
  const filterFeedPumpCapacity = calculateFilterFeedPumpCapacity(plantData.capacity);
    updatedEquipmentData["filter-pump"].capacity = filterFeedPumpCapacity; // Update capacity
    updatedEquipmentData["filter-pump"].totalPrice = calculateFilterFeedPumpTotalCost(filterFeedPumpCapacity); // Update total price
  const MBBRMedia = calculateMBBRMedia(plantData.BOD, plantData.capacity);
  // Inside updateDynamicCapacities function
  const blowerCapacity = calculateBlowerCapacity(equivalentTank, MBBRTankVolume, nitrogenRemoval, sludgeHoldingTank);
  const diffuserCoursePiece = Math.ceil(calculateDiffuserCoursePiece(equivalentTank, sludgeHoldingTank));
  const diffuserFinePiece = Math.ceil(calculateDiffuserFinePiece(MBBRTankVolume, nitrogenRemoval));
  const mgfCapacity = calculateMGFCapacity(plantData.capacity);
  const mgfDiameter = calculateMGFDiameter(mgfCapacity); 
  const carbonFilterDiameter = calculateMGFDiameter(mgfCapacity);
  const UVSystemFlow = calculationUVSystemFlowRate(plantData.capacity);
  const OzonatorFlow = calculationOzonatorFlowRate(plantData.capacity);
  const UltraFiltrationSystemFlow = calculationUltraFiltrationSystemFlowRate(plantData.capacity);
  const TubeDeck = calculationTubeDeckMediaNumber(plantData.capacity);
  const flowMeterSize = calculateFlowMeterSize(flowRate);

  if (updatedEquipmentData["raw-sewage"]) {
    updatedEquipmentData["raw-sewage"].capacity = flowRate;
    updatedEquipmentData["raw-sewage"].totalPrice = calculateRawSewageTotalCost(flowRate);
    console.log(`Updated Flow Rate: ${flowRate}`);
}

if (updatedEquipmentData["blower"]) {
    updatedEquipmentData["blower"].capacity = blowerCapacity;
    updatedEquipmentData["blower"].totalPrice = getBlowerTotalCost(blowerCapacity); // Update the total price based on the new capacity
    console.log(`Blower Capacity: ${blowerCapacity}, Total Price: ${updatedEquipmentData["blower"].totalPrice}`); // Debugging
}

if (updatedEquipmentData["sludge-pump"]) {
    updatedEquipmentData["sludge-pump"].capacity = flowRate;
    updatedEquipmentData["sludge-pump"].totalPrice = getSludgeHoldingTankTotalCost(sludgeHoldingTank);
    console.log(`Updated Sludge Holding Tank: ${sludgeHoldingTank}`);
}
  if (updatedEquipmentData["filter-pump"]) updatedEquipmentData["filter-pump"].capacity = plantData.capacity/16
  if (updatedEquipmentData["multi-grade-filter"])updatedEquipmentData["multi-grade-filter"].diameter = mgfDiameter
  if (updatedEquipmentData["carbon-filter"]) updatedEquipmentData["carbon-filter"].diameter = carbonFilterDiameter
  if(updatedEquipmentData["tube-media"]) updatedEquipmentData["tube-media"].capacity = TubeDeck
  if (updatedEquipmentData["mbbr-media"]) updatedEquipmentData["mbbr-media"].Volume = MBBRMedia
  if (updatedEquipmentData["diffuser-course"]) updatedEquipmentData["diffuser-course"].Piece = diffuserCoursePiece
  if (updatedEquipmentData["diffuser-fine"]) updatedEquipmentData["diffuser-fine"].Piece = diffuserFinePiece
  if (updatedEquipmentData["flow-meter"]) updatedEquipmentData["flow-meter"].size = flowMeterSize
  if (updatedEquipmentData["uv-system"]) updatedEquipmentData["uv-system"].Flow = UVSystemFlow
  if (updatedEquipmentData["Ozonator"])updatedEquipmentData["Ozonator"].Flow = OzonatorFlow
  if (updatedEquipmentData["ultra-filtration"]) updatedEquipmentData["ultra-filtration"].Flow = UltraFiltrationSystemFlow
 // Fixed costs
 updatedEquipmentData["piping"].totalPrice = 80000;
 updatedEquipmentData["cable"].totalPrice = 35000;
 updatedEquipmentData["panel"].totalPrice = 70000;
 updatedEquipmentData["installation"].totalPrice = 40000;
 updatedEquipmentData["commissioning"].totalPrice = 70000;

      // Calculate total price for each equipment
      Object.keys(updatedEquipmentData).forEach((key) => {
        const equipment = updatedEquipmentData[key];
        equipment.totalPrice = 0; // Reset totalPrice

        const capacityCost = ensureNumber(equipment.costPerCapacity) * ensureNumber(equipment.quantity);
        const volumeCost = ensureNumber(equipment.costPerVolume) * ensureNumber(equipment.Volume);
        const flowCost = ensureNumber(equipment.costPerFlow) * ensureNumber(equipment.Flow);
        let pieceCount = ensureNumber(equipment.Piece || 0);
        
        if (key === "diffuser-course" || key === "diffuser-fine") {
            pieceCount = Math.ceil(pieceCount); // Round up for diffuser pieces
        }
        
        const pieceCost = ensureNumber(equipment.costPerPiece) * pieceCount;
        const diameterCost = ensureNumber(equipment.costPerDiameter) * ensureNumber(equipment.diameter);
        const sizeCost = ensureNumber(equipment.costPerSize) * ensureNumber(equipment.size);
        
        equipment.totalPrice += capacityCost + volumeCost + flowCost + pieceCost + diameterCost + sizeCost;

    // Add additional costs based on specific calculations
    switch (key) {
      case "raw-sewage":
          equipment.totalPrice += flowRate * ensureNumber(equipment.costPerCapacity);
          break;
      case "blower":
          equipment.totalPrice += getBlowerTotalCost(blowerCapacity); // Use the total cost from function
          break;
      case "sludge-pump":
          equipment.totalPrice += flowRate * ensureNumber(equipment.costPerCapacity);
          break;
      case "filter-pump":
          equipment.totalPrice += calculateFilterFeedPumpTotalCost(filterFeedPumpCapacity);
          break;    
      case "multi-grade-filter":
          equipment.totalPrice += mgfCapacity * ensureNumber(equipment.costPerDiameter);
          break;
      case "carbon-filter":
          equipment.totalPrice += mgfDiameter * ensureNumber(equipment.costPerDiameter);
          break;
      case "tube-media":
          equipment.totalPrice += TubeDeck * ensureNumber(equipment.costPerCapacity);
          break;
      case "mbbr-media":
          equipment.totalPrice += MBBRMedia * ensureNumber(equipment.costPerVolume);
          break;
      case "diffuser-course":
          equipment.totalPrice += diffuserCoursePiece * ensureNumber(equipment.costPerPiece);
          break;
      case "diffuser-fine":
          equipment.totalPrice += diffuserFinePiece * ensureNumber(equipment.costPerPiece);
          break;
      case "flow-meter":
          equipment.totalPrice += flowMeterSize * ensureNumber(equipment.costPerSize);
          break;
      case "uv-system":
          equipment.totalPrice += UVSystemFlow * ensureNumber(equipment.costPerFlow);
          break;
      case "ozonator":
          equipment.totalPrice += OzonatorFlow * ensureNumber(equipment.costPerFlow);
          break;
      case "ultra-filtration":
          equipment.totalPrice += UltraFiltrationSystemFlow * ensureNumber(equipment.costPerFlow);
          break;
      case "piping":
          equipment.totalPrice += 80000; // Fixed cost for piping
          break;
      case "cable":
          equipment.totalPrice += 35000; // Fixed cost for cable
          break;
      case "panel":
          equipment.totalPrice += 70000; // Fixed cost for panel
          break;
      case "installation":
          equipment.totalPrice += 40000; // Fixed cost for installation
          break;
      case "commissioning":
          equipment.totalPrice += 70000; // Fixed cost for commissioning
          break;
  }
});
saveEquipmentData(updatedEquipmentData);
return updatedEquipmentData; // Return the updated equipment data
}

// Function to initialize the dashboard
export function initializeDashboard() {
let equipmentData = loadEquipmentData();
if (Object.keys(equipmentData).length === 0) {
    equipmentData = equipmentInitialState; // Fallback to initial state
    saveEquipmentData(equipmentData); // Save initial state to local storage
}
console.log("Initializing dashboard with equipment data:", equipmentData); // Debugging
return equipmentData; // Use this data to populate your dashboard
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


