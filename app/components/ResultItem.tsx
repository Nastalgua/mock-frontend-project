import { TResult } from "../types/results";

interface ResultItemProps {
  result: TResult
}

export default function ResultItem({ result }: ResultItemProps) {
  return (
    <div className="w-7/12 rounded-lg border px-4 py-3 break-words">
      <div className="text-xl font-bold">{result.title}</div>
      <div className="text-md line-clamp-2">{result.description}</div>

      <div className="flex space-x-2 mt-4">
        {
          result.tags.map((tag, index) => (
            <div key={index} className="bg-slate-200 px-2 py-1 rounded text-sm">{tag}</div>
          ))
        }
      </div>
    </div>
  );
}