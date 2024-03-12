'use client';
import { Marker } from '@/types/map';
import React, { useEffect } from 'react';

const Marker = ({ map, coordinates, icon }: Marker) => {
  // 컴포넌트 배치시 기본 출력 처리
  useEffect(() => {
    // https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html
    let marker: naver.maps.Marker | null = null;
    if (map) {
      // 마커를 출력한다
      marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(...coordinates),
        map: map,
        icon: icon,
      });
    }
    // 컴포넌트가 제거될 때 실행할 cleanup 함수
    return () => {
      marker?.setMap(null);
    };
    // 지도 객체가 변화가 일어나면 처리
    // dependency Array (의존성 배열)
  }, [map]);

  // 네이버 마커 아이콘은 네이버가 렌더링한다.
  return null;
};

export default Marker;