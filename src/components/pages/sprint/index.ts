/* eslint-disable max-len */
import {
  Word, WordResult,
} from '../../types';
import { getPercentCircle } from '../statistic';
import './index.css';
import { saveStatictic } from '../statistic/saveStatistic';

const root = document.getElementById('root') as HTMLElement;

export const renderFullscreenOpen = (): string => `
  <svg class="sprint__fullscreen-open" xmlns="http://www.w3.org/2000/svg"
  width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M31.48 31.6299H23.05V35.8599H35.7001V23.1499H31.48V31.6299Z" />
    <path d="M4.22 23.1499H0V35.8599H12.65V31.6299H4.22V23.1499Z" />
    <path d="M0 12.71H4.22V4.24H12.65V0H0V12.71Z" />
    <path d="M23.05 0V4.24H31.48V12.71H35.7001V0H23.05Z" />
  </svg>
`;

export const renderCloseSVG = (): string => `
  <svg class="sprint__close" viewBox="0 0 24 24" focusable="false">
    <path fill="FFFFFF"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z">
    </path>
  </svg>
`;

const renderFullscreenClose = (): string => `
  <svg class="sprint__fullscreen-close"
  xmlns="http://www.w3.org/2000/svg" width="36"
      height="36" viewBox="0 0 36 36" fill="none">
    <path d="M28.2554 7.74495H35.9764V12.8119H23.1874V0.0229492H28.2544V7.74395L28.2554
    7.74495ZM23.1884 35.976V23.1869H35.9774V28.2539H28.2564V35.9749H23.1894L23.1884 35.976ZM7.74544
    7.74495V0.0239492H12.8124V12.8129H0.0234375V7.74595H7.74444L7.74544
    7.74495ZM0.0244375 28.2549V23.1879H12.8134V35.977H7.74644V28.2559H0.0254375L0.0244375 28.2549Z">
  </svg>
`;

export const toggleFullScreen = (): void => {
  const fullscreen = document.querySelector('.fullscreen') as HTMLElement;
  const wrapper = document.querySelector('.sprint-wrapper') as HTMLElement
    || document.querySelector('.wrapper-audiocall') as HTMLElement;

  fullscreen.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('sprint__fullscreen-open')) {
      fullscreen.innerHTML = `${renderFullscreenClose()}`;
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      }
    }
    if (target.classList.contains('sprint__fullscreen-close')) {
      fullscreen.innerHTML = `${renderFullscreenOpen()}`;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });
};

const BASE_URL = 'https://app-english-learn.herokuapp.com';

const renderResultWord = (word: WordResult): string => `
  <li>
    <div class="sprint__result-sound">
      <audio src="${BASE_URL}/${word.audio}"></audio>
    </div>
    <div class="sprint__result-text-block">
      <p class="sprint__result-word"> ${word.word} </p>
      <p class="sprint__result-transcript"> ${word.transcription} </p>
      <p class="sprint__result-transl"> - ${word.translate}</p>
    </div>
  </li>
`;

const renderResultForm = (wrong: WordResult[], right: WordResult[], longestSeries:number): void => {
  const persentWrong = Math.floor((wrong.length * 100) / (wrong.length + right.length));
  const persentRight = Math.floor((right.length * 100) / (wrong.length + right.length));

  root.innerHTML = `
  <div class="sprint-wrapper sprint__result-wrapper">
    <div class="sprint__inf-block">
      <div class="sprint__btn-block-top">
        <a href="#games" class="sprint__link">${renderCloseSVG()}</a>
      </div>
      <div class="sprint-text-block sprint__result-inf-block">
        <p class="sprint__title">РЕЗУЛЬТАТ</p>
        <div class="sprint__result-diagram ">
                  ${getPercentCircle(persentRight, persentWrong)}
                  <span>${persentRight}%</span>
                </div>
        <div class="sprint__result">
          <p class="sprint__result-title">Слова с ошибками <span class="result-title-wrong">${wrong.length}</span></p>
          <ul class="sprint__wrong-words">
            ${wrong.map((word: WordResult) => renderResultWord(word)).join('')}
          </ul>
        </div>
        <div class="sprint__result">
          <p class="sprint__result-title">Изученные слова <span class="result-title-right">${right.length}</span></p>
          <ui class="sprint__right-words">
            ${right.map((word: WordResult) => renderResultWord(word)).join('')}
          </ui>
        </div>
        <a href="#sprint-description" class="sprint__result-btn">Играть еще раз</a>
    </div>
  </div>
`;

  const audioBlock = document.querySelector('.sprint__result-inf-block') as HTMLElement;

  audioBlock.addEventListener('click', (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('sprint__result-sound')) {
      const audio = target.querySelector('audio') as HTMLAudioElement;
      audio.play();
    }
  });
  saveStatictic(right, wrong, 'sprint', longestSeries);
};

const getSeconds = (): void => {
  let seconds = 60;
  const second = document.querySelector('.sprint__seconds') as HTMLElement;
  setTimeout(function run() {
    second.innerHTML = `${seconds - 1}`;
    if (seconds > 0) {
      setTimeout(run, 1000);
      seconds -= 1;
    }
  }, 1000);
};

