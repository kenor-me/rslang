import { User, Sign, Token } from '../types';

const BASE_URL = 'https://app-english-learn.herokuapp.com';

export const addUser = async (user: User): Promise<void> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  localStorage.setItem('user', JSON.stringify(result));
};

export const signIn = async (user: Sign): Promise<Token> => {
  const err = document.getElementById('signin-error') as HTMLElement;

  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json().catch((): void => {
    err.classList.add('visible');
  });
  console.log(result);
  return result;
};
