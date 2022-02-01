import './index.css';

const root = document.getElementById('root') as HTMLElement;

export function createPageAboutUs(): string {
  root.innerHTML = '';
  const aboutAUs = `
    <div class="wrapper-about wrapper-main-page">
      <div class="about-advantages">
        <img class="about-img-advantages" src="./../../../assets/img/nature-sign-1.png" alt="Nature sign">
        <h2 class="about-header-advantages">Запоминай</h2>
        <p class="about-description-advantages">Изучай словарь, играй в игры и запоминай новые для себя слова!</p>
      </div>
    </div>
  `;
  root.innerHTML = aboutAUs;
  return aboutAUs;
}
