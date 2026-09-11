import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { riskZones, incidents } from "../../data/mockData";


function getRiskColor(risk) {
  if (risk >= 90) return "#ff4d5a";
  if (risk >= 75) return "#ff9f43";
  if (risk >= 55) return "#f6c945";

  return "#38c98a";
}


/*
  Frontend mock response units.
  Later this data can come from the FastAPI
  backend / WebSocket stream.
*/
const responseUnits = [
  {
    id: "R-07",
    team: "Rapid Response Alpha",
    incident: "GS-1042",
    location: "NH-05 Landslide",
    status: "Dispatched",
    eta: "08 min",
    coordinates: [31.1048, 77.1734],
  },
  {
    id: "R-04",
    team: "Mountain Rescue Unit",
    incident: "GS-1041",
    location: "Mashobra Soil Movement",
    status: "En Route",
    eta: "14 min",
    coordinates: [31.1312, 77.2345],
  },
  {
    id: "R-11",
    team: "Road Response Bravo",
    incident: "GS-1038",
    location: "Kufri Road Crack",
    status: "Assigned",
    eta: "21 min",
    coordinates: [31.0974, 77.2673],
  },
  {
    id: "R-03",
    team: "Field Assessment Team",
    incident: "GS-1035",
    location: "Theog Slope Instability",
    status: "Monitoring",
    eta: "32 min",
    coordinates: [31.1217, 77.3587],
  },
];


/*
  Frontend mock road-block data.

  These coordinates come from the same road
  data already used by the Road Network page.
*/
const roadBlocks = [
  {
    id: "RD-204",
    name: "NH-05",
    condition: "Blocked",
    severity: "critical",
    risk: 96,
    issue: "Landslide",
    coordinates: [31.1312, 77.2345],
  },
  {
    id: "RD-198",
    name: "NH-205",
    condition: "Restricted",
    severity: "high",
    risk: 82,
    issue: "Road Crack",
    coordinates: [31.0974, 77.2673],
  },
  {
    id: "RD-191",
    name: "SH-13",
    condition: "At Risk",
    severity: "high",
    risk: 74,
    issue: "Slope Instability",
    coordinates: [31.1217, 77.3587],
  },
];


/*
  Handles map movement when a response
  unit or field report is being tracked.
*/
function MapTracker({ targetPosition }) {
  const map = useMap();

  useEffect(() => {
    if (!targetPosition) {
      return;
    }

    const [latitude, longitude] =
      targetPosition;

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return;
    }

    map.flyTo(
      [latitude, longitude],
      14,
      {
        duration: 1.2,
        easeLinearity: 0.25,
      }
    );

  }, [map, targetPosition]);

  return null;
}


