// src/components/ui/BasicMap.jsx
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const BasicMap = ({ center = [113.9213, -0.7893], zoom = 2 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center,
      zoom,
    });
  }, [center, zoom]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter(center);
      map.current.setZoom(zoom);
    }
  }, [center, zoom]);

  return <div ref={mapContainer} className="w-full h-96" />;
};

const MapCard = ({ center, zoom }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indonesia Map</CardTitle>
        {/* <CardDescription>Heatmap peta Kalimantan</CardDescription> */}
      </CardHeader>
      <CardContent className="p-0">
        <BasicMap center={center} zoom={zoom} />
      </CardContent>
    </Card>
  );
};

export default MapCard;
