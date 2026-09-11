import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { riskZones } from "../../data/mockData";


function getRiskColor(risk) {
  if (risk >= 90) return "#ff4d5a";
  if (risk >= 75) return "#ff9f43";
  if (risk >= 55) return "#f6c945";

  return "#38c98a";
}
function MapTracker({ targetPosition }) {
  const map = useMap();

  useEffect(() => {
    if (!targetPosition) return;

    map.flyTo(targetPosition, 14, {
      duration: 1.2,
    });
  }, [map, targetPosition]);

  return null;
}


function RiskMap({ onZoneSelect, targetPosition }) {
  const [mapMode, setMapMode] = useState("risk");


  const mapLayers = {
    risk: {
      label: "Live Risk",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
    },

    terrain: {
      label: "Terrain",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; OpenStreetMap contributors, SRTM | OpenTopoMap",
    },

    roads: {
      label: "Road Network",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
    },
  };


  const activeLayer = mapLayers[mapMode];


  return (
    <div className="risk-map">

      {/* MAP */}

      <MapContainer
        center={[31.1048, 77.1734]}
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={false}
      >

        <TileLayer
          key={mapMode}
          attribution={activeLayer.attribution}
          url={activeLayer.url}
        />


        <ZoomControl position="bottomright" />
        <MapTracker targetPosition={targetPosition} />


        {/* RISK ZONES */}

        {riskZones.map((zone) => {

          const riskColor = getRiskColor(zone.risk);


          return (
            <CircleMarker
              key={zone.id}
              center={zone.position}
              radius={10}
              eventHandlers={{
                click: () => {
                  if (onZoneSelect) {
                    onZoneSelect(zone);
                  }
                },
              }}
              pathOptions={{
                color: riskColor,
                fillColor: riskColor,
                fillOpacity:
                  mapMode === "roads"
                    ? 0.55
                    : 0.72,
                weight: 2,
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
          );

        })}

      </MapContainer>


      {/* MAP HEADER */}

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


      {/* MAP CONTROLS */}

      <div className="map-controls">

        <button
          className={`map-control ${
            mapMode === "risk" ? "active" : ""
          }`}
          onClick={() => setMapMode("risk")}
        >
          Risk
        </button>


        <button
          className={`map-control ${
            mapMode === "terrain" ? "active" : ""
          }`}
          onClick={() => setMapMode("terrain")}
        >
          Terrain
        </button>


        <button
          className={`map-control ${
            mapMode === "roads" ? "active" : ""
          }`}
          onClick={() => setMapMode("roads")}
        >
          Roads
        </button>

      </div>


      {/* ACTIVE LAYER INDICATOR */}

      <div className="map-layer-status">

        <span className="map-layer-status-dot" />

        <span>
          {activeLayer.label}
        </span>

      </div>


      {/* LEGEND */}

      <div className="map-legend">

        <div className="legend-title">
          RISK LEVEL
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

      </div>

    </div>
  );
}


export default RiskMap;