export const renderSprintPage = (): void => {
  root.innerHTML = `
  <div class="sprint-wrapper">
    <div class="sprint__inf-block">
      <div class="sprint__btn-block-top">
        <div class="fullscreen">
          ${renderFullscreenOpen()}
        </div>
        <a href="#games">${renderCloseSVG()}</a>
      </div>
      <div class="sprint__timer">
        <div class="sprint__timer-line"></div>
        <div class="sprint__timer-body">
          <div class="sprint__timer-counter">
            <span class="sprint__seconds">60</span>
          </div>
        </div>
      </div>
      <div class="sprint-text-block">
        <p class="sprint__title">environment</p>
        <p class="sprint__subtitle">окружающая обстановка</p>
      </div>
      <div class="sprint__btn-block">
      <div class="sprint__btn sprint__left">Неверно</div>
        <div class="sprint__btn sprint__right">Верно</div>
      </div>
    </div>
  </div>
`;

  toggleFullScreen();
  getSeconds();
};

const getRandomIndex = (min: number, max: number): number => {
  const randomIndex = Math.floor(Math.random() * (max - min) + min);
  return randomIndex;
};

const renderWord = (word: string, translate: string) => {
  const title = document.querySelector('.sprint__title') as HTMLElement;
  const subtitle = document.querySelector('.sprint__subtitle') as HTMLElement;
  title.innerHTML = `${word}`;
  subtitle.innerHTML = `${translate}`;
};

export const getSprintPlay = async (words: Word[]): Promise<void> => {
  let i = 0;
  const arrTranslate: string[] = [];
  words.map((item: Word): number => arrTranslate.push(item.wordTranslate));

  const arrRandomIndex: number[] = Array(Math.floor(words.length / 2)).fill(0).map((): number => getRandomIndex(0, words.length));

  const randomTranslate: string[] = arrTranslate.map((item: string, ind: number, array: string[]): string => ((!arrRandomIndex.includes(ind) ? item : array[getRandomIndex(0, words.length)])));
  renderWord(words[i].word, randomTranslate[i]);

  const answerButton = document.querySelector('.sprint__btn-block') as HTMLElement;
  const wrong: WordResult[] = [];
  const right: WordResult[] = [];
  let seriesRightAnswer = '';

  const resultTimeout = setTimeout(async (): Promise<void> => {
    const longestSeries = seriesRightAnswer.replace(/\s+/g, ' ').trim().split(' ').sort((a, b): number => b.length - a.length)[0].length;
    /*  saveLongestSeries(longestSeries) */

    renderResultForm(wrong, right, longestSeries);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    document.removeEventListener('keydown', kayAnswer);
  }, 60000);

  const wrongBorder = document.querySelector('.sprint__inf-block') as HTMLElement;

  const addWrongWord = (): void => {
    wrongBorder.classList.add('wrong-border');
    wrong.push({
      id: words[i].id, audio: words[i].audio, word: words[i].word, transcription: words[i].transcription, translate: words[i].wordTranslate,
    });
    i++;
    seriesRightAnswer += ' ';
    setTimeout(() => wrongBorder.classList.remove('wrong-border'), 1000);
  };

  const addRightWord = (): void => {
    right.push({
      id: words[i].id, audio: words[i].audio, word: words[i].word, transcription: words[i].transcription, translate: words[i].wordTranslate,
    });
    i++;
    seriesRightAnswer += '1';
  };

  function kayAnswer(e: KeyboardEvent) {
    if (i < words.length) {
      if (e.code === 'ArrowLeft' && words[i].wordTranslate === randomTranslate[i]) {
        addWrongWord();
      } else if (e.code === 'ArrowLeft' && words[i].wordTranslate !== randomTranslate[i]) {
        addRightWord();
      }
      if (e.code === 'ArrowRight' && words[i].wordTranslate !== randomTranslate[i]) {
        addWrongWord();
      } else if (e.code === 'ArrowRight' && words[i].wordTranslate === randomTranslate[i]) {
        addRightWord();
      }
      if (i < words.length) renderWord(words[i].word, randomTranslate[i]);
    } else {
      const longestSeries = seriesRightAnswer.replace(/\s+/g, ' ').trim().split(' ').sort((a, b): number => b.length - a.length)[0].length;
      console.log(longestSeries);

      renderResultForm(wrong, right, longestSeries);
      clearTimeout(resultTimeout);
      document.removeEventListener('keydown', kayAnswer);
    }
  }

  document.addEventListener('keydown', kayAnswer);

  answerButton.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (i < words.length) {
      if (target.classList.contains('sprint__left') && words[i].wordTranslate === randomTranslate[i]) {
        addWrongWord();
      } else if (target.classList.contains('sprint__left') && words[i].wordTranslate !== randomTranslate[i]) {
        addRightWord();
      }
      if (target.classList.contains('sprint__right') && words[i].wordTranslate !== randomTranslate[i]) {
        addWrongWord();
      } else if (target.classList.contains('sprint__right') && words[i].wordTranslate === randomTranslate[i]) {
        addRightWord();
      }
      if (i < words.length) renderWord(words[i].word, randomTranslate[i]);
    } else {
      const longestSeries = seriesRightAnswer.replace(/\s+/g, ' ').trim().split(' ').sort((a, b): number => b.length - a.length)[0].length;
      console.log(longestSeries);

      renderResultForm(wrong, right, longestSeries);
      clearTimeout(resultTimeout);
      document.removeEventListener('keydown', kayAnswer);
    }
  });

  window.addEventListener('hashchange', () => {
    clearTimeout(resultTimeout);
    document.removeEventListener('keydown', kayAnswer);
  });
};
