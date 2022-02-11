import {
  getStatisticUser, getWordsUser, setStatisticUser, setWordNew, updateWordUser,
} from '../../api';
import { WordResult } from '../../types';

export const getToday = ():string => {
  const dateTodayObj = new Date();
  const year = dateTodayObj.getFullYear();
  const month = dateTodayObj.getMonth() + 1 < 10 ? `0${dateTodayObj.getMonth() + 1}` : dateTodayObj.getMonth() + 1;
  const day = dateTodayObj.getDate() < 10 ? `0${dateTodayObj.getDate()}` : dateTodayObj.getDate();
  return `${day}${month}${year}`;
};

export const saveCountGameToday = (nameGame:string, statistic: any, countNewWordFromSprint = 0,
  countNewWordFromAudioCall = 0):any => {
  const today = getToday();
  if (statistic.optional.daysStatistic[today]) {
    if (nameGame === 'sprint') {
      statistic.optional.daysStatistic[today].countSprint++;
    } else {
      statistic.optional.daysStatistic[today].countAudioCall++;
    }
    statistic.optional.daysStatistic[today].countNewWordFromSprint += countNewWordFromSprint;
    statistic.optional.daysStatistic[today].countNewWordFromAudioCall += countNewWordFromAudioCall;
  } else if (nameGame === 'sprint') {
    statistic.optional.daysStatistic[today] = {
      countSprint: 1,
      countAudioCall: 0,
      countNewWordFromSprint,
      countNewWordFromAudioCall,
    };
  } else {
    statistic.optional.daysStatistic[today] = {
      countSprint: 0,
      countAudioCall: 1,
      countNewWordFromSprint,
      countNewWordFromAudioCall,
    };
  }
  if (nameGame === 'sprint') {
    statistic.optional.countSprintAll++;
  } else {
    statistic.optional.countAudioCallAll++;
  }

  return statistic;
};

export const saveStatictic = async (right: WordResult[], wrong: WordResult[], nameGame:string): Promise<void> => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
  let counterNewWordSprint = 0;
  let counterNewWordAudioCall = 0;
  if (userAuth) {
    const userWords = await getWordsUser(userAuth.userId, userAuth.token);
    const statistic = await getStatisticUser(userAuth.userId, userAuth.token);
    right.forEach(async (word) => {
      if ((userWords.filter((wordItem) => wordItem.wordId === word.id)).length === 0) {
        if (nameGame === 'sprint') {
          counterNewWordSprint++;
        } else {
          counterNewWordAudioCall++;
        }

        await setWordNew(userAuth.userId, userAuth.token, word.id);
      }
      if (statistic.optional.words[word.id]) {
        if (statistic.optional.words[word.id].correct >= 5) {
          statistic.optional.words[word.id].wrong = 0;
          statistic.optional.words[word.id].correct++;
          const params = 'learned';
          await updateWordUser(userAuth.userId, userAuth.token, word.id, params);
        }
      } else {
        statistic.optional.words[word.id] = { correct: 1, wrong: 0 };
      }
    });
    wrong.forEach(async (word) => {
      if ((userWords.filter((wordItem) => wordItem.wordId === word.id)).length === 0) {
        if (nameGame === 'sprint') {
          counterNewWordSprint++;
        } else { counterNewWordAudioCall++; }

        await setWordNew(userAuth.userId, userAuth.token, word.id);
      }
      if (statistic.optional.words[word.id]) {
        statistic.optional.words[word.id].wrong++;
        statistic.optional.words[word.id].correct = 0;
      } else {
        statistic.optional.words[word.id] = { correct: 0, wrong: 1 };
      }
    });
    if (nameGame === 'sprint') {
      saveCountGameToday('sprint', statistic, counterNewWordSprint, counterNewWordAudioCall);
    } else { saveCountGameToday('audioCall', statistic, counterNewWordSprint, counterNewWordAudioCall); }

    delete statistic.id;
    await setStatisticUser(userAuth.userId, userAuth.token, statistic);
  }
};
