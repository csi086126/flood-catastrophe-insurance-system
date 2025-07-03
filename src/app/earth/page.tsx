"use client"

// 1. 导入必要的组件
// - 仅保留了 Header 和 iframe 实现所必需的依赖。
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

// 2. Header 组件
// - 保持不变，提供网站导航。
const Header = () => {
  return (
    <header className="bg-white shadow-md z-10"> {/* 添加 z-10 确保 Header 在 iframe 之上 */}
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

// 3. 主组件
// - 将 earth.nullschool.net 通过 iframe 嵌入页面。
export default function Component() {
  return (
    // 使用 flex-col 让子元素垂直排列，h-screen 占据整个视口高度，背景设为黑色以匹配 iframe 内容
    <div className="flex flex-col h-screen bg-black">
      <Header />

      {/* 主内容区域，flex-grow 会让这个区域填充 Header 之外的所有剩余空间 */}
      <main className="flex-grow">
        <iframe
          src="https://earth.nullschool.net/"
          title="Earth Nullschool"
          className="w-full h-full border-0" // 宽度和高度 100%，无边框
        ></iframe>
      </main>
    </div>
  );
}