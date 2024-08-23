import { API_URL } from '../utils/utils';
import checkResponse from './checkResponse';
import UserEventModel from '../models/UserEventModel';

export const BASE_URL = API_URL;

export const fetchAllUserEvent = (userId: number, token: string) => {
  const response = fetch(`${BASE_URL}/api/event-registration/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return response;
};

export const registerEvent = (data: UserEventModel, token: string) => {
  return fetch(`${BASE_URL}/api/event-registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const unregisterEvent = (id:number, token: string) => {
  return fetch(`${BASE_URL}/api/event-registration/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  }).then(checkResponse);
};
