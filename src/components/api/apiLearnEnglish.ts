// /* eslint-disable @typescript-eslint/no-useless-constructor */

// import { INewUser } from '../interfaces/INewUser';
// import { IWord } from '../interfaces/IWord';

// export class ApiLearnEnglish {
//   baseUrl = 'https://app-english-learn.herokuapp.com';

//   constructor() {
//     /*  this.modal.setMessage('Server unavailable, please try again later...'); */
//   }

//   async getWordPage(part: number, pageNumber: number): Promise<IWord[] | undefined> {
//     const path = `words?group=${part}&page=${pageNumber}`;
//     const response: Response = await fetch(`${this.baseUrl}/${path}`);
//     const wordsOfPage: IWord[] = await response!.json();
//     return wordsOfPage;
//   }

//   async getUser(part: number, pageNumber: number): Promise<IWord[] | undefined> {
//     const path = `words?group=${part}&page=${pageNumber}`;
//     const response: Response = await fetch(`${this.baseUrl}/${path}`);
//     const wordsOfPage: IWord[] = await response!.json();
//     return wordsOfPage;
//   }

//   async createUser(user: INewUser): Promise<void> {
//     try {
//       const rawResponse = await fetch(`${this.baseUrl}/users`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
//       const content = await rawResponse.json();
//       // если пользователь авторизовался, сохранять его данные в LS
//       } catch {
//       // какое-нибудь оповещение для пользователя, что он не зарестрирован
//       // если получаем ошибку 417, то такой пользователь уже зарегистрирован
//     }
//   }
// }
