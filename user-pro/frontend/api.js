import axios from 'axios';

const BASE_URL = "https://your-api-id.execute-api.region.amazonaws.com/prod"; // replace with your API Gateway URL

export const getUsers = async (userId) =>
  axios.get(`${BASE_URL}/users/${userId}`);

export const createUser = async (user) =>
  axios.post(`${BASE_URL}/users`, user);

export const updateUser = async (userId, user) =>
  axios.put(`${BASE_URL}/users/${userId}`, user);

export const deleteUser = async (userId) =>
  axios.delete(`${BASE_URL}/users/${userId}`);
