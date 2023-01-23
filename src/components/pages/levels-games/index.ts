import './index.css';
import { getSprintPlay, renderSprintPage } from '../sprint';
import { Word } from '../../types';
import { renderAudiocallWrapper, renderAudiocallPage, GAME_WORDS } from '../audiocall';
import { GamesWords } from '../audiocall/getWords';
import { Answers } from '../audiocall/answer';

const root = document.getElementById('root') as HTMLElement;
export const newAnswers = {
  answers: Answers,
};

export const sprintDescription = `
    <div class="wrapper-desc">
      <h1>Спринт</h1>
      <p>Игра длится 1 минуту или пока не закончатся слова</p>
      <p>Кликай на слова или нажимай на клавиши-стрелки</p>
      </div>
  `;

export const audioDescription = `
    <div class="wrapper-desc">
      <h1>Аудиовызов</h1>
      <p>Кликай на слова или используй клавиши 1,2,3,4,5, чтобы дать ответ</p>
      <p>Space - для воспроизведения звука</p>
      <p>NumPadEnter - переход к следующему слову</p>
      </div>
  `;

export const renderLevelsGamePage = (description: string, hash: string): string => {
  const content = `
    <div class="wrapper-levels">
      ${description}
      <h2 class="wrapper-levels-header">Выбери уровень сложности</h2>
      <div class="levels">
        <a href="${hash}" class="level">
          <div class="bg-level"></div>
          <span>1</span>
        </a>
        <a href="${hash}" class="level">
          <div class="bg-level"></div>
          <span>2</span>
        </a>
        <a href="${hash}" class="level">
          <div class="bg-level"></div>
          <span>3</span>
        </a>
        <a href="${hash}" class="level">
          <div class="bg-level"></div>
          <span>4</span>
        </a>
        <a href="${hash}" class="level">
          <div class="bg-level"></div>
          <span>5</span>
        </a>
        <a href="${hash}" class="level">
          <div class="bg-level"></div>
          <span>6</span>
        </a>
      </div>
    </div>
  `;
  root.innerHTML = content;
  document.querySelector('.levels')?.addEventListener('click', async (e) => {
    const currentWords = new GamesWords();
    const target = ((e.target as HTMLElement).parentNode) as HTMLElement;
    if (target.classList.contains('level')) {
      const page = currentWords.getRandomPageNum();
      const part = Number((target.querySelector('span') as HTMLElement).textContent) - 1;
      GAME_WORDS.wordsArr = await currentWords.getGameWords(part, page);

      const randomThreePages = Promise.all([
        await currentWords.getGameWords(part, currentWords.getRandomPageNum()),
        await currentWords.getGameWords(part, currentWords.getRandomPageNum()),
        await currentWords.getGameWords(part, currentWords.getRandomPageNum())]);
      const result: Word[] = (await randomThreePages).flat().sort(() => Math.random() - 0.5);

      const gameTimeout = setTimeout(() => {
        if (window.location.hash === '#sprint') {
          renderSprintPage();
          getSprintPlay(result);
        } else if (window.location.hash === '#audiocall') {
          renderAudiocallWrapper();
          renderAudiocallPage(GAME_WORDS.wordsArr);
        }
      }, 3800);

      window.addEventListener('hashchange', () => {
        clearTimeout(gameTimeout);
      });
    }
  });

  return content;
};
