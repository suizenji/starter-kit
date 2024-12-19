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

  const scrollListener = useCallback(() => {
    if (!tableEl.current) return;
    const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;

    if (!distanceBottom) {
      setDistanceBottom(Math.round(bottom * 0.2));
    }

    if (
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
