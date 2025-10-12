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

// 3. Header 组件
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

// 4. 主组件
export default function Component() {
  const mapRef = useRef(null);
  
  // 城市空间元素的状态管理 (已整合新的图层)
  const [urbanElements, setUrbanElements] = useState({
    topography: false,
    geomorphology: false,
    riverNetwork: false, 
    boundary: false, // 新增: 行政边界
    annualrainfall: false, // 新增: 年降雨量
    buildingRisk: false, // 修改: 替换 buildingInfo
    roadsAndStreets: false, 
    landUse: false,
    drainageConduits: true, 
    drainageJunctions: false,
    drainageOutfalls: false,
    reservoirRegulation: false,
    defensiveEmbankments: false,
    populationDensity: false,
    economicData: false,
    industrialCommercial: false,
    nighttimeLightIndex: false,
    poi: false,
  });

  const [selectedCity, setSelectedCity] = useState('');

  // 处理左侧复选框的点击事件
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
              {/* --- 新增的复选框 --- */}
              <div className="flex items-center space-x-2">
                <Checkbox id="boundary" checked={urbanElements.boundary} onCheckedChange={() => handleElementToggle('boundary')} />
                <Label htmlFor="boundary" className="font-normal">Administrative boundary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="annualrainfall" checked={urbanElements.annualrainfall} onCheckedChange={() => handleElementToggle('annualrainfall')} />
                <Label htmlFor="annualrainfall" className="font-normal">Annual rainfall</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* --- 修改后的 Building 复选框 --- */}
              <div className="flex items-center space-x-2">
                <Checkbox id="buildingRisk" checked={urbanElements.buildingRisk} onCheckedChange={() => handleElementToggle('buildingRisk')} />
                <Label htmlFor="buildingRisk" className="font-normal">Building</Label>
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
                <Checkbox id="drainageConduits" checked={urbanElements.drainageConduits} onCheckedChange={() => handleElementToggle('drainageConduits')} />
                <Label htmlFor="drainageConduits" className="font-normal">Drainage Conduits</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="drainageJunctions" checked={urbanElements.drainageJunctions} onCheckedChange={() => handleElementToggle('drainageJunctions')} />
                <Label htmlFor="drainageJunctions" className="font-normal">Drainage Junctions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="drainageOutfalls" checked={urbanElements.drainageOutfalls} onCheckedChange={() => handleElementToggle('drainageOutfalls')} />
                <Label htmlFor="drainageOutfalls" className="font-normal">Drainage Outfalls</Label>
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
            
            {/* --- 新增的 WMS 图层 --- */}
            {urbanElements.buildingRisk && (
              <WMSTileLayer
                key="buildingRisk"
                url="http://143.89.22.7:8090/geoserver/wms"
                params={{ layers: 'COP:Building', format: 'image/png', transparent: true, version: '1.1.0' }}
                attribution="GeoServer Data"
              />
            )}
            {urbanElements.boundary && (
              <WMSTileLayer
                key="boundary"
                url="http://143.89.22.7:8090/geoserver/wms"
                params={{ layers: 'COP:taiping_boundary', format: 'image/png', transparent: true, version: '1.1.0' }}
                attribution="GeoServer Data"
              />
            )}
            {urbanElements.annualrainfall && (
              <WMSTileLayer
                key="annualrainfall"
                url="http://143.89.22.7:8090/geoserver/wms"
                params={{ layers: 'COP:taiping_Annual_rainfall', format: 'image/png', transparent: true, version: '1.1.0' }}
                attribution="GeoServer Data"
              />
            )}

            {/* --- 原有的 WMS 图层 --- */}
            {urbanElements.drainageConduits && (
              <WMSTileLayer
                key="conduits"
                url="http://143.89.23.123:8080/geoserver/wms"
                params={{
                  layers: 'ITF:Conduits',
                  format: 'image/png',
                  transparent: true,
                  version: '1.1.0'
                }}
                attribution="GeoServer Data"
              />
            )}
            
            {urbanElements.drainageJunctions && (
              <WMSTileLayer
                key="junctions"
                url="http://143.89.23.123:8080/geoserver/wms"
                params={{
                  layers: 'ITF:Junctions', 
                  format: 'image/png',
                  transparent: true,
                  version: '1.1.0'
                }}
                attribution="GeoServer Data"
              />
            )}
            
            {urbanElements.drainageOutfalls && (
              <WMSTileLayer
                key="outfalls"
                url="http://143.89.23.123:8080/geoserver/wms"
                params={{
                  layers: 'ITF:Outfalls', 
                  format: 'image/png',
                  transparent: true,
                  version: '1.1.0'
                }}
                attribution="GeoServer Data"
              />
            )}
            
            {urbanElements.populationDensity && (
              <WMSTileLayer
                key="populationDensity"
                url="http://143.89.23.123:8080/geoserver/wms"
                params={{
                  layers: 'ITF:PopulationDensity_per_30_arcseconds',
                  format: 'image/png',
                  transparent: true,
                  version: '1.1.0'
                }}
                attribution="GeoServer Data"
              />
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex flex-col">
                <p className="text-center text-sm font-medium text-gray-600">Risk Distribution by Asset Type</p>
                
                <div className="flex-grow flex items-end justify-around px-2 pt-2 pb-1">
                  <div className="w-8 bg-blue-400 rounded-t-sm" style={{ height: '60%' }} title="Residential: 60%"></div>
                  <div className="w-8 bg-red-400 rounded-t-sm" style={{ height: '85%' }} title="Commercial: 85%"></div>
                  <div className="w-8 bg-yellow-400 rounded-t-sm" style={{ height: '40%' }} title="Industrial: 40%"></div>
                  <div className="w-8 bg-green-400 rounded-t-sm" style={{ height: '70%' }} title="Infrastructure: 70%"></div>
                </div>

                <div className="border-t border-gray-300 mx-2"></div>

                <div className="flex justify-around pt-1">
                  <span className="text-xs w-10 text-center">Res.</span>
                  <span className="text-xs w-10 text-center">Com.</span>
                  <span className="text-xs w-10 text-center">Ind.</span>
                  <span className="text-xs w-10 text-center">Infra.</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </aside>

      </div>
    </div>
  );
}