'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/header.module.scss';
import { SlFeed, SlLayers } from 'react-icons/sl';
import { useFirebase } from '@/hooks/useFirebase';
import { useCollection } from '@/hooks/useCollection';
import dayjs from 'dayjs';

type Feedback = {
  id: number;
  message: string;
  nickName: string;
  email: string;
};

const Feedback = (): JSX.Element => {
  // FB Hook 가져오기
  const { documents, error } = useCollection('feedback');
  // feedback collection 만들기
  const { response, addDocument } = useFirebase('feedback');
  // 입력창 관련 state
  const [message, setMessage] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  // 피드백 목록 관련 state
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  // 내용 등록하기 기능
  const addFeddback = () => {
    const feedback: Feedback = {
      id: Date.now(),
      message: message,
      nickName: nickName,
      email: email,
    };
    addDocument(feedback);

    // 실시간 등록된 목록 업데이트
    // onSnapShot
    setFeedbackList([...feedbackList, feedback]);
  };

  // Reducer의 State를 참조해서 결과를 처리한다.
  useEffect(() => {
    if (response.success) {
      setMessage('');
      setNickName('');
      setEmail('');
    }
  }, [response.success]);

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
      <main>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                대한 민국 보건소 위치 지도 서비스 피드백
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                본 서비스에 대한 피드백을 남겨주세요.
              </p>
            </div>

            {/* <div>
              <h1>실시간 데이터 보기</h1>
              {documents && <strong>OKOK</strong>}
              {documents?.map(item => {
                return (
                  <div key={item.id}>
                    <strong>{item.id}</strong>
                    <strong>{item.message}</strong>
                    <strong>{item.nickName}</strong>
                    <strong>{item.email}</strong>
                  </div>
                );
              })}
            </div> */}

            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 mx-auto">
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      Feedback Input
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <section className="text-gray-600 body-font relative">
                      <div className="container px-5 mx-auto">
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                          <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                              <div className="relative">
                                <label
                                  htmlFor="nickname"
                                  className="leading-7 text-sm text-gray-600"
                                >
                                  Nickname
                                </label>
                                <input
                                  type="text"
                                  id="nickname"
                                  name="nickname"
                                  value={nickName}
                                  onChange={e => {
                                    setNickName(e.target.value);
                                  }}
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="p-2 w-1/2">
                              <div className="relative">
                                <label
                                  htmlFor="email"
                                  className="leading-7 text-sm text-gray-600"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={email}
                                  onChange={e => {
                                    setEmail(e.target.value);
                                  }}
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                              </div>
                            </div>
                            <div className="p-2 w-full">
                              <div className="relative">
                                <label
                                  htmlFor="message"
                                  className="leading-7 text-sm text-gray-600"
                                >
                                  Message
                                </label>
                                <textarea
                                  id="message"
                                  name="message"
                                  value={message}
                                  onChange={e => {
                                    setMessage(e.target.value);
                                  }}
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                ></textarea>
                              </div>
                            </div>
                            <div className="p-2 w-full">
                              <button
                                onClick={() => {
                                  // FB 등록 테스트
                                  addFeddback();
                                }}
                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  {/* ====================== 등록된 목록 출력 영역 ====================== */}
                  {documents?.map(item => {
                    const date = item.createdTime.toDate(); // 가정: createdTime이 Firebase Timestamp 객체
                    const dateString = date.toDateString(); // 또는 다른 포매팅 방법 사용
                    return (
                      <div
                        key={item.id}
                        className="py-8 flex flex-wrap md:flex-nowrap"
                      >
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                          <span className="font-semibold title-font text-gray-700">
                            CATEGORY ({item.email})
                          </span>
                          <span className="mt-1 text-gray-500 text-sm">
                            {dateString}
                          </span>
                        </div>
                        <div className="md:flex-grow">
                          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                            {item.nickName}
                          </h2>
                          <p className="leading-relaxed">{item.message}</p>
                          <a className="text-indigo-500 inline-flex items-center mt-4">
                            Delete
                          </a>
                        </div>
                      </div>
                    );
                  })}
                  {/* ====================== 등록된 목록 출력 영역 ====================== */}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Feedback;
