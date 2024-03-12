import { NaverMap } from './../types/map';
import { Coordinates } from '@/types/info';
import { useCallback } from 'react';
import { mutate } from 'swr';

export const INITIAL_CENTER: Coordinates = [37.3595704, 127.105399];
export const INITIAL_ZOOM = 10;
export const INITIAL_MINZOOM = 9;
// 지도의 값을 보관하고 캐쉬할 SWR 객체 만들기
export const MAP_KEY = '/map';
// 함수 실행 후 {함수,값} 리턴
export const UseMap = () => {
  // 지도에 필요한 값 초기화 함수
  const initializeMap = useCallback((map?: NaverMap) => {
    if (map) {
      mutate(MAP_KEY, map);
    }
  }, []);
  return { initializeMap };
};
