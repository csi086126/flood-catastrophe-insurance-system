"use client";"use client";"use client";"use client";"use client";"use client"



import Header from '@/components/Header';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import Header from '@/components/Header';

export default function AssetPage() {

  return (import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

    <div className="min-h-screen bg-gray-50 font-[DengXian-Light]">

      <Header />import Header from '@/components/Header';

      

      <div className="flex h-[calc(100vh-80px)]">export default function AssetPage() {

        <div className="w-80 bg-white border-r overflow-y-auto p-4">

          <Card>  return (import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

            <CardHeader>

              <CardTitle className="font-[DengXian-Light]">资产搜索</CardTitle>    <div className="min-h-screen bg-gray-50 font-[DengXian-Light]">

            </CardHeader>

            <CardContent>      <Header />import { Button } from "@/components/ui/button";import { useState } from 'react';

              <p className="font-[DengXian-Light]">资产评估功能开发中...</p>

            </CardContent>      

          </Card>

        </div>      <div className="flex h-[calc(100vh-80px)]">import { Input } from "@/components/ui/input";



        <div className="flex-1 p-6">        <div className="w-80 bg-white border-r overflow-y-auto p-4">

          <h2 className="text-2xl font-bold text-gray-800 font-[DengXian-Light]">资产评估</h2>

          <p className="mt-4 font-[DengXian-Light]">Asset Assessment功能正在开发中，敬请期待。</p>          <Card>import Header from '@/components/Header';

        </div>

      </div>            <CardHeader>

    </div>

  );              <CardTitle className="font-[DengXian-Light]">资产搜索</CardTitle>export default function AssetPage() {

}
            </CardHeader>

            <CardContent>  return (import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";import { useState } from 'react';// 1. Import necessary React Hooks and components

              <p className="font-[DengXian-Light]">资产评估功能开发中...</p>

            </CardContent>    <div className="min-h-screen bg-gray-50 font-[DengXian-Light]">

          </Card>

        </div>      <Header />import { Button } from "@/components/ui/button";



        <div className="flex-1 p-6">      

          <h2 className="text-2xl font-bold text-gray-800 font-[DengXian-Light]">资产评估</h2>

          <p className="mt-4 font-[DengXian-Light]">Asset Assessment功能正在开发中，敬请期待。</p>      <div className="flex h-[calc(100vh-80px)]">import { Label } from "@/components/ui/label";import Header from '@/components/Header';import { useState, useRef } from 'react';

        </div>

      </div>        {/* Left Panel */}

    </div>

  );        <div className="w-80 bg-white border-r overflow-y-auto p-4 space-y-4">import { Checkbox } from "@/components/ui/checkbox";

}
          <Card>

            <CardHeader>import { Input } from "@/components/ui/input";import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";import Header from '@/components/Header';

              <CardTitle className="font-[DengXian-Light]">资产搜索</CardTitle>

            </CardHeader>import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

            <CardContent className="space-y-3">

              <Input placeholder="请输入资产编号或名称" className="font-[DengXian-Light]" />import { Button } from "@/components/ui/button";import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

              <Button className="w-full font-[DengXian-Light]">搜索资产</Button>

            </CardContent>const AssetCard = ({ title, value, unit, status }: { title: string; value: string; unit: string; status: string }) => (

          </Card>

        </div>  <Card>import { Label } from "@/components/ui/label";import { Button } from "@/components/ui/button";



        {/* Main Content Area */}    <CardHeader>

        <div className="flex-1 p-6">

          <h2 className="text-2xl font-bold text-gray-800 font-[DengXian-Light] mb-4">资产评估</h2>      <CardTitle className="font-[DengXian-Light] text-lg">{title}</CardTitle>import { Checkbox } from "@/components/ui/checkbox";import { Label } from "@/components/ui/label";

          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">    </CardHeader>

            <Card>

              <CardHeader>    <CardContent>import { Input } from "@/components/ui/input";import { Checkbox } from "@/components/ui/checkbox";

                <CardTitle className="font-[DengXian-Light] text-lg">总资产价值</CardTitle>

              </CardHeader>      <div className="text-2xl font-bold font-[DengXian-Light]">{value} <span className="text-sm text-gray-500">{unit}</span></div>

              <CardContent>

                <div className="text-2xl font-bold font-[DengXian-Light]">158.5 <span className="text-sm text-gray-500">亿元</span></div>      <div className={`text-sm mt-2 ${status === '正常' ? 'text-green-600' : 'text-red-600'} font-[DengXian-Light]`}>{status}</div>import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";import { Input } from "@/components/ui/input";

                <div className="text-sm mt-2 text-green-600 font-[DengXian-Light]">正常</div>

              </CardContent>    </CardContent>

            </Card>

              </Card>import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

            <Card>

              <CardHeader>);

                <CardTitle className="font-[DengXian-Light] text-lg">高风险资产</CardTitle>

              </CardHeader>const AssetCard = ({ title, value, unit, status }: { title: string; value: string; unit: string; status: string }) => (import dynamic from 'next/dynamic';

              <CardContent>

                <div className="text-2xl font-bold font-[DengXian-Light]">12 <span className="text-sm text-gray-500">项</span></div>const SearchPanel = () => (

                <div className="text-sm mt-2 text-red-600 font-[DengXian-Light]">警告</div>

              </CardContent>  <Card>  <Card>import "leaflet/dist/leaflet.css";

            </Card>

          </div>    <CardHeader>



          <Card>      <CardTitle className="font-[DengXian-Light]">资产搜索</CardTitle>    <CardHeader>

            <CardHeader>

              <CardTitle className="font-[DengXian-Light]">资产详细信息</CardTitle>    </CardHeader>

            </CardHeader>

            <CardContent>    <CardContent className="space-y-4">      <CardTitle className="font-[DengXian-Light] text-lg">{title}</CardTitle>// 2. Dynamically import (Lazy Load) Leaflet map components

              <div className="overflow-x-auto">

                <table className="w-full text-left">      <div className="space-y-2">

                  <thead>

                    <tr className="border-b">        <Label htmlFor="asset-search" className="font-[DengXian-Light]">资产编号或名称</Label>    </CardHeader>const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });

                      <th className="pb-2 font-[DengXian-Light]">资产编号</th>

                      <th className="pb-2 font-[DengXian-Light]">资产名称</th>        <Input 

                      <th className="pb-2 font-[DengXian-Light]">类型</th>

                      <th className="pb-2 font-[DengXian-Light]">价值(万元)</th>          id="asset-search"     <CardContent>const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

                      <th className="pb-2 font-[DengXian-Light]">风险等级</th>

                    </tr>          placeholder="请输入资产编号或名称" 

                  </thead>

                  <tbody>          className="font-[DengXian-Light]"      <div className="text-2xl font-bold font-[DengXian-Light]">{value} <span className="text-sm text-gray-500">{unit}</span></div>const WMSTileLayer = dynamic(() => import('react-leaflet').then(mod => mod.WMSTileLayer), { ssr: false });

                    <tr className="border-b">

                      <td className="py-2 font-[DengXian-Light]">AS001</td>        />

                      <td className="py-2 font-[DengXian-Light]">中央商务大厦</td>

                      <td className="py-2 font-[DengXian-Light]">建筑物</td>      </div>      <div className={`text-sm mt-2 ${status === '正常' ? 'text-green-600' : 'text-red-600'} font-[DengXian-Light]`}>{status}</div>

                      <td className="py-2 font-[DengXian-Light]">50,000</td>

                      <td className="py-2"><span className="text-red-600 font-[DengXian-Light]">高风险</span></td>      

                    </tr>

                    <tr className="border-b">      <div className="space-y-2">    </CardContent>// 3. WMS Layer Configuration

                      <td className="py-2 font-[DengXian-Light]">AS002</td>

                      <td className="py-2 font-[DengXian-Light]">滨江住宅区</td>        <Label className="font-[DengXian-Light]">资产类型</Label>

                      <td className="py-2 font-[DengXian-Light]">建筑物</td>

                      <td className="py-2 font-[DengXian-Light]">32,000</td>        <Select>  </Card>const wmsLayersConfig = {

                      <td className="py-2"><span className="text-orange-600 font-[DengXian-Light]">中风险</span></td>

                    </tr>          <SelectTrigger>

                  </tbody>

                </table>            <SelectValue placeholder="选择资产类型" />);  flood500yr: { name: 'Flood depth (500-year return)', layer: 'COP:Flood_Depth _Return_Period_500yr' },

              </div>

            </CardContent>          </SelectTrigger>

          </Card>

        </div>          <SelectContent>  flood200yr: { name: 'Flood depth (200-year return)', layer: 'COP:Flood_Depth _Return_Period_200yr' },

      </div>

    </div>            <SelectItem value="building">建筑物</SelectItem>

  );

}            <SelectItem value="infrastructure">基础设施</SelectItem>const SearchPanel = () => (  flood100yr: { name: 'Flood depth (100-year return)', layer: 'COP:Flood_Depth _Return_Period_100yr' },

            <SelectItem value="equipment">设备</SelectItem>

            <SelectItem value="vehicle">车辆</SelectItem>  <Card>  flood50yr: { name: 'Flood depth (50-year return)', layer: 'COP:Flood_Depth _Return_Period_50yr' },

          </SelectContent>

        </Select>    <CardHeader>  flood20yr: { name: 'Flood depth (20-year return)', layer: 'COP:Flood_Depth _Return_Period_20yr' },

      </div>

      <CardTitle className="font-[DengXian-Light]">资产搜索</CardTitle>  buildingRisk: { name: 'Building', layer: 'COP:Building' },

      <div className="space-y-2">

        <Label className="font-[DengXian-Light]">风险等级</Label>    </CardHeader>  boundary : { name: 'Administrative boundary', layer: ' COP:taiping_boundary' },

        <Select>

          <SelectTrigger>    <CardContent className="space-y-4">  annualrainfall : { name: 'Annual rainfall', layer: ' COP:taiping_Annual_rainfall' },

            <SelectValue placeholder="选择风险等级" />

          </SelectTrigger>      <div className="space-y-2">};

          <SelectContent>

            <SelectItem value="low">低风险</SelectItem>        <Label htmlFor="asset-search" className="font-[DengXian-Light]">资产编号或名称</Label>

            <SelectItem value="medium">中风险</SelectItem>

            <SelectItem value="high">高风险</SelectItem>        <Input // --- NEW: MOCK DATA FOR A SELECTED ASSET ---

            <SelectItem value="critical">极高风险</SelectItem>

          </SelectContent>          id="asset-search" const mockAsset = {

        </Select>

      </div>          placeholder="请输入资产编号或名称"   id: 'ASSET-HK-00123',



      <Button className="w-full font-[DengXian-Light]">搜索资产</Button>          className="font-[DengXian-Light]"  name: 'Taiping Financial Centre',

    </CardContent>

  </Card>        />  type: 'Commercial Building',

);

      </div>  address: '1 Connaught Road Central, Hong Kong',

