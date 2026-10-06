let locations = [
  { id: "A", name: "Rescue Base", type: "Rescue Base" },
  { id: "B", name: "Residential Area", type: "Disaster Zone" },
  { id: "C", name: "Hospital", type: "Hospital" },
  { id: "D", name: "Shelter", type: "Shelter" },
  { id: "E", name: "Police Station", type: "Police Station" },
  { id: "F", name: "Market", type: "Disaster Zone" },
  { id: "G", name: "Relief Center", type: "Relief Center" },
  { id: "H", name: "School", type: "Disaster Zone" }
];

let roads = [
  { from: "A", to: "B", distance: 6, risk: 1, status: "open" },
  { from: "A", to: "C", distance: 4, risk: 2, status: "open" },
  { from: "A", to: "D", distance: 3, risk: 7, status: "open" },
  { from: "B", to: "C", distance: 5, risk: 2, status: "open" },
  { from: "B", to: "E", distance: 8, risk: 1, status: "open" },
  { from: "C", to: "D", distance: 6, risk: 5, status: "open" },
  { from: "C", to: "F", distance: 3, risk: 1, status: "open" },
  { from: "D", to: "E", distance: 4, risk: 7, status: "open" },
  { from: "D", to: "G", distance: 5, risk: 2, status: "open" },
  { from: "E", to: "F", distance: 2, risk: 1, status: "open" },
  { from: "E", to: "H", distance: 6, risk: 4, status: "open" },
  { from: "F", to: "G", distance: 4, risk: 2, status: "open" },
  { from: "G", to: "H", distance: 5, risk: 2, status: "open" }
];

// Deep copy initial state for resetting
const initialLocations = JSON.parse(JSON.stringify(locations));
const initialRoads = JSON.parse(JSON.stringify(roads));

const scenarios = {
  flood: [
    { from: "B", to: "E", status: "blocked" },
    { from: "E", to: "H", status: "high risk", risk: 5 },
    { from: "C", to: "F", status: "blocked" }
  ],
  earthquake: [
    { from: "A", to: "C", status: "blocked" },
    { from: "D", to: "G", status: "blocked" },
    { from: "B", to: "C", status: "high risk", risk: 4 }
  ],
  fire: [
    { from: "F", to: "G", status: "blocked" },
    { from: "C", to: "F", status: "high risk", risk: 5 }
  ]
};

const getGraphState = () => ({ locations, roads });

const updateRoadStatus = (from, to, status, risk) => {
  const road = roads.find(r => (r.from === from && r.to === to) || (r.from === to && r.to === from));
  if (road) {
    if (status) road.status = status;
    if (risk !== undefined) road.risk = risk;
  }
};

const loadScenario = (scenarioName) => {
  // Reset to initial
  locations = JSON.parse(JSON.stringify(initialLocations));
  roads = JSON.parse(JSON.stringify(initialRoads));
  
  if (scenarios[scenarioName]) {
    scenarios[scenarioName].forEach(change => {
      updateRoadStatus(change.from, change.to, change.status, change.risk);
    });
  }
};

module.exports = {
  getGraphState,
  updateRoadStatus,
  loadScenario,
  scenarios
};
