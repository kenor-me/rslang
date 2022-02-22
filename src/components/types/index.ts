export type Word = {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type Sign = {
  email: string;
  password: string;
};

export type Token = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type ContentWord = {
  difficulty: 'string',
  id: string,
  wordId: string,
  optional: {
    correctAnswer: number
  }
};

export type Settings = {
  part: number;
  page: number;
};

export type WordResult = {
  id: string,
  audio: string,
  word: string,
  transcription: string,
  translate: string,
};

export interface Statistic {
  id?: string,
  learnedWords: number,
  optional: {
    countGamesAll: number,
    rightAnswerAll: number,
    seriesAudioCall: number,
    seriesSprint: number,
    wrongAnswerAll: number
    words: StatisticWord,
    daysStatistic: StatisticDay,
  }
}

type StatisticWord = {
  '5testWord': { correct: number, wrong: number },
  [key: string]: { correct: number, wrong: number }
};
type StatisticDay = {
  '00': {
    countSprint: number,
    countNewWordFromSprint: number,
    countRightAnswerSprint: number,
    countWrongAnswerSprint: number,
    countAudioCall: number,
    countRightAnswerAudioCall: number,
    countWrongAnswerAudioCall: number,
    countNewWordFromAudioCall: number,
    seriesSprintToday: number,
    seriesAudioCallToday: number,
  },
  [key: string]: {
    countAudioCall: number,
    countNewWordFromAudioCall: number,
    countNewWordFromSprint: number,
    countRightAnswerAudioCall: number,
    countRightAnswerSprint: number,
    countSprint: number,
    countWrongAnswerAudioCall: number,
    countWrongAnswerSprint: number,
    seriesAudioCallToday: number,
    seriesSprintToday: number,
  }
};

export type WordsArray = {
  wordsArr: Word[];
};

export type UserAnswers = {
  audiocallRight: WordResult[];
  audiocallWrong: WordResult[];
  seriesRightAnswer: string;
};
