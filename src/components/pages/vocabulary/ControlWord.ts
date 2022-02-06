import { deleteUserWord, setWordHard } from '../../api';
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

  constructor(parentNode: HTMLElement, wordInfo: Word, hard = false) {
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
      this.setButtonAddWord(wordInfo, hard);
    }
    if (hard) {
      this.node.classList.add('hard-word');
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

  setButtonAddWord = (wordInfo: Word, hard = false): void => {
    const addWordButton = new BaseComponent(this.node, 'button', 'btn-add', 'Добавить слово');
    addWordButton.node.addEventListener('click', () => {
      if (!this.node.classList.contains('hard-word')) {
        setWordHard(this.user!.userId, this.user!.token, wordInfo);
        addWordButton.node.textContent = 'Удалить слово';
        this.node.classList.add('hard-word');
      } else {
        deleteUserWord(this.user!.userId, this.user!.token, wordInfo);
        addWordButton.node.textContent = 'Добавить слово';
        this.node.classList.remove('hard-word');
        /*   window.location.reload(); */
      }
    });
    if (hard) {
      addWordButton.node.textContent = 'Удалить слово';
    }
  };
}