function RiskMap({
  onZoneSelect,
  targetPosition,
}) {
  const [mapMode, setMapMode] =
    useState("risk");


  const [selectedZoneId, setSelectedZoneId] =
    useState(null);


  const [selectedUnitId, setSelectedUnitId] =
    useState(null);


  /*
    Map intelligence layer visibility.
  */
  const [layers, setLayers] = useState({
    riskZones: true,
    responseUnits: true,
    incidents: true,
    roadBlocks: true,
  });


  const mapLayers = {
    risk: {
      label: "Live Risk",
      url:
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; OpenStreetMap contributors",
    },

    terrain: {
      label: "Terrain",
      url:
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; OpenStreetMap contributors, SRTM | OpenTopoMap",
    },

    roads: {
      label: "Road Network",
      url:
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; OpenStreetMap contributors",
    },
  };


  const activeLayer =
    mapLayers[mapMode];


  function toggleLayer(layerName) {

    setLayers((current) => ({
      ...current,
      [layerName]:
        !current[layerName],
    }));

  }


  function handleZoneSelect(zone) {

    setSelectedZoneId(
      zone.id
    );

    setSelectedUnitId(
      null
    );

    if (onZoneSelect) {
      onZoneSelect(zone);
    }

  }


  function handleUnitSelect(unit) {

    setSelectedUnitId(
      unit.id
    );

    setSelectedZoneId(
      null
    );

  }


  return (
    <div className="risk-map">

      {/* =================================================
          MAP
          ================================================= */}

      <MapContainer
        center={[31.1048, 77.1734]}
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={false}
      >

        <TileLayer
          key={mapMode}
          attribution={
            activeLayer.attribution
          }
          url={activeLayer.url}
        />


        <ZoomControl
          position="bottomright"
        />


        {/* TRACKING */}

        <MapTracker
          targetPosition={targetPosition}
        />


        {/* =================================================
            RISK ZONES
            ================================================= */}

        {layers.riskZones &&
          riskZones.map((zone) => {

            const riskColor =
              getRiskColor(
                zone.risk
              );


            const isSelected =
              selectedZoneId === zone.id;


            const riskRadius =
              zone.risk >= 90
                ? 900
                : zone.risk >= 75
                ? 700
                : zone.risk >= 55
                ? 550
                : 400;


            return (
              <span key={zone.id}>

                <Circle
                  center={zone.position}
                  radius={riskRadius}
                  pathOptions={{
                    color: riskColor,

                    fillColor:
                      riskColor,

                    fillOpacity:
                      mapMode === "roads"
                        ? 0.07
                        : isSelected
                        ? 0.16
                        : 0.10,

                    weight:
                      isSelected
                        ? 2
                        : 1,

                    opacity:
                      isSelected
                        ? 0.65
                        : 0.38,
                  }}
                />


                <CircleMarker
                  center={zone.position}
                  radius={
                    isSelected
                      ? 13
                      : 10
                  }

                  eventHandlers={{
                    click: () => {
                      handleZoneSelect(
                        zone
                      );
                    },
                  }}

                  pathOptions={{
                    color: riskColor,

                    fillColor:
                      riskColor,

                    fillOpacity:
                      isSelected
                        ? 0.90
                        : 0.72,

                    weight:
                      isSelected
                        ? 3
                        : 2,

                    opacity: 1,
                  }}
                >

                  <Popup>

                    <div className="map-popup">

                      <span className="map-popup-id">
                        RISK ZONE
                      </span>

                      <strong>
                        {zone.name}
                      </strong>

                      <span>
                        {zone.type}
                      </span>

                      <div className="map-popup-risk">

                        <span>
                          Risk Score
                        </span>

                        <strong>
                          {zone.risk}%
                        </strong>

                      </div>

                    </div>

                  </Popup>

                </CircleMarker>

              </span>
            );

          })}


        {/* =================================================
            RESPONSE UNITS
            ================================================= */}

        {layers.responseUnits &&
          responseUnits.map((unit) => {

            const isSelected =
              selectedUnitId === unit.id;


            return (
              <CircleMarker
                key={unit.id}
                center={unit.coordinates}
                radius={
                  isSelected
                    ? 9
                    : 7
                }

                eventHandlers={{
                  click: () => {
                    handleUnitSelect(
                      unit
                    );
                  },
                }}

                pathOptions={{
                  color: "#72a9ff",
                  fillColor: "#72a9ff",

                  fillOpacity:
                    isSelected
                      ? 0.95
                      : 0.75,

                  weight:
                    isSelected
                      ? 3
                      : 2,

                  opacity: 1,
                }}
              >

                <Popup>

                  <div className="map-popup">

                    <span className="map-popup-id">
                      RESPONSE UNIT
                    </span>

                    <strong>
                      {unit.id}
                    </strong>

                    <span>
                      {unit.team}
                    </span>

                    <div className="map-popup-risk">

                      <span>
                        STATUS
                      </span>

                      <strong>
                        {unit.status}
                      </strong>

                    </div>

                    <div className="map-popup-risk">

                      <span>
                        ETA
                      </span>

                      <strong>
                        {unit.eta}
                      </strong>

                    </div>

                  </div>

                </Popup>

              </CircleMarker>
            );

          })}


        {/* =================================================
            INCIDENT LOCATIONS
            ================================================= */}

        {layers.incidents &&
          incidents.map((incident) => {

            const incidentZone =
              riskZones.find(
                (zone) =>
                  zone.type ===
                  incident.title
              );


            /*
              Some incident titles don't exactly
              match the zone type, so fall back
              to the corresponding coordinates.
            */
            const incidentCoordinates =
              incident.id === "GS-1042"
                ? [31.1048, 77.1734]
                : incident.id === "GS-1041"
                ? [31.1312, 77.2345]
                : incident.id === "GS-1038"
                ? [31.0974, 77.2673]
                : [31.1217, 77.3587];


            return (
              <CircleMarker
                key={`incident-${incident.id}`}
                center={
                  incidentZone?.position ||
                  incidentCoordinates
                }

                radius={5}

                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#ffffff",

                  fillOpacity: 0.90,

                  weight: 2,

                  opacity: 0.95,
                }}
              >

                <Popup>

                  <div className="map-popup">

                    <span className="map-popup-id">
                      INCIDENT LOCATION
                    </span>

                    <strong>
                      {incident.id}
                    </strong>

                    <span>
                      {incident.title}
                    </span>

                    <div className="map-popup-risk">

                      <span>
                        RISK
                      </span>

                      <strong>
                        {incident.risk}%
                      </strong>

                    </div>

                  </div>

                </Popup>

              </CircleMarker>
            );

          })}


        {/* =================================================
            ROAD BLOCKS
            ================================================= */}

        {layers.roadBlocks &&
          roadBlocks.map((road) => {

            const isBlocked =
              road.condition ===
              "Blocked";


            return (
              <CircleMarker
                key={`road-${road.id}`}
                center={
                  road.coordinates
                }

                radius={
                  isBlocked
                    ? 6
                    : 5
                }

                pathOptions={{
                  color: "#ff9f43",

                  fillColor:
                    isBlocked
                      ? "#ff4d5a"
                      : "#ff9f43",

                  fillOpacity:
                    0.90,

                  weight: 2,

                  opacity: 1,
                }}
              >

                <Popup>

                  <div className="map-popup">

                    <span className="map-popup-id">
                      ROAD STATUS
                    </span>

                    <strong>
                      {road.name}
                    </strong>

                    <span>
                      {road.condition}
                    </span>

                    <div className="map-popup-risk">

                      <span>
                        ACTIVE ISSUE
                      </span>

                      <strong>
                        {road.issue}
                      </strong>

                    </div>

                  </div>

                </Popup>

              </CircleMarker>
            );

          })}

      </MapContainer>


      {/* =================================================
          MAP HEADER
          ================================================= */}

      <div className="map-overlay-top">

        <div>

          <span className="panel-eyebrow">
            GEOSPATIAL INTELLIGENCE
          </span>

          <h3>
            Live Risk Map
          </h3>

        </div>


        <div className="map-live">

          <span />

          LIVE

        </div>

      </div>


      {/* =================================================
          MAP CONTROLS
          ================================================= */}

      <div className="map-controls">

        <button
          type="button"
          className={`map-control ${
            mapMode === "risk"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMapMode("risk")
          }
        >
          Risk
        </button>


        <button
          type="button"
          className={`map-control ${
            mapMode === "terrain"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMapMode("terrain")
          }
        >
          Terrain
        </button>


        <button
          type="button"
          className={`map-control ${
            mapMode === "roads"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMapMode("roads")
          }
        >
          Roads
        </button>

      </div>


      {/* =================================================
          MAP INTELLIGENCE
          ================================================= */}

      <div className="map-intelligence-controls">

        <div className="map-intelligence-title">
          MAP INTELLIGENCE
        </div>


        <button
          type="button"
          className={`map-intelligence-toggle ${
            layers.riskZones
              ? "active"
              : ""
          }`}
          onClick={() =>
            toggleLayer(
              "riskZones"
            )
          }
        >

          <span
            className="map-intelligence-indicator risk"
          />

          <span>
            Risk Zones
          </span>

          <span className="map-intelligence-check">
            {layers.riskZones
              ? "ON"
              : "OFF"}
          </span>

        </button>


        <button
          type="button"
          className={`map-intelligence-toggle ${
            layers.responseUnits
              ? "active"
              : ""
          }`}
          onClick={() =>
            toggleLayer(
              "responseUnits"
            )
          }
        >

          <span
            className="map-intelligence-indicator unit"
          />

          <span>
            Response Units
          </span>

          <span className="map-intelligence-check">
            {layers.responseUnits
              ? "ON"
              : "OFF"}
          </span>

        </button>


        <button
          type="button"
          className={`map-intelligence-toggle ${
            layers.incidents
              ? "active"
              : ""
          }`}
          onClick={() =>
            toggleLayer(
              "incidents"
            )
          }
        >

          <span
            className="map-intelligence-indicator incident"
          />

          <span>
            Incident Locations
          </span>

          <span className="map-intelligence-check">
            {layers.incidents
              ? "ON"
              : "OFF"}
          </span>

        </button>


        <button
          type="button"
          className={`map-intelligence-toggle ${
            layers.roadBlocks
              ? "active"
              : ""
          }`}
          onClick={() =>
            toggleLayer(
              "roadBlocks"
            )
          }
        >

          <span
            className="map-intelligence-indicator road"
          />

          <span>
            Road Blocks
          </span>

          <span className="map-intelligence-check">
            {layers.roadBlocks
              ? "ON"
              : "OFF"}
          </span>

        </button>

      </div>


      {/* =================================================
          ACTIVE LAYER INDICATOR
          ================================================= */}

      <div className="map-layer-status">

        <span className="map-layer-status-dot" />

        <span>
          {activeLayer.label}
        </span>

      </div>


      {/* =================================================
          LEGEND
          ================================================= */}

      <div className="map-legend">

        <div className="legend-title">
          MAP LEGEND
        </div>


        <div className="legend-item">

          <span className="legend-dot critical" />

          Critical

        </div>


        <div className="legend-item">

          <span className="legend-dot high" />

          High

        </div>


        <div className="legend-item">

          <span className="legend-dot moderate" />

          Moderate

        </div>


        <div className="legend-item">

          <span className="legend-dot low" />

          Low

        </div>


        <div className="legend-item">

          <span className="legend-unit" />

          Response Unit

        </div>


        <div className="legend-item">

          <span className="legend-incident" />

          Incident

        </div>


        <div className="legend-item">

          <span className="legend-road" />

          Road Block

        </div>

      </div>

    </div>
  );
}


export default RiskMap;