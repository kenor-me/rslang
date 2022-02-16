import {
  User, Sign, Token, Word, ContentWord,
} from '../types';

const BASE_URL = 'https://app-english-learn.herokuapp.com';

export const getWordPage = async (part = 0, pageNumber = 0): Promise<Word[]> => {
  const path = `words?group=${part}&page=${pageNumber}`;
  const response = await fetch(`${BASE_URL}/${path}`);
  const wordsOfPage = await response.json();
  return wordsOfPage;
};

// all users word
export const getWordsUser = async (id: string, token: string): Promise<ContentWord[]> => {
  const url = `${BASE_URL}/users/${id}/words`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

// get word by ID
export const getWordById = async (wordId: string): Promise<Word> => {
  const response = await fetch(`${BASE_URL}/words/${wordId}`);
  return response.json();
};
// get word by ID by User
/* export const getWordByIdUserInfo = async (userId:string, token:string, wordId:string):Promise<ContentWord> => {
  const url = `${BASE_URL}/users/${userId}/words/${wordId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}; */

export const addUser = async (user: User): Promise<void> => {
  const err = document.getElementById('registration-error') as HTMLElement;
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await response.json().then((res: User): void => {
    const popup = document.getElementById('popup') as HTMLElement;
    const rightBlock = popup.querySelector('.popup-right-block') as HTMLElement;
    rightBlock.innerHTML = `
      <p class="popup-auth-text">Регистрация прошла успешно</p>
    `;
    localStorage.setItem('userAdd', JSON.stringify(res));
    // setTimeout((): void => {
    //   popup.classList.remove('open');
    // }, 3000);
  }).catch((): void => {
    err.classList.add('visible');
  });
};

export const setStatisticUser = async (id: string, token: string, statistic = {
  learnedWords: 0,
  optional: {
    countSprintAll: 0,
    countAudioCallAll: 0,
    rightAnswerAll: 0,
    wrongAnswerAll: 0,
    seriesSprint: 0,
    seriesAudioCall: 0,
    words: {
      '5testWord': { correct: 0, wrong: 0 },
    },
    daysStatistic: {
      '1testDay': {
        countSprint: 0,
        countNewWordFromSprint: 0,
        countRightAnswerSprint: 0,
        countWrongAnswerSprint: 0,
        countAudioCall: 0,
        countRightAnswerAudioCall: 0,
        countWrongAnswerAudioCall: 0,
        countNewWordFromAudioCall: 0,
        seriesSprintToday: 0,
        seriesAudioCallToday: 0,
      },
    },
  },
}): Promise<void> => {
  const response = await fetch(`${BASE_URL}/users/${id}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
  return response.json();
};

export const signIn = async (user: Sign, first = false): Promise<void> => {
  const err = document.getElementById('signin-error') as HTMLElement;

  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  await response.json().then(async (res: Token): Promise<void> => {
    // const popup = document.getElementById('popup') as HTMLElement;
    // popup.classList.remove('open');
    localStorage.setItem('userAuth', JSON.stringify(res));
    if (first) {
      setStatisticUser(res.userId, res.token);
    }
  }).catch((): void => {
    if (err) {
      err.classList.add('visible');
    }
  });
};

// add word to hard
export const setWordHard = async (userId: string, token: string, word: Word): Promise<void> => {
  const newWord = {
    difficulty: 'hard',
    optional: {},
  };
  await fetch(`${BASE_URL}/users/${userId}/words/${word.id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWord),
  });
};

// update word
export const deleteUserWord = async (userId: string, token: string, wordId: string): Promise<void> => {
  const url = `${BASE_URL}/users/${userId}/words/${wordId}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const setWordLearned = async (userId: string, token: string, wordId: string): Promise<void> => {
  const newWord = {
    difficulty: 'learned',
    optional: {},
  };
  await fetch(`${BASE_URL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWord),
  });
};

export const setWordNew = async (userId: string, token: string, wordId: string): Promise<void> => {
  const newWord = {
    difficulty: 'new',
    optional: {},
  };
  await fetch(`${BASE_URL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWord),
  });
};

export const updateWordUser = async (
  userId: string,
  token: string,
  wordId: string,
  wordParams: string,
): Promise<void> => {
  const newWord = {
    difficulty: wordParams,
    optional: {},
  };
  await fetch(`${BASE_URL}/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWord),
  });
};

// get statistic
export const getStatisticUser = async (id: string, token: string): Promise<any> => {
  const url = `${BASE_URL}/users/${id}/statistics`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
