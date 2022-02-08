import { getWordPage } from '../../api';
import { Word } from '../../types/index';

class GamesWords {
  currentGamesWords: Word[] = [];

  pageNum: number;

  constructor() {
    this.pageNum = 0;
  }

  getRandomPageNum(): number {
    const min = 0;
    const max = 29;

    this.pageNum = Math.floor(Math.random() * (max - min) + min);
    return this.pageNum;
  }

  async getGameWords(part = 0, page = 0): Promise<Word[]> {
    this.currentGamesWords = await getWordPage(part, page);
    return this.currentGamesWords;
  }
}

export const currentWords = new GamesWords();
