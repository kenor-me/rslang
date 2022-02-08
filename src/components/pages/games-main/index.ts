import './index.css';

const root = document.getElementById('root') as HTMLElement;

export const renderGamesPage = (): void => {
  const content = `
  <div class="main-games-wrapper">
    <h1 class="header-games">Выбери игру</h1>
    <div class="wrapper-games">
      <div class="wrapper-games-savannah">
        <a class="games-mark games-mark-savanah" href="#sprint-description">
          <span class="games-mark-bg"></span>
          <span class="games-mark-img"></span>
          <span class="games-mark-name">Спринт</span>
        </a>
        <p class="games-description">Тренировка Спринт поможет проверить знаешь ли ты правильный перевод слова. 
        Чем больше слов ты знаешь, тем больше очков опыта получишь.
        </p>
      </div>
      <div class="wrapper-games-audiocall">
        <a class="games-mark games-mark-audiocall" href="#audiocall-description">
          <span class="games-mark-bg"></span>
          <span class="games-mark-img"></span>
          <span class="games-mark-name">Аудиовызов</span>
        </a>
        <p class="games-description">Тренировка Аудиовызов улучшает восприятие речи на слух.
        Выбирай перевод слова, которое услышишь и получай баллы.</p>
      </div>
    </div>
  </div>
  `;
  root.innerHTML = content;
};
