import { Word, ContentWord } from '../../types/index';
import BaseComponent from './BaseComponent';
import { ControlWord } from './ControlWord';

export class WordsList extends BaseComponent {
  words: Word[] = [];

  constructor(parentNode: HTMLElement, words: Word[] = [], hardWords:ContentWord[] = []) {
    super(parentNode, 'div', 'container__book-page');
    this.initCard(words, hardWords);
  }

  initCard(words:Word[], hardWords:ContentWord[] = []): void {
    words.forEach((word) => this.addWord(word, hardWords));
  }

  addWord(word:Word, hardWords:ContentWord[] = []):void {
    if (hardWords) {
      const hard = hardWords.find((hardItem) => hardItem.wordId === word.id);
      if (hard) {
        const wordcontrol: ControlWord = new ControlWord(this.node, word, true);
      } else {
        const wordcontrol: ControlWord = new ControlWord(this.node, word, false);
      }
      this.words.push(word);
    } else {
      const wordcontrol: ControlWord = new ControlWord(this.node, word, false);
      this.words.push(word);
    }
  }
}
