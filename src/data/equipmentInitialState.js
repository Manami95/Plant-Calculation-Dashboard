
const equipmentInitialState = {
  "raw-sewage": {
    name: "Raw Sewage Transfer Pump",
    capacity: 0,
    quantity: 1,
    costPerCapacity: 11000,
    totalPrice: 11000,
  },
  "oil-skimmer": { name: "Oil Skimmer", quantity: 1, costPerCapacity: 25000, totalPrice: 25000 },
  blower: { name: "Blower", capacity: 0, quantity: 1, costPerCapacity: 50000, totalPrice: 50000 },
  "sludge-pump": {
    name: "Sludge Recirculation Pump",
    capacity: 0,
    quantity: 1,
    costPerCapacity: 30000,
    totalPrice: 30000,
  },
  "filter-pump": { name: "Filter Feed Pump", capacity: 0, quantity: 1, costPerCapacity: 20000, totalPrice: 20000 },
  "multi-grade-filter": {
    name: "Multi Grade Filter",
    Diameter: 0,
    height: 0,
    costPerDiameter: 7000,
    totalPrice: 7000,
  },
  "carbon-filter": { name: "Activated Carbon Filter", quantity: 1, costPerCapacity: 7000, totalPrice: 7000 },
  "tube-media": { name: "Tube Deck Media", quantity: 1, costPerCapacity: 7000, totalPrice: 7000 },
  "mbbr-media": { name: "MBBR Media", Volume: 0, costPerVolume: 19000, totalPrice: 9500 },
  "diffuser-course": { name: "Diffuser (Course)", Piece: 0, costPerPiece: 700, totalPrice: 700 },
  "diffuser-fine": { name: "Diffuser (Fine)", Piece: 0, costPerPiece: 700, totalPrice: 700 },
  "flow-meter": {
    name: "Inlet and Outlet Flow Meter",
    size: 0,
    quantity: 1,
    costPerSize: 23000,
    totalPrice: 23000,
  },
  "hypo-dosing": { name: "Hypo Dosing with Tank", quantity: 1, costPerCapacity: 12000, totalPrice: 12000 },
  "uv-system": { name: "UV System Without Analyser", Flow: 0, quantity: 1, costPerFlow: 1000, totalPrice: 1000 },
  ozonator: { name: "Ozonator", Flow: 0, quantity: 1, costPerFlow: 1000, totalPrice: 1000 },
  "ultra-filtration": { name: "Ultra Filtration System", Flow: 0, quantity: 1, costPerFlow: 1000, totalPrice: 1000 },
  piping: { name: "Piping and Fitting", quantity: 1, costPerCapacity: 80000, totalPrice: 80000 },
  cable: { name: "Cable and Cable Tray", quantity: 1, costPerCapacity: 35000, totalPrice: 35000 },
  panel: { name: "Panel", quantity: 1, costPerCapacity: 70000, totalPrice: 70000 },
  installation: { name: "Installation", quantity: 1, costPerCapacity: 40000, totalPrice: 40000 },
  commissioning: { name: "Commissioning and Handover", quantity: 1, costPerCapacity: 70000, totalPrice: 70000 },
}

export default equipmentInitialState

