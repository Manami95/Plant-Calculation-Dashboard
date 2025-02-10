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
    return Object.values(equipmentData).reduce((total, equipment) => total + ensureNumber(equipment.totalPrice), 0);
}

// Calculate flow rate based on plant capacity
export function calculateFlowRate(plantCapacity) {
    return plantCapacity / 20;
}

// Calculate the total cost of raw sewage based on flow rate
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
    return (plantCapacity * (BOD * 0.15 + TSS * 0.6)) / 100000 * 4;
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

// Calculate MGF volume
export function calculateMGFVolume(plantCapacity) {
    const mgfValue = plantCapacity / (16 * 12);
    const value2 = (Math.sqrt((mgfValue * 4) / Math.PI)) * 1000;
    return (Math.PI * value2 * value2 * 1.8);
}

// Calculate ACF volume
export function calculateACFVolume(plantCapacity) {
    const acfValue = plantCapacity / (16 * 12);
    const value2 = (Math.sqrt((acfValue * 4) / Math.PI)) * 1000;
    return (Math.PI * value2 * value2 * 1.8);
}

// Calculate flow meter size
export function calculateFlowMeterSize(waterFlowRate) {
    return Math.sqrt((waterFlowRate * 4) / (3600 * 1.5 * Math.PI)) * 1000;
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
    return updateDynamicCapacities(updatedEquipmentData);
}

