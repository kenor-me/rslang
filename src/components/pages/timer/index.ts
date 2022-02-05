import './index.css';

export const getTimer = (): string => `
  <div class="timer-wrapper">
    <div class="timer">
      <div class="timer__line"></div>
      <div class="timer__body">
        <div class="timer__counter">
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
        </div>
      </div>
    </div>
  </div>
`;
