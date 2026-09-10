import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { riskZones } from "../../data/mockData";

function getRiskColor(risk) {
  if (risk >= 90) return "#ff4d5a";
  if (risk >= 75) return "#ff9f43";
  if (risk >= 55) return "#f6c945";

  return "#38c98a";
}

function RiskMap() {
  return (
    <div className="risk-map">

      <MapContainer
        center={[31.1048, 77.1734]}
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {riskZones.map((zone) => {
          const riskColor = getRiskColor(zone.risk);

          return (
            <CircleMarker
              key={zone.id}
              center={zone.position}
              radius={10}
              pathOptions={{
                color: riskColor,
                fillColor: riskColor,
                fillOpacity: 0.72,
                weight: 2,
              }}
            >
              <Popup>
                <div className="map-popup">
                  <span className="map-popup-id">
                    INCIDENT
                  </span>

                  <strong>{zone.name}</strong>

                  <span>{zone.type}</span>

                  <div className="map-popup-risk">
                    <span>Risk Score</span>
                    <strong>{zone.risk}%</strong>
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

          <h3>Live Risk Map</h3>
        </div>

        <div className="map-live">
          <span />
          LIVE
        </div>
      </div>

      {/* MAP CONTROLS */}

      <div className="map-controls">

        <button className="map-control active">
          Risk
        </button>

        <button className="map-control">
          Terrain
        </button>

        <button className="map-control">
          Roads
        </button>

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