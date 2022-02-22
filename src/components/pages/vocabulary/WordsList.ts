/* eslint-disable @typescript-eslint/no-unused-vars */
import { Word, ContentWord } from '../../types/index';
import BaseComponent from './BaseComponent';
import { ControlWord } from './ControlWord';

export class WordsList extends BaseComponent {
  words: Word[] = [];

  constructor(parentNode: HTMLElement, words: Word[] = [],
    hardWords: ContentWord[] = [], learnWords: ContentWord[] = []) {
    super(parentNode, 'div', 'container__book-page');
    this.initCard(words, hardWords, learnWords);
  }

  initCard(words: Word[], hardWords: ContentWord[] = [], learnWords: ContentWord[] = []): void {
    words.forEach((word) => this.addWord(word, hardWords, learnWords));
  }

  addWord(word: Word, hardWords: ContentWord[] = [], learnWords:ContentWord[] = []): void {
    const hard = hardWords.find((hardItem) => hardItem.wordId === word.id);
    const learn = learnWords.find((learnItem) => learnItem.wordId === word.id);
    if (hard && !learn) {
      const wordcontrol: ControlWord = new ControlWord(this.node, word, true, false);
    } else if (learn && !hard) {
      const wordcontrol: ControlWord = new ControlWord(this.node, word, false, true);
    } else {
      const wordcontrol: ControlWord = new ControlWord(this.node, word, false, false);
    }
    this.words.push(word);
  }
}
