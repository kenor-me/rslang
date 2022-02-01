export type Word = {
  'word': 'string',
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
