import { createPageAboutUs } from '../about-us';

const root = document.getElementById('root') as HTMLElement;

export function addDescription(): string {
  const description = `
    <div class="wrapper-main-page">
      <div class="mp-description">
        <h1>Enjoy your way to learn English with <span class="mp-title">Eng-land</span></h1>
        <p class="mp-text">Изучай английский язык вместе с нашим приложением!
        Учебник с более 3000 слов поможет расширить Ваш словарный запас,
        а мини-игры Спринт и Аудио-вызов закрепят результат!</p>
        <a class="mp-detail" href="#/about" data-href="#/about">Подробнее</a>
      </div>
    </div>
  `;
  root.innerHTML = `${description}`;
  document.querySelector('.mp-detail')?.addEventListener('click', createPageAboutUs);
  return description;
}

export const locationResolver = (location: string): void => {
  switch (location) {
    case '#/':
      addDescription();
      break;
    case '#/textbook':
      root.innerHTML = 'Учебник';
      break;
    case '#/games':
      root.innerHTML = 'Мини-игры';
      break;
    case '#/login':
      root.innerHTML = 'Вход';
      break;
    case '#/statistics':
      root.innerHTML = 'Статистика';
      break;
    default:
      break;
  }
};

window.addEventListener('load', () => {
  const location = window.location.hash;

  if (location) {
    locationResolver(location);
  }
});

export function createHeader(): void {
  const header = document.createElement('header');

  header.innerHTML = `
    <a class="mp-home logo" href="#/"">
    <img class="mp-home logo-img" src="https://img.icons8.com/nolan/64/language.png" alt=""></a>
    <div class="links">
      <a class="mp-textbook" href="#/textbook">Учебник</a>
      <a class="mp-games" href="#/games">Мини-игры</a>
      <a class="mp-statistics" href="#/statistics">Статистика</a>
    </div>
    <a class="mp-login login" href="#/login">Войти</a>
    <div class="burger-menu"></div>
`;
  document.body.insertBefore(header, root);
}

export function createFooter(): void {
  const footer = document.createElement('footer');

  footer.innerHTML = `
    <div id="personal-information" class="personal-information">
      <p class="copyright">&#169;2022</p>
      <p class="rsschool">
        <a href="https://rs.school/js/" target="_blank"><img src="https://rs.school/images/rs_school_js.svg"></a>
      </p>
      <p class="github">
        <a href="https://github.com/kenor-me" target="_blank">Kanareikina Katherine</a>
      </p>
      <p class="github">
        <a href="https://github.com/ShustovaElena" target="_blank">Shustova Elena</a>
      </p>
      <p class="github">
        <a href="https://github.com/Arzhanik-Anastasia" target="_blank">Arzhanik Anastasia</a>
      </p>
    </div>
`;
  document.body.appendChild(footer);
}

export function createBurgerMenu(): void {
  const burgerMenu = document.querySelector('.burger-menu') as HTMLElement;
  burgerMenu.innerHTML = `
    <input id="menu-toggle" type="checkbox" />
    <label class="menu-btn" for="menu-toggle">
      <span></span>
    </label>

    <ul class="menubox">
      <li><a class="menu-item" href="#/textbook" data-href="#/textbook">Учебник</a></li>
      <li><a class="menu-item" href="#/games" data-href="#/games">Мини-игры</a></li>
      <li><a class="menu-item" href="#/statistics" data-href="#/statistics">Статистика</a></li>
    </ul>
  `;
  document.querySelector('header')?.appendChild(burgerMenu);

  const menubox = document.querySelector('.menubox') as HTMLElement;

  document.body.addEventListener('click', () => {
    menubox.style.display = 'none';
    (document.getElementById('menu-toggle') as HTMLInputElement).checked = false;
    // e.preventDefault();
  });

  burgerMenu.addEventListener('click', (e) => {
    menubox.style.display = 'block';
    e.stopPropagation();
  });
}
