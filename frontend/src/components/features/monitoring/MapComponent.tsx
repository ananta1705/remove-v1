"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix missing marker icons in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface TPSLocation {
  id: number;
  name: string;
  address: string;
  volume?: string;
  status: string;
  capacity?: string;
  lastUpdate?: string;
  coordinates: { x: number; y: number };
  active: boolean;
  upkp?: string;
}

interface MapComponentProps {
  tpsList: TPSLocation[];
  selectedTPS: number | null;
  onMarkerClick: (id: number | null) => void;
}

// Default center (Jakarta)
const mapCenter = [-6.200000, 106.816666];

function convertToLatLng(x: number, y: number): [number, number] {
  // Map x/y (0-100) to small lat/lng offsets for demonstration
  const latOffset = (50 - y) * 0.001;
  const lngOffset = (x - 50) * 0.001;
  return [mapCenter[0] + latOffset, mapCenter[1] + lngOffset];
}

function getCustomIcon(status: string, isSelected: boolean) {
  let color = "#9ca3af";
  if (status === "Normal") color = "#14CC99";
  if (status === "Peringatan") color = "#f59e0b";
  if (status === "Penuh") color = "#ef4444";

  return L.divIcon({
    className: "custom-tps-marker",
    html: `
      <div style="
        width: ${isSelected ? '28px' : '22px'};
        height: ${isSelected ? '28px' : '22px'};
        background-color: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px ${color}80;
        transform: translate(-50%, -50%);
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function MapUpdater({ selectedTPS, tpsList }: { selectedTPS: number | null, tpsList: TPSLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedTPS) {
      const tps = tpsList.find(t => t.id === selectedTPS);
      if (tps) {
        const [lat, lng] = convertToLatLng(tps.coordinates.x, tps.coordinates.y);
        map.flyTo([lat, lng], 15, { duration: 0.5 });
      }
    }
  }, [selectedTPS, tpsList, map]);
  return null;
}

export default function MapComponent({ tpsList, selectedTPS, onMarkerClick }: MapComponentProps) {
  useEffect(() => {
    return () => {
      // Cleanup to fix "Map container is already initialized" error during Next.js Fast Refresh
      const container = document.getElementById("monitoring-map");
      if (container) {
        (container as any)._leaflet_id = null;
      }
    };
  }, []);

  return (
    <MapContainer
      id="monitoring-map"
      center={mapCenter as [number, number]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%", minHeight: "450px", zIndex: 10 }}
      zoomControl={false}
    >
      {/* Light basemap style similar to Google Maps */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      {/* Custom Zoom Control */}
      <ZoomControl position="topright" />
      
      {tpsList.map((tps) => {
        const [lat, lng] = convertToLatLng(tps.coordinates.x, tps.coordinates.y);
        return (
          <Marker
            key={tps.id}
            position={[lat, lng]}
            icon={getCustomIcon(tps.status, selectedTPS === tps.id)}
            eventHandlers={{
              click: () => onMarkerClick(tps.id === selectedTPS ? null : tps.id),
            }}
          >
            <Popup offset={[0, -10]}>
              <div className="text-sm font-semibold">{tps.name}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">{tps.address}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{
                  background: tps.status === "Normal" ? "#14CC9920" : tps.status === "Peringatan" ? "#f59e0b20" : tps.status === "Penuh" ? "#ef444420" : "#9ca3af20",
                  color: tps.status === "Normal" ? "#14CC99" : tps.status === "Peringatan" ? "#f59e0b" : tps.status === "Penuh" ? "#ef4444" : "#9ca3af"
                }}>
                  {tps.status}
                </span>
                {tps.volume && <span className="text-xs font-bold">{tps.volume}</span>}
              </div>
            </Popup>
          </Marker>
        );
      })}

      <MapUpdater selectedTPS={selectedTPS} tpsList={tpsList} />
    </MapContainer>
  );
}
