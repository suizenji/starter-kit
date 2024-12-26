import { renderHook, act } from '@testing-library/react';
import { useRecords } from '@/hooks/useRecords';

describe('useRecords', () => {
  it('recordsの蓄積', () => {
    let fragments = [1];
    let isLoading = false;
    let error: any;
    let expectedTotalRows = 1;

    const { result, rerender } = renderHook(() =>
      useRecords({
        fragments,
        isLoading,
        error,
        expectedTotalRows,
      }),
    );

    const test = (r: number[], i: boolean) => {
      const { records, isEndOf, reset } = result.current;
      expect(records).toEqual(r);
      expect(isEndOf).toBe(i);
      return { records, isEndOf, reset };
    };

    // isLoading直後ではないのでstackしない
    test([], false);

    // isLoadingなのでstackしない
    isLoading = true;
    rerender();
    test([], false);

    // isLoading解除直後にstackする
    isLoading = false;
    rerender();
    test([1], false);

    // isLoading解除直後ではないのでstackしない
    isLoading = false;
    rerender();
    test([1], false);

    const stack = () => {
      isLoading = true;
      rerender();
      isLoading = false;
      rerender();
    };

    // stackは前の状態を引き継ぐ
    fragments = [2];
    expectedTotalRows = 2;
    stack();
    test([1, 2], false);

    // error時にstackすることはない
    fragments = [3];
    expectedTotalRows = 3;
    error = true;
    stack();
    test([1, 2], false);
    error = false;

    // 期待する最大数を溢れてstackすることはない
    fragments = [3];
    expectedTotalRows = 2;
    stack();
    test([1, 2], false);

    // stackするデータが空ならendフラグをtrueにする
    fragments = [];
    expectedTotalRows = 3;
    stack();
    const { reset } = test([1, 2], true);

    // 状態をresetすることができる
    act(() => {
      reset();
    });
    test([], false);
  });
});
