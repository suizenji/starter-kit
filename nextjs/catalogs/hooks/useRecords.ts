'use client';

import { useState, useCallback } from 'react';

export interface IUseRecords<TRecord> {
  fragments: TRecord[];
  isLoading: boolean;
  error: any;
  expectedTotalRows: number;
}

export interface IUseRecordsReturn<TRecord> {
  records: TRecord[];
  isEndOf: boolean;
  reset: () => void;
}

/**
 * loading解除後、fragmentsを追加したrecordsを返す
 */
export function useRecords<TRecord>({
  fragments,
  isLoading,
  error,
  expectedTotalRows,
}: IUseRecords<TRecord>): IUseRecordsReturn<TRecord> {
  // 小刻みに取得したデータを統合する変数
  const [recordsMerged, setRecordsMerged] = useState<TRecord[]>([]);

  // async処理完了直後かどうかを判定するフラグ
  const [hasFetched, setHasFetched] = useState(false);
  if (isLoading && !hasFetched) setHasFetched(true);
  if (!isLoading && hasFetched) setHasFetched(false);
  const justFinished = !isLoading && hasFetched;

  // これ以上のデータが存在しないことを判定するフラグ
  const [isEndOf, setIsEndOf] = useState(false);
  if (justFinished && fragments && fragments.length === 0) {
    setIsEndOf(true);
  }

  // 統合するデータがあれば統合する
  const shouldTakeOver = expectedTotalRows > recordsMerged.length;
  const hasData = fragments.length > 0;
  const shouldMerge = justFinished && shouldTakeOver && hasData && !error;
  if (shouldMerge) {
    setRecordsMerged([...recordsMerged, ...(fragments ?? [])]);
  }

  // データの蓄積を消去する関数
  const reset = useCallback(() => {
    setIsEndOf(false);
    setRecordsMerged([]);
  }, []);

  return { isEndOf, records: recordsMerged, reset };
}