// Update dynamic capacities and costs
export function updateDynamicCapacities(plantData, equipmentData) {
    const updatedEquipmentData = { ...equipmentData };

    const flowRate = calculateFlowRate(plantData.capacity);
    const equivalentTank = calculateEquivalentTank(flowRate);
    const MBBRTankVolume = calculateMBBRTankVolume(plantData.BOD, plantData.capacity);
    const nitrogenRemoval = calculateNitrogenRemoval(plantData.Nitrogen, plantData.capacity);
    const sludgeHoldingTank = calculateSludgeHoldingTank(plantData.capacity, plantData.BOD, plantData.TSS);
    const filterFeedPumpCapacity = calculateFilterFeedPumpCapacity(plantData.capacity);
    
    updatedEquipmentData["filter-pump"].capacity = filterFeedPumpCapacity; // Update capacity
    updatedEquipmentData["filter-pump"].totalPrice = calculateFilterFeedPumpTotalCost(filterFeedPumpCapacity); // Update total price

    const blowerCapacity = calculateBlowerCapacity(equivalentTank, MBBRTankVolume, nitrogenRemoval, sludgeHoldingTank);
    const diffuserCoursePiece = Math.ceil(calculateDiffuserCoursePiece(equivalentTank, sludgeHoldingTank));
    const diffuserFinePiece = Math.ceil(calculateDiffuserFinePiece(MBBRTankVolume, nitrogenRemoval));
    const mgfCapacity = calculateMGFVolume(plantData.capacity);
    const acfCapacity = calculateACFVolume(plantData.capacity);
    const UVSystemFlow = calculateUVSystemCapacity(plantData.capacity);
    const OzonatorFlow = calculateOzonatorCapacity(plantData.capacity);
    const UltraFiltrationSystemFlow = calculateUltraFiltrationSystemFlowRate(plantData.capacity);
    const TubeDeck = calculateTubeDeckMediaNumber(plantData.capacity);
    const flowMeterSize = calculateFlowMeterSize(flowRate);

    // Update equipment data
    if (updatedEquipmentData["raw-sewage"]) {
        updatedEquipmentData["raw-sewage"].capacity = flowRate;
        updatedEquipmentData["raw-sewage"].totalPrice = calculateRawSewageTotalCost(flowRate);
    }

    if (updatedEquipmentData["blower"]) {
        updatedEquipmentData["blower"].capacity = blowerCapacity;
        updatedEquipmentData["blower"].totalPrice = getBlowerTotalCost(blowerCapacity);
    }

    if (updatedEquipmentData["sludge-pump"]) {
        updatedEquipmentData["sludge-pump"].capacity = flowRate;
        updatedEquipmentData["sludge-pump"].totalPrice = getSludgeHoldingTankTotalCost(sludgeHoldingTank);
    }

    // Update other equipment capacities
    if (updatedEquipmentData["filter-pump"]) updatedEquipmentData["filter-pump"].capacity = filterFeedPumpCapacity;
    if (updatedEquipmentData["multi-grade-filter"]) updatedEquipmentData["multi-grade-filter"].Volume = mgfCapacity;
    if (updatedEquipmentData["activated-carbon-filter"]) updatedEquipmentData["activated-carbon-filter"].Volume = acfCapacity;
    if (updatedEquipmentData["tube-media"]) updatedEquipmentData["tube-media"].capacity = TubeDeck;
    if (updatedEquipmentData["mbbr-media"]) updatedEquipmentData["mbbr-media"].Volume = calculateMBBRMedia(plantData.BOD, plantData.capacity);
    if (updatedEquipmentData["diffuser-course"]) updatedEquipmentData["diffuser-course"].Piece = diffuserCoursePiece;
    if (updatedEquipmentData["diffuser-fine"]) updatedEquipmentData["diffuser-fine"].Piece = diffuserFinePiece;
    if (updatedEquipmentData["flow-meter"]) updatedEquipmentData["flow-meter"].size = flowMeterSize;
    if (updatedEquipmentData["uv-system"]) updatedEquipmentData["uv-system"].Flow = UVSystemFlow;
    if (updatedEquipmentData["ozonator"]) updatedEquipmentData["ozonator"].Flow = OzonatorFlow;
    if (updatedEquipmentData["ultra-filtration"]) updatedEquipmentData["ultra-filtration"].Flow = UltraFiltrationSystemFlow;

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

        const pieceCount = ensureNumber(equipment.Piece || 0);
        const pieceCost = pieceCount; // Adjusted for simplicity

        equipment.totalPrice += pieceCost;

        // Add additional costs based on specific calculations
        switch (key) {
            case "raw-sewage":
                equipment.totalPrice += flowRate; // Simplified
                break;
            case "blower":
                equipment.totalPrice += getBlowerTotalCost(blowerCapacity);
                break;
            case "sludge-pump":
                equipment.totalPrice += flowRate; // Simplified
                break;
            case "filter-pump":
                equipment.totalPrice += calculateFilterFeedPumpTotalCost(filterFeedPumpCapacity);
                break;
            case "multi-grade-filter":
                equipment.totalPrice += mgfCapacity; // Simplified
                break;
            case "tube-media":
                equipment.totalPrice += TubeDeck; // Simplified
                break;
            case "mbbr-media":
                equipment.totalPrice += calculateMBBRMedia(plantData.BOD, plantData.capacity); // Simplified
                break;
            case "diffuser-course":
                equipment.totalPrice += diffuserCoursePiece;
                break;
            case "diffuser-fine":
                equipment.totalPrice += diffuserFinePiece;
                break;
            case "flow-meter":
                equipment.totalPrice += flowMeterSize; // Simplified
                break;
            case "uv-system":
                equipment.totalPrice += UVSystemFlow; // Simplified
                break;
            case "ozonator":
                equipment.totalPrice += OzonatorFlow; // Simplified
                break;
            case "ultra-filtration":
                equipment.totalPrice += UltraFiltrationSystemFlow; // Simplified
                break;
            // Fixed costs
            case "piping":
                equipment.totalPrice += 80000;
                break;
            case "cable":
                equipment.totalPrice += 35000;
                break;
            case "panel":
                equipment.totalPrice += 70000;
                break;
            case "installation":
                equipment.totalPrice += 40000;
                break;
            case "commissioning":
                equipment.totalPrice += 70000;
                break;
        }
    });

    saveEquipmentData(updatedEquipmentData);
    return updatedEquipmentData; // Return the updated equipment data
}

// Initialize the dashboard
export function initializeDashboard() {
    let equipmentData = loadEquipmentData();
    if (Object.keys(equipmentData).length === 0) {
        equipmentData = equipmentInitialState; // Fallback to initial state
        saveEquipmentData(equipmentData); // Save initial state to local storage
    }
    console.log("Initializing dashboard with equipment data:", equipmentData);
    return equipmentData; // Use this data to populate your dashboard
}

// Handle quantity changes in the UI
export const handleQuantityChange = (equipmentKey, newQuantity, plantData) => {
    const quantityValue = ensureNumber(newQuantity);
    let updatedEquipmentData = updateEquipmentQuantity(equipmentKey, quantityValue, loadEquipmentData());
    updatedEquipmentData = updateDynamicCapacities(plantData, updatedEquipmentData);
    renderDashboard(updatedEquipmentData);
};

// Handle input changes from the UI
export const handleInputChange = (event, equipmentKey) => {
    const { value } = event.target;
    const numericValue = ensureNumber(parseFloat(value));
    handleQuantityChange(equipmentKey, numericValue);
};