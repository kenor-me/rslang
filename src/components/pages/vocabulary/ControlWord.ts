import { deleteUserWord, setWordHard, setWordLearned } from '../../api';
import { Token, Word } from '../../types/index';
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

  setButtonUser = (wordInfo: Word, hard:boolean, learn:boolean): void => {
    const addWordButton = new BaseComponent(this.node, 'button', 'btn-add', 'Добавить слово');
    const addLearnedWordButton = new BaseComponent(this.node, 'button', 'btn-learn', 'Знаю');
    addWordButton.node.addEventListener('click', async () => {
      if (!this.node.classList.contains('hard-word')) {
        if (this.node.classList.contains('learn-word')) {
          await deleteUserWord(this.user!.userId, this.user!.token, wordInfo);
          this.node.classList.remove('learn-word');
        //  window.location.reload()
        }
        await setWordHard(this.user!.userId, this.user!.token, wordInfo);
        addWordButton.node.textContent = 'Удалить слово';
        this.node.classList.remove('learn-word');
        addLearnedWordButton.node.textContent = 'Знаю';
        this.node.classList.add('hard-word');
      } else {
        await deleteUserWord(this.user!.userId, this.user!.token, wordInfo);
        addWordButton.node.textContent = 'Добавить слово';
        this.node.classList.remove('hard-word');
      }
      const settings = (JSON.parse(localStorage.getItem('settings') as string));
      if (settings && settings.part === 6) {
        window.location.reload();
      }
    });
    if (hard) {
      addWordButton.node.textContent = 'Удалить слово';
    }

    addLearnedWordButton.node.addEventListener('click', async () => {
      if (!this.node.classList.contains('learn-word')) {
        if (this.node.classList.contains('hard-word')) {
          await deleteUserWord(this.user!.userId, this.user!.token, wordInfo);
          addWordButton.node.textContent = 'Добавить слово';
          this.node.classList.remove('hard-word');
          const settings = (JSON.parse(localStorage.getItem('settings') as string));
          if (settings && settings.part === 6) {
            window.location.reload();
          }
        }
        await setWordLearned(this.user!.userId, this.user!.token, wordInfo);
        addLearnedWordButton.node.textContent = 'Не знаю';
        this.node.classList.add('learn-word');
      } else {
        deleteUserWord(this.user!.userId, this.user!.token, wordInfo);
        addLearnedWordButton.node.textContent = 'Знаю';
        this.node.classList.remove('learn-word');
      }
    });
    if (learn) {
      addLearnedWordButton.node.textContent = 'Не знаю';
    }
  };
}
