# 네이버 개발자 등록 및 지도 API 활용

- [서비스가입](https://www.ncloud.com)
- [콘솔](https://console.ncloud.com/naver-service/application)
- [맵가이드](https://guide.ncloud-docs.com/docs/ko/maps-web-sdk)

## 기본 폴더 구성

- /src/components/map 폴더생성
- /src/components/map/MapSection.tsx 파일 생성

```tsx
import React from 'react';

const MapSection = () => {
  return <div>MapSection</div>;
};

export default MapSection;
```

## 지도 배치

- /src/app/page.tsx

```tsx
'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { SlActionRedo, SlLayers } from 'react-icons/sl';
import { PiSealCheck } from 'react-icons/pi';
import MapSection from '@/components/map/MapSection';

export default function Home() {
  return (
    <>
      <HeaderComponent
        rightElements={[
          <button
            key="share"
            className={styles.box}
            onClick={() => {
              alert('지도공유');
            }}
          >
            <SlActionRedo />
          </button>,
          <Link key="feedback" href="/feedback" className={styles.box}>
            <PiSealCheck />
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
```

- src/styles/globals.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
ul,
li {
  list-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
```

```tsx
import React from 'react';
import Map from './Map';

const MapSection = () => {
  return (
    <>
      <Map />
    </>
  );
};

export default MapSection;
```

## 실제 Map 배치 컴포넌트

- /src/components/map/Map.tsx 파일 생성

```tsx
import React from 'react';

const Map = () => {
  return <div>Map</div>;
};

export default Map;
```

## 지도 API 활용하기

- [문서](https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html)
- /src/components/map/Map.tsx

```tsx
import Script from 'next/script';
import React from 'react';

const Map = () => {
  const initializeMap = (): void => {
    console.log('로딩완료');
  };
  return (
    <>
      {/* Next.js 에서 외부 자바스크립트 참조시 next/script */}
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=비밀번호`}
        onLoad={initializeMap}
      />
    </>
  );
};

export default Map;
```
