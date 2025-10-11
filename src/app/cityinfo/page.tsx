"use client"

// 1. 导入必要的 React Hooks 和组件
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

// 4. 图例数据
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

// 5. Header 组件
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
            <li><Link href="/"><Button variant="ghost">User centre</Button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// 6. 图例组件
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


// 7. 主组件
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

  const [urbanElements, setUrbanElements] = useState({
    topography: false,
    geomorphology: false,
    riverNetwork: true, 
    buildingInfo: false,
    roadsAndStreets: true, 
    landUse: false,
    drainageNetwork: true, 
    reservoirRegulation: false,
    defensiveEmbankments: false,
    populationDensity: false,
    economicData: false,
    industrialCommercial: false,
    nighttimeLightIndex: false,
    poi: false,
  });

  const [selectedCity, setSelectedCity] = useState('');

  const handleLayerToggle = (layerKey: string) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const handleElementToggle = (elementKey: keyof typeof urbanElements) => {
    setUrbanElements(prev => ({
      ...prev,
      [elementKey]: !prev[elementKey]
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        {/* 左侧边栏 */}
        <aside className="w-80 flex-shrink-0 border-r bg-white p-4 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold text-red-700 mb-2 pl-2">1. Urban Spatial Elements</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Region Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <select 
                id="city-select" 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">Please select a city</option>
                <option value="hongkong">Hong Kong</option>
                <option value="shenzhen">Shenzhen</option>
                <option value="guangzhou">Guangzhou</option>
                <option value="beijing">Beijing</option>
                <option value="shanghai">Shanghai</option>
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Geography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="topography" checked={urbanElements.topography} onCheckedChange={() => handleElementToggle('topography')} />
                <Label htmlFor="topography" className="font-normal">Topography</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="geomorphology" checked={urbanElements.geomorphology} onCheckedChange={() => handleElementToggle('geomorphology')} />
                <Label htmlFor="geomorphology" className="font-normal">Geomorphology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="riverNetwork" checked={urbanElements.riverNetwork} onCheckedChange={() => handleElementToggle('riverNetwork')} />
                <Label htmlFor="riverNetwork" className="font-normal">River Network</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="buildingInfo" checked={urbanElements.buildingInfo} onCheckedChange={() => handleElementToggle('buildingInfo')} />
                <Label htmlFor="buildingInfo" className="font-normal">Building Information</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="roadsAndStreets" checked={urbanElements.roadsAndStreets} onCheckedChange={() => handleElementToggle('roadsAndStreets')} />
                <Label htmlFor="roadsAndStreets" className="font-normal">Roads & Streets</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="landUse" checked={urbanElements.landUse} onCheckedChange={() => handleElementToggle('landUse')} />
                <Label htmlFor="landUse" className="font-normal">Land Use</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="drainageNetwork" checked={urbanElements.drainageNetwork} onCheckedChange={() => handleElementToggle('drainageNetwork')} />
                <Label htmlFor="drainageNetwork" className="font-normal">Drainage Network</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="reservoirRegulation" checked={urbanElements.reservoirRegulation} onCheckedChange={() => handleElementToggle('reservoirRegulation')} />
                <Label htmlFor="reservoirRegulation" className="font-normal">Reservoir Regulation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="defensiveEmbankments" checked={urbanElements.defensiveEmbankments} onCheckedChange={() => handleElementToggle('defensiveEmbankments')} />
                <Label htmlFor="defensiveEmbankments" className="font-normal">Defensive Embankments</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Socioeconomic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="populationDensity" checked={urbanElements.populationDensity} onCheckedChange={() => handleElementToggle('populationDensity')} />
                <Label htmlFor="populationDensity" className="font-normal">Population Density</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="economicData" checked={urbanElements.economicData} onCheckedChange={() => handleElementToggle('economicData')} />
                <Label htmlFor="economicData" className="font-normal">Economic Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="industrialCommercial" checked={urbanElements.industrialCommercial} onCheckedChange={() => handleElementToggle('industrialCommercial')} />
                <Label htmlFor="industrialCommercial" className="font-normal">Industrial & Commercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="nighttimeLightIndex" checked={urbanElements.nighttimeLightIndex} onCheckedChange={() => handleElementToggle('nighttimeLightIndex')} />
                <Label htmlFor="nighttimeLightIndex" className="font-normal">Nighttime Light Index</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="poi" checked={urbanElements.poi} onCheckedChange={() => handleElementToggle('poi')} />
                <Label htmlFor="poi" className="font-normal">POI</Label>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* 中间地图区域 */}
        <main className="flex-1 relative">
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
          <Legend />
          <MapContainer
            ref={mapRef}
            center={[22.3193, 114.1694]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            className="z-10"
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
        </main>

        {/* 右侧边栏 */}
        <aside className="w-80 flex-shrink-0 border-l bg-white p-4 overflow-y-auto space-y-4">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Initial details for a sample element.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">ID:</span>
                  <span>HK-BLD-00781</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Type:</span>
                  <span>Commercial Building</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Risk Level:</span>
                  <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Estimated Loss:</span>
                  <span className="font-mono">$ 3,500,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* --- 更改开始: Analysis Chart 卡片 (结构已修复) --- */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex flex-col">
                <p className="text-center text-sm font-medium text-gray-600">Risk Distribution by Asset Type</p>
                
                {/* 条形图容器 (父容器有明确高度，所以百分比高度会生效) */}
                <div className="flex-grow flex items-end justify-around px-2 pt-2 pb-1">
                  {/* Bar 1: Residential */}
                  <div className="w-8 bg-blue-400 rounded-t-sm" style={{ height: '60%' }} title="Residential: 60%"></div>
                  {/* Bar 2: Commercial */}
                  <div className="w-8 bg-red-400 rounded-t-sm" style={{ height: '85%' }} title="Commercial: 85%"></div>
                  {/* Bar 3: Industrial */}
                  <div className="w-8 bg-yellow-400 rounded-t-sm" style={{ height: '40%' }} title="Industrial: 40%"></div>
                  {/* Bar 4: Infrastructure */}
                  <div className="w-8 bg-green-400 rounded-t-sm" style={{ height: '70%' }} title="Infrastructure: 70%"></div>
                </div>

                {/* X-axis line */}
                <div className="border-t border-gray-300 mx-2"></div>

                {/* 标签容器 */}
                <div className="flex justify-around pt-1">
                  <span className="text-xs w-10 text-center">Res.</span>
                  <span className="text-xs w-10 text-center">Com.</span>
                  <span className="text-xs w-10 text-center">Ind.</span>
                  <span className="text-xs w-10 text-center">Infra.</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* --- 更改结束: Analysis Chart 卡片 --- */}

        </aside>

      </div>
    </div>
  );
}