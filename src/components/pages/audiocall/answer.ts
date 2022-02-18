import { Word } from '../../types/index';
import { GamesWords } from './getWords';

export class Answers extends GamesWords {
  BASE_URL = 'https://app-english-learn.herokuapp.com';

  word: Word;

  amountWrongWords: number;

  min: number;

  max: number;

  wrongAnswerSound: string;

  rightAnswerSound: string;

  constructor(word: Word) {
    super();
    this.word = word;
    this.amountWrongWords = 4;
    this.min = 0;
    this.max = 19;
    this.wrongAnswerSound = './wrong.mp3';
    this.rightAnswerSound = './right.mp3';
  }

  getSound(): void {
    const src = `${this.BASE_URL}/${this.word.audio}`;
    const audio = new Audio(src);
    audio.play();
  }

  getRandomWords(): Promise<Word[]> {
    const randomPage = this.getRandomPageNum();
    return this.getGameWords(this.partNum, randomPage);
  }

  getRandomNum(): number {
    return Math.floor(Math.random() * (this.max - this.min) + this.min);
  }

  async setAnswers(): Promise<Word[]> {
    const set = new Set<Word>();
    set.add(this.word);
    const randomWordArray = await this.getRandomWords();
    for (let i = 0; set.size < 5; i++) {
      const wrongWord = randomWordArray[this.getRandomNum()];
      set.add(wrongWord);
    }
    return Array.from(set);
  }

  showRightAnswer(): void {
    const picture = document.querySelector('.audiocall-sound-img') as HTMLImageElement;
    picture.classList.add('right-answer-picture');
    picture.src = `${this.BASE_URL}/${this.word.image}`;

    const rightWord = document.createElement('p');
    rightWord.className = 'right-answer-word';
    rightWord.innerHTML = this.word.word;
    (document.querySelector('.audiocall-sound') as HTMLElement).append(rightWord);

    const nextButton = document.querySelector('.audiocall-next-button') as HTMLButtonElement;
    nextButton.classList.toggle('next-question');
    nextButton.textContent = 'Далее';

    const nameAnswers = document.querySelectorAll('.name-answer');
    let res = Array.from(nameAnswers).find((v) => v.textContent === this.word.wordTranslate) as HTMLElement;
    res = res?.parentNode as HTMLElement;
    res.style.backgroundColor = '#00E0C7';
  }

  compareWithRightAnswer(answer: HTMLElement): void {
    let userSelect = <string | null | undefined>answer.textContent;
    if (answer.classList.contains('audiocall-answer')) userSelect = answer.lastElementChild?.textContent;
    if (answer.classList.contains('number-answer')) userSelect = answer.nextElementSibling?.textContent;
    if (userSelect === this.word.wordTranslate) {
      this.showRightAnswer();
      this.turnOnSound(this.rightAnswerSound);
    } else {
      let elem = answer as HTMLElement;
      this.turnOnSound(this.wrongAnswerSound);
      if ((elem.classList.contains('name-answer'))
      || (elem.classList.contains('number-answer'))) {
        elem = elem.parentNode as HTMLElement;
        elem.style.backgroundColor = 'tomato';
        this.showRightAnswer();
      }
      if (elem.classList.contains('audiocall-answer')) {
        elem.style.backgroundColor = 'tomato';
        this.showRightAnswer();
      } else {
        elem.style.backgroundColor = '#dffcf5';
        document.querySelector('.audiocall-answers')?.classList.remove('audiocall-disabled');
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  turnOnSound(src: string): void {
    const audio = new Audio(src);
    audio.play();
  }
}
