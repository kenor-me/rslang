import {
  renderFullscreenOpen, renderCloseSVG, toggleFullScreen, renderResultForm,
} from '../sprint';
import './index.css';
import { Word, WordsArray } from '../../types/index';
import { Answers } from './answer';
import { RightWrongArrays, Results } from './results';
import { ControlWord } from '../vocabulary/ControlWord';

export const GAME_WORDS: WordsArray = {
  wordsArr: [],
};

const root = document.getElementById('root') as HTMLElement;
let countAnswer = 0;
let hasUserAnswer = false;

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
      <div id="answer-${i}" class="audiocall-answer">
        <span id="answer-num-${i}" class="number-answer">${i}</span>
        <span class="name-answer">${shuffleAnswers[i - 1].wordTranslate}</span>
      </div>
    `;
    answersResult += str;
  }
  return answersResult;
};

function showResult() {
  const longestSeriesAudiocall = RightWrongArrays.seriesRightAnswer.replace(/\s+/g, ' ')
    .trim().split(' ').sort((a, b): number => b.length - a.length)[0].length;
  const nameGame = 'audioCall';
  renderResultForm(RightWrongArrays.audiocallWrong, RightWrongArrays.audiocallRight, nameGame, longestSeriesAudiocall);
  countAnswer = 0;
  RightWrongArrays.audiocallWrong = [];
  RightWrongArrays.audiocallRight = [];
  RightWrongArrays.seriesRightAnswer = '';
  hasUserAnswer = false;
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

function createNewAnswers(words: Word[]) {
  return new Answers(words[countAnswer]);
}

function keyPress(e: KeyboardEvent, answers: Answers) {
  if (window.location.hash === '#audiocall') {
    const target = document.querySelector('.audiocall-next-button') as HTMLElement;
    if (!target) {
      document.removeEventListener('keydown', () => keyPress);
      return;
    }

    if (e.code === 'Space') {
      answers.getSound();
    }
    if (e.code === 'NumpadEnter') {
      if (target.innerHTML === 'Не знаю') {
        hasUserAnswer = true;
        document.querySelector('.audiocall-answers')?.removeEventListener('keydown', () => keyPress);
        const results = new Results(document.querySelector('.audiocall-next-button') as HTMLElement, answers.word);
        answers.showRightAnswer();
        results.getResult();
      } else if (GAME_WORDS.wordsArr.length - 1 === countAnswer) {
        showResult();
      } else {
        countAnswer++;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        renderAudiocallPage(GAME_WORDS.wordsArr);
        hasUserAnswer = false;
      }
    }
    const answerNum = Number((e.code).split('').pop());
    if (answerNum >= 1 && answerNum <= 5) {
      if (hasUserAnswer) {
        document.querySelector('.audiocall-answers')?.removeEventListener('keydown', () => keyPress);
      } else {
        const userAnswer = document.getElementById(`answer-${answerNum}`) as HTMLElement;
        answers.compareWithRightAnswer(userAnswer);
        const results = new Results(userAnswer, answers.word);
        results.getResult();
        hasUserAnswer = true;
      }
    }
    document.removeEventListener('keydown', () => keyPress);
  }
}

export const renderAudiocallPage = async (words: Word[]): Promise<Answers> => {
  const answers = createNewAnswers(words);
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
      hasUserAnswer = true;
      document.querySelector('.audiocall-answers')?.classList.add('audiocall-disabled');
      const results = new Results(target, answers.word);
      answers.showRightAnswer();
      results.getResult();
    } else if (GAME_WORDS.wordsArr.length - 1 === countAnswer) {
      showResult();
    } else {
      hasUserAnswer = false;
      countAnswer++;
      renderAudiocallPage(GAME_WORDS.wordsArr);
    }
    document.removeEventListener('keydown', () => keyPress);
  });

  document.querySelector('.audiocall-answers')?.addEventListener('click', (e) => {
    hasUserAnswer = true;
    document.querySelector('.audiocall-answers')?.classList.add('audiocall-disabled');
    const target = e.target as HTMLElement;
    answers.compareWithRightAnswer(target);
    const results = new Results(target, answers.word);
    results.getResult();
  });
  return answers;
};
document.addEventListener('keydown', (e) => keyPress(e, createNewAnswers(GAME_WORDS.wordsArr)));
