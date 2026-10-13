import { MapContainer, TileLayer } from 'react-leaflet';
import { env } from '@/config/env';

/** Shared OpenStreetMap base used by every map in the app. */
export default function BaseMap({ center = env.mapCenter, zoom = env.mapZoom, className = 'h-full w-full', children, ...props }) {
  return (
    <MapContainer center={center} zoom={zoom} className={className} scrollWheelZoom {...props}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {children}
    </MapContainer>
  );
}
