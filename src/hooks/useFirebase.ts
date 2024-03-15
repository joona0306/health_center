// FB Collection 관리
// Collection을 미리 안만들어도 됨
// FB 연동 시 성공/실패 관리
import { appFireStore, timeStamp } from '@/fb/fbconfig';
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentReference,
  FirestoreError,
} from 'firebase/firestore';
import { Reducer, useReducer } from 'react';

// 상태에 대한 interface
interface State {
  document: DocumentReference | null;
  isPending: boolean;
  error: string | null;
  success: boolean;
}
// 액션에 대한 type
type Action =
  | { type: 'isPending' }
  | { type: 'addDoc'; payload: DocumentReference }
  | { type: 'error'; payload: string };

// 리듀서에 보관한 초기값
const initState: State = {
  // 저장할 문서
  document: null,
  // 네트워크에 연결시도
  isPending: false,
  // 네트워크에 에러발생
  error: null,
  // 결과의 성공/회신 유무
  success: false,
};
// 리듀서함수는 리듀서에 보관한 state를 변경하는 함수
// 매개변수가 2개입니다.
// 리듀서 함수는 switch구문 사용합니다.
// state 보관용 자료
// action state에 담을 내용(데이터)
// action은 type 속성과, payload속성이 있습니다.
const storeReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'isPending':
      // 네트워크로 FB에 연결중이면...
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'addDoc':
      // 새로운 글을 등록한다면...
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      // 오류가 발생했다면...
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      // 최소 아무 작업을 하지 않더라도 리듀서함수는 state, 즉 원본이라도 리턴해야함
      return state;
  }
};

// 매개변수 transaction은 Collection이다.
// 사용예: useFirebase("feedback")
// 사용예: useFirebase("freeboard")
export const useFirebase = (transaction: string) => {
  // useReducer는 dispatch 함수를 실행 후 결과값 변경 및 보관
  //   const [response(상태값), dispatch(상태값 변경 함수)] = useReducer(리듀서함수, 초기값);
  const [response, dispatch] = useReducer(storeReducer, initState);

  // FB 에 Collection 만들라고 요청
  // colRef 는 FB가 만들어준 Collection의 참조 변수
  // collection(저장소참조, collection 이름)
  const colRef = collection(appFireStore, transaction);

  // collection 없으면 자동으로 생성
  // Document를 저장한다.
  const addDocument = async (doc: any) => {
    dispatch({ type: 'isPending' });
    try {
      // 문서 저장 시 timeStamp를 추가한다.
      const createdTime = timeStamp.fromDate(new Date());
      // FB의 API 문서 중에 문서 추가 기능을 입력
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: (error as FirestoreError).message });
    }
  };

  // Document를 삭제한다.
  const deleteDocument = (id: string) => {
    // await deleteDoc(doc(db, 'cities', 'DC'));
  };

  return { response, addDocument, deleteDocument };
};
