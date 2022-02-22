/* eslint-disable max-len */
import {
  getStatisticUser, getWordByIdUserInfo, getWordsUser, setStatisticUser, setWordNew, updateWordUser,
} from '../../api';
import { Statistic, WordResult } from '../../types';

export const getToday = (): string => {
  const dateTodayObj = new Date();
  const year = dateTodayObj.getFullYear();
  const month = dateTodayObj.getMonth() + 1 < 10 ? `0${dateTodayObj.getMonth() + 1}` : dateTodayObj.getMonth() + 1;
  const day = dateTodayObj.getDate() < 10 ? `0${dateTodayObj.getDate()}` : dateTodayObj.getDate();
  return `${day}${month}${year}`;
};

export const saveCountGameToday = (nameGame: string, statistic: Statistic, countNewWordFromSprint = 0,
  countNewWordFromAudioCall = 0, right: number, wrong: number, longestSeries: number): Statistic => {
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
    statistic.optional.countSprintAll++;
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
    statistic.optional.countSprintAll++;
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
    statistic.optional.countAudioCallAll++;
  }
  statistic.optional.rightAnswerAll += right;
  statistic.optional.wrongAnswerAll += wrong;
  return statistic;
};

export const saveStatictic = async (right: WordResult[], wrong: WordResult[], nameGame: string, longestSeries: number): Promise<void> => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
  let counterNewWordSprint = 0;
  let counterNewWordAudioCall = 0;
  if (userAuth) {
    const userWords = await getWordsUser(userAuth.userId, userAuth.token);
    let statistic = await getStatisticUser(userAuth.userId, userAuth.token);
    right.forEach(async (word) => {
      if ((userWords.filter((wordItem) => wordItem.wordId === word.id)).length === 0) {
        if (nameGame === 'sprint') {
          counterNewWordSprint++;
        } else {
          counterNewWordAudioCall++;
        }
        const newWord = {
          difficulty: 'new',
          optional: {
            correct: 1,
            wrong: 0,
          },
        };
        await setWordNew(userAuth.userId, userAuth.token, word.id, newWord);
      } else {
        const wordUser = await getWordByIdUserInfo(userAuth.userId, userAuth.token, word.id);
        wordUser.optional.correct++;
        if (wordUser.optional.correct >= 3) {
          wordUser.difficulty = 'learned';
          statistic.learnedWords++;
        }
        const wordObj = {
          difficulty: wordUser.difficulty,
          optional: wordUser.optional,
        };
        await updateWordUser(userAuth.userId, userAuth.token, word.id, wordObj);
      }
    });
    wrong.forEach(async (word) => {
      if ((userWords.filter((wordItem) => wordItem.wordId === word.id)).length === 0) {
        if (nameGame === 'sprint') {
          counterNewWordSprint++;
        } else {
          counterNewWordAudioCall++;
        }
        const wordObj = {
          difficulty: 'new',
          optional: {
            correct: 0,
            wrong: 1,
          },
        };
        await setWordNew(userAuth.userId, userAuth.token, word.id, wordObj);
      } else {
        const wordUser = await getWordByIdUserInfo(userAuth.userId, userAuth.token, word.id);
        wordUser.optional.wrong++;
        wordUser.optional.correct = 0;
        wordUser.difficulty = 'new';
        const wordObj = {
          difficulty: wordUser.difficulty,
          optional: wordUser.optional,
        };
        await updateWordUser(userAuth.userId, userAuth.token, word.id, wordObj);
      }
    });
    if (nameGame === 'sprint') {
      statistic = saveCountGameToday('sprint', statistic, counterNewWordSprint, counterNewWordAudioCall,
        right.length, wrong.length, longestSeries);
      if (statistic.optional.seriesSprint < longestSeries) {
        statistic.optional.seriesSprint = longestSeries;
      }
    } else {
      statistic = saveCountGameToday('audioCall', statistic, counterNewWordSprint, counterNewWordAudioCall, right.length, wrong.length, longestSeries);
      if (statistic.optional.seriesAudioCall < longestSeries) {
        statistic.optional.seriesAudioCall = longestSeries;
      }
    }
    delete statistic.id;
    await setStatisticUser(userAuth.userId, userAuth.token, statistic);
  }
};
