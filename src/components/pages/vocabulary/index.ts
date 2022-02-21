import {
  Settings, Token, ContentWord, Word,
} from '../../types/index';
import { getWordPage, getWordsUser, getWordById } from '../../api/index';
import './index.css';
import BaseComponent from './BaseComponent';
import { BookWordsList } from './BookWordsList';
import { Navigation } from './Navigation';
import { getSprintPlay, renderSprintPage } from '../sprint';
import { renderAudiocallWrapper, renderAudiocallPage, GAME_WORDS } from '../audiocall';

class Vocabulary extends BaseComponent {
  wordsArray: BookWordsList;

  currentPage: Word[] | undefined = [];

  settings: Settings;

  allUserWords: ContentWord[] | undefined = [];

  wordsForGame: Word[] = [];

  hardWords: ContentWord[] | undefined = [];

  learnWords: ContentWord[] | undefined = [];

  navigation: Navigation;

  user: Token | null;

  lastPageNumber = 29;

  textErr: BaseComponent;

  COLOR_FOR_PART = [
    '#a5e8d6',
    '#4e8dc0',
    '#6b66a6',
    '#d76565',
    '#e6cccb',
    '#ffc86d',
    '#fdfdc7',
  ];

  MAX_COUNT_PART = 6;

  gameTimeout: NodeJS.Timeout | undefined;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'book-page');
    this.wordsArray = new BookWordsList(this.node);
    this.user = JSON.parse(localStorage.getItem('userAuth') as string);
    this.settings = JSON.parse(localStorage.getItem('settings') as string);
    if (!this.settings) {
      this.settings = {
        part: 0,
        page: 0,
      };
    }
    this.navigation = new Navigation(this.node);
    this.loadPart();
    this.navigation.pageSwitcher.prevButton.node.addEventListener('click', () => {
      this.changePage('prev');
    });
    this.navigation.pageSwitcher.nextButton.node.addEventListener('click', () => {
      this.changePage('next');
    });
    this.navigation.sprintButton.node.addEventListener('click', async () => {
      await this.updatePage();
      this.wordsForGame = await this.getWordForGame();
      this.gameTimeout = setTimeout(() => {
        renderSprintPage();
        getSprintPlay(this.wordsForGame);
      }, 3800);
    });
    this.navigation.audioCallButton.node.addEventListener('click', async () => {
      await this.updatePage();
      this.wordsForGame = await this.getWordForGame();
      if (this.wordsForGame.length > 20) {
        GAME_WORDS.wordsArr = this.wordsForGame.slice(this.wordsForGame.length - 20, this.wordsForGame.length);
      } else GAME_WORDS.wordsArr = this.wordsForGame;
      this.gameTimeout = setTimeout(() => {
        renderAudiocallWrapper();
        renderAudiocallPage(GAME_WORDS.wordsArr);
      }, 3800);
    });
    window.addEventListener('hashchange', () => {
      clearTimeout(this.gameTimeout!);
    });
    this.textErr = new BaseComponent(this.wordsArray.node, 'div', 'text-errors',
      'В этом разделе еще нет слов, нажмите на кнопку "Добавить слово", на карточках в других разделах.');
    this.textErr.node.style.display = 'none';
    this.navigation.select.node.addEventListener('change', this.changePart);
    this.getWordsArray(this.settings?.part, this.settings?.page);
    this.updatePage();
  }

  async getWordsArray(part = 0, page = 0): Promise<void> {
    this.currentPage = await getWordPage(part, page);
    this.wordsForGame = await getWordPage(part, page);
  }

  updatePage = async (): Promise<void> => {
    if (this.user) {
      this.allUserWords = await getWordsUser(this.user.userId, this.user.token);
      this.hardWords = this.allUserWords.filter((hardword) => hardword.difficulty === ('hard').toString());
      this.learnWords = this.allUserWords.filter((hardword) => hardword.difficulty === ('learned').toString());
      if (this.settings.part === this.MAX_COUNT_PART) {
        this.navigation.pageSwitcher.node.style.display = 'none';
        this.currentPage = await Promise.all(this.hardWords.map((hardword) => getWordById(hardword.wordId)));
        if (this.currentPage.length === 0) {
          this.textErr.node.style.display = 'flex';
        } else {
          this.textErr.node.style.display = 'none';
        }
      } else {
        this.navigation.pageSwitcher.node.style.display = 'flex';
        this.textErr.node.style.display = 'none';
        this.currentPage = await getWordPage(this.settings.part, this.settings.page);
      }
    } else {
      this.currentPage = await getWordPage(this.settings.part, this.settings.page);
      this.navigation.pageSwitcher.node.style.visibility = 'visible';
    }
    this.wordsForGame = this.currentPage;
    this.navigation.pageSwitcher.setNumberPage(this.settings.page);
    this.wordsArray.updateBookListPage(this.currentPage!, this.hardWords, this.learnWords);
    const hardtoPage = document.querySelectorAll('.hard-word').length;
    const learntoPage = document.querySelectorAll('.learn-word').length;
    const cardWord = document.querySelectorAll('.book-word-item');
    if (hardtoPage + learntoPage >= this.currentPage.length) {
      this.navigation.sprintButton.node.classList.add('disabled');
      this.navigation.audioCallButton.node.classList.add('disabled');
      cardWord.forEach((card) => card.classList.add('selection'));
    } else {
      this.navigation.sprintButton.node.classList.remove('disabled');
      this.navigation.audioCallButton.node.classList.remove('disabled');
      cardWord.forEach((card) => card.classList.remove('selection'));
    }
    if (this.settings.part === this.MAX_COUNT_PART) {
      if (this.currentPage.length > 0) {
        this.navigation.sprintButton.node.classList.remove('disabled');
        this.navigation.audioCallButton.node.classList.remove('disabled');
      } else {
        this.navigation.sprintButton.node.classList.add('disabled');
        this.navigation.audioCallButton.node.classList.add('disabled');
      }
      cardWord.forEach((card) => card.classList.remove('selection'));
    }
  };

  changePage = async (param: string): Promise<void> => {
    if (param === 'next') {
      if (this.settings.page + 1 > this.lastPageNumber) {
        return;
      }
      this.settings.page++;
    } else {
      if (this.settings.page - 1 < 0) {
        return;
      }
      this.settings.page--;
    }
    this.navigation.pageSwitcher.setNumberPage(this.settings.page);
    localStorage.setItem('settings', JSON.stringify(this.settings));
    await this.updatePage();
  };

  changePart = async (): Promise<void> => {
    this.settings.part = Number(this.navigation.select.node.value);
    this.settings.page = 0;
    this.node.style.backgroundColor = this.COLOR_FOR_PART[this.settings.part];
    this.navigation.select.setColorSelect(this.COLOR_FOR_PART[this.settings.part]);
    localStorage.setItem('settings', JSON.stringify(this.settings));
    await this.updatePage();
  };

  loadPart = (): void => {
    this.navigation.select.node.value = (this.settings.part).toString();
    this.node.style.backgroundColor = this.COLOR_FOR_PART[this.settings.part];
    this.navigation.select.setColorSelect(this.COLOR_FOR_PART[this.settings.part]);
    this.navigation.pageSwitcher.setNumberPage(this.settings.page);
    if (this.settings.page === 1) {
      this.navigation.pageSwitcher.prevButton.node.style.visibility = 'hidden';
    }
    if (this.settings.page === this.lastPageNumber - 1) {
      this.navigation.pageSwitcher.nextButton.node.style.visibility = 'hidden';
    }
  };

  getWordForGame = async (): Promise<Word[]> => {
    if (this.settings.page > 0) {
      const onePart = await getWordPage(this.settings.part, this.settings.page - 1);
      const twoPart = await getWordPage(this.settings.part, this.settings.page);
      this.wordsForGame = [...onePart, ...twoPart];
    }
    const ind: number[] = [];
    this.wordsForGame?.forEach((item, index) => {
      if (this.learnWords) {
        this.learnWords.forEach((itemleart) => {
          if (item.id === itemleart.wordId) {
            ind.push(index);
          }
        });
      }
    });
    for (let i = ind.length - 1; i >= 0; i--) {
      this.wordsForGame.splice(ind[i], 1);
    }
    return this.wordsForGame;
  };
}

export default Vocabulary;

export const renderVocabulary = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vocabulary = new Vocabulary(document.querySelector('#root') as HTMLElement);
};
