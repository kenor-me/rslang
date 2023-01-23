import { Statistic } from '../../types/index';
import {
  deleteUserWord, getStatisticUser, getWordsUser, setStatisticUser,
} from '../../api/index';
import './index.css';
import { getToday } from './saveStatistic';
import { langStatistic } from './schedule';

const root = document.getElementById('root') as HTMLElement;
const user = JSON.parse(localStorage.getItem('userAuth') as string);

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

const getCountGameSprintToDay = async (statistic: Statistic): Promise<number> => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countSprint);
  }
  return 0;
};

const getCountGameAudioCallToDay = async (statistic: Statistic): Promise<number> => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countAudioCall);
  }
  return 0;
};

const getCountNewWordFromSprintToDay = async (statistic: Statistic) => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countNewWordFromSprint);
  }
  return 0;
};

const getCountNewWordFromAudioCallToDay = async (statistic: Statistic) => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].countNewWordFromAudioCall);
  }
  return 0;
};

const getSeriesTodaySprint = async (statistic: Statistic) => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].seriesSprintToday);
  }
  return 0;
};

const getSeriesTodayAudioCall = async (statistic: Statistic) => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    return Number(statistic.optional.daysStatistic[today].seriesAudioCallToday);
  }
  return 0;
};

const getDayStatistic = async (statistic: Statistic, percentRight: number): Promise<string> => {
  const today = getToday();
  const userWord = await getWordsUser(user.userId, user.token);
  const learnedWords = userWord.filter((item) => item.difficulty === 'learned');
  let longSeriesToday = 0;
  if (statistic.optional.daysStatistic[today]) {
    if (statistic.optional.daysStatistic[today].seriesSprintToday
      > statistic.optional.daysStatistic[today].seriesAudioCallToday) {
      longSeriesToday = statistic.optional.daysStatistic[today].seriesSprintToday;
    } else {
      longSeriesToday = statistic.optional.daysStatistic[today].seriesAudioCallToday;
    }
  }
  return `

  <div class="statistic-all">
    <h4 class="statistic__title">Статистика за день</h4>
    <div class="count-game-all">
      <div class="count-game-title">Количество сыгранных игр за день</div>
      <div class="count-game-all-value count">
      ${await getCountGameSprintToDay(statistic) + await getCountGameAudioCallToDay(statistic)}</div>
    </div>
    <div class="count-words-learn-all">
      <div class="count-word-learn-all-title">
        Количество новых слов за день
      </div>
      <div class="count-word-all-count count">
      ${await getCountNewWordFromSprintToDay(statistic) + await getCountNewWordFromAudioCallToDay(statistic)}
      </div>
    </div>
    <div class="count-words-learn-all">
      <div class="count-word-learn-all-title">
        Количество изученных слов
      </div>
      <div class="count-word-all-count count">${learnedWords.length}</div>
    </div>
    <div class="count-percent-all">
      <div class="count-percent-all-title">
        Процент правильных ответов
      </div>
      <div class="count-percent-all-value count">${percentRight} %</div>
    </div>
    <div class="count-series-all">
      <div class="count-series-all-title">
        Самая длинная серия правильных ответов
      </div>
      <div class="count-series-all-count count">${longSeriesToday}</div>
    </div>
  </div>
  `;
};

const getAllStatistic = async (statistic: Statistic) => {
  const userWord = await getWordsUser(user.userId, user.token);
  const learnedWords = userWord.filter((item) => item.difficulty === 'learned');
  let percentRightAll = 0;
  if (statistic.optional.rightAnswerAll + statistic.optional.wrongAnswerAll !== 0) {
    percentRightAll = Math.floor((statistic.optional.rightAnswerAll * 100)
      / (statistic.optional.rightAnswerAll + statistic.optional.wrongAnswerAll));
  }
  const longAll = (statistic.optional.seriesSprint > statistic.optional.seriesAudioCall)
    ? statistic.optional.seriesSprint : statistic.optional.seriesAudioCall;
  return `
  <div class="statistic-all">
    <h4 class="statistic__title">Статистика за весь период</h4>
    <div class="count-game-all">
      <div class="count-game-title">Количество сыгранных игр</div>
      <div class="count-game-all-value count">
      ${statistic.optional.countSprintAll + statistic.optional.countAudioCallAll}
      </div>
    </div>
    <div class="count-words-learn-all">
      <div class="count-word-learn-all-title">
        Количество изученных слов
      </div>
      <div class="count-word-all-count count">${learnedWords.length}</div>
    </div>
    <div class="count-percent-all">
      <div class="count-percent-all-title">
        Процент правильных ответов
      </div>
      <div class="count-percent-all-value count">${percentRightAll} %</div>
    </div>
    <div class="count-series-all">
      <div class="count-series-all-title">
        Самая длинная серия правильных ответов
      </div>
      <div class="count-series-all-count count">${longAll}</div>
    </div>
  </div>
  `;
};

