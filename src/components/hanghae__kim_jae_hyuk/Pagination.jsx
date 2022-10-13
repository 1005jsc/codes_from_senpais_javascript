// 항해 김재혁 매니저님 코드이다
// css는 회사에서 만든 css를 따로 임포트 해야되서 일단 두겠다

import React from 'react';
import { useHandlePage } from './useHandlePage';

const Pagination = ({ pageArr, setPaginatedIndex }) => {
  const { handlePrev, handleNext, currentArr, currentIndex, handlePageClick } =
    useHandlePage(pageArr, setPaginatedIndex);

  return (
    <ul className='page-number-box flex jcc aic'>
      <li className='prev-btn flex aic jcc' onClick={handlePrev}>
        <span className='img-box'>
          <img
            src='/img/sub-fashion/indicator/next-btn.png'
            alt='오른쪽 화살표'
          />
        </span>
      </li>

      {currentIndex > 4 && (
        <>
          <li
            onClick={() => handlePageClick(0)}
            className={
              currentIndex === 0
                ? 'number flex aic jcc rr active'
                : 'number flex aic jcc rr'
            }
          >
            1
          </li>
          <li className='dot rr'>...</li>
        </>
      )}

      {currentArr.map((item, idx) => {
        if (item < pageArr[pageArr.length - 1]) {
          return (
            <li
              key={idx}
              onClick={() => handlePageClick(item - 1)}
              className={
                currentIndex === item - 1
                  ? 'number flex aic jcc rr active'
                  : 'number flex aic jcc rr'
              }
            >
              {item}
            </li>
          );
        } else {
          return <div key={idx} style={{ display: 'none' }}></div>;
        }
      })}

      {pageArr.length >= 2 && <li className='dot rr'>...</li>}
      {pageArr.length < 2 ? (
        <>
          <li className='number flex aic jcc rr active'>
            {pageArr[pageArr.length - 1]}
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => handlePageClick(pageArr[pageArr.length - 2])}
            className={
              currentIndex + 1 === pageArr[pageArr.length - 1]
                ? 'number flex aic jcc rr active'
                : 'number flex aic jcc rr'
            }
          >
            {pageArr[pageArr.length - 1]}
          </li>
        </>
      )}
      <li className='next-btn flex aic jcc' onClick={handleNext}>
        <span className='img-box'>
          <img
            src='/img/sub-fashion/indicator/next-btn.png'
            alt='오른쪽 화살표'
          />
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
