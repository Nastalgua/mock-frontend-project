import { TResult } from '@/app/types/results';
import { NextRequest, NextResponse } from 'next/server';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { v4 as uuidv4 } from 'uuid';

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: ' ',
  length: 3,
};

const randomWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"];
const randomTag = () => randomWords[Math.floor(Math.random() * randomWords.length)];

const pageCache: any = {};

const generateRandomDescription = (): string => {
  const minLength = 5; // Minimum 5 words for a short description
  const maxLength = 500; // Maximum 500 words for a long description
  const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
  return Array.from({ length: randomLength }, () => randomWords[Math.floor(Math.random() * randomWords.length)]).join(" ");
};

const generateFakeData = (): TResult[] => {
  return Array.from({ length: 10 }, (_, _index) => ({
    id: uuidv4(),
    title: uniqueNamesGenerator(customConfig),
    description: generateRandomDescription(),
    tags: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, randomTag),
  }));
};

const searchByTitleAcrossPages = (searchString: string): TResult[] => {
  const results: TResult[] = [];
  
  // Loop through all pages in the cache and filter by title
  for (const page in pageCache) {
    const pageData = pageCache[page];
    const filteredResults = pageData.filter((item: TResult) =>
      item.title.toLowerCase().includes(searchString.toLowerCase())
    );
    results.push(...filteredResults);
  }

  return results;
};

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');
  const search = req.nextUrl.searchParams.get('search') || '';

  const pageNumber: number = parseInt(page as string, 10) || 0;

  // Check if the page data exists in cache
  if (!pageCache[pageNumber]) {
    // If not, generate new data and cache it
    pageCache[pageNumber] = generateFakeData();
  }

  let results;

  if (search) {    
    results = searchByTitleAcrossPages(search);
  } else {
    results = pageCache[pageNumber];
  }

  return NextResponse.json({ results }, { status: 200 });
}