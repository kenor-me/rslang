import { Word, WordResult } from '../../types';

export const audiocallRight: WordResult[] = [];
export const audiocallWrong: WordResult[] = [];

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
      audiocallRight.push({
        audio: this.word.audio,
        word: this.word.word,
        transcription: this.word.transcription,
        translate: this.word.wordTranslate,
      });
    }

    // const needAddToWrong1 = (userSelect === 'Далее' || userSelect !== 'Не знаю');
    // const needAddToWrong2 = (userSelect !== this.word.wordTranslate
    //   && userSelect !== 'Не знаю'
    //   && userSelect !== 'Далее');

    // console.log(userSelect);
    // console.log(needAddToWrong1);
    // console.log(needAddToWrong2);

    if (userSelect !== this.word.wordTranslate) {
      audiocallWrong.push({
        audio: this.word.audio,
        word: this.word.word,
        transcription: this.word.transcription,
        translate: this.word.wordTranslate,
      });
    }
  }
}
