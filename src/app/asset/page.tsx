"use client";

import Header from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AssetPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-[DengXian-Light]">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl mb-4 font-[DengXian-Light]">资产管理</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-[DengXian-Light]">资产评估</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-[DengXian-Light]">功能开发中，敬请期待。</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}