"use client"

// 1. Import necessary React Hooks and components
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

// 5. Header Component
const Header = () => {
  return (
    <header className="bg-white shadow-md z-20">
      <div className="mx-auto px-4 py-2 flex justify-between items-center ml-2">
        <div className="flex items-center">
          <Image
            src="/taipinglogo.png"
            alt="China Taiping Logo"
            width={360}
            height={40}
          />
          <span className="ml-2 text-xl font-semibold">Flood Catastrophe Insurance System</span>
        </div>
        <nav className="flex-grow flex justify-end">
          <ul className="flex space-x-4">
          
            <li><Link href="/cityinfo"><Button variant="ghost">Urban Spatial Elements</Button></Link></li>
            <li className="ml-auto"><Link href="/disasterinfo"><Button variant="ghost">Disaster event repository</Button></Link></li>
            <li className="ml-auto"><Link href="/riskmap"><Button variant="ghost">Risk map</Button></Link></li>
            <li className="ml-auto"><Link href="/asset"><Button variant="ghost">Asset management</Button></Link></li>
            <li className="ml-auto"><Link href="/model"><Button variant="ghost">Catastrophe model</Button></Link></li>
            <li className="ml-auto"><Link href="/fuzhu"><Button variant="ghost">Accessibility</Button></Link></li>
            <li><Link href="/usercenter"><Button variant="ghost">User centre</Button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

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

  const [riskMapOptions, setRiskMapOptions] = useState({
    typhoon: false,
    rainstorm: false,
    flood: true, 
    geological: false,
    population: false,
    buildingCost: false,
    infrastructure: false,
  });

  // State for location search and report
  const [searchQuery, setSearchQuery] = useState('');
  const [riskReportData, setRiskReportData] = useState(null);


  const handleLayerToggle = (layerKey) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const handleRiskMapOptionChange = (optionKey) => {
    setRiskMapOptions(prev => ({ ...prev, [optionKey]: !prev[optionKey] }));
  };
  
  // Handler for querying risk by location
  const handleRiskQuery = () => {
    if (!searchQuery) {
      alert("Please enter an address or coordinates.");
      setRiskReportData(null); // Clear previous results if query is empty
      return;
    }
    // In a real application, you would call a geocoding API and then your risk analysis API.
    // Here, we simulate this process by generating dummy data.
    console.log(`Querying risk for: ${searchQuery}`);
    const dummyData = {
      address: searchQuery.includes(',') ? `Near coordinates ${searchQuery}` : searchQuery,
      floodRisk100yr: 'Medium (Projected inundation depth 0.5m)',
      typhoonRisk: 'High (Located on historical typhoon path)',
      geologicalRisk: 'Low',
      overallRisk: 'High',
      timestamp: new Date().toISOString(),
    };
    setRiskReportData(dummyData);
  };

  // Handler for downloading the risk report
  const handleDownloadReport = () => {
    if (!riskReportData) return;

    // Format the report data into a string for the .txt file
    const reportContent = `
Risk Analysis Report
================================
Queried Location: ${riskReportData.address}
Report Generation Time: ${riskReportData.timestamp}
--------------------------------
Flood Risk (100-year return): ${riskReportData.floodRisk100yr}
Typhoon Risk: ${riskReportData.typhoonRisk}
Geological Risk: ${riskReportData.geologicalRisk}
--------------------------------
Overall Risk Rating: ${riskReportData.overallRisk}
    `;

    // Create a Blob from the report content
    const blob = new Blob([reportContent.trim()], { type: 'text/plain;charset=utf-8' });

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const fileName = `Risk_Report_${new Date().getTime()}.txt`;
    link.download = fileName;

    // Append to the document, click, and then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const isAnyRiskOptionSelected = Object.values(riskMapOptions).some(option => option);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- Left Sidebar --- */}
        <aside className="w-80 flex-shrink-0 border-r bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold text-red-700 mb-2 pl-2">3. Risk Map</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Multi-hazard Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="typhoon" checked={riskMapOptions.typhoon} onCheckedChange={() => handleRiskMapOptionChange('typhoon')} />
                <Label htmlFor="typhoon" className="font-normal">Typhoon Risk (Wind circle, cumulative rainfall, storm surge)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rainstorm" checked={riskMapOptions.rainstorm} onCheckedChange={() => handleRiskMapOptionChange('rainstorm')} />
                <Label htmlFor="rainstorm" className="font-normal">Rainstorm Risk (Short-term heavy rainfall, cumulative rainfall)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="flood" checked={riskMapOptions.flood} onCheckedChange={() => handleRiskMapOptionChange('flood')} />
                <Label htmlFor="flood" className="font-normal">Flood Risk (Inundation depth, inundation extent)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="geological" checked={riskMapOptions.geological} onCheckedChange={() => handleRiskMapOptionChange('geological')} />
                <Label htmlFor="geological" className="font-normal">Geological Hazard Risk (Landslide, debris flow)</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Exposure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="population" checked={riskMapOptions.population} onCheckedChange={() => handleRiskMapOptionChange('population')} />
                <Label htmlFor="population" className="font-normal">Population Density Distribution (Heatmap)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="buildingCost" checked={riskMapOptions.buildingCost} onCheckedChange={() => handleRiskMapOptionChange('buildingCost')} />
                <Label htmlFor="buildingCost" className="font-normal">Building Replacement Cost Distribution (Heatmap)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="infrastructure" checked={riskMapOptions.infrastructure} onCheckedChange={() => handleRiskMapOptionChange('infrastructure')} />
                <Label htmlFor="infrastructure" className="font-normal">Critical Infrastructure (Hospitals, schools, power stations, etc.)</Label>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Central Map Area */}
        <main className="flex-1 relative">
          <Legend />
          <MapContainer ref={mapRef} center={[22.3193, 114.1694]} zoom={11} style={{ height: "100%", width: "100%" }} className="z-10">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {Object.entries(visibleLayers).map(([key, isVisible]) => 
              isVisible && wmsLayersConfig[key] && (
                <WMSTileLayer key={key} url="http://143.89.22.7:8090/geoserver/wms" params={{ layers: wmsLayersConfig[key].layer, format: 'image/png', transparent: true, version: '1.1.0' }} attribution="GeoServer Data" />
              )
            )}
          </MapContainer>
        </main>

        {/* --- Right Sidebar --- */}
        <aside className="w-80 flex-shrink-0 border-l bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold mb-2 pl-2">Risk Analysis</h2>

          {/* --- Location Risk Query Card --- */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Query Risk by Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location-search">Address or Coordinates (lat,lon)</Label>
                <Input
                  id="location-search"
                  placeholder="e.g., 8 Finance St, Central, HK or 22.28,114.15"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRiskQuery()}
                />
              </div>
              <Button className="w-full" onClick={handleRiskQuery}>Query Risk</Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadReport}
                disabled={!riskReportData}
              >
                Download Report
              </Button>

              {/* --- Display area for query results --- */}
              {riskReportData && (
                <div className="mt-4 p-3 border rounded-md bg-gray-50 text-sm space-y-1">
                  <h4 className="font-bold mb-2 text-base">Risk Report Summary</h4>
                  <p><strong>Address:</strong> {riskReportData.address}</p>
                  <p><strong>Flood Risk (100-year return):</strong> {riskReportData.floodRisk100yr}</p>
                  <p><strong>Typhoon Risk:</strong> {riskReportData.typhoonRisk}</p>
                  <p><strong>Overall Risk Rating:</strong> <span className={`font-bold ${
                    riskReportData.overallRisk === 'High' ? 'text-red-600' : 
                    riskReportData.overallRisk === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>{riskReportData.overallRisk}</span></p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Conditionally render other options if a selection is made on the left */}
          {!isAnyRiskOptionSelected ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500 p-4">Select a hazard or exposure from the left panel to view details and controls.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {riskMapOptions.typhoon && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Typhoon Risk Details</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Label htmlFor="typhoon-scenario">Select Scenario</Label>
                    <Select>
                      <SelectTrigger id="typhoon-scenario">
                        <SelectValue placeholder="Historical Event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mangkhut">Typhoon Mangkhut (2023)</SelectItem>
                        <SelectItem value="hato">Typhoon Hato (2017)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Simulate Path & Impact</Button>
                  </CardContent>
                </Card>
              )}

              {riskMapOptions.rainstorm && (
                 <Card>
                  <CardHeader><CardTitle className="text-base">Rainstorm Risk Details</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Label htmlFor="rain-duration">Rainfall Duration (hours)</Label>
                    <Input id="rain-duration" type="number" placeholder="e.g., 24" />
                     <Label htmlFor="rain-intensity">Intensity</Label>
                    <Select id="rain-intensity">
                      <SelectTrigger><SelectValue placeholder="Select intensity" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="heavy">Heavy</SelectItem>
                        <SelectItem value="black">Black Rainstorm</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              )}

              {riskMapOptions.flood && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Flood Risk Details</CardTitle></CardHeader>
                  <CardContent className="flex flex-col space-y-2">
                    <p className="text-sm font-medium mb-2">Select flood return period layers to display:</p>
                    {Object.entries(wmsLayersConfig)
                      .filter(([key]) => key.startsWith('flood'))
                      .map(([key, { name }]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox id={`right-${key}`} checked={!!visibleLayers[key]} onCheckedChange={() => handleLayerToggle(key)} />
                          <Label htmlFor={`right-${key}`} className="text-sm font-normal leading-none">{name}</Label>
                        </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {riskMapOptions.population && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Population Exposure</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Label htmlFor="pop-opacity">Heatmap Opacity</Label>
                    <Input id="pop-opacity" type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                    <Button variant="outline" className="w-full">Run Exposure Analysis</Button>
                  </CardContent>
                </Card>
              )}

              {riskMapOptions.buildingCost && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Building Cost Exposure</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Label htmlFor="cost-opacity">Heatmap Opacity</Label>
                    <Input id="cost-opacity" type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                    <Button variant="outline" className="w-full">Calculate Potential Loss</Button>
                  </CardContent>
                </Card>
              )}
               
              {riskMapOptions.infrastructure && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Critical Infrastructure</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="infra-hospitals" defaultChecked />
                        <Label htmlFor="infra-hospitals" className="font-normal">Hospitals</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="infra-schools" defaultChecked />
                        <Label htmlFor="infra-schools" className="font-normal">Schools</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="infra-power" />
                        <Label htmlFor="infra-power" className="font-normal">Power Stations</Label>
                      </div>
                  </CardContent>
                </Card>
              )}

            </div>
          )}
        </aside>

      </div>
    </div>
  );
}