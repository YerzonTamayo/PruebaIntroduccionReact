import React from "react";
import { MapContainer, TileLayer,Marker} from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export default function Mapa(props) {

  return (
    <div className="Content">
      <MapContainer center={props.cordenadas} zoom={25} scrollWheelZoom={false} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={props.cordenadas}>
        </Marker>
      </MapContainer>
    </div>
  );
}
