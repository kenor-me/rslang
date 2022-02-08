import { getStatisticUser } from '../../api/index';
import './index.css';

const root = document.getElementById('root') as HTMLElement;
const user = JSON.parse(localStorage.getItem('userAuth') as string);
/* <div class="statistic-table__header">
  <div class="statistic__header-day active">За сегодня</div>
  <div class="statistic__header-all">За весь период</div>
</div> */
export const renderStatisticPage = async (): Promise<void> => {
  const statistic = await getStatisticUser(user.userId, user.token);
  root.innerHTML = `
    <div class="statistic-wrapper">
      <div class="statistic-table">
        <div class="statistic-table__body">
          <h3>Статистика</h3>
        <div class="statistic-all">
          <div class="count-game-all">
            <div class="count-game-title">Количество сыгранных игр</div>
            <div class="count-game-all-value">3</div>
          </div>
          <div class="count-words-learn-all">
            <div class="count-word-learn-all-title">
              Количество изученных слов
            </div>
            <div class="count-word-all-count">${statistic.learnedWords}</div>
          </div>
          <div class="count-percent-all">
            <div class="count-percent-all-title">
              Процент правильных ответов
            </div>
            <div class="count-percent-all-value">3</div>
          </div>
          <div class="count-series-all">
            <div class="count-series-all-title">
              Самая длинная серия правильных ответов
            </div>
            <div class="count-series-all-count">9</div>
          </div>
        </div>
        <h3>Статистика по играм</h3>
        <div class="statistic-games">
          <div class="statistic-sprint">
            <h4>Спринт</h4>
            <div class="count-game-sprint">
              <div class="count-game-title">Количество сыгранных игр</div>
              <div class="count-game-sprint-value">3</div>
            </div>
            <div class="count-words-learn-sprint">
              <div class="count-word-learn-sprint-title">
                Количество изученных слов
              </div>
              <div class="count-word-sprint-count">13</div>
            </div>
            <div class="count-words-learn-sprint">
              <div class="count-percent-sprint-title">
                Процент правильных ответов
              </div>
              <div class="count-percent-sprint-count">3</div>
            </div>
            <div class="count-series-sprint">
              <div class="count-series-sprint-title">
                Самая длинная серия правильных ответов
              </div>
              <div class="count-series-sprint-count">9</div>
            </div>
          </div>
          <div class="statistic-audiocall">
            <h4>Аудиовызов</h4>
            <div class="count-game-audiocall">
              <div class="count-game-title">Количество сыгранных игр</div>
              <div class="count-game-audiocall-count">3</div>
            </div>
            <div class="count-words-learn-audiocall">
              <div class="count-word-learn-audiocall-title">
                Количество изученных слов
              </div>
              <div class="count-word-audiocall-count">13</div>
            </div>
            <div class="count-percent-audiocall">
              <div class="count-percent-audiocall-title">
                Процент правильных ответов
              </div>
              <div class="count-percent-audiocall-count">3</div>
            </div>
            <div class="count-series-audiocall">
              <div class="count-series-audiocall-title">
                Самая длинная серия правильных ответов
              </div>
              <div class="count-series-audiocall-count">9</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
/*   const tabForDay = document.querySelector('.statistic__header-day') as HTMLElement;
  const tabAll = document.querySelector('.statistic__header-all') as HTMLElement;
  tabAll.addEventListener('click', () => {
    renderGraficStatistic();
    tabForDay.classList.remove('active');
    tabAll.classList.add('active');
  }); */
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

/* const renderGraficStatistic = ():void => {
  const containerGrafic = document.querySelector('.statistic-table__body') as HTMLElement;
  containerGrafic.innerHTML = 'График статистики';
  const tabForDay = document.querySelector('.statistic__header-day') as HTMLElement;
  const tabAll = document.querySelector('.statistic__header-all') as HTMLElement;
  tabForDay.addEventListener('click', () => {
    renderStatisticPage();
    tabAll.classList.remove('active');
    tabForDay.classList.add('active');
  });
}; */
