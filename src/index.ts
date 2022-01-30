import './style.css';
import './components/pages/main/index.css';
import { renderRegistrationPage } from './components/pages/registration';
import {
  locationResolver, createHeader, createFooter, addDescription,
} from './components/pages/main';

renderRegistrationPage();
createHeader();
createFooter();
addDescription();

document.querySelector("[data-href='#/']")?.addEventListener('click', () => locationResolver('#/'));
document.querySelector("[data-href='#/textbook']")?.addEventListener('click', () => locationResolver('#/textbook'));
document.querySelector("[data-href='#/games']")?.addEventListener('click', () => locationResolver('#/games'));
document.querySelector("[data-href='#/login']")?.addEventListener('click', () => locationResolver('#/login'));
