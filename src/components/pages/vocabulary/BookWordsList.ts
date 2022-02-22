import { Word, ContentWord } from '../../types/index';
import BaseComponent from './BaseComponent';
import { WordsList } from './WordsList';

export class BookWordsList extends BaseComponent {
  wordsList:WordsList = new WordsList(this.node);

  updateBookListPage(words: Word[], hardWord:ContentWord[] = [], learnWord:ContentWord[] = []): void {
    this.wordsList.destroy();
    this.wordsList = new WordsList(this.node, words, hardWord, learnWord);
  }
}
