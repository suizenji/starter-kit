'use client';

import { useState, useRef, useCallback, useLayoutEffect } from 'react';

export interface IUseInfiniteScroll {
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export interface IUseInfiniteScrollReturn {
  tableEl: React.MutableRefObject<HTMLDivElement | null>;
}

// https://www.dusanstam.com/posts/material-ui-table-with-infinite-scroll
export function useInfiniteScroll({
  loadMore,
  hasMore,
  isLoading,
}: IUseInfiniteScroll): IUseInfiniteScrollReturn {
  const tableEl = useRef<HTMLDivElement>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const lastScrollTop = useRef(0);

  const scrollListener = useCallback(() => {
    if (!tableEl.current) return;

    // スクロールの見えていない部分の長さを取得
    const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;

    // 初回のみ閾値を設定。以後、残スクロール量がその高さを割ったら通信する。
    if (!distanceBottom) {
      setDistanceBottom(Math.round(bottom * 0.2));
    }

    // scrollの方向を取得
    const isDown = tableEl.current.scrollTop > lastScrollTop.current;
    lastScrollTop.current = tableEl.current.scrollTop;

    if (
      isDown &&
      tableEl.current.scrollTop > bottom - distanceBottom &&
      hasMore &&
      !isLoading
    ) {
      loadMore();
    }
  }, [hasMore, loadMore, isLoading, distanceBottom]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    if (!tableRef) return;

    tableRef.addEventListener('scroll', scrollListener);

    return () => {
      tableRef.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);

  return { tableEl };
}

export function useGlobalScroll({
  loadMore,
  hasMore,
  isLoading,
}: IUseInfiniteScroll) {
  const lastScrollTop = useRef(0);

  const scrollListener = useCallback(() => {
    const pageHeight = document.body.clientHeight;
    const triggerHeight = pageHeight * 0.8;

    const isDown = window.scrollY > lastScrollTop.current;
    lastScrollTop.current = window.scrollY;

    if (isDown && window.scrollY > triggerHeight && hasMore && !isLoading) {
      loadMore();
    }
  }, [hasMore, loadMore, isLoading]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);
}
