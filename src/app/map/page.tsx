"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, Upload, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from 'axios'
import dynamic from 'next/dynamic'
import "leaflet/dist/leaflet.css"
import { Download } from 'lucide-react'
import ProjectStatusCell from './ProjectStatusCell'
import JSZip from 'jszip';
import shp from 'shpjs';
import Link from 'next/link';

// import L from 'leaflet'

// 动态导入 MapContainer 组件，并禁用 SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
// 新增：动态导入 WMSTileLayer 组件
const WMSTileLayer = dynamic(() => import('react-leaflet').then(mod => mod.WMSTileLayer), { ssr: false });


// Set up the default icon
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/images/marker-icon-2x.png',
//   iconUrl: '/images/marker-icon.png',
//   shadowUrl: '/images/marker-shadow.png',
// });

var tempuserName = "none";
var tempprojectName = "none";


const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-4 py-2 flex justify-between items-center ml-2">
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
            {/* 假设主页路由是 "/" */}
            <li><Link href="/"><Button variant="ghost">Home</Button></Link></li>
            {/* 假设风险分析页路由是 "/risk-analysis" */}
            <li><Link href="/risk-analysis"><Button variant="ghost">Risk Analysis</Button></Link></li>
            {/* 假设风险统计页路由是 "/risk-statistics" */}
            <li className="ml-auto"><Link href="/risk-statistics"><Button variant="ghost">Risk Statistics</Button></Link></li>
            {/* 假设您想跳转到的地图页面的路由是 "/map" */}
            <li>
              <Link href="/map">
                <Button variant="ghost">Map</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default function Component() {
  const [projectName, setProjectName] = useState("")
  const [userName, setUserName] = useState("")
  const [randomYears, setRandomYears] = useState("1")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [outputGranularity, setOutputGranularity] = useState("")
  const [annualTotalLoss, setAnnualTotalLoss] = useState("1")
  const [annualMaxLoss, setAnnualMaxLoss] = useState("0")
  const [lossPreciseEvent, setLossPreciseEvent] = useState("0")
  const [eventName, setEventName] = useState("")
  const [affectedArea, setAffectedArea] = useState("")
  const [date, setDate] = useState<Date>()
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [eventType, setEventType] = useState("")
  const [analysisMode, setAnalysisMode] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 1
  const mapRef = useRef(null);
  const [L, setL] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  var file: File | undefined = undefined;
  interface Project {
    id: string;
    userName: string;
    startTime: string;
    endTime: string;
    years: number;
    annualTotalLoss: number;
    standDerivation: number;
    status: string;
  }
  
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    // const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
    import('proj4leaflet');

    // 页面加载时从后端获取表格数据
    axios.get('http://143.89.22.7:3001/api/projectData')
    .then(response => {
      setProjectData(response.data);
    })
    .catch(error => {
      console.error('Error fetching project data:', error);
    });

    return () => clearInterval(timer)
  }, [])

  const handleSubmit  = async () => {
    if (file ) {
      console.log(`File uploaded: ${file.name}`)
      // Here you would handle the file upload logic
      const formData = new FormData()
      formData.append('file', file)

      // alert('File uploaded successfully')
      
      try {
        const response = axios.post('http://143.89.22.7:3001/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('File uploaded successfully', response.data)
      } catch (error) {
        console.error('Error uploading file', error)
      }
    }




    //--user_name user1 --project_description "This is a demo project" --property_file input_table.csv --num_random_samples 10000
    const pycmd = '--project_id '+projectName+' --user_name '+userName+' --project_description demofile --property_file input_table.csv --num_random_samples '+randomYears.toString()
    // axios.post('http://localhost:3001/api/submit', { data: pycmd })

    projectData.push({
      id: projectName,
      userName: userName,
      startTime: startTime,
      endTime: endTime,
      years: Number(randomYears),
      annualTotalLoss: 0.0,
      standDerivation: 0.0,
      status: "Loading",
    })

    alert('Project submitted successfully. The backend is processing the results.')


    const response = await axios.post('http://143.89.22.7:3001/api/submit', { data: pycmd })
    .then(response => {
      console.log('Data submitted successfully', response.data)
    })
    .catch(error => {
      console.error('Error submitting data', error)
    })
    console.log("Form submitted", pycmd)
    



    const fetchData = async (userName: string, projectName: string) => {
      try {
        const response = await axios.get('http://143.89.22.7:3001/api/getresultdata', {
          params: {
            userName,
            projectName
          }
        });
        if (response.data) {
          console.log('Valid data received:', response.data);
          projectData[projectData.length - 1].annualTotalLoss = Number(response.data.annualTotalLoss);
          projectData[projectData.length - 1].standDerivation = Number(response.data.standDerivation);
          projectData[projectData.length - 1].status = "Completed";

          console.log('Project data:', projectData);

          // 将更新的数据发送到后端
          axios.post('http://143.89.22.7:3001/api/projectData', projectData)
          .then(response => {
            console.log('Project data updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating project data:', error);
          });

          clearInterval(intervalId);
        } else {
          console.log('No valid data yet, retrying...');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(() => fetchData(userName, projectName), 2000);
  }



  const handleCancel = () => {
    setProjectName("")
    setRandomYears("1")
    setStartTime("")
    setEndTime("")
    setOutputGranularity("")
    setAnnualTotalLoss("0")
    setAnnualMaxLoss("0")
    setLossPreciseEvent("0")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    file = event.target.files?.[0]
    
  }

  const handleDownload = async (userName: string, projectName: string) => {
    try {
      console.log('Downloading project result:', tempuserName, tempprojectName)
      if (tempuserName === "none" || tempprojectName === "none") {
        alert('Please select a project to download.')
        return
      }
      const response = await axios.get('http://143.89.22.7:3001/api/download', {
        responseType: 'blob', // 确保响应类型为 blob
        params: {
          userName:tempuserName,
          projectName:tempprojectName
          }
      })

      // 创建一个 URL 对象并触发下载
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', tempuserName+tempprojectName+'.zip') // 设置下载文件名
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  const transformCoordinates = (coordinates, transform) => {
    if (Array.isArray(coordinates[0])) {
      return coordinates.map(coord => transformCoordinates(coord, transform));
    } else {
      return transform.forward(coordinates);
    }
  };

  const handleRowClick = (project) => {
    setSelectedProjectId(project.id);

    tempuserName = project.userName;
    tempprojectName = project.id;
    if (!L) return;

    console.log('Row clicked:', project);
    if (mapRef.current) {
      const map = mapRef.current;
      map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) map.removeLayer(layer);
      });

      if (project.status === "Completed") {
        // 加载并将shapefile添加到地图
        axios.get('http:///143.89.22.7:3001/api/download', {
          responseType: 'arraybuffer',
          params: {
            userName: tempuserName,
            projectName: tempprojectName
          }
        })
        .then(response => JSZip.loadAsync(response.data))
        .then(zip => {
          const shpFiles = [];
          zip.forEach((relativePath, file) => {
            if (relativePath.endsWith('.shp') || relativePath.endsWith('.shx') || relativePath.endsWith('.dbf')) {
              shpFiles.push({ name: relativePath, buffer: file.async('arraybuffer') });
            }
          });
          return Promise.all(shpFiles.map(file => file.buffer.then(buffer => ({ name: file.name, buffer }))));
        })
        .then(files => {
          return shp({
            shp: files.find(file => file.name.endsWith('.shp')).buffer,
            shx: files.find(file => file.name.endsWith('.shx')).buffer,
            dbf: files.find(file => file.name.endsWith('.dbf')).buffer
          });
        })
        .then(geojson => {
          if (geojson && geojson.features && geojson.features.length > 0) {
            console.log('Shapefile contains data:', geojson.features);

            const onEachFeature = (feature, layer) => {
              if (feature.properties) {
                layer.on('click', () => {
                  const popupContent = Object.entries(feature.properties)
                    .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                    .join('<br />');
                  layer.bindPopup(popupContent).openPopup();
                });
              }
            };

            const shapefileLayer = L.geoJSON(geojson, {
              onEachFeature: onEachFeature
            });
            console.log('Shapefile layer:', shapefileLayer);
            shapefileLayer.addTo(map);

            // 调整地图视野范围以确保数据可见
            const bounds = shapefileLayer.getBounds();
            map.fitBounds(bounds);
            
          } else {
            console.log('Shapefile does not contain any data.');
          }
        })
        .catch(error => {
          console.error('Error loading shapefile:', error);
        });
      }
    }
  };



  return (
    <div className="flex flex-col h-screen">
      <Header />

      <Card>
            <CardContent>
              <div className="h-[1180px] w-full rounded-lg overflow-hidden">
                <MapContainer
                  ref={mapRef}
                  center={[22.3193, 114.1694]}
                  zoom={11}
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* 底图图层 */}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* --- 新增：GeoServer WMS 图层 --- */}
                  {/* 请将下面的 url 和 layers 替换为您自己的 GeoServer 服务信息 */}
                  <WMSTileLayer
                    url="http://143.89.22.7:8090/geoserver/wms" // 示例 URL，请替换成您的 GeoServer WMS 服务地址. [7]
                    params={{
                      layers: '	COP:Flood_Depth _Return_Period_500yr', // 请替换成您的 "工作区:图层名". [2]
                      format: 'image/png', // 请求的图片格式. [2]
                      transparent: true, // 设置为 true 使图层背景透明. [2]
                      version: '1.1.0' // WMS 版本号. [7]
                    }}
                    attribution="Your GeoServer Data" // 可选的图层版权信息
                  />
                  {/* --- WMS 图层结束 --- */}

                  <Marker position={[22.3193, 114.1694]}>
                    <Popup>Central District - High Risk Zone</Popup>
                  </Marker>
                  <Marker position={[22.2783, 114.1747]}>
                    <Popup>Aberdeen - Flood Risk Area</Popup>
                  </Marker>
                  <Marker position={[22.3785, 114.2707]}>
                    <Popup>Sha Tin - Landslide Risk Zone</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </CardContent>
          </Card>

    </div>
  )
}