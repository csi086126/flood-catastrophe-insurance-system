"use client"

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRememberMeChange = (checked: boolean) => {
    setLoginData(prev => ({
      ...prev,
      rememberMe: checked
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 简单的验证逻辑 - 在实际项目中应该调用API
    if (loginData.username.trim() === '' || loginData.password.trim() === '') {
      setError('请输入用户名和密码');
      setIsLoading(false);
      return;
    }

    // 模拟登录延迟
    setTimeout(() => {
      // 这里可以添加实际的登录验证逻辑
      // 暂时使用简单的验证：任何非空用户名和密码都可以登录
      if (loginData.username && loginData.password) {
        // 登录成功，跳转到城市信息页面
        router.push('/cityinfo');
      } else {
        setError('用户名或密码错误');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo 区域 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/taipinglogo.png"
              alt="China Taiping Logo"
              width={280}
              height={35}
              className="h-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            洪水巨灾保险系统
          </h1>
          <p className="text-gray-600">
            Flood Catastrophe Insurance System
          </p>
        </div>

        {/* 登录表单 */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">
              系统登录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  用户名
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={loginData.username}
                  onChange={handleInputChange}
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  密码
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="请输入密码"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={loginData.rememberMe}
                    onCheckedChange={handleRememberMeChange}
                    disabled={isLoading}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    记住我
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  disabled={isLoading}
                >
                  忘记密码？
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    登录中...
                  </div>
                ) : (
                  '登录'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 页脚信息 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 中国太平保险集团有限责任公司</p>
          <p className="mt-1">China Taiping Insurance Group Co., Ltd.</p>
        </div>
      </div>
    </div>
  );
}