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
  optional: Record<string, unknown>,
};

export type Settings = {
  part: number;
  page: number;
};

export type WordResult = {
  audio: string,
  word: string,
  transcription: string,
  translate: string,
};
