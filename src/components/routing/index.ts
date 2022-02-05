import { renderAdvantagesAboutUs } from '../pages/about-us';
import { renderGamesPage } from '../pages/games-main';
import { renderDescription } from '../pages/main';
import { renderStatisticPage, renderBaseStatisticPage } from '../pages/statistic';
import { getTimer } from '../pages/timer';
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
      if (localStorage.getItem('userAuth')) {
        renderStatisticPage();
      } else renderBaseStatisticPage();
      break;
    case '#about':
      renderAdvantagesAboutUs();
      break;
    case '#savannah':
      root.innerHTML = `${getTimer()}`;
      setTimeout(() => {
        root.innerHTML = 'Спринт';
      }, 4500);
      break;
    case '#audiocall':
      root.innerHTML = `${getTimer()}`;
      setTimeout(() => {
        root.innerHTML = 'Аудиовызов';
      }, 4500);
      break;
    default:
      renderDescription();
      break;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  locationResolver(window.location.hash);
});
