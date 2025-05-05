import { Pagination } from "react-bootstrap";
import { useState } from "react";

import "./index.scss";

function DynamicPagination({
  totalPages = 10, // 总页数
  currentPage = 1, // 当前页（受控属性）
  maxVisiblePages = 5, // 最大可见页码数（奇数）
  onPageChange, // 页码变更回调函数
  showFirstLast = true, // 是否显示首页末页按钮
  showPrevNext = true, // 是否显示上一页下一页
  isLoading = false, // 加载状态
}) {
  const [activePage, setActivePage] = useState(currentPage);

  // 处理页码点击
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === activePage) return;
    setActivePage(page);
    onPageChange && onPageChange(page);
  };

  // 生成页码项
  const renderPageItems = () => {
    const items = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, activePage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 调整起始页避免右侧出现空白
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 首页和省略号
    if (startPage > 1) {
      items.push(
        <Pagination.Item
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={isLoading}
        >
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(
          <Pagination.Ellipsis key="start-ellipsis" disabled={isLoading} />
        );
      }
    }

    // 中间页码
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => handlePageChange(i)}
          disabled={isLoading}
        >
          {i}
        </Pagination.Item>
      );
    }

    // 末页和省略号
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <Pagination.Ellipsis key="end-ellipsis" disabled={isLoading} />
        );
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={isLoading}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination className="custom-pagination">
      {showFirstLast && (
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={activePage === 1 || isLoading}
        />
      )}

      {showPrevNext && (
        <Pagination.Prev
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1 || isLoading}
        />
      )}

      {renderPageItems()}

      {showPrevNext && (
        <Pagination.Next
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages || isLoading}
        />
      )}

      {showFirstLast && (
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={activePage === totalPages || isLoading}
        />
      )}
    </Pagination>
  );
}

export default DynamicPagination;
