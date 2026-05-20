'use client';

import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CHENNAI_CENTER: [number, number] = [13.0827, 80.2707];

interface Job {
  id: string;
  title: string;
  lat: number;
  lng: number;
  isUrgent: boolean;
  pay: number;
}

interface Props {
  jobs: Job[];
}

const AdminJobMap = ({ jobs }: Props) => (
  <div style={{ height: "400px", width: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-light)" }}>
    <MapContainer
      center={CHENNAI_CENTER}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {jobs.map(job => (
        <CircleMarker
          key={job.id}
          center={[job.lat, job.lng]}
          radius={job.isUrgent ? 10 : 7}
          pathOptions={{
            fillColor: job.isUrgent ? "#FF6B2B" : "#3B82F6",
            color: "transparent",
            fillOpacity: 0.75
          }}
        >
          <Tooltip>
            <strong>{job.title}</strong><br/>₹{job.pay}/day
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  </div>
);

export default AdminJobMap;
