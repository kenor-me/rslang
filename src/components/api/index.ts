import {
  User, Sign, Token, Word, ContentWord, Statistic, WordToUpdate,
} from '../types';

const BASE_URL = 'https://app-english-learn.herokuapp.com';

const getNewToken = async (id: string): Promise<void> => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
  const { refreshToken } = userAuth;
  const url = `${BASE_URL}/users/${id}/tokens`;
  await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 401 || response.status === 403) {
      const button = document.querySelector('.login ') as HTMLElement;
      button.classList.remove('exit');
      localStorage.clear();
      window.location.reload();
    }
    return response.json();
  }).then((result): void => {
    userAuth.token = result.token;
    userAuth.refreshToken = result.refreshToken;
    localStorage.setItem('userAuth', JSON.stringify(userAuth));
  });
};

export const getWordPage = async (part = 0, pageNumber = 0): Promise<Word[]> => {
  const path = `words?group=${part}&page=${pageNumber}`;
  const response = await fetch(`${BASE_URL}/${path}`);
  const wordsOfPage = await response.json();
  return wordsOfPage;
};

// all users word
export const getWordsUser = async (id: string, token: string): Promise<ContentWord[]> => {
  const url = `${BASE_URL}/users/${id}/words`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch {
    // !new token
    await getNewToken(id);
    const newUserAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const tokenNew = newUserAuth.token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
};

// get word by ID
export const getWordById = async (wordId: string): Promise<Word> => {
  const response = await fetch(`${BASE_URL}/words/${wordId}`);
  return response.json();
};
// get word by ID by User
export const getWordByIdUserInfo = async (userId:string, token:string, wordId:string):Promise<ContentWord> => {
  const url = `${BASE_URL}/users/${userId}/words/${wordId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

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
      '00': {
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
  try {
    const response = await fetch(`${BASE_URL}/users/${id}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistic),
    });
    return await response.json();
  } catch {
    // !new token
    await getNewToken(id);
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const tokenNew = userAuth.token;

    const response = await fetch(`${BASE_URL}/users/${id}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistic),
    });
    return response.json();
  }
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

// update word
export const deleteUserWord = async (userId: string, token: string, wordId: string): Promise<void> => {
  const url = `${BASE_URL}/users/${userId}/words/${wordId}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch(async (): Promise<void> => {
    // !new token
    await getNewToken(userId);
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const tokenNew = userAuth.token;

    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        'Content-Type': 'application/json',
      },
    });
  });
};

export const setWordNew = async (userId: string, token: string, wordId:string, wordObject:any): Promise<void> => {
  await fetch(`${BASE_URL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordObject),
  }).catch(async (): Promise<void> => {
    // !new token
    await getNewToken(userId);
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const tokenNew = userAuth.token;

    await fetch(`${BASE_URL}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordObject),
    });
  });
};

export const updateWordUser = async (
  userId: string,
  token: string,
  wordId: string,
  newWord: WordToUpdate,
): Promise<void> => {
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
export const getStatisticUser = async (id: string, token: string): Promise<Statistic> => {
  const url = `${BASE_URL}/users/${id}/statistics`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch {
    // !new token
    await getNewToken(id);
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const tokenNew = userAuth.token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
};
