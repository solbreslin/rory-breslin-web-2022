import React from "react";
import { Link } from "gatsby";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { isBrowser } from "../../utils";
import * as styles from "./map.module.scss";
import icon from "../../images/location-dot-solid.svg";

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
const MAP_ZOOM = 7;
const MAP_HEIGHT = "100%";
const MAP_ATTRIBUTION =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const CustomMap = ({ data, clearFilters }) => {
  const emptyMap = !data || !data.length;

  const onClearFilters = () => {
    clearFilters();
  };

  return isBrowser() ? (
    <div className={styles.container}>
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        scrollWheelZoom={false}
        style={{ height: MAP_HEIGHT }}
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
