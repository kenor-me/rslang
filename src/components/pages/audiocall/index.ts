import { renderFullscreenOpen, renderCloseSVG, toggleFullScreen } from '../sprint';
import './index.css';
import { Word } from '../../types/index';
import { Answers } from './answer';

const root = document.getElementById('root') as HTMLElement;

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
  const amountAnswers = 5;
  let result = '';
  const pageAnswers = await answers;
  const shuffleAnswers = shuffleArray(pageAnswers);

  for (let i = 1; i <= amountAnswers; i++) {
    const str = `
      <div class="audiocall-answer">
        <span class="number-answer">${i}</span>
        <span class="name-answer">${shuffleAnswers[i - 1].word}</span>
      </div>
    `;
    result += str;
  }
  return result;
};

export const renderAudiocallPage = async (words: Word[]): Promise<void> => {
  const answers = new Answers(words[0]);
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
  toggleFullScreen();
};