export const renderStatisticPage = async (): Promise<void> => {
  const statistic = await getStatisticUser(user.userId, user.token);
  const today = getToday();
  let rightSprint = 0;
  let wrongSprint = 0;
  let rightAudioCall = 0;
  let wrongAudioCall = 0;
  let persentRightSprint = 0;
  let persentWrongSprint = 0;
  let persentRightAudioCall = 0;
  let persentWrongAudioCall = 0;
  let percentRightToday = 0;
  if (statistic.optional.daysStatistic[today]) {
    rightSprint = statistic.optional.daysStatistic[today].countRightAnswerSprint;
    wrongSprint = statistic.optional.daysStatistic[today].countWrongAnswerSprint;
    rightAudioCall = statistic.optional.daysStatistic[today].countRightAnswerAudioCall;
    wrongAudioCall = statistic.optional.daysStatistic[today].countWrongAnswerAudioCall;
    if ((wrongSprint + rightSprint) !== 0) {
      persentRightSprint = Math.floor((rightSprint * 100) / (wrongSprint + rightSprint));
      persentWrongSprint = Math.floor((wrongSprint * 100) / (wrongSprint + rightSprint));
    }
    if ((wrongAudioCall + rightAudioCall) !== 0) {
      persentRightAudioCall = Math.floor((rightAudioCall * 100) / (wrongAudioCall + rightAudioCall));
      persentWrongAudioCall = Math.floor((wrongAudioCall * 100) / (wrongAudioCall + rightAudioCall));
    }
    percentRightToday = Math.floor(((rightSprint + rightAudioCall) * 100)
      / (wrongSprint + rightSprint + rightAudioCall + wrongAudioCall));
  }
  root.innerHTML = `
    <div class="statistic-wrapper statistic-wrapper-auth">
      <div class="statistic-table">
        <div class="statistic-table__body">
          <div class="statistic-games__wrapper">
            <h1>Статистика по играм</h1>
            <div class="statistic-games">
              <div class="statistic-sprint">
                <h4>Спринт</h4>
                <div class="statistic-games__diagram">
                  ${getPercentCircle(persentRightSprint, persentWrongSprint)}
                  <span>${persentRightSprint}%</span>
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
                  <div class="count-percent-sprint-count count">${persentRightSprint} %</div>
                </div>
                <div class="count-series-sprint">
                  <div class="count-series-sprint-title">
                    Самая длинная серия правильных ответов
                  </div>
                  <div class="count-series-sprint-count count">${await getSeriesTodaySprint(statistic)}</div>
                </div>
              </div>
              <div class="statistic-audiocall">
                <h4>Аудиовызов</h4>
                <div class="statistic-games__diagram ">
                  ${getPercentCircle(persentRightAudioCall, persentWrongAudioCall)}
                  <span>${persentRightAudioCall}%</span>
                </div>
                <div class="count-game-audiocall">
                  <div class="count-game-title">Количество сыгранных игр за день</div>
                  <div class="count-game-audiocall-count count">${await getCountGameAudioCallToDay(statistic)}</div>
                </div>
                <div class="count-words-learn-audiocall">
                  <div class="count-word-learn-audiocall-title">
                    Количество новых слов за день
                  </div>
                  <div class="count-word-audiocall-count count">
                  ${await getCountNewWordFromAudioCallToDay(statistic)}</div>
                </div>
                <div class="count-percent-audiocall">
                  <div class="count-percent-audiocall-title">
                    Процент правильных ответов
                  </div>
                  <div class="count-percent-audiocall-count count">${persentRightAudioCall} %</div>
                </div>
                <div class="count-series-audiocall">
                  <div class="count-series-audiocall-title">
                    Самая длинная серия правильных ответов
                  </div>
                  <div class="count-series-audiocall-count count">${await getSeriesTodayAudioCall(statistic)}</div>
                </div>
              </div>
            </div>
            <div class="statistic-games">
              ${await getDayStatistic(statistic, percentRightToday)}
              ${await getAllStatistic(statistic)}
            </div>
          </div>
      </div>
    </div>
    <div><canvas id="myChart"></canvas></div>
  </div>
  `;
  langStatistic(statistic);
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
