'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { SlFeed, SlLayers, SlShare } from 'react-icons/sl';
import MapSection from '@/components/map/MapSection';
import { useEffect } from 'react';
import { getInfoList } from '@/apis/api';
import { Info } from '@/types/info';
import { useInfo } from '@/hooks/useInfo';

export default function Home() {
  // SWR에 정의한 Hook호출하기
  const { initializeInfo } = useInfo();
  // 페이지 준비가 되면 데이터 호출
  useEffect(() => {
    // 마커를 위한 데이터 호출
    const fetchInfoList = async () => {
      try {
        const res: Info[] = await getInfoList();
        // SWR에 초기값 보관하기
        initializeInfo(res);
        // console.log(res);
        // res.map(info => console.log(info.coordinates));
      } catch (error) {
        console.log('에러가 발생했습니다.', error);
      }
    };

    fetchInfoList();
  }, []);
  return (
    <>
      <HeaderComponent
        rightElement={[
          <button
            key="share"
            onClick={() => {
              alert('지도공유');
            }}
            className={styles.box}
          >
            <SlShare />
          </button>,
          <Link key="feedback" href="/feedback" className={styles.box}>
            <SlFeed />
          </Link>,
          <Link key="about" href="/about" className={styles.box}>
            <SlLayers />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </>
  );
}
