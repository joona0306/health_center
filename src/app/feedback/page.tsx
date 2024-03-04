import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';
import { SlFeed, SlLayers } from 'react-icons/sl';

const Feedback = (): JSX.Element => {
  return (
    <>
      <HeaderComponent
        rightElement={[
          <Link key="feedback" href="/feedback" className={styles.box}>
            <SlFeed />
          </Link>,
          <Link key="about" href="/about" className={styles.box}>
            <SlLayers />
          </Link>,
        ]}
      />
      <main>피드백 페이지입니다</main>
    </>
  );
};

export default Feedback;
