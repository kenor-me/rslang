import './index.css';

const root = document.getElementById('root') as HTMLElement;

function createTeamAboutUs(): string {
  return `
    <h2 class="developers">Наша команда</h2>
    <div class="wrapper-avatar">
      <div class="avatar-item">
        <img class="avatar-img" src="./../../../assets/pictures/avatarKaty.jpg" alt="avatar">
        <div class="avatar-text">
          <h2 class="avatar-name">Kanareikina Katherine</h2>
          <p class="avatar-name-position">Разработчик</p>
          <a class="avatar-github" href="https://github.com/kenor-me">
          <img class="github-sign" src="./../../../assets/pictures/github.svg" alt="github">
          kenor-me</a>
          <ol class="avatar-description">
            <li>Создала страницу авторизации пользователя</li>
          </ol>
        </div>
      </div>

      <div class="avatar-item">
        <img class="avatar-img" src="./../../../assets/pictures/avatarElena.jpg" alt="avatar">
        <div class="avatar-text">
          <h2 class="avatar-name">Shustova Elena</h2>
          <p class="avatar-name-position">Разработчик</p>
          <a class="avatar-github" href="https://github.com/ShustovaElena">
          <img class="github-sign" src="./../../../assets/pictures/github.svg" alt="github">
          ShustovaElena</a>
          <ol class="avatar-description">
            <li>Создала "Главную страницу" и страницу "О команде"</li>
          </ol>
        </div>
      </div>

      <div class="avatar-item">
        <img class="avatar-img" src="" alt="avatar">
        <div class="avatar-text">
          <h2 class="avatar-name">Arzhanik Anastasia</h2>
          <p class="avatar-name-position">Разработчик</p>
          <a class="avatar-github" href="https://github.com/Arzhanik-Anastasia">
          <img class="github-sign" src="./../../../assets/pictures/github.svg" alt="github">
          Arzhanik-Anastasia</a>
          <ol class="avatar-description">
            <li>Создала страницу "Учебник"</li>
          </ol>
        </div>
      </div>
    </div>
  `;
}

export function createAdvantagesAboutUs(): string {
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
