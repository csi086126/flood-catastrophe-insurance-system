"use client"

// 1. Import necessary React Hooks and components
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";

// 2. Dynamically import (Lazy Load) Leaflet map components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const WMSTileLayer = dynamic(() => import('react-leaflet').then(mod => mod.WMSTileLayer), { ssr: false });

// 3. WMS Layer Configuration
const wmsLayersConfig = {
  flood500yr: { name: 'Flood depth (500-year return)', layer: 'COP:Flood_Depth _Return_Period_500yr' },
  flood200yr: { name: 'Flood depth (200-year return)', layer: 'COP:Flood_Depth _Return_Period_200yr' },
  flood100yr: { name: 'Flood depth (100-year return)', layer: 'COP:Flood_Depth _Return_Period_100yr' },
  flood50yr: { name: 'Flood depth (50-year return)', layer: 'COP:Flood_Depth _Return_Period_50yr' },
  flood20yr: { name: 'Flood depth (20-year return)', layer: 'COP:Flood_Depth _Return_Period_20yr' },
  buildingRisk: { name: 'Building', layer: 'COP:Building' },
  boundary : { name: 'Administrative boundary', layer: ' COP:taiping_boundary' },
  annualrainfall : { name: 'Annual rainfall', layer: ' COP:taiping_Annual_rainfall' },
};

type LayerKey = keyof typeof wmsLayersConfig;

type DisasterEvent = {
  id: string;
  name: string;
  type: string;
  date: string;
  maxWindSpeed: string;
  totalRainfall: string;
  estimatedLoss: string;
  affectedPopulation: string;
  affectedAreas: string[];
};

// 4. Legend Data
const legendData = [
    { color: "#f0f8ff", label: "0.0 - 0.2" },
    { color: "#d6eaff", label: "0.2 - 0.4" },
    { color: "#bce0ff", label: "0.4 - 0.6" },
    { color: "#a2d5ff", label: "0.6 - 0.8" },
    { color: "#87cefa", label: "0.8 - 1.0" },
    { color: "#6FB9F4", label: "1.0 - 2.0" },
    { color: "#3484E5", label: "2.0 - 3.0" },
    { color: "#0D55B6", label: "3.0 - 4.0" },
    { color: "#07396A", label: "4.0 - 5.0" },
    { color: "#08519c", label: "> 5.0" }
];

// --- MOCK DATA FOR EVENTS ---
const mockHistoricalEvents: DisasterEvent[] = [
  {
    id: 'TY2023-Mangkhut',
    name: 'Typhoon Mangkhut',
    type: 'Typhoon',
    date: '2023-09-16',
    maxWindSpeed: '285 km/h',
    totalRainfall: '350 mm',
    estimatedLoss: '$6.27 Billion',
    affectedPopulation: '3.6 Million',
    affectedAreas: ['Hong Kong', 'Guangdong', 'Macau'],
  },
  {
    id: 'RS2024-HK',
    name: 'HK Black Rainstorm',
    type: 'Rainstorm',
    date: '2024-06-08',
    maxWindSpeed: 'N/A',
    totalRainfall: '600 mm in 24h',
    estimatedLoss: '$150 Million',
    affectedPopulation: '7.4 Million',
    affectedAreas: ['Hong Kong Island', 'Kowloon', 'New Territories'],
  },
];

