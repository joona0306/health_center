'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import styles from '@/styles/header.module.scss';
import { SlFeed, SlLayers, SlShare } from 'react-icons/sl';

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
      <main>테스트</main>
    </>
  );
}
