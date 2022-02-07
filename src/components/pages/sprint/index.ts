/* eslint-disable max-len */
import './index.css';

const root = document.getElementById('root') as HTMLElement;

export const renderFullscreenOpen = (): string => `
  <svg class="sprint__fullscreen-open" xmlns="http://www.w3.org/2000/svg"
  width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M31.48 31.6299H23.05V35.8599H35.7001V23.1499H31.48V31.6299Z" />
    <path d="M4.22 23.1499H0V35.8599H12.65V31.6299H4.22V23.1499Z" />
    <path d="M0 12.71H4.22V4.24H12.65V0H0V12.71Z" />
    <path d="M23.05 0V4.24H31.48V12.71H35.7001V0H23.05Z" />
  </svg>
`;

export const renderCloseSVG = (): string => `
  <svg class="sprint__close" viewBox="0 0 24 24" focusable="false">
    <path fill="FFFFFF"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z">
    </path>
  </svg>
`;

const renderFullscreenClose = (): string => `
  <svg class="sprint__fullscreen-close"
  xmlns="http://www.w3.org/2000/svg" width="36"
      height="36" viewBox="0 0 36 36" fill="none">
    <path d="M28.2554 7.74495H35.9764V12.8119H23.1874V0.0229492H28.2544V7.74395L28.2554
    7.74495ZM23.1884 35.976V23.1869H35.9774V28.2539H28.2564V35.9749H23.1894L23.1884 35.976ZM7.74544
    7.74495V0.0239492H12.8124V12.8129H0.0234375V7.74595H7.74444L7.74544
    7.74495ZM0.0244375 28.2549V23.1879H12.8134V35.977H7.74644V28.2559H0.0254375L0.0244375 28.2549Z" fill="#FFFFFF">
  </svg>
`;

const renderResultForm = () => {
  root.innerHTML = `
  <div class="sprint-wrapper">
    <div class="sprint__inf-block">
      <div class="sprint__btn-block-top">
        ${renderFullscreenOpen()}
        <a href="#games">${renderCloseSVG()}</a>
      </div>
      <div class="sprint-text-block">
        <p class="sprint__title">РЕЗУЛЬТАТ</p>
      </div>
    </div>
  </div>
`;
};

const toggleFullScreen = () => {
  const fullscreen = document.querySelector('.fullscreen') as HTMLElement;
  const wrapper = document.querySelector('.sprint-wrapper') as HTMLElement;

  fullscreen.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('sprint__fullscreen-open')) {
      fullscreen.innerHTML = `${renderFullscreenClose()}`;
    }
    if (target.classList.contains('sprint__fullscreen-close')) {
      fullscreen.innerHTML = `${renderFullscreenOpen()}`;
    }

    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen();
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });
};

const getSeconds = () => {
  let seconds = 60;
  const second = document.querySelector('.sprint__seconds') as HTMLElement;
  setTimeout(function run() {
    second.innerHTML = `${seconds - 1}`;
    if (seconds > 1) {
      setTimeout(run, 1000);
      seconds -= 1;
    } else {
      renderResultForm();
    }
  }, 1000);
};

export const renderSprintPage = (): void => {
  root.innerHTML = `
  <div class="sprint-wrapper">
    <div class="sprint__inf-block">
      <div class="sprint__btn-block-top">
        <div class="fullscreen">
          ${renderFullscreenOpen()}
        </div>
        <a href="#games">${renderCloseSVG()}</a>
      </div>
      <div class="sprint__timer">
        <div class="sprint__timer-line"></div>
        <div class="sprint__timer-body">
          <div class="sprint__timer-counter">
            <span class="sprint__seconds">60</span>
          </div>
        </div>
      </div>
      <div class="sprint-text-block">
        <p class="sprint__title">environment</p>
        <p class="sprint__subtitle">окружающая обстановка</p>
      </div>
      <div class="sprint__btn-block">
        <div class="sprint__btn sprint__left">Верно</div>
        <div class="sprint__btn sprint__right">Неверно</div>
      </div>
    </div>
  </div>
`;

  toggleFullScreen();
  getSeconds();
};
