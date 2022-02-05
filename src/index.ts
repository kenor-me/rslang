import './style.css';
import { addUser, signIn } from './components/api';
import { renderRegistrationPage } from './components/pages/registration';

import {
  createHeader, createFooter,
} from './components/pages/main';
import Vocabulury from './components/pages/vocabulary';
import { locationResolver } from './components/routing';
import { Token } from './components/types';

export const userAut: Token = JSON.parse(localStorage.getItem('userAuth') as string);
let userName = '';
if (userAut) userName = userAut.name;

createHeader(!!userAut, userName);
createFooter();
renderRegistrationPage();

window.addEventListener('hashchange', () => {
  locationResolver(window.location.hash);
});

const popup = document.getElementById('popup') as HTMLElement;
const exitBtn = document.querySelector('.login') as HTMLElement;
if (userAut) exitBtn.classList.add('exit');

document.querySelector('header')?.addEventListener('click', (e: Event): void => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('mp-home')) {
    locationResolver('#/');
  }
  if (target.classList.contains('mp-textbook') || target.dataset.href === '#/textbook') {
    locationResolver('#/textbook');
    (document.querySelector('#root') as HTMLElement).innerHTML = '';
    const vocabulury = new Vocabulury((document.querySelector('#root') as HTMLElement));
  }
  if (target.classList.contains('mp-games')) locationResolver('#/games');
  if (target.classList.contains('mp-login')) {
    popup.classList.add('open');
  }
  if (target.classList.contains('mp-statistics')) locationResolver('#/statistics');
});

document.querySelector('.menubox')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.href === '#/textbook') {
    locationResolver('#/textbook');
    (document.querySelector('#root') as HTMLElement).innerHTML = '';
    const vocabulury = new Vocabulury((document.querySelector('#root') as HTMLElement));
  }
  if (target.dataset.href === '#/games') locationResolver('#/games');
  if (target.dataset.href === '#/statistics') locationResolver('#/statistics');
  if (target.dataset.href === '#/about') {
    locationResolver('#/about');
    createAdvantagesAboutUs();
    if (target.classList.contains('mp-login') && !target.classList.contains('exit')) {
      popup.classList.add('open');
    }
    if (target.classList.contains('exit')) {
      localStorage.clear();
      target.classList.remove('exit');
      window.location.reload();
    }
  }
});

// !createNewUser listener
const createNewUser = async (e: Event): Promise<void> => {
  e.preventDefault();
  const newName = popup.querySelector('#new_user_name') as HTMLInputElement;
  const newEmail = popup.querySelector('#new_user_email') as HTMLInputElement;
  const newPassword = popup.querySelector('#new_user_password') as HTMLInputElement;
  const user = {
    name: newName.value,
    email: newEmail.value,
    password: newPassword.value,
  };

  await addUser(user);
  // setTimeout((): void => {
  //   signIn({ email: newEmail.value, password: newPassword.value });
  // }, 4000);
  if (JSON.parse(localStorage.getItem('userAdd') as string)) {
    await signIn({ email: newEmail.value, password: newPassword.value });
  }
  if (JSON.parse(localStorage.getItem('userAuth') as string)) {
    exitBtn.classList.add('exit');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

const link = popup.querySelector('.link-block__link') as HTMLElement;
link.addEventListener('click', () => {
  const registrationForm = popup.querySelector('#registration') as HTMLElement;
  const signInForm = popup.querySelector('#signIn') as HTMLElement;
  registrationForm.style.display = 'block';
  signInForm.style.display = 'none';
  registrationForm.addEventListener('submit', createNewUser);
});

// !sighInForm listener
const sighInForm = popup.querySelector('#signIn') as HTMLElement;

const authUser = async (e: Event): Promise<void> => {
  e.preventDefault();
  const email = popup.querySelector('#user_email') as HTMLInputElement;
  const password = popup.querySelector('#user_password') as HTMLInputElement;
  const user = {
    email: email.value,
    password: password.value,
  };
  await signIn(user);
  if (JSON.parse(localStorage.getItem('userAuth') as string)) {
    exitBtn.classList.add('exit');
    window.location.reload();
  }
};

sighInForm.addEventListener('submit', authUser);
function createAdvantagesAboutUs() {
  throw new Error('Function not implemented.');
}
