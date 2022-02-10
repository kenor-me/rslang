import { addUser, signIn } from './components/api/index';
import './style.css';

import { renderRegistrationPage } from './components/pages/registration';
import { createHeader, createFooter } from './components/pages/main';
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
  if (target.classList.contains('mp-login') && !target.classList.contains('exit')) {
    popup.classList.add('open');
  }
  if (target.classList.contains('exit')) {
    localStorage.clear();
    target.classList.remove('exit');
    window.location.reload();
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
    await signIn({ email: newEmail.value, password: newPassword.value }, true);
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
