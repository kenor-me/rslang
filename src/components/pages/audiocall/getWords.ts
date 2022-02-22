import { getWordPage } from '../../api';
import { Word } from '../../types/index';

export class GamesWords {
  currentGamesWords: Word[] = [];

  pageNum: number;

  partNum: number;

  constructor() {
    this.pageNum = 0;
    this.partNum = 0;
  }

  getRandomPageNum(): number {
    const min = 0;
    const max = 29;

    this.pageNum = Math.floor(Math.random() * (max - min) + min);
    return this.pageNum;
  }

  async getGameWords(part = 0, page = 0): Promise<Word[]> {
    this.pageNum = page;
    this.partNum = part;
    this.currentGamesWords = await getWordPage(part, page);
    return this.currentGamesWords;
  }
}
