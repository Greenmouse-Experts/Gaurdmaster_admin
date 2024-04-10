import axios from "axios";
import { BASE_URL } from "../constant.Jsx";

axios.defaults.baseURL = BASE_URL;

export const getPayments = async (type, page) => {
  return axios
    .get(`/orders/access-ordered-items?status=${type}&page=${page}`)
    .then((response) => response.data);
};

export const getOnePayment = async (id) => {
  return axios
    .get(`/orders/access-item-details/${id}`)
    .then((response) => response.data);
};
