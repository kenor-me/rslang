import {
  User, Sign, Token, Word, ContentWord, Statistic,
} from '../types';

const BASE_URL = 'https://app-english-learn.herokuapp.com';

const getNewToken = async (id: string, refreshToken: string): Promise<void> => {
  const url = `${BASE_URL}/users/${id}/tokens`;
  await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json()).then((result) => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
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
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const { refreshToken } = userAuth;
    await getNewToken(id, refreshToken);
    const tokenNew = userAuth.token;
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
  optional: {},
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
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const { refreshToken } = userAuth;
    await getNewToken(id, refreshToken);
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

export const signIn = async (user: Sign): Promise<void> => {
  const err = document.getElementById('signin-error') as HTMLElement;

  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  await response.json().then((res: Token): void => {
    // const popup = document.getElementById('popup') as HTMLElement;
    // popup.classList.remove('open');
    setStatisticUser(res.userId, res.token);
    localStorage.setItem('userAuth', JSON.stringify(res));
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
  }).catch(async () => {
    // !new token
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const { refreshToken } = userAuth;
    await getNewToken(userId, refreshToken);
    const tokenNew = userAuth.token;

    await fetch(`${BASE_URL}/users/${userId}/words/${word.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWord),
    });
  });
};

// update word
export const deleteUserWord = async (userId: string, token: string, word: Word): Promise<void> => {
  const url = `${BASE_URL}/users/${userId}/words/${word.id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch(async () => {
    // !new token
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const { refreshToken } = userAuth;
    await getNewToken(userId, refreshToken);
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

export const setWordLearned = async (userId: string, token: string, word: Word): Promise<void> => {
  const newWord = {
    difficulty: 'learned',
    optional: {},
  };
  await fetch(`${BASE_URL}/users/${userId}/words/${word.id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWord),
  }).catch(async () => {
    // !new token
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const { refreshToken } = userAuth;
    await getNewToken(userId, refreshToken);
    const tokenNew = userAuth.token;

    await fetch(`${BASE_URL}/users/${userId}/words/${word.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenNew}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWord),
    });
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
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string);
    const { refreshToken } = userAuth;
    await getNewToken(id, refreshToken);
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
