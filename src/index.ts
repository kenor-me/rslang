import './style.css';
import { addUser, signIn } from './components/api';
import { renderRegistrationPage } from './components/pages/registration';
import {
  locationResolver, createHeader, createFooter, addDescription, createBurgerMenu,
} from './components/pages/main';
import { mountedVocabulary } from './components/pages/vocabulary';

createHeader();
createFooter();
addDescription();
createBurgerMenu();
renderRegistrationPage();
const popup = document.getElementById('popup') as HTMLElement;

document.querySelector('header')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('mp-home')) locationResolver('#/');
  if (target.classList.contains('mp-textbook')) locationResolver('#/textbook');
  if (target.classList.contains('mp-games')) locationResolver('#/games');
  if (target.classList.contains('mp-login')) {
    locationResolver('#/login');
    popup.classList.add('open');
  }
  if (target.classList.contains('mp-statistics')) locationResolver('#/statistics');
});

document.querySelector('.menubox')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.href === '#/textbook') locationResolver('#/textbook');
  if (target.dataset.href === '#/games') locationResolver('#/games');
  if (target.dataset.href === '#/statistics') locationResolver('#/statistics');
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
  setTimeout((): void => {
    signIn({ email: newEmail.value, password: newPassword.value });
  }, 4000);
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
};

sighInForm.addEventListener('submit', authUser);
