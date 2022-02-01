import { User, Sign, Token, Word } from '../types';

const BASE_URL = 'https://app-english-learn.herokuapp.com';

export const getWordPage = async (part: number, pageNumber: number): Promise<Word[]> => {
  const path = `words?group=${part}&page=${pageNumber}`;
  const response = await fetch(`${BASE_URL}/${path}`);
  const wordsOfPage = await response.json();
  return wordsOfPage;
}

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
    setTimeout((): void => {
      popup.classList.remove('open');
    }, 3000);
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
    const popup = document.getElementById('popup') as HTMLElement;
    popup.classList.remove('open');
    localStorage.setItem('userAuth', JSON.stringify(res));
  }).catch((): void => {
    if (err) {
      err.classList.add('visible');
    }
  });
};
