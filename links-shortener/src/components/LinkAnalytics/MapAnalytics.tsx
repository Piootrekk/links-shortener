import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { TDetails } from "@/schemas/dbSchema";
import { cn } from "@/lib/utils";

type AnalyticsMapProps = {
  data: TDetails[];
  selectedId: string | null;
  onCloseMarker: () => void;
};

const AnalyticsMap: React.FC<AnalyticsMapProps> = ({
  data,
  selectedId,
  onCloseMarker,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      L.control
        .zoom({
          position: "topright",
        })
        .addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      const tileLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",

        {
          subdomains: "abcd",
          maxZoom: 20,
        }
      );

      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });

      tileLayer.addTo(mapInstanceRef.current);

      if (markersRef.current) {
        mapInstanceRef.current.removeLayer(markersRef.current);
      }

      markersRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="${cn(
              "flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm",
              "bg-blue-500 text-white"
            )}">${count}</div>`,
            className: "custom-cluster-icon",
            iconSize: L.point(32, 32),
          });
        },
      });

      const uniqueCoordinates = new Set<string>();

      data.forEach((point) => {
        const coordKey = `${point.latitude},${point.longitude}`;
        if (!uniqueCoordinates.has(coordKey)) {
          uniqueCoordinates.add(coordKey);
          if (!point.latitude || !point.longitude) return;
          const marker = L.marker([point.latitude, point.longitude], {
            icon: L.divIcon({
              html: `<div class="${cn(
                "w-3 h-3 rounded-full bg-blue-500"
              )}"></div>`,
              className: "custom-div-icon",
              iconSize: L.point(12, 12),
              iconAnchor: [6, 6],
            }),
          });
          marker.bindPopup(
            `Latitude: ${point.latitude}<br>Longitude: ${point.longitude}`
          );
          marker.on("popupclose", onCloseMarker);
          markersRef.current?.addLayer(marker);
        }
      });

      mapInstanceRef.current.addLayer(markersRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [data]);

  useEffect(() => {
    if (selectedId && mapInstanceRef.current && markersRef.current) {
      const selectedPoint = data.find((point) => point.id === selectedId);
      if (selectedPoint) {
        if (!selectedPoint.latitude || !selectedPoint.longitude) return;
        mapInstanceRef.current.setView(
          [selectedPoint.latitude, selectedPoint.longitude],
          10
        );
        const markers = markersRef.current.getLayers();
        const selectedMarker = markers.find(
          (marker: any) =>
            marker.getLatLng().lat === selectedPoint.latitude &&
            marker.getLatLng().lng === selectedPoint.longitude
        ) as L.Marker;
        if (selectedMarker) {
          selectedMarker.openPopup();
        }
      }
    }
  }, [selectedId, data]);

  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md")}>
      <div ref={mapRef} className="h-[400px] w-full" />
    </div>
  );
};

export default AnalyticsMap;
