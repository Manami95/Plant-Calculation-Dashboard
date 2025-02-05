import { getBlowerTotalCost, getRawSewageTotalCost, getSludgeHoldingTankTotalCost } from '../utils/calculations';

const equipmentInitialState = {
  "raw-sewage": {
    name: "Raw Sewage Transfer Pump",
    capacity: 0,
    quantity: 1,
    totalPrice: getRawSewageTotalCost(1), // Ensure this function handles the input correctly
     // Add costPerCapacity for calculations
  },
  "oil-skimmer": {
    name: "Oil Skimmer",
    quantity: 1,
    totalPrice: 32000,
   // Add costPerCapacity for consistency
  },
  "blower": {
    name: "Blower",
    capacity: 0,
    quantity: 1,
    totalPrice: getBlowerTotalCost(1),
     // Ensure this is defined for calculations
  },
  "sludge-pump": {
    name: "Sludge Recirculation Pump",
    capacity: 0,
    quantity: 1,
    totalPrice: getSludgeHoldingTankTotalCost(1),
   
  },
  "filter-pump": {
    name: "Filter Feed Pump",
    capacity: 0,
    quantity: 1,
    totalPrice: getSludgeHoldingTankTotalCost(1),
    
  },
  "multi-grade-filter": {
    name: "Multi Grade Filter",
    costPerDiameter: 7000,
    totalPrice: 100,
    quantity: 1,
  },
  "carbon-filter": {
    name: "Activated Carbon Filter",
    costPerDiameter: 7000,
    totalPrice: 7000,
    quantity: 1,
  },
  "tube-media": {
    name: "Tube Deck Media",
    quantity: 1,
    costPerCapacity: 7000,
    totalPrice: 7000,
  },
  "mbbr-media": {
    name: "MBBR Media",
    Volume: 1,
    
    totalPrice: 19000,
    quantity: 1,
  },
  "diffuser-course": {
    name: "Diffuser (Course)",
    Piece: 1,
    costPerPiece: 700,
    totalPrice: 700,
  },
  "diffuser-fine": {
    name: "Diffuser (Fine)",
    Piece: 1,
    costPerPiece: 700,
    totalPrice: 700,
  },
  "flow-meter": {
    name: "Inlet and Outlet Flow Meter",
    size: 1,
    quantity: 1,
    costPerSize: 23000,
    totalPrice: 100,
  },
  "hypo-dosing": {
    name: "Hypo Dosing with Tank",
    quantity: 1,
    costPerCapacity: 12000,
    totalPrice: 12000,
  },
  "uv-system": {
    name: "UV System Without Analyser",
    Flow: 1,
    quantity: 1,
    costPerFlow: 1000,
    totalPrice: 1000,
  },
  ozonator: {
    name: "Ozonator",
    Flow: 1,
    quantity: 1,
    costPerFlow: 1000,
    totalPrice: 1000,
  },
  "ultra-filtration": {
    name: "Ultra Filtration System",
    Flow: 1,
    quantity: 1,
    costPerFlow: 1000,
    totalPrice: 1000,
  },
  piping: {
    name: "Piping and Fitting",
    quantity: 1,
    totalPrice: 80000,
  },
  cable: {
    name: "Cable and Cable Tray",
    quantity: 1,
    totalPrice: 35000,
  },
  panel: {
    name: "Panel",
    quantity: 1,
    totalPrice: 70000,
  },
  installation: {
    name: "Installation",
    quantity: 1,
    totalPrice: 40000,
  },
  commissioning: {
    name: "Commissioning and Handover",
    quantity: 1,
    totalPrice: 70000,
  },
};

export default equipmentInitialState;