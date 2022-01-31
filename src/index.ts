import './style.css';
import './components/pages/main/index.css';
import { renderRegistrationPage } from './components/pages/registration';
import {
  locationResolver, createHeader, createFooter, addDescription, createBurgerMenu,
} from './components/pages/main';
import { mountedVocabulary } from './components/pages/vocabulary';

renderRegistrationPage();
createHeader();
createFooter();
addDescription();
createBurgerMenu();

document.querySelector("[data-href='#/']")?.addEventListener('click', () => locationResolver('#/'));
document.querySelector("[data-href='#/textbook']")?.addEventListener('click', () => {
  locationResolver('#/textbook');
  mountedVocabulary();
});
document.querySelector(".menu-item[data-href='#/textbook']")?.addEventListener('click', () => {
  locationResolver('#/textbook');
  mountedVocabulary();
});
document.querySelector("[data-href='#/games']")?.addEventListener('click', () => locationResolver('#/games'));
document.querySelector(".menu-item[data-href='#/games']")?.addEventListener('click', () => locationResolver('#/games'));
document.querySelector("[data-href='#/login']")?.addEventListener('click', () => locationResolver('#/login'));
document.querySelector("[data-href='#/statistics']")?.addEventListener('click', () => locationResolver('#/statistics'));
document.querySelector(".menu-item[data-href='#/statistics']")?.addEventListener('click', () => {
  locationResolver('#/statistics');
});
