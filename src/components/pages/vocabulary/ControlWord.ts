import {
  updateWordUser,
  getStatisticUser, getWordsUser, setStatisticUser, setWordHard, setWordLearned,
} from '../../api/index';
import { Statistic, Token, Word } from '../../types/index';
import BaseComponent from './BaseComponent';

export class ControlWord extends BaseComponent {
  BASE_URL = 'https://app-english-learn.herokuapp.com';

  user: Token | null;

  imageBlock: BaseComponent = new BaseComponent(this.node, 'div', 'book-word-image', '');

  imageWord: BaseComponent<HTMLImageElement> = new BaseComponent(this.imageBlock.node, 'img', 'word-img');

  content: BaseComponent = new BaseComponent(this.node, 'div', 'card-content', '');

  cardWord: BaseComponent = new BaseComponent(this.content.node, 'div', 'card__word', '');

  cardWordValue: BaseComponent = new BaseComponent(this.cardWord.node, 'div', 'card__word-value', '');

  cardWordTranslate: BaseComponent = new BaseComponent(this.cardWord.node, 'div', 'card__translate', '');

  cardMeaning: BaseComponent = new BaseComponent(this.content.node, 'div', 'card__meaning', '');

  cardMeaningValue: BaseComponent = new BaseComponent(this.cardMeaning.node, 'div', 'card__meaning-value', '');

  cardMeaningTranslate: BaseComponent = new BaseComponent(this.cardMeaning.node, 'div', 'card__meaning-translate', '');

  cardExample: BaseComponent = new BaseComponent(this.content.node, 'div', 'card__example', '');

  cardExampleValue: BaseComponent = new BaseComponent(this.cardExample.node, 'div', 'card__example-value', '');

  cardExampleTranslate: BaseComponent = new BaseComponent(this.cardExample.node, 'div', 'card__example-translate', '');

  cardButtonAudio: BaseComponent = new BaseComponent(this.node, 'div', 'card__btn-audio', '');

  allAudio: HTMLAudioElement[] = [];

  statisticUser: any | undefined;

  constructor(parentNode: HTMLElement, wordInfo: Word, hard:boolean, learn:boolean) {
    super(parentNode, 'div', 'book-word-item');
    this.imageWord.node.src = `${this.BASE_URL}/${wordInfo.image}`;
    this.imageWord.node.alt = wordInfo.word;
    this.cardWordValue.node.innerHTML = `${wordInfo.word} ${wordInfo.transcription}`;
    this.cardWordTranslate.node.innerHTML = wordInfo.wordTranslate;
    this.cardMeaningValue.node.innerHTML = wordInfo.textMeaning;
    this.cardMeaningTranslate.node.innerHTML = wordInfo.textMeaningTranslate;
    this.cardExampleValue.node.innerHTML = wordInfo.textExample;
    this.cardExampleTranslate.node.innerHTML = wordInfo.textExampleTranslate;
    this.createAudio([wordInfo.audio, wordInfo.audioMeaning, wordInfo.audioExample]);
    this.cardButtonAudio.node.addEventListener('click', () => {
      this.stopSound();
      this.playSound();
    });
    this.user = JSON.parse(localStorage.getItem('userAuth') as string);
    if (this.user) {
      this.setButtonUser(wordInfo, hard, learn);
    }
    if (hard) {
      this.node.classList.add('hard-word');
    }
    if (learn) {
      this.node.classList.add('learn-word');
    }
  }

  createAudio = (urlAudio: string[]): void => {
    urlAudio.forEach((url) => {
      const audio = document.createElement('audio');
      audio.src = `${this.BASE_URL}/${url}`;
      this.cardButtonAudio.node.append(audio);
      this.allAudio.push(audio);
    });
  };

  playSound = (): void => {
    this.allAudio[0].play();
    for (let i = 0; i < this.allAudio.length - 1; i++) {
      this.allAudio[i].addEventListener('ended', () => {
        this.allAudio[i + 1].play();
      });
    }
  };

  stopSound = (): void => {
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach((audio) => {
      audio.pause();
    });
  };

