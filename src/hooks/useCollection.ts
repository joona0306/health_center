import { useEffect, useState } from 'react';
import { appFireStore } from '../fb/fbconfig';
import {
  onSnapshot,
  collection,
  FirestoreError,
  QuerySnapshot,
} from 'firebase/firestore';

// FB 문서들을 모아 놓은 배열의 interface 정의
interface Document {
  id: string;
  [key: string]: any;
}

// collection에 데이터들을 가져와서 출력
// useCollection("feedback")
// useCollection("user")
export const useCollection = (transaction: string) => {
  // collection의 내용을 state에 보관
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // collection 이 변경된 경우 실행하도록 설정
  useEffect(() => {
    // collection(FB프로젝트, collection)
    const unsubscribe = onSnapshot(
      collection(appFireStore, transaction),
      (snapshot: QuerySnapshot) => {
        let result: Document[] = [];
        // console.log(snapshot);
        // console.log(snapshot.docs);
        snapshot.docs.forEach(doc => {
          // doc.data() 는 FB API, 내용을 리턴한다
          result.push({ ...doc.data(), id: doc.id });
        });
        // 전체 FB 문서를 보관
        setDocuments(result);
        setError(null);
      },
      error => {
        setError(error.message);
      },
    );
    // 클린업 함수
    return unsubscribe;
  }, [transaction]);

  return { documents, error };
};
