import { renderAdvantagesAboutUs } from '../pages/about-us';
import { renderGamesPage } from '../pages/games-main';
import { renderLevelsGamePage, sprintDescription, audioDescription } from '../pages/levels-games';
import { renderDescription } from '../pages/main';
import { renderStatisticPage, renderBaseStatisticPage } from '../pages/statistic';
import { getTimer } from '../pages/timer';
import { renderVocabulary } from '../pages/vocabulary';

const root = document.querySelector('#root') as HTMLElement;
export const locationResolver = (location: string): void => {
  switch (location) {
    case '#textbook':
      root.innerHTML = '';
      renderVocabulary();
      break;
    case '#games':
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
    case '#sprint-description':
      renderLevelsGamePage(sprintDescription, '#sprint');
      break;
    case '#audiocall-description':
      renderLevelsGamePage(audioDescription, '#audiocall');
      break;
    case '#sprint':
      root.innerHTML = `${getTimer()}`;
      break;
    case '#audiocall':
      root.innerHTML = `${getTimer()}`;
      break;
    default:
      renderDescription();
      break;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  locationResolver(window.location.hash);

  const locationArr: string[] = window.location.href.split('#');
  if (window.location.hash === '#sprint') {
    locationArr[1] = '#sprint-description';
    window.history.replaceState({}, document.title, window.location.href = locationArr.join(''));
    locationResolver('#sprint-description');
  }
  if (window.location.hash === '#audiocall') {
    locationArr[1] = '#audiocall-description';
    window.history.replaceState({}, document.title, window.location.href = locationArr.join(''));
    locationResolver('#audiocall-description');
  }
});
