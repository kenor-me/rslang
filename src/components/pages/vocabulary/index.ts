import { ContentWord, Word } from '../../types/index';
import {
  setWordHard, getWordPage, getWordsUser, getWordById,
} from '../../api/index';
import './index.css';
import { locationResolver } from '../main';

const baseUrl = 'https://app-english-learn.herokuapp.com';
const root = document.querySelector('#root') as HTMLElement;
const userAut = JSON.parse(localStorage.getItem('userAuth') as string);

let pageBook = 0;
let partBook = 0;
let wordsOfPage: Word[] = [];
let hardWordsUser:ContentWord[] = [];
const MAX_COUNT_PAGE = 30;
const MAX_COUNT_PART = 6;
const COLOR_FOR_PART = [
  '#a5e8d6',
  '#4e8dc0',
  '#6b66a6',
  '#d76565',
  '#e6cccb',
  '#d9bb63',
  '#00ff66',
];

const render = (): void => {
  root.innerHTML = '';
  root.innerHTML = `
  <div class="book-page">
    <div class="container__book-page"></div>
    <div class="navigation">
      <div class="nav-left">
        <div class="book-page-nav-logo"></div>
      </div>
      <div class="book-page-nav-savannah">
        <div></div>
        <span>Саванна</span>
      </div>
      <div class="book-page-pagination">
        <div class="pagination-prev"></div>
        <div class="book-page-number-page"></div>
        <div class="pagination-next"></div>
      </div>
      <div class="book-page-nav-audio">
        <div></div>
        <span>Аудиовызов</span>
      </div>
      <div class="nav-right">
        <select class="select-partition" name="part" id="part-number"></select>
      </div>
    </div>
  </div>`;
};

const stopSound = (): void => {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach((audio) => {
    audio.pause();
  });
};

const playSound = (audio: NodeListOf<HTMLAudioElement>): void => {
  audio[0].play();
  for (let i = 0; i < audio.length - 1; i++) {
    audio[i].addEventListener('ended', () => {
      audio[i + 1].play();
    });
  }
};

const renderPage = (words: Word[]): void => {
  window.scrollTo(0, 0);
  const bookContainer = document.querySelector('.container__book-page') as HTMLElement;
  bookContainer.innerHTML = '';
  console.log(words)
  console.log(hardWordsUser)
  words.forEach((word) => {
   // const onlyHardWord = hardWordsUser.filter((word)=> word.difficulty === 'hard');

    const cardWord = document.createElement('div');
    cardWord.classList.add('book-word-item');
    cardWord.innerHTML = `
      <div class="book-word-image">
        <img class="word-img" src = '${baseUrl}/${word.image}' alt = "${word.word}"
      </div>
      <div class="card-content">
        <div class="card__word">
          <div class="card__word-value">${word.word} ${word.transcription}</div>
        </div>
        <div class="card__meaning">
          <div class="card__meaning-value">${word.textMeaning}</div>
          <div class="card__card__meaning-translate">${word.textMeaningTranslate}</div>
        </div>
        <div class="card__example">
          <div class="card__example-value">${word.textExample}</div>
          <div class="card__example-translate">${word.textExampleTranslate}</div>
        </div>
      </div>
      <div class="card__btn-audio">
        <audio src=${baseUrl}/${word.audio}></audio>
        <audio src=${baseUrl}/${word.audioMeaning}></audio>
        <audio src=${baseUrl}/${word.audioExample}></audio>
      </div>
      <div class="card__buttons">
        <div class="card__btn-adddifficult">Добавить в сложные</div>
        <div class="card__btn-deldifficult">Удалить</div>
      </div>`;
    bookContainer.append(cardWord);
    const addWordButton = cardWord.querySelector('.card__btn-adddifficult') as HTMLElement;
    const deleteWordButton = cardWord.querySelector('.card__btn-deldifficult') as HTMLElement;
    addWordButton.addEventListener('click', async () => {
     if (userAut) {
      setWordHard(userAut.userId, userAut.token, word);
     }
     else {
       //открывать модальное окно, предлагая регистрацию/вход
     }
    });
    deleteWordButton.addEventListener('click', () => {
      // deleteWordHard(word.id)
    });
  });
  const btnPlay = document.querySelectorAll('.card__btn-audio');
  btnPlay.forEach((btn) => {
    btn.addEventListener('click', () => {
      const audio = btn.querySelectorAll('audio');
      stopSound();
      playSound(audio);
    });
  });
};

