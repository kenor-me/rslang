import { Word } from '../types/index';

const baseUrl = 'https://app-english-learn.herokuapp.com';

export const getWordPage = async (part: number, pageNumber: number): Promise<Word[]> => {
  const path = `words?group=${part}&page=${pageNumber}`;
  const response = await fetch(`${baseUrl}/${path}`);
  const wordsOfPage = await response.json();
  return wordsOfPage;
};
