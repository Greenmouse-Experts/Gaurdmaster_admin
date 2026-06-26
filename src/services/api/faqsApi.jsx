import axios from "axios";
import { BASE_URL } from "../constant.Jsx";

axios.defaults.baseURL = BASE_URL;

export const getFaqs = async () => {
  return axios.get(`/faqs`).then((response) => response.data);
};

export const createFaq = async (payload) => {
  return axios.post(`/faqs/`, payload).then((response) => response.data);
};

export const updateFaq = async (id, payload) => {
  return axios.patch(`/faqs/${id}`, payload).then((response) => response.data);
};

export const deleteFaq = async (id) => {
  return axios.delete(`/faqs/${id}`).then((response) => response.data);
};

export const publishFaq = async (id, payload) => {
  return axios
    .patch(`/faqs/publish/${id}`, payload)
    .then((response) => response.data);
};
