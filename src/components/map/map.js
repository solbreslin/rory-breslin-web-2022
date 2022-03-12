import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Control } from "leaflet";
import { isBrowser } from "../../utils";
import * as styles from "./map.module.scss";
import icon from "../../images/location-dot-solid.svg";

import { calculateMapHeight } from "./dom-helper";

let markerIcon;
if (isBrowser()) {
  markerIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: [14, 32],
    popupAnchor: [0, -28],
    iconSize: [28, 32],
  });
}

const MAP_CENTER = [53.331838, -7.700802];
const MAP_ZOOM = 6;
const MAP_MIN_HEIGHT = "250";
const MAP_ATTRIBUTION =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const CustomMap = ({ data, clearFilters }) => {
  const [mapHeight, setMapHeight] = useState(null);
  const containerEl = useRef(null);
  const emptyMap = !data || !data.length;

  useEffect(() => {
    if (!isBrowser()) return;

    if (containerEl && containerEl.current) {
      let mapHeight = calculateMapHeight(containerEl.current);

      mapHeight =
        (mapHeight < MAP_MIN_HEIGHT ? MAP_MIN_HEIGHT : mapHeight) + "px";

      setMapHeight(mapHeight);
    }
  }, []);

  const onClearFilters = () => {
    clearFilters();
  };

  return isBrowser() ? (
    <div
      className={styles.container}
      ref={containerEl}
      style={{ height: mapHeight }}
    >
      {mapHeight && (
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          scrollWheelZoom={false}
          style={{ height: mapHeight }}
        >
          <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
          {!emptyMap &&
            data.map(({ coords, title, image, path }) => (
              <Marker
                icon={markerIcon ? markerIcon : null}
                position={coords}
                key={title}
              >
                <Popup>
                  <Link to={path}>
                    <img src={image} alt={title} />
                    <h4>{title}</h4>
                  </Link>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}

      <div className={`${styles.empty} ${emptyMap ? styles.visible : ""}`}>
        <p>No locations found</p>
        <button onClick={onClearFilters} className={styles.button}>
          Clear filters
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CustomMap;
