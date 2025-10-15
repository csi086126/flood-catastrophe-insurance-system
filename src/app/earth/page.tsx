"use client"

// 1. 导入必要的组件
// - 仅保留了 Header 和 iframe 实现所必需的依赖。
import Header from '@/components/Header';

// 2. Header 组件
// - 保持不变，提供网站导航。
// Use shared Header

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