import { renderFullscreenOpen, renderCloseSVG, toggleFullScreen } from '../sprint';
import './index.css';

const root = document.getElementById('root') as HTMLElement;

const renderAnswers = (): string => {
  const amountAnswers = 5;
  let result = '';

  for (let i = 1; i <= amountAnswers; i++) {
    const str = `
      <div class="audiocall-answer">
        <span class="number-answer">${i}</span>
        <span class="name-answer">Word</span>
      </div>
    `;
    result += str;
  }
  return result;
};

export const renderAudiocallPage = (): void => {
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
        <div class="audiocall-answers">${renderAnswers()}</div>
        <button class="audiocall-next-button">Не знаю</button>
      </div>
    </div>
  `;
  root.innerHTML = content;
  toggleFullScreen();
};
