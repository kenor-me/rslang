import { Statistic } from './../../types/index';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export const langStatistic = (statistic:any) => {
  const stats = [...Object.keys(statistic.optional.daysStatistic)]
  const labels = stats.map((item) => `${item.slice(0,2)}-${item.slice(2,4)}-${item.slice(4,8)}`)
  let learnedWords = [...Object.values(statistic.optional.daysStatistic)];
  learnedWords =  learnedWords.map((word:any)=> word.countNewWordFromAudioCall + word.countNewWordFromSprint  )
  let counterGames = [...Object.values(statistic.optional.daysStatistic)];
  counterGames = counterGames.map((count:any)=> count.countAudioCall + count.countSprint)

  let percentRightAnswer = [...Object.values(statistic.optional.daysStatistic)];
  percentRightAnswer = percentRightAnswer.map((item:any) => Math.floor((item.countRightAnswerSprint + item.countRightAnswerAudioCall) * 100 /
  (item.countRightAnswerSprint + item.countRightAnswerAudioCall + item.countWrongAnswerAudioCall + item.countWrongAnswerSprint)));
  percentRightAnswer =  percentRightAnswer.map((item) => item = (!item) ? 0: item)

  const data = {
    labels: labels,
    datasets: [  {
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
    },]
  };

  const canvas = document.getElementById('myChart')as HTMLCanvasElement;
  canvas.style.width = '80%';
  Chart.defaults.color = 'white';
  const myChart = new Chart(canvas, {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
            display: true,
            labels: {
                color: 'white'
            }
        }
      }
  }
});

}
