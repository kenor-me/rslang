import { renderAdvantagesAboutUs } from '../pages/about-us';
import { renderGamesPage } from '../pages/games-main';
import { renderLevelsGamePage, sprintDescription, audioDescription } from '../pages/levels-games';
import { renderDescription } from '../pages/main';
import { renderStatisticPage } from '../pages/statistic';
import { mountedVocabulary } from '../pages/vocabulary';

const root = document.querySelector('#root') as HTMLElement;
export const locationResolver = (location: string): void => {
  switch (location) {
    case '#textbook':
      mountedVocabulary();
      break;
    case '#games':
      root.innerHTML = 'Мини-игры';
      renderGamesPage();
      break;
    case '#statistics':
      root.innerHTML = 'Статистика';
      renderStatisticPage();
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
