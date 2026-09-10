export const dashboardStats = [
  {
    label: "Critical Risk",
    value: "12",
    change: "+3",
    description: "requiring immediate attention",
    level: "critical",
  },
  {
    label: "High Risk",
    value: "27",
    change: "+5",
    description: "under active monitoring",
    level: "high",
  },
  {
    label: "Moderate Risk",
    value: "43",
    change: "-2",
    description: "within monitored zones",
    level: "moderate",
  },
  {
    label: "Road Blocks",
    value: "04",
    change: "+1",
    description: "currently affecting routes",
    level: "road",
  },
];

export const incidents = [
  {
    id: "GS-1042",
    title: "NH-05 Landslide",
    location: "Shimla–Rampur Highway",
    risk: 96,
    severity: "critical",
    time: "2 min ago",
  },
  {
    id: "GS-1041",
    title: "Soil Movement",
    location: "Mashobra Sector",
    risk: 91,
    severity: "critical",
    time: "8 min ago",
  },
  {
    id: "GS-1038",
    title: "Road Crack",
    location: "Kufri Bypass",
    risk: 78,
    severity: "high",
    time: "14 min ago",
  },
  {
    id: "GS-1035",
    title: "Slope Instability",
    location: "Theog Region",
    risk: 68,
    severity: "high",
    time: "21 min ago",
  },
];

export const activities = [
  {
    type: "incident",
    title: "Critical incident reported",
    description: "NH-05 landslide report received",
    time: "2 min ago",
  },
  {
    type: "analysis",
    title: "Risk analysis completed",
    description: "GS-1041 classified as critical",
    time: "8 min ago",
  },
  {
    type: "dispatch",
    title: "Response team dispatched",
    description: "Unit R-07 assigned to Kufri",
    time: "11 min ago",
  },
  {
    type: "road",
    title: "Road status updated",
    description: "NH-05 marked as high risk",
    time: "17 min ago",
  },
];

export const riskZones = [
  {
    id: 1,
    name: "NH-05",
    position: [31.1048, 77.1734],
    risk: 96,
    type: "Landslide",
  },
  {
    id: 2,
    name: "Mashobra",
    position: [31.1312, 77.2345],
    risk: 91,
    type: "Soil Movement",
  },
  {
    id: 3,
    name: "Kufri",
    position: [31.0974, 77.2673],
    risk: 78,
    type: "Road Crack",
  },
  {
    id: 4,
    name: "Theog",
    position: [31.1217, 77.3587],
    risk: 68,
    type: "Slope Instability",
  },
];