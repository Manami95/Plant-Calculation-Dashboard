// Helper function to ensure a number is not NaN, replacing with 0 if it is
const ensureNumber = (value) => (isNaN(value) ? 0 : value)

export function calculateTotalCost(equipmentData) {
  return Object.values(equipmentData).reduce((total, equipment) => total + equipment.totalPrice, 0)
}

export function calculateFlowRate(plantCapacity) {
  return plantCapacity / 20
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

export function calculateMBBRMedia(BOD, plantCapacity) {
  return (BOD * plantCapacity) / 4000
}

export function calculateBlowerCapacity(equivalentTank, MBBRTankVolume, nitrogenRemoval, sludgeHoldingTank) {
  return (equivalentTank * 0.6) + MBBRTankVolume + nitrogenRemoval + (sludgeHoldingTank * 0.6)
}

export function calculateDiffuserCourseCapacity(equivalentTank, sludgeHoldingTank) {
  return ((equivalentTank * 0.6) / 3) + ((sludgeHoldingTank * 0.6) / 3)
}

export function calculateDiffuserFineCapacity(MBBRTankVolume, nitrogenRemoval) {
  return (MBBRTankVolume + nitrogenRemoval) / 5
}

export function calculateMGFCapacity(plantCapacity) {
  return plantCapacity / (16 * 12)
}

export function calculateMGFDiameter(mgfCapacity) {
  return Math.sqrt((mgfCapacity * 4) / 3.14) 
}

export function calculateFlowMeterSize(waterFlowRate) {
  return Math.sqrt((waterFlowRate * 4) / (3600 * 1.5 * 3.14)) * 1000
}
export function calculationUVSystemFlowRate(plantCapacity) {
  return plantCapacity / 20
}
export function calculationOzonatorFlowRate(plantCapacity) {
  return plantCapacity * 5 / 20
}
export function calculationUltraFiltrationSystemFlowRate(plantCapacity) {
  return plantCapacity / 20
}
export function calculationTubeDeckMediaNumber(plantCapacity){return plantCapacity * 22.5}
export function updateDynamicCapacities(plantData, equipmentData) {
  const updatedEquipmentData = { ...equipmentData }

  const flowRate = calculateFlowRate(plantData.capacity)
  const equivalentTank = calculateEquivalentTank(flowRate)
  const MBBRTankVolume = calculateMBBRTankVolume(plantData.BOD, plantData.capacity, 4)
  const nitrogenRemoval = calculateNitrogenRemoval(plantData.Nitrogen, plantData.capacity, 4)
  const sludgeHoldingTank = calculateSludgeHoldingTank(plantData.capacity, plantData.BOD, plantData.TSS)
  const MBBRMedia = calculateMBBRMedia(plantData.BOD, plantData.capacity)
  const blowerCapacity = calculateBlowerCapacity(equivalentTank, MBBRTankVolume, nitrogenRemoval, sludgeHoldingTank)
  const diffuserCourseCapacity = calculateDiffuserCourseCapacity(equivalentTank, sludgeHoldingTank)
  const diffuserFineCapacity = calculateDiffuserFineCapacity(MBBRTankVolume, nitrogenRemoval)
  const mgfCapacity = calculateMGFCapacity(plantData.capacity)
  const mgfDiameter = calculateMGFDiameter(mgfCapacity)
  const flowMeterSize = calculateFlowMeterSize(flowRate)

  if (updatedEquipmentData["raw-sewage"]) updatedEquipmentData["raw-sewage"].capacity = flowRate
  if (updatedEquipmentData["sludge-pump"]) updatedEquipmentData["sludge-pump"].capacity = flowRate
  if (updatedEquipmentData["filter-pump"]) updatedEquipmentData["filter-pump"].capacity = plantData.capacity / 16
  if (updatedEquipmentData.blower) updatedEquipmentData.blower.capacity = blowerCapacity
  if (updatedEquipmentData["mbbr-media"]) updatedEquipmentData["mbbr-media"].Volume = MBBRMedia
  if (updatedEquipmentData["diffuser-course"]) updatedEquipmentData["diffuser-course"].capacity = diffuserCourseCapacity
  if (updatedEquipmentData["diffuser-fine"]) updatedEquipmentData["diffuser-fine"].capacity = diffuserFineCapacity
  if (updatedEquipmentData["multi-grade-filter"])updatedEquipmentData["multi-grade-filter"].diameter = mgfDiameter
  
  if (updatedEquipmentData["flow-meter"]) updatedEquipmentData["flow-meter"].size = flowMeterSize

  Object.keys(updatedEquipmentData).forEach((key) => {
    const equipment = updatedEquipmentData[key]
    if (equipment.capacity !== undefined) {
      equipment.totalPrice =
        Math.max(ensureNumber(equipment.capacity), 1) * equipment.costPerCapacity * equipment.quantity
    } else {
      equipment.totalPrice = equipment.costPerCapacity * equipment.quantity * plantData.capacity
    }
  })

  return updatedEquipmentData
}

