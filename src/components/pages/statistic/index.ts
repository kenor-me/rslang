import './index.css';

const root = document.getElementById('root') as HTMLElement;

export const renderStatisticPage = (): void => {

};

export const renderBaseStatisticPage = (): void => {
  root.innerHTML = `
    <div class="statistic-wrapper">
      <h1 class="statistic-title">Статистика</h1>
      <p class="statistic-text">Только авторизованным пользователям 
      доступна возможность следить за своим прогрессом обучения!
      </p>
    </div>
  `;
};
