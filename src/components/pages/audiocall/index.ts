import { renderFullscreenOpen, renderCloseSVG, toggleFullScreen } from '../sprint';
import './index.css';
import { Word, WordsArray } from '../../types/index';
import { Answers } from './answer';

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
  let result = '';
  const pageAnswers = await answers;
  const shuffleAnswers = shuffleArray(pageAnswers);

  for (let i = 1; i <= shuffleAnswers.length; i++) {
    const str = `
      <div class="audiocall-answer">
        <span class="number-answer">${i}</span>
        <span class="name-answer">${shuffleAnswers[i - 1].wordTranslate}</span>
      </div>
    `;
    result += str;
  }
  return result;
};

export const renderAudiocallPage = async (words: Word[]): Promise<void> => {
  const answers = new Answers(words[countAnswer]);
  const content = `
    <div class="wrapper-audiocall">
      <div class="audiocall">
        <div class="audiocall-btn-block">
          <div class="audiocall-fullscreen fullscreen">${renderFullscreenOpen()}</div>
          <a href="#games" class="audiocall-close">${renderCloseSVG()}</a>
        </div>
        <button class="audiocall-sound">
          <img class="audiocall-sound-img" src="./../../../assets/pictures/loud.svg" alt="Sound">
        </button>
        <div class="audiocall-answers">${await renderAnswers(answers.setAnswers())}</div>
        <button class="audiocall-next-button">Не знаю</button>
      </div>
    </div>
  `;
  answers.getSound();
  answers.setAnswers();
  root.innerHTML = content;
  document.querySelector('.audiocall-sound')?.addEventListener('click', () => answers.getSound());
  document.querySelector('.audiocall-next-button')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.textContent === 'Не знаю') {
      answers.showRightAnswer();
    } else {
      countAnswer++;
      renderAudiocallPage(GAME_WORDS.wordsArr);
    }
  });
  document.querySelector('.audiocall-answers')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    answers.compareWithRightAnswer(target);
  });
  toggleFullScreen();
};
