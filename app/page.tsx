"use client";

import { useEffect, useState } from "react";
import Results from "./components/Results";
import SearchBar from "./components/SearchBar";
import { TResult } from "./types/results";
import Head from "next/head";

export default function Home() {

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchTerm, changeSearchTerm] = useState<string>("");
  const [results, setResults] = useState<TResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getFirstPage = async () => {
      const res = await getPageResults(pageNumber);
      setResults([...res.results]);
      setPageNumber(pageNumber + 1);
    }

    getFirstPage();
  }, []);

  const getPageResults = async (page: number, search = ""): Promise<{ results: TResult[] }> => {
    setLoading(true);
    const response = await fetch(`/api/results?page=${page}&search=${search}`);
    setLoading(false);
    return await response.json();
  }

  const onSearchInput = async (searchTerm: string) => {
    changeSearchTerm(searchTerm);

    if (searchTerm.length > 0) {
      const res = await getPageResults(0, searchTerm);
      setResults([...res.results]);
    } else {
      setResults([]);
    }

    setPageNumber(0);
  }

  const loadMore = async () => {
    if (searchTerm) return;

    const res = await getPageResults(pageNumber);
    setResults([...results, ...res.results]);
    setPageNumber(pageNumber + 1);
  }

  return (
    <>
      <div className="h-screen">
        <main>
          <div className="flex justify-center">
            <SearchBar onSearchInput={onSearchInput} />
          </div>
          <Results results={results} loadMore={loadMore} loading={loading} />
        </main>
      </div>
    </>
  );
}
