import { Coordinates, Info } from '@/types/info';

// info.json 파일 호출
export const getInfoList = async (): Promise<Info[]> => {
  // Next.js에는 내부적 fetch 작성 되어있음
  const res = await fetch('/info.json');
  if (res.status !== 200) {
    throw new Error('데이터를 가져오는데 실패');
  } else {
    return res.json();
  }
};
