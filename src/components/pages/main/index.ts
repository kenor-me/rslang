const root = document.getElementById('root') as HTMLElement;

export function addDescription(): string {
  const description = `
    <div class="mp-description">
      <h1>Enjoy your way to learn English with <span class="mp-title">Eng-land</span></h1>
      <p class="mp-text">Изучай английский язык вместе с нашим приложением!
      Учебник с более 3000 слов поможет расширить Ваш словарный запас,
      а мини-игры Спринт и Аудио-вызов закрепят результат!</p>
      <button class="mp-detail">Подробнее</button>
    </div>
  `;
  root.innerHTML = `${description}`;
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
    <a class="logo" href="#/" data-href="#/">
    <img class="logo-img" src="https://img.icons8.com/nolan/64/language.png" alt=""></a>
    <a href="#/textbook" data-href="#/textbook">Учебник</a>
    <a href="#/games" data-href="#/games">Мини-игры</a>
    <a href="#/statistics" data-href="#/statistics">Статистика</a>
    <a class="login" href="#/login" data-href="#/login">Войти</a>
`;
  document.body.insertBefore(header, root);
}

export function createFooter(): void {
  const footer = document.createElement('footer');

  footer.innerHTML = `
    <div id="personal-information" class="personal-information">
      <p class="copyright">&#169;2021</p>
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
