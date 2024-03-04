import Script from 'next/script';
import React from 'react';

const Map = () => {
  const initializeMap = () => {
    console.log('로딩완료');
  };
  return (
    <>
      {/* Next.js에서 외부 자바스크립트 참조 시 next의 Script */}
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID`}
        onLoad={initializeMap}
      />
    </>
  );
};

export default Map;
