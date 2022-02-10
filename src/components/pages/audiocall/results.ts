import { Word, WordResult } from '../../types';

export class Results {
  word: Word;

  answer: HTMLElement;

  wrong: WordResult[];

  right: WordResult[];

  constructor(answer: HTMLElement, word: Word) {
    this.word = word;
    this.answer = answer;
    this.wrong = [];
    this.right = [];
  }

  getResult(): WordResult[] {
    const userSelect = this.answer.parentNode?.lastElementChild?.textContent;
    if (userSelect === this.word.wordTranslate) {
      this.right.push({
        id: this.word.id,
        audio: this.word.audio,
        word: this.word.word,
        transcription: this.word.transcription,
        translate: this.word.wordTranslate,
      });
      return this.right;
    }
    if (userSelect !== this.word.wordTranslate) {
      this.wrong.push({
        id: this.word.id,
        audio: this.word.audio,
        word: this.word.word,
        transcription: this.word.transcription,
        translate: this.word.wordTranslate,
      });
      return this.wrong;
    }
    return this.right;
  }
}
