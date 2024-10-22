"use client";

import { TResult } from "../types/results";
import InfiniteScroll from "./InfiniteScroll";
import ResultItem from "./ResultItem";

interface ResultsProps {
  results: TResult[],
  loading: boolean,
  loadMore: () => void
}

export default function Results({ results, loading, loadMore }: ResultsProps) {
  return (
    <InfiniteScroll loading={loading} enable={true} loadMore={loadMore}>
      <div className="w-full flex flex-col items-center justify-center space-y-4 mt-20 pb-20">
        {
          results.map((result) => (
            <ResultItem key={result.id} result={result} />
          ))
        }
      </div>
    </InfiniteScroll>
  );
}