import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/links',
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
const baseURL = instance.defaults.baseURL;

export const getAllLinks = async () => {
  const response = await instance.get(baseURL);
  return response.data
}

export const getOneLink = async (id) => {
  const response = await instance.get(`${baseURL}/${id}`);
  return response.data
}

export const createLink = async (formData) => {
  const response = await instance.post(baseURL, formData);
  return response.data;
}

export const createLinkAutomated = async (formData) => {
  const response = await instance.post(`${baseURL}/automated`, formData, { timeout: 10000 });
  return response.data;
}

export const updateLink = async (id, formData) => {
  const response = await instance.put(`${baseURL}/${id}`, formData);
  return response.data;
};

export const deleteLink = async (id) => {
  const response = await instance.delete(`${baseURL}/${id}`);
  return response.data;
};