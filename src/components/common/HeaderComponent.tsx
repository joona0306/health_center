import Link from 'next/link';
import React from 'react';
import styles from '@/styles/header.module.scss';
import Image from 'next/image';
// React.ReactNode : React에서 만든 HTML 요소
// 여러개의 children 요소들을 받을 것이므로 배열로 받음
interface Props {
  rightElement?: React.ReactNode[];
}

const HeaderComponent: React.FC<Props> = ({ rightElement }): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.flexitem}>
          <Link className={styles.box} href={'/'}>
            <Image
              src="/next.svg"
              width={110}
              height={20}
              alt="보건소 안내 서비스"
              quality={75}
              priority
            />
          </Link>
        </div>
        {rightElement && <div className={styles.flexitem}>{rightElement}</div>}
      </header>
    </>
  );
};

export default HeaderComponent;
