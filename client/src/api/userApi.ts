import { API_URL } from '../utils/utils';
// import checkResponse from './checkResponse';

export const BASE_URL = API_URL;

// export const register = (
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
// ) => {
//   return fetch(`${BASE_URL}/v1/users`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ firstName, lastName, email, password }),
//   }).then(checkResponse);
// };

// export const login = (email: string, password: string) => {
//   return fetch(`${BASE_URL}/v1/users/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then(checkResponse)
//     .then((data) => {
//       if (data.token) {
//         return data;
//       }
//     });
// };

// export const check = (token: string) => {
//   return fetch(`${BASE_URL}/v1/users/token/verify`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(checkResponse)
//     .then((data) => data);
// };

// export const editProfile = (firstName: string, email: string, jwt: string | null) => {
//   return fetch(`${BASE_URL}/v1/users/:id`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${jwt}`,
//     },
//     body: JSON.stringify({firstName, email})
//   })
//     .then(checkResponse)
// };
