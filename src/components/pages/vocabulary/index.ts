import {
  Settings, Token, ContentWord, Word,
} from '../../types/index';
import { getWordPage, getWordsUser, getWordById } from '../../api/index';
import './index.css';
import BaseComponent from './BaseComponent';
import { BookWordsList } from './BookWordsList';
import { Navigation } from './Navigation';

// import { locationResolver } from '../../routing';

class Vocabulary extends BaseComponent {
  wordsArray: BookWordsList;

  currentPage: Word[] | undefined = []; // словаа на одной странице

  settings: Settings;

  hardWords: ContentWord[] | undefined = [];

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
    '#d9bb63',
    '#fdfdc7',
  ];

  MAX_COUNT_PART = 6;

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
    this.textErr = new BaseComponent(this.node, 'div', 'text-errors',
      'Вы не добавили еще ни одного слова в сложные слова');
    this.textErr.node.style.display = 'none';
    this.navigation.select.node.addEventListener('change', this.changePart);
    this.getWordsArray(this.settings?.part, this.settings?.page);
    this.updatePage();
  }

  async getWordsArray(part = 0, page = 0): Promise<void> {
    this.currentPage = await getWordPage(part, page);
  }

  updatePage = async (): Promise<void> => {
    if (this.user) {
      this.hardWords = await getWordsUser(this.user.userId, this.user.token);
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
      this.navigation.pageSwitcher.setNumberPage(this.settings.page);
      this.navigation.pageSwitcher.node.style.visibility = 'visible';
    }
    this.wordsArray.updateBookListPage(this.currentPage!, this.hardWords);
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
    this.updatePage();
  };

  changePart = (): void => {
    this.settings.part = Number(this.navigation.select.node.value);
    this.settings.page = 0;
    this.node.style.backgroundColor = this.COLOR_FOR_PART[this.settings.part];
    this.navigation.select.setColorSelect(this.COLOR_FOR_PART[this.settings.part]);
    localStorage.setItem('settings', JSON.stringify(this.settings));
    this.updatePage();
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
}

export default Vocabulary;

export const renderVocabulary = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vocabulary = new Vocabulary(document.querySelector('#root') as HTMLElement);
};
