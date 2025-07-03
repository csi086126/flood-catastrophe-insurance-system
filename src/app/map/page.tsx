"use client"

// 1. 导入必要的 React Hooks 和组件
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";

// 2. 动态导入 (Lazy Load) Leaflet 地图组件
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const WMSTileLayer = dynamic(() => import('react-leaflet').then(mod => mod.WMSTileLayer), { ssr: false });

// 3. WMS 图层配置
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

// 新增：图例数据
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

// 4. Header 组件
const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto px-4 py-2 flex justify-between items-center ml-2">
        <div className="flex items-center">
          <Image
            src="/taipinglogo.png"
            alt="China Taiping Logo"
            width={180}
            height={40}
          />
          <span className="ml-2 text-xl font-semibold">Flood Catastrophe Insurance System</span>
        </div>
        <nav className="flex-grow flex justify-end">
          <ul className="flex space-x-4">
            <li><Link href="/"><Button variant="ghost">Home</Button></Link></li>
            <li><Link href="/risk-analysis"><Button variant="ghost">Risk Analysis</Button></Link></li>
            <li className="ml-auto"><Link href="/risk-statistics"><Button variant="ghost">Risk Statistics</Button></Link></li>
            <li>
              <Link href="/map">
                <Button variant="ghost">Map</Button>
              </Link>
            </li>
            <li>
              <Link href="/earth">
                <Button variant="ghost">Earth</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// 新增：图例组件
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


// 5. 主组件
export default function Component() {
  const mapRef = useRef(null);
  
  const [visibleLayers, setVisibleLayers] = useState({
    flood500yr: true,
    flood200yr: false,
    flood100yr: false,
    flood50yr: false,
    flood20yr: false,
    buildingRisk: false,
    boundary: false,
    annualrainfall: false,
  });

  const handleLayerToggle = (layerKey: string) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <Card>
        <CardContent className="p-0">
          <div className="relative h-[calc(100vh-68px)] w-full">
            
            <div className="absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg border max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Layer Control</h3>
              <div className="flex flex-col space-y-2">
                {Object.entries(wmsLayersConfig).map(([key, { name }]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={!!visibleLayers[key]}
                      onCheckedChange={() => handleLayerToggle(key)}
                    />
                    <Label htmlFor={key} className="text-sm font-medium leading-none">
                      {name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* 在此处添加图例组件 */}
            <Legend />

            <MapContainer
              ref={mapRef}
              center={[22.3193, 114.1694]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {Object.entries(visibleLayers).map(([key, isVisible]) => 
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}