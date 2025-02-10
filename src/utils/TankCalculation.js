// Helper function to ensure a number is not NaN, replacing with 0 if it is
const ensureNumber = (value) => {
    const num = isNaN(value) ? 0 : value;
    console.log("Ensured number:", num);
    return num;
};

// Constants for height and length (can be adjusted based on your requirements)
const height = 3; 
const length = 3;

// Volume and breath calculation functions
export function calculateFlowRate(plantCapacity) {
    const flowRate = ensureNumber(plantCapacity) / 20; // Adjust divisor as needed
    console.log("Calculated Flow Rate:", flowRate);
    return flowRate;
}

export function calculateBarScreenVolume(flowRate, peakFlow) {
    const ensuredFlowRate = ensureNumber(flowRate);
    const ensuredPeakFlow = ensureNumber(peakFlow);
    const volume = (ensuredFlowRate * ensuredPeakFlow) * 0.083; // Adjust multiplier as needed
    console.log("Bar Screen Volume (flowRate: " + ensuredFlowRate + ", peakFlow: " + ensuredPeakFlow + "):", volume);
    return volume;
}

export function calculateBarScreenBreath(barScreenVolume) {
    const breath = barScreenVolume / (height * length);
    console.log("Bar Screen Breath:", breath);
    return breath;
}

export function calculateOilGreaseVolume(flowRate, peakFlow) {
    const ensuredFlowRate = ensureNumber(flowRate);
    const ensuredPeakFlow = ensureNumber(peakFlow);
    const volume = (ensuredFlowRate * ensuredPeakFlow) * 0.34; // Adjust multiplier as needed
    console.log("Oil Grease Volume (flowRate: " + ensuredFlowRate + ", peakFlow: " + ensuredPeakFlow + "):", volume);
    return volume;
}

export function calculateOilGreaseBreath(oilGreaseVolume) {
    const breath = oilGreaseVolume / (height * length);
    console.log("Oil Grease Breath:", breath);
    return breath;
}

export function calculateEqualizationTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 10; // Adjust multiplier as needed
    console.log("Equalization Tank Volume:", volume);
    return volume;
}

export function calculateEqualizationTankBreath(equalizationTankVolume) {
    const breath = equalizationTankVolume / (height * length);
    console.log("Equalization Tank Breath:", breath);
    return breath;
}

export function calculateAnoxicTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2; // Adjust multiplier as needed
    console.log("Anoxic Tank Volume:", volume);
    return volume;
}

export function calculateAnoxicTankBreath(anoxicTankVolume) {
    const breath = anoxicTankVolume / (height * length);
    console.log("Anoxic Tank Breath:", breath);
    return breath;
}

export function calculateMBBRTankVolume(plantCapacity, BOD) {
    const MBBRVolume = (ensureNumber(BOD) * ensureNumber(plantCapacity)) / 4000; // Adjust divisor as needed
    const volume = MBBRVolume / 0.33; // Adjust divisor as needed
    console.log("MBBR Tank Volume:", volume);
    return volume;
}

export function calculateMBBRTankBreath(mbbRTankVolume) {
    const breath = mbbRTankVolume / (height * length);
    console.log("MBBR Tank Breath:", breath);
    return breath;
}

export function calculateTubeSettleVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2.67; // Adjust multiplier as needed
    console.log("Tube Settle Volume:", volume);
    return volume;
}

export function calculateTubeSettleBreath(tubeSettleVolume) {
    const breath = tubeSettleVolume / (height * length);
    console.log("Tube Settle Breath:", breath);
    return breath;
}

export function calculateFilterFeedTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2.5; // Adjust multiplier as needed
    console.log("Filter Feed Tank Volume:", volume);
    return volume;
}

export function calculateFilterFeedTankBreath(filterFeedTankVolume) {
    const breath = filterFeedTankVolume / (height * length);
    console.log("Filter Feed Tank Breath:", breath);
    return breath;
}

export function calculateTreatedWaterTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 6; // Adjust multiplier as needed
    console.log("Treated Water Tank Volume:", volume);
    return volume;
}

export function calculateTreatedWaterTankBreath(treatedWaterTankVolume) {
    const breath = treatedWaterTankVolume / (height * length);
    console.log("Treated Water Tank Breath:", breath);
    return breath;
}

export function calculateUFWaterTankVolume(flowRate) {
    const volume = ensureNumber(flowRate) * 2; // Adjust multiplier as needed
    console.log("UF Water Tank Volume:", volume);
    return volume;
}

export function calculateUFWaterTankBreath(ufWaterTankVolume) {
    const breath = ufWaterTankVolume / (height * length);
    console.log("UF Water Tank Breath:", breath);
    return breath;
}

export function calculateSludgeHoldingTankVolume(plantCapacity, BOD, TSS) {
    const sludgeHolder = (ensureNumber(plantCapacity) * (ensureNumber(BOD) * 0.15 + ensureNumber(TSS) * 0.6)) / 100000; // Adjust divisor as needed
    const volume = sludgeHolder * 4; // Adjust multiplier as needed
    console.log("Sludge Holding Tank Volume:", volume);
    return volume;
}

export function calculateSludgeHoldingTankBreath(sludgeHoldingTankVolume) {
    const breath = sludgeHoldingTankVolume / (height * length);
    console.log("Sludge Holding Tank Breath:", breath);
    return breath;
}