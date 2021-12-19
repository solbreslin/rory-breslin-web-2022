import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { isBrowser } from "../../utils";

export default class CustomMap extends Component {
  render() {
    const { data } = this.props;

    if (typeof window !== "undefined") {
      return (
        <div ref={this.el}>
          <MapContainer
            center={[53.331838, -7.700802]}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "72vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map(d => (
              <Marker position={d.coords} key={d.title}>
                <Popup>{d.title}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      );
    }
    return null;
  }
}
