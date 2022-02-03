import './index.css';

export const root = document.getElementById('root') as HTMLElement;

const renderUserImg = (): string => `
  <svg class="login-block__img" focusable="false" 
  viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
    10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 
    14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z">
    </path>
  </svg>
`;

export function renderDescription(): string {
  const description = `
    <div class="wrapper-main-page">
      <div class="mp-description">
        <h1>Enjoy your way to learn English with <span class="mp-title">
        <br>ENG-<span>L</span><span>and</span></br>
        </span></h1>
        <p class="mp-text">Изучай английский язык вместе с нашим приложением!
        Учебник с более 3000 слов поможет расширить Ваш словарный запас,
        а мини-игры Спринт и Аудио-вызов закрепят результат!</p>
        <a class="mp-detail" href="#about" data-href="#/about">Подробнее</a>
      </div>
    </div>
  `;
  root.innerHTML = `${description}`;

  return description;
}

let isOpen = false;

function createBurgerMenu(): void {
  const burgerMenu = document.querySelector('.burger-menu') as HTMLElement;
  burgerMenu.innerHTML += `
    <div class="menu-wrapper">
      <ul class="menubox">
        <li><a class="menu-item mp-textbook" href="#textbook">Учебник</a></li>
        <li><a class="menu-item mp-games" href="#games">Мини-игры</a></li>
        <li><a class="menu-item mp-statistics" href="#statistics">Статистика</a></li>
        <li><a class="menu-item mp-about" href="#about">О команде</a></li>
      </ul>
    </div>
  `;

  const menubox = document.querySelector('.menu-wrapper') as HTMLElement;

  menubox.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.menubox') || target.closest('.menu-item')) {
      menubox.style.animation = 'burgerOut 0.5s forwards';
      (document.getElementById('menu-toggle') as HTMLInputElement).checked = false;
      isOpen = false;
    }
  });
}

export function createHeader(): void {
  const header = document.createElement('header');

  header.innerHTML = `
    <a class="mp-home mp-home__logo" href="">ENG-<span>L</span>and</a>
    <div class="links">
      <a class="mp-textbook" href="#textbook">Учебник</a>
      <a class="mp-games" href="#games">Мини-игры</a>
      <a class="mp-statistics" href="#statistics">Статистика</a>
    </div>
    <div class="login-block">
      <div class="login-block__wrapper">
        ${renderUserImg()}
        <p class="login-block__name">User name</p>
      </div>
      <button class="mp-login login">Войти</button>
      <div class="burger-menu">
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-btn" for="menu-toggle">
          <span></span>
        </label>
      </div>
    </div>
`;
  document.body.insertBefore(header, root);
  createBurgerMenu();

  const menubox = document.querySelector('.menu-wrapper') as HTMLElement;
  const toggleMenu = document.querySelector('#menu-toggle') as HTMLElement;
  toggleMenu.addEventListener('click', () => {
    if (!isOpen) {
      isOpen = true;
      menubox.style.animation = 'burgerIn 0.5s forwards';
    } else {
      isOpen = false;
      menubox.style.animation = 'burgerOut 0.5s forwards';
    }
  });
}

export function createFooter(): void {
  const footer = document.createElement('footer');

  footer.innerHTML = `
    <div id="personal-information" class="personal-information">
      <p class="copyright">&#169;2021</p>
      <p class="github">
        <a href="https://github.com/kenor-me" target="_blank">Kanareikina Katherine</a>
      </p>
      <p class="github">
        <a href="https://github.com/ShustovaElena" target="_blank">Shustova Elena</a>
      </p>
      <p class="github">
        <a href="https://github.com/Arzhanik-Anastasia" target="_blank">Arzhanik Anastasia</a>
      </p>
      <p class="rsschool">
        <a href="https://rs.school/js/" target="_blank"><img src="./rss.svg"></a>
      </p>
    </div>
`;
  document.body.appendChild(footer);
}
