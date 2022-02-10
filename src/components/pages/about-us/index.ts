import './index.css';

const root = document.getElementById('root') as HTMLElement;
const IMG_URL = ['./../../../assets/pictures/learn-4.jpg',
  './../../../assets/pictures/learn-5.jpg',
  './../../../assets/pictures/book.jpg',
  './../../../assets/pictures/statistics.jpg'];

function preloadImg(images: string[]) {
  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = images[i];
  }
}

preloadImg(IMG_URL);

function createTeamAboutUs(): string {
  return `
  <div class="wrapper-avatar">
    <h2 class="developers">Наша команда</h2>
      <div class="avatar-item">
        <img class="avatar-img" src="./../../../assets/pictures/avatarKaty.jpg" alt="avatar">
        <div class="avatar-text">
          <h2 class="avatar-name">Kanareikina Katherine</h2>
          <p class="avatar-name__subtitle">Разработчик</p>
          <a class="avatar-github" href="https://github.com/kenor-me">
            <img class="github-sign" src="./../../../assets/pictures/github.svg" alt="github">
            <span>kenor-me</span>
          </a>
          <ol class="avatar-description">
            <li>Тимлид</li>
            <li>Дизайн приложения</li>
            <li>Разработка архитектуры приложения</li>
            <li>Авторизация пользователя</li>
            <li>Разработка игры "Спринт"</li>
            <li>Разработка "Статистики"</li>
          </ol>
        </div>
      </div>

      <div class="avatar-item">
        <img class="avatar-img" src="./../../../assets/pictures/avatarElena.jpg" alt="avatar">
        <div class="avatar-text">
          <h2 class="avatar-name">Shustova Elena</h2>
          <p class="avatar-name__subtitle">Разработчик</p>
          <a class="avatar-github" href="https://github.com/ShustovaElena">
            <img class="github-sign" src="./../../../assets/pictures/github.svg" alt="github">
            <span>ShustovaElena</span>
          </a>
          <ol class="avatar-description">
            <li>Главная страница приложения</li>
            <li>Страница "Описание игр"</li>
            <li>Страница "О команде"</li>
            <li>Разработка игры "Аудиовызов"</li>
            <li>Разработка "Статистики"</li>
          </ol>
        </div>
      </div>

      <div class="avatar-item">
        <img class="avatar-img" src="./../../../assets/pictures/avatarNasty.jpg" alt="avatar">
        <div class="avatar-text">
          <h2 class="avatar-name">Arzhanik Anastasia</h2>
          <p class="avatar-name__subtitle">Разработчик</p>
          <a class="avatar-github" href="https://github.com/Arzhanik-Anastasia">
            <img class="github-sign" src="./../../../assets/pictures/github.svg" alt="github">
            <span>Arzhanik-Anastasia</span>
          </a>
          <ol class="avatar-description">
            <li>Подключение Бекенда</li>
            <li>Разработка "Учебника"</li>
            <li>Список слов</li>
            <li>Разработка "Статистики"</li>
          </ol>
        </div>
      </div>
    </div>
  `;
}

export function renderAdvantagesAboutUs(): string {
  root.innerHTML = '';
  const advantages = `
    <div class="wrapper-about">
      <div class="wrapper-advantages">
        <h2 class="our-advantages">Наши преимущества</h2>
        <div class="advantages">
          <div class="about-advantages">
            <img class="about-img-advantages" src="./../../../assets/pictures/learn-4.jpg" alt="Picture">
            <h2 class="about-header-advantages">Запоминай</h2>
            <p class="about-description-advantages">Изучай словарь, играй в игры и запоминай новые для себя слова!</p>
          </div>

          <div class="about-advantages">
            <img class="about-img-advantages" src="./../../../assets/pictures/learn-5.jpg" alt="Picture">
            <h2 class="about-header-advantages">Изучай</h2>
            <p class="about-description-advantages">Открывай для себя новые слова
            вместе со словарем с более чем 3600 слов!</p>
          </div>

          <div class="about-advantages">
            <img class="about-img-advantages" src="./../../../assets/pictures/book.jpg" alt="Picture">
            <h2 class="about-header-advantages">Играй</h2>
            <p class="about-description-advantages">Мини-игры "Аудиовызов" и "Спринт" помогут тебе в игровой форме
            выучить новый для себя язык!</p>
          </div>

          <div class="about-advantages">
            <img class="about-img-advantages" src="./../../../assets/pictures/statistics.jpg" alt="Picture">
            <h2 class="about-header-advantages">Анализируй</h2>
            <p class="about-description-advantages">Статистика поможет увидеть твой прогресс и совершенствовать свои
            знания еще эффективнее! </p>
          </div>
        </div>
      </div>
      ${createTeamAboutUs()};
    </div>
  `;
  root.innerHTML = advantages;
  return advantages;
}
