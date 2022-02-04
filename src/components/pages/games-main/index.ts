import './index.css';

const root = document.getElementById('root') as HTMLElement;

export const renderGamesPage = (): void => {
  const content = `
    <h2 class="header-games">Выбери игру</h2>
    <div class="wrapper-games">
      <div class="wrapper-games-savannah">
        <div></div>
        <a class="games-mark games-mark-savanah" href="#savannah">Саванна</a>
      </div>
      <div class="wrapper-games-audiocall">
        <div></div>
        <a class="games-mark games-mark-audiocall" href="#audiocall">Аудиовызов</a>
      </div>
    </div>
  `;
  root.innerHTML = content;
};
