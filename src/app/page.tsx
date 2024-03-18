'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { SlFeed, SlLayers, SlShare } from 'react-icons/sl';
import MapSection from '@/components/map/MapSection';
import { useCallback, useEffect } from 'react';
import { getInfoList } from '@/apis/api';
import { Info } from '@/types/info';
import { useInfo } from '@/hooks/useInfo';
import { useMap } from '@/hooks/useMap';
import { useRouter } from 'next/navigation';
import copy from 'copy-to-clipboard';

// Next.js 13 버전 이상 처리
import { Suspense } from 'react';

export default function Home() {
  // 라우터 활용
  const router = useRouter();
  // 지도 관련 Hooks
  const { getMapOption } = useMap();
  // 현재 지도 좌표, zoom 정보 얻어오기
  const copyAndSaveMapInfo = useCallback(() => {
    const mapOptions = getMapOption();
    // console.log(mapOptions);
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;
    // console.log(query);
    // 패스 이동을 표현
    router.push(query);

    // query를 클립보드에 복사해서 보관
    copy(query);
  }, [router, getMapOption]);
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
              // alert('지도공유');
              // 현재 네이버의 좌표와 확대 비율을 보관해서 전달하도록 준비
              copyAndSaveMapInfo();
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
        {/* Next.js 13이상 버전 처리 */}
        <Suspense fallback={<>Loading...</>}>
          <MapSection />
        </Suspense>
      </main>
    </>
  );
}
