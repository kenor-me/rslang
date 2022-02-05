import './index.css';

const root = document.getElementById('root') as HTMLElement;

export const renderGamesPage = (): void => {
  const content = `
    <h2 class="header-games">Выбери игру</h2>
    <div class="wrapper-games">
      <div class="wrapper-games-savannah">
        <a class="games-mark games-mark-savanah" href="#savannah">
        <span class="games-mark-bg"></span>
        <div></div>
        <span class="games-mark-name">Саванна</span>
        </a>
        <p class="games-description">Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь,
        тем больше очков опыта получишь.</p>
      </div>
      <div class="wrapper-games-audiocall">
        <a class="games-mark games-mark-audiocall" href="#audiocall">
        <span class="games-mark-bg"></span>
        <div></div>
        <span class="games-mark-name">Аудиовызов</span>
        </a>
        <p class="games-description">Тренировка улучшает восприятие речи на слух.</p>
      </div>
    </div>
  `;
  root.innerHTML = content;
};
