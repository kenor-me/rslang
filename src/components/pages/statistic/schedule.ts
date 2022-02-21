import { Chart, registerables } from 'chart.js';
import { Statistic } from '../../types/index';

Chart.register(...registerables);

export const langStatistic = (statistic: Statistic): void => {
  const clone = JSON.parse(JSON.stringify(statistic));
  delete clone.optional.daysStatistic['00'];
  const stats = [...Object.keys(clone.optional.daysStatistic)];
  const labels = stats.map((item) => `${item.slice(0, 2)}-${item.slice(2, 4)}-${item.slice(4, 8)}`);
  const daysStats = [...Object.values(clone.optional.daysStatistic)];
  const learnedWords = daysStats.map((word: any) => word.countNewWordFromAudioCall + word.countNewWordFromSprint);
  const counterGames = daysStats.map((count: any) => count.countAudioCall + count.countSprint);
  let percentRightAnswer = daysStats.map((item: any) => Math.floor(((item.countRightAnswerSprint
    + item.countRightAnswerAudioCall) * 100) / (item.countRightAnswerSprint + item.countRightAnswerAudioCall
      + item.countWrongAnswerAudioCall + item.countWrongAnswerSprint)));
  percentRightAnswer = percentRightAnswer.map((item: any) => ((!item) ? 0 : item));

  const data = {
    labels,
    datasets: [{
      label: 'Количество новых слов',
      backgroundColor: '#00E0C7',
      borderColor: '#00E0C7',
      data: learnedWords,
    },
    {
      label: 'Количество сыгранных игр',
      backgroundColor: 'rgb(255, 99, 112)',
      borderColor: 'rgb(255, 99, 132)',
      data: counterGames,
    },
    {
      label: 'Процент правильных ответов',
      backgroundColor: 'green',
      borderColor: 'green',
      data: percentRightAnswer,
    }],
  };

  const canvas = document.getElementById('myChart') as HTMLCanvasElement;
  canvas.style.width = '80%';
  Chart.defaults.color = 'white';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const myChart = new Chart(canvas, {
    type: 'line',
    data,
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'white',
          },
        },
      },
    },
  });
};
