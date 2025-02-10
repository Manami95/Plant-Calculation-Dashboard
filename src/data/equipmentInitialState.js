import { getBlowerTotalCost, getRawSewageTotalCost, getSludgeHoldingTankTotalCost } from '../utils/calculations';

const equipmentInitialState = {
  "raw-sewage": {
    name: "Raw Sewage Transfer Pump",
    capacity: 0,
    quantity: 1,
    totalPrice: getRawSewageTotalCost(1), // Ensure this function handles the input correctly
     
  },
  "oil-skimmer": {
    name: "Oil Skimmer",
    quantity: 1,
    totalPrice: 32000,
  
  },
  "blower": {
    name: "Blower",
    capacity: 0,
    quantity: 1,
    totalPrice: getBlowerTotalCost(1),
   
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
    Volume: 0,
    quantity: 1,
    totalPrice: 7000,
  },
  "carbon-filter": {
    name: "Activated Carbon Filter",
    Volume: 0,
    quantity: 1,
    totalPrice: 7000,
  },
  "tube-media": {
    name: "Tube Deck Media",
    quantity: 1,
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
    Piece: 0,
    totalPrice: 700,
  },
  "diffuser-fine": {
    name: "Diffuser (Fine)",
    Piece: 0,
    totalPrice: 700,
  },
  "flow-meter": {
    name: "Inlet and Outlet Flow Meter",
    size: 0,
    quantity: 1,
    totalPrice: 100,
  },
  "hypo-dosing": {
    name: "Hypo Dosing with Tank",
    quantity: 1,
    totalPrice: 12000,
  },
  "uv-system": {
    name: "UV System Without Analyser",
    capacity: 0,
    quantity: 1,
    totalPrice: 1000,
  },
  ozonator: {
    name: "Ozonator",
    capacity: 0,
    quantity: 1,
    totalPrice: 1000,
  },
  "ultra-filtration": {
    name: "Ultra Filtration System",
    Flow: 0,
    quantity: 1,
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
