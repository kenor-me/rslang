import './style.css';
import { renderRegistrationPage, renderRegistrationForm } from './components/pages/registration';
import { addUser, signIn } from './components/api';

renderRegistrationPage();

const popup = document.getElementById('popup') as HTMLElement;

const sighInForm = popup.querySelector('#signIn') as HTMLElement;

const authUser = async (e: Event): Promise<void> => {
  e.preventDefault();

  const email = popup.querySelector('#user_email') as HTMLInputElement;
  const password = popup.querySelector('#user_password') as HTMLInputElement;
  const user = {
    email: email.value,
    password: password.value,
  };
  console.log(user);
  await signIn(user);
};

if (sighInForm) {
  sighInForm.addEventListener('submit', authUser);
}
const link = popup.querySelector('.btn-block__link');

link?.addEventListener('click', () => {
  const form = popup.querySelector('.popup-signIn__body') as HTMLElement;
  form.innerHTML = `${renderRegistrationForm()}`;
  const registrationForm = popup.querySelector('#registration') as HTMLElement;
  const createNewUser = async (e: Event): Promise<void> => {
    e.preventDefault();
    console.log('click');
    const newName = popup.querySelector('#new_user_name') as HTMLInputElement;
    const newEmail = popup.querySelector('#new_user_email') as HTMLInputElement;
    const newPassword = popup.querySelector('#new_user_password') as HTMLInputElement;
    const user = {
      name: newName.value,
      email: newEmail.value,
      password: newPassword.value,
    };
    console.log(user);

    await addUser(user);
    await signIn({ email: newEmail.value, password: newPassword.value });

    newName.value = '';
    newEmail.value = '';
    newPassword.value = '';
  };

  if (registrationForm) {
    console.log(registrationForm);
    registrationForm.addEventListener('submit', createNewUser);
  }
});