const FilterPanel = () => {

  const [filters, setFilters] = useState({        totalInsuredValue: '$5.2 Billion',

    showBuildings: true,

    showInfrastructure: true,      <div className="space-y-2">  policyId: 'TP-PROP-2024-888',

    showEquipment: false,

    showVehicles: false        <Label className="font-[DengXian-Light]">资产类型</Label>  coverageType: 'Property All Risks',

  });

        <Select>  premium: '$1.2 Million / year',

  const handleFilterChange = (key: keyof typeof filters) => {

    setFilters(prev => ({ ...prev, [key]: !prev[key] }));          <SelectTrigger>  deductible: '$500,000',

  };

            <SelectValue placeholder="选择资产类型" />  construction: 'Reinforced Concrete',

  return (

    <Card>          </SelectTrigger>  yearBuilt: 2015,

      <CardHeader>

        <CardTitle className="font-[DengXian-Light]">显示过滤器</CardTitle>          <SelectContent>  occupancy: 'Office, Retail',

      </CardHeader>

      <CardContent className="space-y-3">            <SelectItem value="building">建筑物</SelectItem>  floodRiskScore: '8.5/10 (High)',

        <div className="flex items-center space-x-2">

          <Checkbox            <SelectItem value="infrastructure">基础设施</SelectItem>  lastAssessment: '2024-05-20',

            id="buildings"

            checked={filters.showBuildings}            <SelectItem value="equipment">设备</SelectItem>};

            onCheckedChange={() => handleFilterChange('showBuildings')}

          />            <SelectItem value="vehicle">车辆</SelectItem>

          <Label htmlFor="buildings" className="font-[DengXian-Light]">建筑物</Label>

        </div>          </SelectContent>

        

        <div className="flex items-center space-x-2">        </Select>// 5. Header Component - Now using shared component

          <Checkbox

            id="infrastructure"      </div>

            checked={filters.showInfrastructure}

            onCheckedChange={() => handleFilterChange('showInfrastructure')}// 6. Main Component

          />

          <Label htmlFor="infrastructure" className="font-[DengXian-Light]">基础设施</Label>      <div className="space-y-2">export default function Component() {

        </div>

                <Label className="font-[DengXian-Light]">风险等级</Label>  const mapRef = useRef(null);

        <div className="flex items-center space-x-2">

          <Checkbox        <Select>  

            id="equipment"

            checked={filters.showEquipment}          <SelectTrigger>  const [visibleLayers, setVisibleLayers] = useState({

            onCheckedChange={() => handleFilterChange('showEquipment')}

          />            <SelectValue placeholder="选择风险等级" />    flood500yr: false,

          <Label htmlFor="equipment" className="font-[DengXian-Light]">设备</Label>

        </div>          </SelectTrigger>    flood200yr: false,

        

        <div className="flex items-center space-x-2">          <SelectContent>    flood100yr: false,

          <Checkbox

            id="vehicles"            <SelectItem value="low">低风险</SelectItem>    flood50yr: false,

            checked={filters.showVehicles}

            onCheckedChange={() => handleFilterChange('showVehicles')}            <SelectItem value="medium">中风险</SelectItem>    flood20yr: false,

          />

          <Label htmlFor="vehicles" className="font-[DengXian-Light]">车辆</Label>            <SelectItem value="high">高风险</SelectItem>    buildingRisk: false,

        </div>

      </CardContent>            <SelectItem value="critical">极高风险</SelectItem>    boundary: false,

    </Card>

  );          </SelectContent>    annualrainfall: false,

};

        </Select>  });

