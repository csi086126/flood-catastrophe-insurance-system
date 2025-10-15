"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Database, 
  Map, 
  Shield, 
  BarChart3, 
  Accessibility, 
  User 
} from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  // 判断是否是当前页面
  const isCurrentPage = (path: string) => pathname === path;

  // 处理按钮点击动画
  const handleButtonClick = (buttonId: string) => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(null), 200); // 200ms后移除动画
  };

  // 获取按钮样式
  const getButtonStyle = (path: string, buttonId: string) => {
    const isActive = isCurrentPage(path);
    const isClicked = clickedButton === buttonId;
    
    return `flex items-center gap-2 transition-all duration-200 ${
      isActive 
        ? 'text-blue-600 font-semibold text-base scale-105' 
        : 'text-gray-700 font-normal text-sm'
    } ${
      isClicked 
        ? 'transform scale-110 animate-bounce' 
        : 'hover:scale-105'
    }`;
  };

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
          <span className="ml-2 text-xl font-semibold"></span>
        </div>
        <nav className="flex-grow flex justify-end">
          <ul className="flex space-x-4">
            <li>
              <Link href="/cityinfo">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/cityinfo', 'cityinfo')}
                  onClick={() => handleButtonClick('cityinfo')}
                >
                  <Building2 size={16} />
                  Urban Spatial Elements
                </Button>
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/disasterinfo">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/disasterinfo', 'disasterinfo')}
                  onClick={() => handleButtonClick('disasterinfo')}
                >
                  <Database size={16} />
                  Disaster event repository
                </Button>
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/riskmap">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/riskmap', 'riskmap')}
                  onClick={() => handleButtonClick('riskmap')}
                >
                  <Map size={16} />
                  Risk map
                </Button>
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/asset">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/asset', 'asset')}
                  onClick={() => handleButtonClick('asset')}
                >
                  <Shield size={16} />
                  Asset management
                </Button>
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/model">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/model', 'model')}
                  onClick={() => handleButtonClick('model')}
                >
                  <BarChart3 size={16} />
                  Catastrophe model
                </Button>
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/fuzhu">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/fuzhu', 'fuzhu')}
                  onClick={() => handleButtonClick('fuzhu')}
                >
                  <Accessibility size={16} />
                  Accessibility
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/usercenter">
                <Button 
                  variant="ghost" 
                  className={getButtonStyle('/usercenter', 'usercenter')}
                  onClick={() => handleButtonClick('usercenter')}
                >
                  <User size={16} />
                  User centre
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;