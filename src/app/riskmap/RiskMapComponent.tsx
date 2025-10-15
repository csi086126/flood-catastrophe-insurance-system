"use client";

import React, { forwardRef, useImperativeHandle } from 'react';

export type RiskMapHandle = {
  toggleLayer: (key: string, visible: boolean) => void;
};

type Props = {
  wmsLayersConfig: Record<string, { url: string; layers: string }>;
};

const RiskMapComponent = forwardRef<RiskMapHandle, Props>(({ wmsLayersConfig }, ref) => {
  useImperativeHandle(ref, () => ({
    toggleLayer: (key: string, visible: boolean) => {
      // Stub: connect to Leaflet/WMS later
      console.log("toggleLayer called", { key, visible });
    },
  }));

  return (
    <div className="w-full h-full flex items-center justify-center text-gray-500">
      地图组件开发中...
    </div>
  );
});

RiskMapComponent.displayName = 'RiskMapComponent';
export default RiskMapComponent;