export default function AssetPage() {

  return (      </div>

    <div className="min-h-screen bg-gray-50 font-[DengXian-Light]">

      <Header />  // --- MODIFIED STATE: To hold the currently selected asset for detail view ---

      

      <div className="flex h-[calc(100vh-80px)]">      <Button className="w-full font-[DengXian-Light]">搜索资产</Button>  const [selectedAsset, setSelectedAsset] = useState(mockAsset);

        {/* Left Panel */}

        <div className="w-80 bg-white border-r overflow-y-auto p-4 space-y-4">    </CardContent>

          <SearchPanel />

          <FilterPanel />  </Card>  const handleLayerToggle = (layerKey: string) => {

        </div>

);    setVisibleLayers(prev => ({

        {/* Main Content Area */}

        <div className="flex-1 p-6">      ...prev,

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-800 font-[DengXian-Light] mb-4">资产评估概览</h2>const FilterPanel = () => {      [layerKey]: !prev[layerKey]

            

            {/* Asset Summary Cards */}  const [filters, setFilters] = useState({    }));

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

              <AssetCard title="总资产价值" value="158.5" unit="亿元" status="正常" />    showBuildings: true,  };

              <AssetCard title="高风险资产" value="12" unit="项" status="警告" />

              <AssetCard title="保险覆盖率" value="85.6" unit="%" status="正常" />    showInfrastructure: true,  

              <AssetCard title="预计损失" value="2.3" unit="亿元" status="关注" />

            </div>    showEquipment: false,  return (

          </div>

    showVehicles: false    <div className="flex flex-col h-screen bg-gray-100">

          {/* Asset List */}

          <Card>  });      <Header />

            <CardHeader>

              <CardTitle className="font-[DengXian-Light]">资产详细信息</CardTitle>

            </CardHeader>

            <CardContent>  const handleFilterChange = (key: keyof typeof filters) => {      <div className="flex flex-1 overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full text-left">    setFilters(prev => ({ ...prev, [key]: !prev[key] }));        

                  <thead>

                    <tr className="border-b">  };        {/* Left Sidebar */}

                      <th className="pb-2 font-[DengXian-Light]">资产编号</th>

                      <th className="pb-2 font-[DengXian-Light]">资产名称</th>        <aside className="w-80 flex-shrink-0 border-r bg-white p-4 overflow-y-auto space-y-4">

                      <th className="pb-2 font-[DengXian-Light]">类型</th>

                      <th className="pb-2 font-[DengXian-Light]">价值(万元)</th>  return (          <h2 className="text-xl font-bold text-red-700 mb-2 pl-2">4. Asset Management</h2>

                      <th className="pb-2 font-[DengXian-Light]">风险等级</th>

                      <th className="pb-2 font-[DengXian-Light]">保险状态</th>    <Card>

                    </tr>

                  </thead>      <CardHeader>          <Card>

                  <tbody>

                    <tr className="border-b">        <CardTitle className="font-[DengXian-Light]">显示过滤器</CardTitle>            <CardContent className="pt-4 space-y-2">

                      <td className="py-2 font-[DengXian-Light]">AS001</td>

                      <td className="py-2 font-[DengXian-Light]">中央商务大厦</td>      </CardHeader>              <Button variant="outline" className="w-full justify-start">Asset Import/Export</Button>

                      <td className="py-2 font-[DengXian-Light]">建筑物</td>

                      <td className="py-2 font-[DengXian-Light]">50,000</td>      <CardContent className="space-y-3">              <Button variant="outline" className="w-full justify-start">Asset Distribution Map</Button>

                      <td className="py-2"><span className="text-red-600 font-[DengXian-Light]">高风险</span></td>

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">已保险</span></td>        <div className="flex items-center space-x-2">            </CardContent>

                    </tr>

                    <tr className="border-b">          <Checkbox          </Card>

                      <td className="py-2 font-[DengXian-Light]">AS002</td>

                      <td className="py-2 font-[DengXian-Light]">滨江住宅区</td>            id="buildings"

                      <td className="py-2 font-[DengXian-Light]">建筑物</td>

                      <td className="py-2 font-[DengXian-Light]">32,000</td>            checked={filters.showBuildings}          <Card>

                      <td className="py-2"><span className="text-orange-600 font-[DengXian-Light]">中风险</span></td>

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">已保险</span></td>            onCheckedChange={() => handleFilterChange('showBuildings')}            <CardHeader>

                    </tr>

                    <tr className="border-b">          />              <CardTitle className="text-base">Asset Attribute Filtering</CardTitle>

                      <td className="py-2 font-[DengXian-Light]">AS003</td>

                      <td className="py-2 font-[DengXian-Light]">城市水处理厂</td>          <Label htmlFor="buildings" className="font-[DengXian-Light]">建筑物</Label>            </CardHeader>

                      <td className="py-2 font-[DengXian-Light]">基础设施</td>

                      <td className="py-2 font-[DengXian-Light]">15,000</td>        </div>            <CardContent className="space-y-4">

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">低风险</span></td>

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">已保险</span></td>                       <div className="space-y-1">

                    </tr>

                  </tbody>        <div className="flex items-center space-x-2">                <Label htmlFor="filter-asset-type">Type</Label>

                </table>

              </div>          <Checkbox                <Select>

            </CardContent>

          </Card>            id="infrastructure"                  <SelectTrigger id="filter-asset-type"><SelectValue placeholder="Select a type" /></SelectTrigger>

        </div>

      </div>            checked={filters.showInfrastructure}                  <SelectContent>

    </div>

  );            onCheckedChange={() => handleFilterChange('showInfrastructure')}                    <SelectItem value="building">Building</SelectItem>

}
          />                    <SelectItem value="infrastructure">Infrastructure</SelectItem>

          <Label htmlFor="infrastructure" className="font-[DengXian-Light]">基础设施</Label>                    <SelectItem value="inventory">Inventory</SelectItem>

        </div>                  </SelectContent>

                        </Select>

        <div className="flex items-center space-x-2">              </div>

          <Checkbox              <div className="space-y-1">

            id="equipment"                <Label htmlFor="filter-value">Value</Label>

            checked={filters.showEquipment}                <Input id="filter-value" placeholder="e.g., > 1,000,000" />

            onCheckedChange={() => handleFilterChange('showEquipment')}              </div>

          />              <div className="space-y-1">

          <Label htmlFor="equipment" className="font-[DengXian-Light]">设备</Label>                <Label htmlFor="filter-insurance-type">Insurance Type</Label>

        </div>                <Select>

                          <SelectTrigger id="filter-insurance-type"><SelectValue placeholder="Select an insurance type" /></SelectTrigger>

        <div className="flex items-center space-x-2">                  <SelectContent>

          <Checkbox                    <SelectItem value="property">Property All Risks</SelectItem>

            id="vehicles"                    <SelectItem value="business">Business Interruption</SelectItem>

            checked={filters.showVehicles}                  </SelectContent>

            onCheckedChange={() => handleFilterChange('showVehicles')}                </Select>

          />              </div>

          <Label htmlFor="vehicles" className="font-[DengXian-Light]">车辆</Label>              <p className="text-center text-gray-500">...</p>

        </div>            </CardContent>

      </CardContent>          </Card>

    </Card>

  );          <Card>

};            <CardContent className="pt-4 space-y-2">

              <Button variant="outline" className="w-full justify-start">Asset Grouping/Batch Operations</Button>

