import { getWordPage } from '../../api';
import { Word } from '../../types/index';
import './index.css';
const baseUrl = 'https://app-english-learn.herokuapp.com';
const root = document.querySelector('#root') as HTMLElement;

let pageBook = 0;
let partBook = 0;
let wordsOfPage:Word[] = [];
const MAX_COUNT_PAGE = 30;
const MAX_COUNT_PART = 6;
const COLOR_FOR_PART = [
  '#a5e8d6',
  '#4e8dc0',
  '#6b66a6',
  '#d76565',
  '#e6cccb',
  '#d9bb63',
];

function render() {
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
}

function renderPage(words:Word[]) {
  const bookContainer = document.querySelector('.container__book-page') as HTMLElement;
  bookContainer.innerHTML = '';
  words.forEach((word) => {
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
  });
}

function renderSelect() {
  const selectPartition = document.querySelector('.select-partition') as HTMLElement;
  for (let i = 1; i <= MAX_COUNT_PART; i++) {
    const option = document.createElement('option');
    option.value = (i - 1).toString();
    option.textContent = `part ${i}`;
    option.style.backgroundColor = COLOR_FOR_PART[i - 1];
    selectPartition.append(option);
  }
}

export async function mountedVocabulary():Promise<void> {
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
  renderPage(wordsOfPage);
  renderSelect();
  setNumberPage();
}

function setNumberPage():void {
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
}

async function changePage(param:string):Promise<void> {
  pageBook = (param === 'next') ? pageBook++ : pageBook--;
  wordsOfPage = await getWordPage(partBook, pageBook);
  renderPage(wordsOfPage);
  setNumberPage();
}
