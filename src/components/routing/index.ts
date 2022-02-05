/* eslint-disable import/no-cycle */
import { renderAdvantagesAboutUs } from '../pages/about-us';
import { renderGamesPage } from '../pages/games-main';
import { renderLevelsGamePage, sprintDescription, audioDescription } from '../pages/levels-games';
import { renderDescription } from '../pages/main';
import { renderStatisticPage, renderBaseStatisticPage } from '../pages/statistic';
import Vocabulury from '../pages/vocabulary/index';

const root = document.querySelector('#root') as HTMLElement;
export const locationResolver = (location: string): void => {
  switch (location) {
    case '#textbook':
      root.innerHTML = '';
      const vocabulury = new Vocabulury(root);
      break;
    case '#games':
      root.innerHTML = 'Мини-игры';
      renderGamesPage();
      break;
    case '#statistics':
      if (localStorage.getItem('userAuth')) {
        renderStatisticPage();
      } else renderBaseStatisticPage();
      break;
    case '#about':
      renderAdvantagesAboutUs();
      break;
    case '#savannah':
      renderLevelsGamePage(sprintDescription);
      break;
    case '#audiocall':
      renderLevelsGamePage(audioDescription);
      break;
    default:
      renderDescription();
      break;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  locationResolver(window.location.hash);
});
