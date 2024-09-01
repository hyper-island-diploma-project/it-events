import { API_URL } from '../utils/utils';
import checkResponse from './checkResponse';

const BASE_URL = API_URL;

export const getEventList = () => {
  const response = fetch(`${BASE_URL}/api/event`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
  return response;
};

export const getEventById = (id: number) => {
  const response = fetch(`${BASE_URL}/api/event/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
  return response;
};

export const getAllUsersSubscriptions = () => {
  const response = fetch(`${BASE_URL}/api/event-registration`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
  return response;
};
