/* eslint-disable max-len */
import {
  getStatisticUser, getWordsUser, setStatisticUser, setWordNew, updateWordUser,
} from '../../api';
import { Statistic, WordResult } from '../../types';

export const getToday = (): string => {
  const dateTodayObj = new Date();
  const year = dateTodayObj.getFullYear();
  const month = dateTodayObj.getMonth() + 1 < 10 ? `0${dateTodayObj.getMonth() + 1}` : dateTodayObj.getMonth() + 1;
  const day = dateTodayObj.getDate() < 10 ? `0${dateTodayObj.getDate()}` : dateTodayObj.getDate();
  return `${day}${month}${year}`;
};

export const saveCountGameToday = async (nameGame: string, statistic: Statistic, countNewWordFromSprint = 0,
  countNewWordFromAudioCall = 0, right: number, wrong: number, longestSeries: number): Promise<Statistic> => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    if (nameGame === 'sprint') {
      statistic.optional.daysStatistic[today].countSprint++;
      statistic.optional.daysStatistic[today].countRightAnswerSprint += right;
      statistic.optional.daysStatistic[today].countWrongAnswerSprint += wrong;
      statistic.optional.daysStatistic[today].countNewWordFromSprint += countNewWordFromSprint;
      statistic.optional.daysStatistic[today].seriesSprintToday = (statistic.optional.daysStatistic[today].seriesSprintToday
        > longestSeries) ? statistic.optional.daysStatistic[today].seriesSprintToday : longestSeries;
    } else {
      statistic.optional.daysStatistic[today].countAudioCall++;
      statistic.optional.daysStatistic[today].countRightAnswerAudioCall += right;
      statistic.optional.daysStatistic[today].countWrongAnswerAudioCall += wrong;
      statistic.optional.daysStatistic[today].countNewWordFromAudioCall += countNewWordFromAudioCall;
      statistic.optional.daysStatistic[today].seriesAudioCallToday = (statistic.optional.daysStatistic[today].seriesAudioCallToday
        > longestSeries)
        ? statistic.optional.daysStatistic[today].seriesAudioCallToday : longestSeries;
    }
    statistic.optional.countGamesAll++;
  } else if (!statistic.optional.daysStatistic[today] && nameGame === 'sprint') {
    statistic.optional.daysStatistic[today] = {
      countSprint: 1,
      countNewWordFromSprint: right + wrong,
      countRightAnswerSprint: right,
      countWrongAnswerSprint: wrong,
      countAudioCall: 0,
      countRightAnswerAudioCall: 0,
      countWrongAnswerAudioCall: 0,
      countNewWordFromAudioCall: 0,
      seriesSprintToday: longestSeries,
      seriesAudioCallToday: 0,
    };
    statistic.optional.countGamesAll++;
  } else if (!statistic.optional.daysStatistic[today] && nameGame === 'audioCall') {
    statistic.optional.daysStatistic[today] = {
      countSprint: 0,
      countNewWordFromSprint: 0,
      countRightAnswerSprint: 0,
      countWrongAnswerSprint: 0,
      countAudioCall: 1,
      countRightAnswerAudioCall: right,
      countWrongAnswerAudioCall: wrong,
      countNewWordFromAudioCall: right + wrong,
      seriesSprintToday: 0,
      seriesAudioCallToday: longestSeries,
    };
    statistic.optional.countGamesAll++;
  }
  statistic.optional.rightAnswerAll += right;
  statistic.optional.wrongAnswerAll += wrong;
  return statistic;
};

export const saveStatistic = async (right: WordResult[], wrong: WordResult[], nameGame: string, longestSeries: number): Promise<void> => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
  let counterNewWordSprint = 0;
  let counterNewWordAudioCall = 0;
  // if (userAuth) {
  const userWords = await getWordsUser(userAuth.userId);
  // console.log(userWords);

  const statistic = await getStatisticUser(userAuth.userId);
  // console.log(statistic);

  right.forEach(async (word) => {
    let incl = false;
    for (let i = 0; i < userWords.length; i++) {
      if (userWords[i].wordId === word.id) {
        incl = true;
        break;
      }
    }

    if (incl === false) {
      if (nameGame === 'sprint') {
        counterNewWordSprint++;
      } else {
        counterNewWordAudioCall++;
      }
      await setWordNew(userAuth.userId, word.id);
    }
    if (statistic.optional.words[word.id]) {
      statistic.optional.words[word.id].correct++;
      if (statistic.optional.words[word.id].correct >= 3) {
        const params = 'learned';
        await updateWordUser(userAuth.userId, word.id, params);
        statistic.learnedWords++;
      }
    } else {
      statistic.optional.words[word.id] = { correct: 1, wrong: 0 };
    }
  });

  wrong.forEach(async (word) => {
    let incl = false;
    for (let i = 0; i < userWords.length; i++) {
      if (userWords[i].wordId === word.id) {
        incl = true;
        break;
      }
    }

    if (incl === false) {
      if (nameGame === 'sprint') {
        counterNewWordSprint++;
      } else { counterNewWordAudioCall++; }
      await setWordNew(userAuth.userId, word.id);
    }
    if (statistic.optional.words[word.id]) {
      statistic.optional.words[word.id].wrong++;
      statistic.optional.words[word.id].correct = 0;
    } else {
      statistic.optional.words[word.id] = { correct: 0, wrong: 1 };
    }
  });
  if (nameGame === 'sprint') {
    saveCountGameToday('sprint', statistic, counterNewWordSprint, counterNewWordAudioCall,
      right.length, wrong.length, longestSeries);
    if (statistic.optional.seriesSprint < longestSeries) {
      statistic.optional.seriesSprint = longestSeries;
    }
  } else {
    saveCountGameToday('audioCall', statistic, counterNewWordSprint, counterNewWordAudioCall, right.length, wrong.length, longestSeries);
    if (statistic.optional.seriesAudioCall < longestSeries) {
      statistic.optional.seriesAudioCall = longestSeries;
    }
  }
  delete statistic.id;

  await setStatisticUser(userAuth.userId, userAuth.token, statistic);
};
