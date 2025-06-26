"use client"

// 1. 导入必要的 React Hooks 和组件
// - 移除了大量未使用的 hooks (useEffect)、组件 (Table, Input, Calendar, etc.) 和库 (axios, shpjs)。
// - 仅保留了功能实现所必需的依赖。
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
// - 移除了未使用的 Marker 和 Popup 组件导入。
// - 确保地图组件仅在客户端渲染 (ssr: false)，这对于 Leaflet 至关重要。
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const WMSTileLayer = dynamic(() => import('react-leaflet').then(mod => mod.WMSTileLayer), { ssr: false });

// 3. WMS 图层配置
// - 这是地图的核心数据，予以保留。它定义了所有可用的 WMS 图层。
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

// 4. Header 组件
// - 这是一个独立的、被使用的组件，结构保持不变。
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
          </ul>
        </nav>
      </div>
    </header>
  );
}

// 5. 主组件
export default function Component() {
  // 6. 移除未使用的 State 和 Ref
  // - 删除了所有与表单、数据提交、项目列表、文件处理相关的 state。
  // - 仅保留了 mapRef (通常用于地图交互，保留是个好习惯) 和 visibleLayers (用于控制图层可见性)。
  const mapRef = useRef(null);
  
  // - 优化：为所有图层提供明确的初始可见性状态，避免潜在的 bug。
  const [visibleLayers, setVisibleLayers] = useState({
    flood500yr: true, // 默认显示 500年一遇的洪水图层
    flood200yr: false,
    flood100yr: false,
    flood50yr: false,
    flood20yr: false,
    buildingRisk: false,
    boundary: false,
    annualrainfall: false,
  });

  // 7. 移除未使用的函数和 useEffect
  // - 删除了 handleSubmit, handleCancel, handleFileUpload, handleDownload, handleRowClick 等所有未被调用的函数。
  // - 删除了用于获取项目数据和加载 shapefile 的 useEffect，因为它依赖于已被移除的功能。

  // 8. 保留图层切换逻辑
  // - 这是当前组件核心的交互功能，用于响应用户的勾选操作。
  const handleLayerToggle = (layerKey: string) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  // 9. 简化并优化 JSX
  // - 保持了 Header + 包含地图和图层控制的 Card 的整体布局。
  // - 优化地图容器高度：使用 `calc(100vh - ...)` 使其能自适应屏幕，避免不必要的滚动。
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <Card>
        <CardContent className="p-0"> {/* 移除 CardContent 的默认内边距 */}
          <div className="relative h-[calc(100vh-68px)] w-full"> {/* 假设 Header 高度约为 68px */}
            
            <div className="absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg border max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Layer Control</h3>
              <div className="flex flex-col space-y-2">
                {Object.entries(wmsLayersConfig).map(([key, { name }]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={!!visibleLayers[key]} // 使用 !! 确保值总是布尔型
                      onCheckedChange={() => handleLayerToggle(key)}
                    />
                    <Label htmlFor={key} className="text-sm font-medium leading-none">
                      {name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <MapContainer
              ref={mapRef}
              center={[22.3193, 114.1694]} // 香港中心坐标
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* 根据 visibleLayers 状态条件性地渲染 WMS 图层 */}
              {Object.entries(visibleLayers).map(([key, isVisible]) => 
                isVisible && wmsLayersConfig[key] && ( // 增加 wmsLayersConfig[key] 检查，更安全
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