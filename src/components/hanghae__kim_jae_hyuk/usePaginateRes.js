import { useState, useEffect } from "react";
import { paginate } from "./usePaginate";

export const usePaginateRes = (sortedFinal) => {
  const [paginatedArr, setPaginatedArr] = useState([]);
  const [paginatedIndex, setPaginatedIndex] = useState(0);
  const [finalProd, setFinalProd] = useState([]);

  useEffect(() => {
    setPaginatedArr(paginate(sortedFinal));
  }, [sortedFinal]);

  useEffect(() => {
    setFinalProd(paginatedArr[paginatedIndex]);
  }, [paginatedIndex, paginatedArr]);

  const [pageArr, setPageArr] = useState([]);

  useEffect(() => {
    const res = Array.apply(null, Array(paginatedArr?.length)).map((x, i) => {
      return i + 1;
    });
    setPageArr(res);
  }, [paginatedArr]);

  return { finalProd, pageArr, setPaginatedIndex };
};
