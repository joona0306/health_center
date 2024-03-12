import React from 'react';
import Map from './Map';
import { UseMap } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import Markers from '../home/Markers';

const MapSection = () => {
  // 커스텀 훅으로 Naver Map 초기화 시도
  const { initializeMap } = UseMap();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };
  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};

export default MapSection;
