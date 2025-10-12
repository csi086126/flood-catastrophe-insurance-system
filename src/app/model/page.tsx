"use client"

// 1. 导入所需的React组件和库
import { useState } from 'react'; // 导入 useState Hook
import { useRouter } from 'next/navigation'; // 导入 useRouter Hook
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 2. Header 组件 (保持不变，供登录后使用)
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

// 3. 带有登录逻辑的 Login 组件
const Login = () => {
  // 使用 useState 管理输入值和错误信息，并设置默认值
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');

  // 获取 router 实例以进行导航
  const router = useRouter();

  // 处理登录逻辑
  const handleLogin = (e) => {
    e.preventDefault(); // 阻止表单默认的页面刷新行为

    // 检查凭据
    if (username === 'admin' && password === '123') {
      // 如果凭据正确，清除错误信息并跳转
      setError('');
      console.log('Login successful, redirecting...');
      router.push('/oasis'); // 跳转到主页
    } else {
      // 如果凭据错误，显示错误信息
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="/taipinglogo.png"
          alt="China Taiping Logo"
          width={240}
          height={53}
        />
        <h1 className="text-2xl font-bold text-center">
          Flood Catastrophe Insurance System
        </h1>
      </div>

      {/* 将 onSubmit 事件处理器绑定到表单 */}
      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Please enter your username"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username} // 绑定 value
            onChange={(e) => setUsername(e.target.value)} // 监听变化
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Please enter your password"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} // 绑定 value
            onChange={(e) => setPassword(e.target.value)} // 监听变化
          />
        </div>

        {/* 如果有错误信息，则显示它 */}
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

// 4. 主组件，渲染登录页面
export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Login />
    </div>
  );
}