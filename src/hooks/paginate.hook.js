import { useState, useCallback, useEffect } from "react";

const usePaginate = (length = 100) => {
  let [data, setData] = useState([]);
  let [pageData, setPageData] = useState([]);
  let [page, setPage] = useState(0);

  useEffect(() => {
    if(data.length) setPageData(data[page]);
  }, [page, data])

  const paginate = useCallback((array) => {
    let arrayIndex = 0;
    let extraArray = [];

    array.forEach((item, index) => {
      if((index + 1) % length === 1) extraArray[arrayIndex] = new Array(item);
      else if((index + 1) % length === 0) {
        extraArray[arrayIndex].push(item);
        arrayIndex++;
      }
      else extraArray[arrayIndex].push(item);
    });

    console.log(extraArray);

    setData(extraArray);
  }, [length, setData])

  const setCurrentPage = useCallback((page) => {
    setPage(page);
  }, [])

  return {
    paginate,
    pageData,
    data,
    setCurrentPage,
    page
  }
}

export default usePaginate;