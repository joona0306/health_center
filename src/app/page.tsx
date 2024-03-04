'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { SlFeed, SlLayers, SlShare } from 'react-icons/sl';
import MapSection from '@/components/map/MapSection';

export default function Home() {
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