// 6. Legend Component
const Legend = () => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="text-lg font-semibold mb-2">Legend (m)</h3>
      <div className="flex flex-col space-y-1">
        {legendData.map(({ color, label }) => (
          <div key={label} className="flex items-center space-x-3">
            <div 
              className="w-5 h-5 border border-gray-400" 
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// 7. Main Component
export default function Component() {
  const mapRef = useRef(null);
  
  const [visibleLayers, setVisibleLayers] = useState<Record<LayerKey, boolean>>({
    flood500yr: false,
    flood200yr: false,
    flood100yr: false,
    flood50yr: false,
    flood20yr: false,
    buildingRisk: false,
    boundary: false,
    annualrainfall: false,
  });

  const [stochasticIds, setStochasticIds] = useState({
    typhoon: '',
    rainfall: '',
    flood: '',
    stormSurge: '',
  });

  // --- NEW STATE: To hold the currently selected event for detail view ---
  const [selectedEvent, setSelectedEvent] = useState<DisasterEvent | null>(mockHistoricalEvents[0]);

  const handleLayerToggle = (layerKey: LayerKey) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const handleStochasticIdChange = (key: keyof typeof stochasticIds, value: string) => {
    setStochasticIds(prev => ({ ...prev, [key]: value }));
  };

  // --- NEW FUNCTION: To update the selected event ---
  const handleSelectEvent = (event: DisasterEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- Left Sidebar --- */}
        <aside className="w-80 flex-shrink-0 border-r bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold text-red-700 mb-2 pl-2">2. Disaster Event Repository</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historical Disaster Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Render a list of clickable events */}
              {mockHistoricalEvents.map((event) => (
                <Button 
                  key={event.id}
                  variant={selectedEvent?.id === event.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSelectEvent(event)}
                >
                  {event.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Stochastic Events (10,000-year)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="typhoon-id" className="font-normal">Typhoon (ID)</Label>
                <Input id="typhoon-id" placeholder="Enter Typhoon ID" value={stochasticIds.typhoon} onChange={(e) => handleStochasticIdChange('typhoon', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="rainfall-id" className="font-normal">Rainfall (ID)</Label>
                <Input id="rainfall-id" placeholder="Enter Rainfall ID" value={stochasticIds.rainfall} onChange={(e) => handleStochasticIdChange('rainfall', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="flood-id" className="font-normal">Flood (ID)</Label>
                <Input id="flood-id" placeholder="Enter Flood ID" value={stochasticIds.flood} onChange={(e) => handleStochasticIdChange('flood', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="stormSurge-id" className="font-normal">Storm Surge (ID)</Label>
                <Input id="stormSurge-id" placeholder="Enter Storm Surge ID" value={stochasticIds.stormSurge} onChange={(e) => handleStochasticIdChange('stormSurge', e.target.value)} />
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-bold mt-4 mb-2 pl-2">Disaster Details</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event Filtering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-1">
                <Label htmlFor="filter-time">Time</Label>
                <Input id="filter-time" type="date" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="filter-type">Type</Label>
                <Select>
                  <SelectTrigger id="filter-type"><SelectValue placeholder="Select a type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typhoon">Typhoon</SelectItem>
                    <SelectItem value="rainstorm">Rainstorm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="filter-region">Region</Label>
                <Select>
                  <SelectTrigger id="filter-region"><SelectValue placeholder="Select a region" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hongkong">Hong Kong</SelectItem>
                    <SelectItem value="shenzhen">Shenzhen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline">Event Comparison / Export</Button>
              <Button variant="outline">Event Upload / Download</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Central Map Area */}
        <main className="flex-1 relative">
          {/* <div className="absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg border max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Layer Control</h3>
            <div className="flex flex-col space-y-2">
              {Object.entries(wmsLayersConfig).map(([key, { name }]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox id={key} checked={!!visibleLayers[key]} onCheckedChange={() => handleLayerToggle(key)} />
                  <Label htmlFor={key} className="text-sm font-medium leading-none">{name}</Label>
                </div>
              ))}
            </div>
          </div> */}
          {/* <Legend /> */}
          <MapContainer ref={mapRef} center={[22.3193, 114.1694]} zoom={11} style={{ height: "100%", width: "100%" }} className="z-10">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {(Object.entries(visibleLayers) as [LayerKey, boolean][])?.map(([key, isVisible]) => 
              isVisible && wmsLayersConfig[key] && (
                <WMSTileLayer 
                  key={key} 
                  url="http://143.89.22.7:8090/geoserver/wms" 
                  params={{ 
                    layers: wmsLayersConfig[key].layer, 
                    format: 'image/png', 
                    transparent: true, 
                    version: '1.1.0' 
                  }} 
                  attribution="GeoServer Data" 
                />
              )
            )}
          </MapContainer>
        </main>

        {/* --- NEW: Right Sidebar for Event Details --- */}
        <aside className="w-80 flex-shrink-0 border-l bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold mb-2 pl-2">Event Details</h2>
          
          {selectedEvent ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedEvent.name}</CardTitle>
                  <p className="text-sm text-gray-500">{selectedEvent.type} - {selectedEvent.date}</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Impact Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Max Wind Speed:</span> <span className="font-medium">{selectedEvent.maxWindSpeed}</span></div>
                  <div className="flex justify-between"><span>Total Rainfall:</span> <span className="font-medium">{selectedEvent.totalRainfall}</span></div>
                  <div className="flex justify-between"><span>Estimated Loss:</span> <span className="font-medium text-red-600">{selectedEvent.estimatedLoss}</span></div>
                  <div className="flex justify-between"><span>Affected Population:</span> <span className="font-medium">{selectedEvent.affectedPopulation}</span></div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Affected Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selectedEvent.affectedAreas.map(area => <li key={area}>{area}</li>)}
                  </ul>
                </CardContent>
              </Card>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">Select an event from the left panel to view its details.</p>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}