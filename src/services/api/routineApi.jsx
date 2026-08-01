import axios from "axios";
import { BASE_URL } from "../constant.jsx";
import { getToken } from "../helpers";

// const Base = ENDPOINT.BASE_URL

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = getToken();
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  },
);

export const uploadVideo = async (payload) => {
  return axios
    .post(`/upload/video`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};
export const uploadImage = async (payload) => {
  return axios
    .post(`/upload/image`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const uploadFile = async (payload) => {
  return axios
    .post(`/upload/doc`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const uploadAudio = async (payload) => {
  return axios
    .post(`/upload/audio`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const getNotify = async (params = {}) => {
  const { page = 1, pageSize = 10, orderBy = "createdDate", sortOrder = "DESC" } = params;
  return axios
    .get(`/notifications/admin?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    .then((response) => response.data);
};

export const getReadNotify = async (params = {}) => {
  const { page = 1, pageSize = 10, orderBy = "createdDate", sortOrder = "DESC" } = params;
  return axios
    .get(`/notifications/read?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    .then((response) => response.data);
};

export const getUnreadNotify = async (params = {}) => {
  const { page = 1, pageSize = 10, orderBy = "createdDate", sortOrder = "DESC" } = params;
  return axios
    .get(`/notifications/unread?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    .then((response) => response.data);
};

export const markUserNotify = async (id) => {
  return axios
    .patch(`/notifications/mark-as-read/${id}`)
    .then((response) => response.data);
};

export const markAllNotify = async () => {
  return axios
    .patch(`/notifications/mark-all-as-read`)
    .then((response) => response.data);
};

export const getTestimonials = async (route, page) => {
  return axios.get(`${route}?page=${page}`).then((response) => response.data);
};

export const updateTestimonial = async (id, payload) => {
  return axios
    .patch(`/testimonials/change-availability/${id}`, payload)
    .then((response) => response.data);
};

export const deleteTestimonial = async (id) => {
  return axios.delete(`/testimonials/${id}`).then((response) => response.data);
};