const changePart = async (): Promise<void> => {
  const selectPartition = document.querySelector('.select-partition') as HTMLSelectElement;
  const bookContainer = document.querySelector('.book-page') as HTMLElement;
  partBook = +selectPartition.value;
  selectPartition.style.backgroundColor = COLOR_FOR_PART[partBook];
  if (partBook === MAX_COUNT_PART) {
    wordsOfPage = await Promise.all(hardWordsUser.map((word) => getWordById(word.wordId)));
    (document.querySelector('.book-page-pagination') as HTMLElement).style.display = 'none';
  } else {
    wordsOfPage = await getWordPage(partBook, pageBook);
    (document.querySelector('.book-page-pagination') as HTMLElement).style.display = 'flex';
  }
  renderPage(wordsOfPage);
  bookContainer.style.backgroundColor = COLOR_FOR_PART[partBook];
};

const renderSelect = (): void => {
  const selectPartition = document.querySelector('.select-partition') as HTMLElement;
  for (let i = 1; i <= MAX_COUNT_PART; i++) {
    const option = document.createElement('option');
    option.value = (i - 1).toString();
    option.textContent = `part ${i}`;
    option.style.backgroundColor = COLOR_FOR_PART[i - 1];
    selectPartition.append(option);
  }
  checkedUser();
  selectPartition.addEventListener('change', changePart);
};

const setNumberPage = (): void => {
  const pageBlock = document.querySelector('.book-page-number-page') as HTMLElement;
  const buttonPrevPage = document.querySelector('.pagination-prev') as HTMLElement;
  const buttonNextPage = document.querySelector('.pagination-next') as HTMLElement;
  pageBlock.innerHTML = `Страница №${pageBook + 1}`;
  if (pageBook === 0) {
    buttonPrevPage.style.visibility = 'hidden';
  } else {
    buttonPrevPage.style.visibility = 'visible';
  }
  if (pageBook === MAX_COUNT_PAGE - 1) {
    buttonNextPage.style.visibility = 'hidden';
  } else {
    buttonNextPage.style.visibility = 'visible';
  }
};

const changePage = async (param: string): Promise<void> => {
  if (param === 'next') {
    pageBook++;
  } else {
    pageBook--;
  }
  wordsOfPage = await getWordPage(partBook, pageBook);
  renderPage(wordsOfPage);
  setNumberPage();
};

const checkedUser = ():void => {
  const selectPartition = document.querySelector('.select-partition') as HTMLSelectElement;
  if (userAut) {
    const options = document.querySelectorAll('option');
    let isTrueOption = true;
    options.forEach((option) => {
      if (option.value === MAX_COUNT_PART.toString()) {
        isTrueOption = false;
      }
    });
    if (isTrueOption) {
      const option = document.createElement('option');
      option.value = MAX_COUNT_PART.toString();
      option.textContent = 'Сложные';
      selectPartition.append(option);
    }
  }
};

export const mountedVocabulary = async (): Promise<void> => {
  render();
  const buttonPrevPage = document.querySelector('.pagination-prev') as HTMLElement;
  buttonPrevPage.addEventListener('click', () => {
    changePage('prev');
  });
  const buttonNextPage = document.querySelector('.pagination-next') as HTMLElement;
  buttonNextPage.addEventListener('click', () => {
    changePage('next');
  });
  wordsOfPage = await getWordPage(partBook, pageBook);
  hardWordsUser = await getWordsUser(userAut.userId, userAut.token);
  renderPage(wordsOfPage);
  renderSelect();
  const selectPartition = document.querySelector('.select-partition') as HTMLElement;
  const colorPage = COLOR_FOR_PART[0];
  selectPartition.style.backgroundColor = colorPage;
  const bookContainer = document.querySelector('.book-page') as HTMLElement;
  bookContainer.style.backgroundColor = colorPage;
  setNumberPage();
  const logoHome = document.querySelector('.book-page-nav-logo') as HTMLElement;
  logoHome.addEventListener('click', () => locationResolver('#/'));
};
