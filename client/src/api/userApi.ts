import { API_URL } from '../utils/utils';
import checkResponse from './checkResponse';

export const BASE_URL = API_URL;

// export const register = (
//   first_name: string,
//   last_name: string,
//   email: string,
//   password: string,
//   job_title: string,
//   workplace: string,
//   experience: string,
//   image: string,
// ) => {
//   return fetch(`${BASE_URL}/api/user/registration`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       first_name,
//       last_name,
//       email,
//       password,
//       job_title,
//       workplace,
//       experience,
//       image,
//     }),
//   }).then(checkResponse);
// };

export const register = (formData: FormData) => {
  return fetch(`${BASE_URL}/api/user/registration`, {
    method: 'POST',
    body: formData,
  }).then(checkResponse);
};


export const login = (email: string, password: string) => {
  return fetch(`${BASE_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        return data;
      }
    });
};

export const check = (token: string) => {
  return fetch(`${BASE_URL}/api/user/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data)
    .catch((error) => {
      console.error('Error during token check:', error);
      throw error;
    });
};
