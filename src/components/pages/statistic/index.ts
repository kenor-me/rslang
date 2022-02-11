import { getStatisticUser } from '../../api/index';
import './index.css';
import { getToday } from './saveStatistic';

export const getPercentCircle = (start: number, end: number): string => `
<svg class="" width="120px" height="120px" viewBox="0 0 42 42" class="donut">
  <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>
  <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="tomato" stroke-width="8">
  </circle>
  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent"
  stroke="#90c47a" stroke-width="8" stroke-dasharray="${start} ${end}" stroke-dashoffset="25">
  </circle>
</svg>
`;

const getCountGameSprintToDay = async (statistic:any):Promise<number> => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countSprint);
  }

  return 0;
};

const getCountGameAudioCallToDay = async (statistic:any):Promise<number> => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countAudioCall);
  }

  return 0;
};
const getCountNewWordFromSprintToDay = async (statistic:any) => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countNewWordFromSprint);
  }

  return 0;
};

const getCountNewWordFromAudioCallToDay = async (statistic:any) => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countNewWordFromAudioCall);
  }

  return 0;
};

const getDayStatistic = async (statistic:any): Promise<string> => `
<h3 class="statistic__title">Статистика за день</h3>
<div class="statistic-all">
  <div class="count-game-all">
    <div class="count-game-title">Количество сыгранных игр за день</div>
    <div class="count-game-all-value count">
    ${await getCountGameSprintToDay(statistic) + await getCountGameAudioCallToDay(statistic)}</div>
  </div>
  <div class="count-words-learn-all">
    <div class="count-word-learn-all-title">
      Количество новых слов за день
    </div>
    <div class="count-word-all-count count">${await getCountGameAudioCallToDay(statistic) + await getCountNewWordFromSprintToDay(statistic)}</div>
  </div>
  <div class="count-words-learn-all">
    <div class="count-word-learn-all-title">
      Количество изученных слов
    </div>
    <div class="count-word-all-count count">${statistic.learnedWords}</div>
  </div>
  <div class="count-percent-all">
    <div class="count-percent-all-title">
      Процент правильных ответов
    </div>
    <div class="count-percent-all-value count">${60}%</div>
  </div>
  <div class="count-series-all">
    <div class="count-series-all-title">
      Самая длинная серия правильных ответов
    </div>
    <div class="count-series-all-count count">${9}</div>
  </div>
</div>
`;
const getAllStatistic = (countSprintGameAll:number, countAudioCallGameAll:number, learnedWordsAll:number) => `
  <h3 class="statistic__title">Статистика за весь период</h3>
  <div class="statistic-all">
    <div class="count-game-all">
      <div class="count-game-title">Количество сыгранных игр</div>
      <div class="count-game-all-value count">${countSprintGameAll + countAudioCallGameAll}</div>
    </div>
    <div class="count-words-learn-all">
      <div class="count-word-learn-all-title">
        Количество изученных слов
      </div>
      <div class="count-word-all-count count">${learnedWordsAll}</div>
    </div>
    <div class="count-percent-all">
      <div class="count-percent-all-title">
        Процент правильных ответов
      </div>
      <div class="count-percent-all-value count">${60}%</div>
    </div>
    <div class="count-series-all">
      <div class="count-series-all-title">
        Самая длинная серия правильных ответов
      </div>
      <div class="count-series-all-count count">${9}</div>
    </div>
  </div>
`;

const root = document.getElementById('root') as HTMLElement;
const user = JSON.parse(localStorage.getItem('userAuth') as string);
/* <div class="statistic-table__header">
  <div class="statistic__header-day active">За сегодня</div>
  <div class="statistic__header-all">За весь период</div>
</div> */
export const renderStatisticPage = async (): Promise<void> => {
  const statistic = await getStatisticUser(user.userId, user.token);
  // обнуление
  /*    const a = await getWordsUser(user.userId, user.token)
  a.forEach(async (i) =>  await deleteUserWord(user.userId, user.token, i.wordId))
  const b = await getWordsUser(user.userId, user.token)
 console.log(b)
  setStatisticUser(user.userId, user.token) */
  console.log(statistic);
  root.innerHTML = `
    <div class="statistic-wrapper statistic-wrapper-auth">
      <div class="statistic-table">
        <div class="statistic-table__body">
          <div class="statistic-games__wrapper">
            <h3>Статистика по играм</h3>
            <div class="statistic-games">
              <div class="statistic-sprint">
                <h4>Спринт</h4>
                <div class="statistic-games__diagram">
                  ${getPercentCircle(40, 60)}
                  <span>${40}%</span>
                </div>
                <div class="count-game-sprint">
                  <div class="count-game-title">Количество сыгранных игр за день</div>
                  <div class="count-game-sprint-value count">${await getCountGameSprintToDay(statistic)}</div>
                </div>
                <div class="count-words-learn-sprint">
                  <div class="count-word-learn-sprint-title">
                    Количество новых слов за день
                  </div>
                  <div class="count-word-sprint-count count">${await getCountNewWordFromSprintToDay(statistic)}</div>
                </div>
                <div class="count-words-learn-sprint">
                  <div class="count-percent-sprint-title">
                    Процент правильных ответов
                  </div>
                  <div class="count-percent-sprint-count count">${40} %</div>
                </div>
                <div class="count-series-sprint">
                  <div class="count-series-sprint-title">
                    Самая длинная серия правильных ответов
                  </div>
                  <div class="count-series-sprint-count count">${9}</div>
                </div>
              </div>
              <div class="statistic-audiocall">
                <h4>Аудиовызов</h4>
                <div class="statistic-games__diagram ">
                  ${getPercentCircle(80, 20)}
                  <span>${80}%</span>
                </div>
                <div class="count-game-audiocall">
                  <div class="count-game-title">Количество сыгранных игр за день</div>
                  <div class="count-game-audiocall-count count">${await getCountGameAudioCallToDay(statistic)}</div>
                </div>
                <div class="count-words-learn-audiocall">
                  <div class="count-word-learn-audiocall-title">
                    Количество новых слов за день
                  </div>
                  <div class="count-word-audiocall-count count">${await getCountNewWordFromAudioCallToDay(statistic)}</div>
                </div>
                <div class="count-percent-audiocall">
                  <div class="count-percent-audiocall-title">
                    Процент правильных ответов
                  </div>
                  <div class="count-percent-audiocall-count count">${80} %</div>
                </div>
                <div class="count-series-audiocall">
                  <div class="count-series-audiocall-title">
                    Самая длинная серия правильных ответов
                  </div>
                  <div class="count-series-audiocall-count count">${8}</div>
                </div>
              </div>
            </div>

            <div>
              ${await getDayStatistic(statistic)}
              ${getAllStatistic(statistic.optional.countSprintAll, statistic.optional.countAudioCallAll, statistic.learnedWords)}
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
