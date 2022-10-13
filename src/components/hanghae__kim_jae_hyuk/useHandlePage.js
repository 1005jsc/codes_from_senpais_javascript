import { useState, useEffect } from "react";

export const useHandlePage = (pageArr, setPaginatedIndex) => {
  const [currentArr, setCurrentArr] = useState([]);

  const [start, setStart] = useState(0);
  const end = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 1 !== pageArr[pageArr.length - 1]) {
      setCurrentIndex((prev) => prev + 1);
      setPaginatedIndex((prev) => prev + 1);
      if (currentIndex + 1 === currentArr[currentArr.length - 1]) {
        setStart((prev) => prev + 5);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex + 1 !== pageArr[0]) {
      setCurrentIndex((prev) => prev - 1);
      setPaginatedIndex((prev) => prev - 1);
      if (currentIndex + 1 === currentArr[0]) {
        setStart((prev) => prev - 5);
      }
    }
  };

  const handlePageClick = (idx) => {
    setCurrentIndex(idx);
    setPaginatedIndex(idx);
    if (idx === 0) {
      setStart(0);
    }
    if (idx === pageArr[pageArr.length - 2]) {
      const v = 5 * Math.floor(pageArr[pageArr.length - 1] / 5);
      setStart(v);
    }
  };

  useEffect(() => {
    let cloneArr = [...pageArr];
    const res = cloneArr.splice(start, end);
    setCurrentArr(res);
  }, [start, end, pageArr]);

  return { handlePrev, handleNext, currentArr, currentIndex, handlePageClick };
};
