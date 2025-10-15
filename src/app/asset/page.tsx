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

// --- NEW: MOCK DATA FOR A SELECTED ASSET ---
const mockAsset = {
  id: 'ASSET-HK-00123',
  name: 'Taiping Financial Centre',
  type: 'Commercial Building',
  address: '1 Connaught Road Central, Hong Kong',
  totalInsuredValue: '$5.2 Billion',
  policyId: 'TP-PROP-2024-888',
  coverageType: 'Property All Risks',
  premium: '$1.2 Million / year',
  deductible: '$500,000',
  construction: 'Reinforced Concrete',
  yearBuilt: 2015,
  occupancy: 'Office, Retail',
  floodRiskScore: '8.5/10 (High)',
  lastAssessment: '2024-05-20',
};


// 5. Header Component - Now using shared component

// 6. Main Component
export default function Component() {
  const mapRef = useRef(null);
  
  const [visibleLayers, setVisibleLayers] = useState({
    flood500yr: false,
    flood200yr: false,
    flood100yr: false,
    flood50yr: false,
    flood20yr: false,
    buildingRisk: false,
    boundary: false,
    annualrainfall: false,
  });

  // --- MODIFIED STATE: To hold the currently selected asset for detail view ---
  const [selectedAsset, setSelectedAsset] = useState(mockAsset);

  const handleLayerToggle = (layerKey: string) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-80 flex-shrink-0 border-r bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold text-red-700 mb-2 pl-2">4. Asset Management</h2>

          <Card>
            <CardContent className="pt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start">Asset Import/Export</Button>
              <Button variant="outline" className="w-full justify-start">Asset Distribution Map</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Asset Attribute Filtering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-1">
                <Label htmlFor="filter-asset-type">Type</Label>
                <Select>
                  <SelectTrigger id="filter-asset-type"><SelectValue placeholder="Select a type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="building">Building</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="filter-value">Value</Label>
                <Input id="filter-value" placeholder="e.g., > 1,000,000" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="filter-insurance-type">Insurance Type</Label>
                <Select>
                  <SelectTrigger id="filter-insurance-type"><SelectValue placeholder="Select an insurance type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property">Property All Risks</SelectItem>
                    <SelectItem value="business">Business Interruption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-center text-gray-500">...</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start">Asset Grouping/Batch Operations</Button>
              <Button variant="outline" className="w-full justify-start">Asset Detail List</Button>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader><CardTitle className="text-base">Analysis</CardTitle></CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline">Asset and Risk Zone</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Central Map Area */}
        <main className="flex-1 relative">
          <MapContainer ref={mapRef} center={[22.3193, 114.1694]} zoom={11} style={{ height: "100%", width: "100%" }} className="z-10">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {Object.entries(visibleLayers).map(([key, isVisible]) => 
              isVisible && wmsLayersConfig[key] && (
                <WMSTileLayer key={key} url="http://143.89.22.7:8090/geoserver/wms" params={{ layers: wmsLayersConfig[key].layer, format: 'image/png', transparent: true, version: '1.1.0' }} attribution="GeoServer Data" />
              )
            )}
          </MapContainer>
        </main>

        {/* --- MODIFIED: Right Sidebar for Asset Details --- */}
        <aside className="w-96 flex-shrink-0 border-l bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold mb-2 pl-2">Asset Details</h2>
          
          {selectedAsset ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedAsset.name}</CardTitle>
                  <p className="text-sm text-gray-500">{selectedAsset.id}</p>
                   <p className="text-sm text-gray-500 pt-1">{selectedAsset.address}</p>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">View Asset on Map</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Financial & Insurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Total Insured Value:</span> <span className="font-medium text-red-600">{selectedAsset.totalInsuredValue}</span></div>
                  <div className="flex justify-between"><span>Policy ID:</span> <span className="font-medium">{selectedAsset.policyId}</span></div>
                  <div className="flex justify-between"><span>Coverage:</span> <span className="font-medium">{selectedAsset.coverageType}</span></div>
                  <div className="flex justify-between"><span>Premium:</span> <span className="font-medium">{selectedAsset.premium}</span></div>
                  <div className="flex justify-between"><span>Deductible:</span> <span className="font-medium">{selectedAsset.deductible}</span></div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Physical Characteristics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                   <div className="flex justify-between"><span>Asset Type:</span> <span className="font-medium">{selectedAsset.type}</span></div>
                   <div className="flex justify-between"><span>Construction:</span> <span className="font-medium">{selectedAsset.construction}</span></div>
                   <div className="flex justify-between"><span>Year Built:</span> <span className="font-medium">{selectedAsset.yearBuilt}</span></div>
                   <div className="flex justify-between"><span>Occupancy:</span> <span className="font-medium">{selectedAsset.occupancy}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                   <div className="flex justify-between"><span>Flood Risk Score:</span> <span className="font-medium text-orange-600">{selectedAsset.floodRiskScore}</span></div>
                   <div className="flex justify-between"><span>Last Assessment:</span> <span className="font-medium">{selectedAsset.lastAssessment}</span></div>
                </CardContent>
              </Card>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">Select an asset to view details.</p>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}