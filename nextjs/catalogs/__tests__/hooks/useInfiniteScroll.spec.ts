import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  let loadMore: jest.Mock;
  let hasMore: boolean;
  let isLoading: boolean;
  let mockDiv: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
    addEventListener: Function;
    removeEventListener: Function;
  };

  beforeEach(() => {
    loadMore = jest.fn();
    hasMore = true;
    isLoading = false;
    mockDiv = {
      scrollHeight: 1000,
      clientHeight: 500,
      scrollTop: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  });

  it('event listenerの設定と解除', () => {
    const { result, rerender, unmount } = renderHook(() => {
      const hookReturn = useMuiTableScroll({ loadMore, hasMore, isLoading });
      hookReturn.tableEl.current = mockDiv as any as HTMLDivElement;
      return hookReturn;
    });

    expect(mockDiv.addEventListener).toHaveBeenCalled();
    unmount();
    expect(mockDiv.removeEventListener).toHaveBeenCalled();
  });

  it('スクロールが閾値を越えたらloadする', () => {
    let scrollHandler: Function = () => {};
    mockDiv.addEventListener = (e: string, fn: Function) => {
      scrollHandler = fn;
    };

    const { result, rerender, unmount } = renderHook(() => {
      const hookReturn = useMuiTableScroll({ loadMore, hasMore, isLoading });
      hookReturn.tableEl.current = mockDiv as any as HTMLDivElement;
      return hookReturn;
    });

    // 初回はdistanceBottomを設定できていないからloadしない
    act(() => {
      scrollHandler();
    });
    expect(loadMore).not.toHaveBeenCalled();

    // 距離が閾値を超えないならloadしない
    act(() => {
      scrollHandler();
    });
    expect(loadMore).not.toHaveBeenCalled();

    // 距離が閾値を超えるとloadする
    mockDiv.scrollTop = 900;
    act(() => {
      scrollHandler();
    });
    expect(loadMore).toHaveBeenCalledTimes(1);

    // 上方向のスクロールには反応しない
    mockDiv.scrollTop = 899;
    act(() => {
      scrollHandler();
    });
    expect(loadMore).toHaveBeenCalledTimes(1);

    // isLoadingならスクロールが閾値を越えてもloadしない
    mockDiv.scrollTop = 900;
    isLoading = true;
    rerender();
    act(() => {
      scrollHandler();
    });
    expect(loadMore).toHaveBeenCalledTimes(1);
  });
});