  setButtonUser = async (wordInfo: Word, hard:boolean, learn:boolean): Promise<void> => {
    this.statisticUser = await this.loadStatistic();
    const addWordButton = new BaseComponent(this.node, 'button', 'btn-add', 'Добавить слово');
    const addLearnedWordButton = new BaseComponent(this.node, 'button', 'btn-learn', 'Знаю');
    this.setInfoWord(wordInfo);
    addWordButton.node.addEventListener('click', async () => {
      const userWords = await getWordsUser(this.user!.userId, this.user!.token);
      if (!this.node.classList.contains('hard-word')) {
        if (this.node.classList.contains('learn-word')) {
          this.node.classList.remove('learn-word');
        } else if (userWords.filter((wordItem) => wordItem.wordId === wordInfo.id).length > 0) {
          const params = 'hard';
          await updateWordUser(this.user!.userId, this.user!.token, wordInfo.id, params);
        } else {
          await setWordHard(this.user!.userId, this.user!.token, wordInfo);
        }
        addWordButton.node.textContent = 'Удалить слово';
        this.node.classList.remove('learn-word');
        addLearnedWordButton.node.textContent = 'Знаю';
        this.node.classList.add('hard-word');
        const params = 'hard';
        await updateWordUser(this.user!.userId, this.user!.token, wordInfo.id, params);
      } else {
        addWordButton.node.textContent = 'Добавить слово';
        this.node.classList.remove('hard-word');
        const params = 'new';
        await updateWordUser(this.user!.userId, this.user!.token, wordInfo.id, params);
      }
      const settings = (JSON.parse(localStorage.getItem('settings') as string));
      if (settings && settings.part === 6) {
        window.location.reload();
      }
      const hardtoPage = document.querySelectorAll('.hard-word').length;
      const learntoPage = document.querySelectorAll('.learn-word').length;
      this.updateCountLearnandHardWord(hardtoPage, learntoPage);
    });
    if (hard) {
      addWordButton.node.textContent = 'Удалить слово';
    }

    addLearnedWordButton.node.addEventListener('click', async () => {
      const userWords = await getWordsUser(this.user!.userId, this.user!.token);
      if (!this.node.classList.contains('learn-word')) {
        if (this.node.classList.contains('hard-word')) {
          addWordButton.node.textContent = 'Добавить слово';
          this.node.classList.remove('hard-word');
          const params = 'new';
          await updateWordUser(this.user!.userId, this.user!.token, wordInfo.id, params);
          const settings = (JSON.parse(localStorage.getItem('settings') as string));
          if (settings && settings.part === 6) {
            window.location.reload();
          }
        }
        addLearnedWordButton.node.textContent = 'Не знаю';
        this.node.classList.add('learn-word');
        if (userWords.filter((wordItem) => wordItem.wordId === wordInfo.id).length > 0) {
          const params = 'learned';
          await updateWordUser(this.user!.userId, this.user!.token, wordInfo.id, params);
        } else {
          await setWordLearned(this.user!.userId, this.user!.token, wordInfo.id);
        }
      } else {
        addLearnedWordButton.node.textContent = 'Знаю';
        this.node.classList.remove('learn-word');
        const params = 'new';
        await updateWordUser(this.user!.userId, this.user!.token, wordInfo.id, params);
      }
      const allUserWord = await getWordsUser(this.user!.userId, this.user!.token);
      const learnedWords = allUserWord.filter((item) => item.difficulty === ('learned').toString());
      this.updateStatistic(learnedWords.length);
      const hardtoPage = document.querySelectorAll('.hard-word').length;
      const learntoPage = document.querySelectorAll('.learn-word').length;
      this.updateCountLearnandHardWord(hardtoPage, learntoPage);
    });
    if (learn) {
      addLearnedWordButton.node.textContent = 'Не знаю';
    }
  };

  loadStatistic = async () :Promise<Statistic> => {
    this.statisticUser = await getStatisticUser(this.user!.userId, this.user!.token);
    return this.statisticUser;
  };

  updateStatistic = async (learnedWords:number):Promise<void> => {
    this.statisticUser!.learnedWords = learnedWords;
    const stats = {
      learnedWords: this.statisticUser!.learnedWords,
      optional: this.statisticUser!.optional,
    };
    await setStatisticUser(this.user!.userId, this.user!.token, stats);
  };

  updateCountLearnandHardWord = (countHard:number, countLearn:number):void => {
    const sprintBtn = document.querySelector('.book-page-nav-sprint') as HTMLElement;
    const audioCallBtn = document.querySelector('.book-page-nav-audio') as HTMLElement;
    const cardWord = document.querySelectorAll('.book-word-item');
    if (countHard + countLearn >= 20) {
      sprintBtn.classList.add('disabled');
      audioCallBtn.classList.add('disabled');
      cardWord.forEach((card) => card.classList.add('selection'));
    } else {
      sprintBtn.classList.remove('disabled');
      audioCallBtn.classList.remove('disabled');
      cardWord.forEach((card) => card.classList.remove('selection'));
    }
  };

  async setInfoWord(wordInfo:Word):Promise<void> {
    const correctAnswerWord = new BaseComponent(this.node, 'div', 'correct-answer', 'Правильных ответов: 0');
    const wrongAnswerWord = new BaseComponent(this.node, 'div', 'wrong-answer', 'Неправильных ответов: 0');
    if (this.statisticUser.optional.words[wordInfo.id]) {
      correctAnswerWord.node.textContent = `Правильных ответов:
      ${this.statisticUser.optional.words[wordInfo.id].correct}`;
      wrongAnswerWord.node.textContent = `Неправильных ответов:
      ${this.statisticUser.optional.words[wordInfo.id].wrong}`;
    } else {
      correctAnswerWord.node.textContent = 'Правильных ответов: 0';
      wrongAnswerWord.node.textContent = 'Неправильных ответов: 0';
    }
  }
}
