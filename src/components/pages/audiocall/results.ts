import { Word, UserAnswers } from '../../types';

// export const audiocallRight: WordResult[] = [];
// export const audiocallWrong: WordResult[] = [];

export const RightWrongArrays: UserAnswers = {
  audiocallRight: [],
  audiocallWrong: [],
};

export class Results {
  word: Word;

  answer: HTMLElement;

  constructor(answer: HTMLElement, word: Word) {
    this.word = word;
    this.answer = answer;
  }

  getResult(): void {
    let userSelect = this.answer.parentNode?.lastElementChild?.textContent;
    if (this.answer.classList.contains('audiocall-answer')) {
      userSelect = this.answer.lastElementChild?.textContent;
    }
    if (userSelect === this.word.wordTranslate) {
      RightWrongArrays.audiocallRight.push({
        audio: this.word.audio,
        word: this.word.word,
        transcription: this.word.transcription,
        translate: this.word.wordTranslate,
      });
    }

    if (userSelect !== this.word.wordTranslate) {
      RightWrongArrays.audiocallWrong.push({
        audio: this.word.audio,
        word: this.word.word,
        transcription: this.word.transcription,
        translate: this.word.wordTranslate,
      });
    }
  }
}
