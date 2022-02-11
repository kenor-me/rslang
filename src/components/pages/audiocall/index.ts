import {
  renderFullscreenOpen, renderCloseSVG, toggleFullScreen, renderResultForm,
} from '../sprint';
import './index.css';
import { Word, WordsArray } from '../../types/index';
import { Answers } from './answer';
import { audiocallRight, audiocallWrong, Results } from './results';

export const GAME_WORDS: WordsArray = {
  wordsArr: [],
};

const root = document.getElementById('root') as HTMLElement;
let countAnswer = 0;

const shuffleArray = (array: Word[]) => {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const renderAnswers = async (answers: Promise<Word[]>): Promise<string> => {
  let answersResult = '';
  const pageAnswers = await answers;
  const shuffleAnswers = shuffleArray(pageAnswers);

  for (let i = 1; i <= shuffleAnswers.length; i++) {
    const str = `
      <div class="audiocall-answer">
        <span class="number-answer">${i}</span>
        <span class="name-answer">${shuffleAnswers[i - 1].wordTranslate}</span>
      </div>
    `;
    answersResult += str;
  }
  return answersResult;
};

function showResult(count: number, wordsGame: WordsArray) {
  if (wordsGame.wordsArr.length === count) {
    renderResultForm(audiocallWrong, audiocallRight);
    countAnswer = 0;
  }
}

export const renderAudiocallWrapper = (): void => {
  const content = `
  <div class="wrapper-audiocall">
    <div class="audiocall">
      <div class="audiocall-btn-block">
        <div class="audiocall-fullscreen fullscreen">${renderFullscreenOpen()}</div>
        <a href="#games" class="audiocall-close">${renderCloseSVG()}</a>
      </div>
      <div class="audiocall-controls"></div>
    </div>
  </div>
`;

  root.innerHTML = content;

  toggleFullScreen();
};

export const renderAudiocallPage = async (words: Word[]): Promise<void> => {
  const answers = new Answers(words[countAnswer]);

  const content = `
      <button class="audiocall-sound">
        <img class="audiocall-sound-img" src="./../../../assets/pictures/loud.svg" alt="Sound">
      </button>
      <div class="audiocall-answers">${await renderAnswers(answers.setAnswers())}</div>
      <button class="audiocall-next-button">Не знаю</button>
`;
  (document.querySelector('.audiocall-controls') as HTMLElement).innerHTML = content;

  answers.getSound();
  answers.setAnswers();

  document.querySelector('.audiocall-sound')?.addEventListener('click', () => answers.getSound());
  document.querySelector('.audiocall-next-button')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.textContent === 'Не знаю') {
      const results = new Results(target, answers.word);
      results.getResult();
      answers.showRightAnswer();
    } else {
      countAnswer++;
      renderAudiocallPage(GAME_WORDS.wordsArr);
    }
    showResult(countAnswer, GAME_WORDS);
  });
  document.querySelector('.audiocall-answers')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    answers.compareWithRightAnswer(target);
    const results = new Results(target, answers.word);
    results.getResult();
  });
};
