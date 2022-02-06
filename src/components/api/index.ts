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
export const getWordsUser = async (id: string, token: string):Promise<ContentWord[]> => {
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
export const getWordById = async (wordId:string):Promise<Word> => {
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
    localStorage.setItem('userAuth', JSON.stringify(res));
  }).catch((): void => {
    if (err) {
      err.classList.add('visible');
    }
  });
};

// add word to hard
export const setWordHard = async (userId:string, token:string, word:Word):Promise<void> => {
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
export const deleteUserWord = async (userId:string, token:string, word:Word):Promise<void> => {
  const url = `${BASE_URL}/users/${userId}/words/${word.id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
