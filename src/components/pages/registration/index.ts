import './index.css';

const renderCloseImg = () => `
    <svg class="popup__close"
      xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 13.5858L21.3639 7.22183L22.7782 8.63604L16.4142 15L22.7782 21.364L21.3639 22.7782L15
          16.4142L8.63602 22.7782L7.22181 21.364L13.5858 15L7.22181 8.63604L8.63602 7.22183L15 13.5858Z"
          fill="#81869C">
        </path>
    </svg>
`;

export const renderRegistrationForm = (): string => `
    <form id="registration" class="form registration-form" method="post">
      <div class="form__input-block">
        <div class="input-block__wrapper">
          <label for="user_name">Имя пользователя</label>
          <input
            type="text"
            name="name"
            id="new_user_name"
            minlength="6"
            autocomplete="off"
            required
          >
        </div>
        <div class="input-block__wrapper">
          <label for="user_email">Email</label>
          <input
            type="email"
            name="email"
            id="new_user_email"
            autocomplete="off"
            required
          >
        </div>
        <div class="input-block__wrapper">
          <label for="user_password">Пароль</label>
          <input
            type="password"
            name="password"
            id="new_user_password"
            minlength="6"
            autocomplete="off"
            required
          >
          <span id="registration-error" class="error-text">Пользователь с таким Email уже существует,
          авторизуйтесь</span>
        </div>
      </div>
      <button class="btn-block__registration" type="submit">Регистрация</button>
    </form>
  `;

export const renderSignInForm = (): string => `
<form id="signIn" class="form registration-form" method="post">
    <div class="form__input-block">
      <div class="input-block__wrapper">
        <label for="user_email">Email</label>
        <input
          type="email"
          name="email"
          id="user_email"
          autocomplete="off"
          required
        >
      </div>
      <div class="input-block__wrapper">
        <label for="user_password">Пароль</label>
        <input
          type="password"
          name="password"
          id="user_password"
          minlength="6"
          autocomplete="off"
          required
        >
        <span id="signin-error" class="error-text">Не верный E-mail или пароль</span>
      </div>
    </div>
    <button class="btn-block__signin" type="submit">Войти</button>
    <div class="form__link-block">
      <p>У вас нет профиля?</p>
      <a class="btn link-block__link">Регистрация</a>
    </div>
</form>
`;

export const renderRegistrationPage = (): void => {
  const popupBody = document.createElement('div');
  popupBody.classList.add('popup-signIn');
  popupBody.id = 'popup';
  popupBody.innerHTML = `
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup-left-block">
            <h2>Welcome!</h2>
            <p>Изучать слова удобнее, если у вас есть профиль</p>
          </div>
          <div class="popup-right-block">
            ${renderCloseImg()}
            ${renderSignInForm()}
            ${renderRegistrationForm()}
          </div>
        </div>
      </div>
  `;
  document.body.appendChild(popupBody);

  const popup = document.getElementById('popup') as HTMLElement;
  popup.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const registrationForm = document.getElementById('registration') as HTMLElement;
    const signForm = document.getElementById('signIn') as HTMLElement;
    if (!target.closest('.popup__content')) {
      popup.classList.remove('open');
      registrationForm.style.display = 'none';
      signForm.style.display = 'block';
    }
    if (target.closest('.popup__close')) {
      popup.classList.remove('open');
      registrationForm.style.display = 'none';
      signForm.style.display = 'block';
    }
  });
};
