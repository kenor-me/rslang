import './style.css';
import { addUser, signIn } from './components/api';
import { renderRegistrationPage, renderRegistrationForm, renderSignInForm } from './components/pages/registration';
import {
  locationResolver, createHeader, createFooter, addDescription, createBurgerMenu,
} from './components/pages/main';

createHeader();
createFooter();
addDescription();
// createBurgerMenu();
renderRegistrationPage();
const popup = document.getElementById('popup') as HTMLElement;

document.querySelector("[data-href='#/']")?.addEventListener('click', () => locationResolver('#/'));
document.querySelector("[data-href='#/textbook']")?.addEventListener('click', () => locationResolver('#/textbook'));
document.querySelector(".menu-item[data-href='#/textbook']")?.addEventListener('click', () => {
  locationResolver('#/textbook');
});
document.querySelector("[data-href='#/games']")?.addEventListener('click', () => locationResolver('#/games'));
document.querySelector(".menu-item[data-href='#/games']")?.addEventListener('click', () => locationResolver('#/games'));
document.querySelector("[data-href='#/login']")?.addEventListener('click', () => {
  locationResolver('#/login');

  popup.classList.add('open');
});
document.querySelector("[data-href='#/statistics']")?.addEventListener('click', () => locationResolver('#/statistics'));
document.querySelector(".menu-item[data-href='#/statistics']")?.addEventListener('click', () => {
  locationResolver('#/statistics');
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
  const rightBlock = popup.querySelector('.popup-right-block') as HTMLElement;
  rightBlock.innerHTML = `${renderRegistrationForm()}`;
  const registrationForm = popup.querySelector('#registration') as HTMLElement;
  popup.classList.add('open');
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
