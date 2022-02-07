import './index.css';
import { getTimer } from '../timer';
import { renderSprintPage } from '../sprint';
import { renderAudiocallPage } from '../audiocall';
import { currentWords } from '../audiocall/getWords';

const root = document.getElementById('root') as HTMLElement;

export const sprintDescription = `
    <div class="wrapper-desc">
      <h2>Спринт</h2>
      <p>Тренировка Спринт развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
      <p>Игра длится 1 минуту или пока не закончатся слова</p>
      <p>Кликай на слова или нажимай на клавиши-стрелки</p>
      </div>
  `;

export const audioDescription = `
    <div class="wrapper-desc">
      <h2>Аудиовызов</h2>
      <p>Тренировка улучшает восприятие речи на слух.</p>
      <p>Используй клавиши 1,2,3,4,5, чтобы дать ответ</p>
      <p>Space - для воспроизведения звука</p>
      <p>Стрелка-вправо - переход к следующему вопросу</p>
      </div>
  `;

export const renderLevelsGamePage = (description: string): string => {
  const content = `
    <div class="wrapper-levels">
      ${description}
      <h2 class="wrapper-levels-header">Выбери уровень сложности</h2>
      <div class="levels">
        <a class="level">
          <div class="bg-level"></div>
          <span>1</span>
        </a>
        <a class="level">
          <div class="bg-level"></div>
          <span>2</span>
        </a>
        <a class="level">
          <div class="bg-level"></div>
          <span>3</span>
        </a>
        <a class="level">
          <div class="bg-level"></div>
          <span>4</span>
        </a>
        <a class="level">
          <div class="bg-level"></div>
          <span>5</span>
        </a>
        <a class="level">
          <div class="bg-level"></div>
          <span>6</span>
        </a>
      </div>
    </div>
  `;
  root.innerHTML = content;
  document.querySelector('.levels')?.addEventListener('click', async (e) => {
    const target = ((e.target as HTMLElement).parentNode) as HTMLElement;
    if (target.classList.contains('level')) {
      const page = currentWords.getRandomPageNum();
      const part = Number((target.querySelector('span') as HTMLElement).textContent);
      await currentWords.getGameWords(part, page);
      root.innerHTML = `${getTimer()}`;
      setTimeout(() => {
        if (window.location.hash === '#sprint') renderSprintPage();
        else if (window.location.hash === '#audiocall') renderAudiocallPage();
      }, 4500);
    }
  });
  return content;
};
