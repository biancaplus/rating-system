import { useEffect, useRef } from "react";

/**
 * 用于列表页码改变时，滚动到页面中指定的元素，并避免被固定的导航栏遮挡
 * @param {React.RefObject} targetRef - 目标元素的ref
 * @param {number} offset - 需要偏移的高度，通常是导航栏的高度
 * @param {number} currentPage - 当前页码
 */
export const useScrollToElement = (targetRef, offset = 0, currentPage) => {
  const isFirstLoad = useRef(true);
  const oldCurrentPage = useRef(1);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; // 初次加载时不滚动
    }

    if (oldCurrentPage.current !== currentPage && targetRef.current) {
      const top =
        targetRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      oldCurrentPage.current = currentPage;
    }
  }, [targetRef, offset, currentPage]);
};
