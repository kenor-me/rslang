
import { getWordPage } from '../../api';
import { Word } from '../../types/index';
import './index.css'
const baseUrl = "https://app-english-learn.herokuapp.com";
const root = document.querySelector("#root") as HTMLElement;

let pageBook = 0;
let partBook = 0;
let wordsOfPage:Word[] = [];

export async function mountedVocabulary() {
  render();
  wordsOfPage = await getWordPage(partBook, pageBook);
  renderPage(wordsOfPage)
}

function render(){
  root.innerHTML = "";
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
  const bookContainer = document.querySelector(".container__book-page") as HTMLElement;
  bookContainer.innerHTML = "";
  words.forEach((word) => {
    const cardWord = document.createElement("div");
    cardWord.classList.add("book-word-item");
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