export default function AssetPage() {              <Button variant="outline" className="w-full justify-start">Asset Detail List</Button>

  return (            </CardContent>

    <div className="min-h-screen bg-gray-50 font-[DengXian-Light]">          </Card>

      <Header />          

                <Card>

      <div className="flex h-[calc(100vh-80px)]">             <CardHeader><CardTitle className="text-base">Analysis</CardTitle></CardHeader>

        {/* Left Panel */}            <CardContent className="flex flex-col space-y-2">

        <div className="w-80 bg-white border-r overflow-y-auto p-4 space-y-4">              <Button variant="outline">Asset and Risk Zone</Button>

          <SearchPanel />            </CardContent>

          <FilterPanel />          </Card>

        </div>        </aside>



        {/* Main Content Area */}        {/* Central Map Area */}

        <div className="flex-1 p-6">        <main className="flex-1 relative">

          <div className="mb-6">          <MapContainer ref={mapRef} center={[22.3193, 114.1694]} zoom={11} style={{ height: "100%", width: "100%" }} className="z-10">

            <h2 className="text-2xl font-bold text-gray-800 font-[DengXian-Light] mb-4">资产评估概览</h2>            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {Object.entries(visibleLayers).map(([key, isVisible]) => 

            {/* Asset Summary Cards */}              isVisible && wmsLayersConfig[key] && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">                <WMSTileLayer key={key} url="http://143.89.22.7:8090/geoserver/wms" params={{ layers: wmsLayersConfig[key].layer, format: 'image/png', transparent: true, version: '1.1.0' }} attribution="GeoServer Data" />

              <AssetCard title="总资产价值" value="158.5" unit="亿元" status="正常" />              )

              <AssetCard title="高风险资产" value="12" unit="项" status="警告" />            )}

              <AssetCard title="保险覆盖率" value="85.6" unit="%" status="正常" />          </MapContainer>

              <AssetCard title="预计损失" value="2.3" unit="亿元" status="关注" />        </main>

            </div>

          </div>        {/* --- MODIFIED: Right Sidebar for Asset Details --- */}

        <aside className="w-96 flex-shrink-0 border-l bg-white p-4 overflow-y-auto space-y-4">

          {/* Asset List */}          <h2 className="text-xl font-bold mb-2 pl-2">Asset Details</h2>

          <Card>          

            <CardHeader>          {selectedAsset ? (

              <CardTitle className="font-[DengXian-Light]">资产详细信息</CardTitle>            <div className="space-y-4">

            </CardHeader>              <Card>

            <CardContent>                <CardHeader>

              <div className="overflow-x-auto">                  <CardTitle className="text-lg">{selectedAsset.name}</CardTitle>

                <table className="w-full text-left">                  <p className="text-sm text-gray-500">{selectedAsset.id}</p>

                  <thead>                   <p className="text-sm text-gray-500 pt-1">{selectedAsset.address}</p>

                    <tr className="border-b">                </CardHeader>

                      <th className="pb-2 font-[DengXian-Light]">资产编号</th>                <CardContent>

                      <th className="pb-2 font-[DengXian-Light]">资产名称</th>                    <Button className="w-full">View Asset on Map</Button>

                      <th className="pb-2 font-[DengXian-Light]">类型</th>                </CardContent>

                      <th className="pb-2 font-[DengXian-Light]">价值(万元)</th>              </Card>

                      <th className="pb-2 font-[DengXian-Light]">风险等级</th>

                      <th className="pb-2 font-[DengXian-Light]">保险状态</th>              <Card>

                    </tr>                <CardHeader>

                  </thead>                  <CardTitle className="text-base">Financial & Insurance</CardTitle>

                  <tbody>                </CardHeader>

                    <tr className="border-b">                <CardContent className="space-y-2 text-sm">

                      <td className="py-2 font-[DengXian-Light]">AS001</td>                  <div className="flex justify-between"><span>Total Insured Value:</span> <span className="font-medium text-red-600">{selectedAsset.totalInsuredValue}</span></div>

                      <td className="py-2 font-[DengXian-Light]">中央商务大厦</td>                  <div className="flex justify-between"><span>Policy ID:</span> <span className="font-medium">{selectedAsset.policyId}</span></div>

                      <td className="py-2 font-[DengXian-Light]">建筑物</td>                  <div className="flex justify-between"><span>Coverage:</span> <span className="font-medium">{selectedAsset.coverageType}</span></div>

                      <td className="py-2 font-[DengXian-Light]">50,000</td>                  <div className="flex justify-between"><span>Premium:</span> <span className="font-medium">{selectedAsset.premium}</span></div>

                      <td className="py-2"><span className="text-red-600 font-[DengXian-Light]">高风险</span></td>                  <div className="flex justify-between"><span>Deductible:</span> <span className="font-medium">{selectedAsset.deductible}</span></div>

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">已保险</span></td>                </CardContent>

                    </tr>              </Card>

                    <tr className="border-b">              

                      <td className="py-2 font-[DengXian-Light]">AS002</td>              <Card>

                      <td className="py-2 font-[DengXian-Light]">滨江住宅区</td>                <CardHeader>

                      <td className="py-2 font-[DengXian-Light]">建筑物</td>                  <CardTitle className="text-base">Physical Characteristics</CardTitle>

                      <td className="py-2 font-[DengXian-Light]">32,000</td>                </CardHeader>

                      <td className="py-2"><span className="text-orange-600 font-[DengXian-Light]">中风险</span></td>                <CardContent className="space-y-2 text-sm">

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">已保险</span></td>                   <div className="flex justify-between"><span>Asset Type:</span> <span className="font-medium">{selectedAsset.type}</span></div>

                    </tr>                   <div className="flex justify-between"><span>Construction:</span> <span className="font-medium">{selectedAsset.construction}</span></div>

                    <tr className="border-b">                   <div className="flex justify-between"><span>Year Built:</span> <span className="font-medium">{selectedAsset.yearBuilt}</span></div>

                      <td className="py-2 font-[DengXian-Light]">AS003</td>                   <div className="flex justify-between"><span>Occupancy:</span> <span className="font-medium">{selectedAsset.occupancy}</span></div>

                      <td className="py-2 font-[DengXian-Light]">城市水处理厂</td>                </CardContent>

                      <td className="py-2 font-[DengXian-Light]">基础设施</td>              </Card>

                      <td className="py-2 font-[DengXian-Light]">15,000</td>

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">低风险</span></td>              <Card>

                      <td className="py-2"><span className="text-green-600 font-[DengXian-Light]">已保险</span></td>                <CardHeader>

                    </tr>                  <CardTitle className="text-base">Risk Assessment</CardTitle>

                  </tbody>                </CardHeader>

                </table>                <CardContent className="space-y-2 text-sm">

              </div>                   <div className="flex justify-between"><span>Flood Risk Score:</span> <span className="font-medium text-orange-600">{selectedAsset.floodRiskScore}</span></div>

            </CardContent>                   <div className="flex justify-between"><span>Last Assessment:</span> <span className="font-medium">{selectedAsset.lastAssessment}</span></div>

          </Card>                </CardContent>

        </div>              </Card>

      </div>

    </div>            </div>

  );          ) : (

}            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">Select an asset to view details.</p>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}