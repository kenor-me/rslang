import './style.css';
import './components/pages/main/index.css';
import { renderRegistrationPage } from './components/pages/registration';
import {
  locationResolver, createHeader, createFooter, addDescription, createBurgerMenu,
} from './components/pages/main';

renderRegistrationPage();
createHeader();
createFooter();
addDescription();
createBurgerMenu();

document.querySelector('header')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('mp-home')) locationResolver('#/');
  if (target.classList.contains('mp-textbook')) locationResolver('#/textbook');
  if (target.classList.contains('mp-games')) locationResolver('#/games');
  if (target.classList.contains('mp-login')) locationResolver('#/login');
  if (target.classList.contains('mp-statistics')) locationResolver('#/statistics');
});

document.querySelector('.menubox')?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.href === '#/textbook') locationResolver('#/textbook');
  if (target.dataset.href === '#/games') locationResolver('#/games');
  if (target.dataset.href === '#/statistics') locationResolver('#/statistics');
});
