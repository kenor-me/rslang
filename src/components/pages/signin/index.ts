export const renderSignInPage = (): void => {
  const root = document.getElementById('root') as HTMLElement;
  root.innerHTML = `
    <div id="popup" class="popup-signIn">
      <div class="popup-signIn__body">
        <div class="popup-signIn__content">
          <h3>Войти</h3>
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
              <div class="form__btn-block">
                <button class="btn-block__signin" type="submit">Войти</button>
                <button class="btn btn-block__link">Регистрация</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const link = document.querySelector('.btn-block__link');
  link?.addEventListener('click', () => {
    // const form = document.querySelector('.popup-signIn__body') as HTMLElement;
    // form.innerHTML = `${renderRegistrationForm()}`;
  });
};
