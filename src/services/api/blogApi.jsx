import axios from "axios";
import { BASE_URL } from "../constant.Jsx";

axios.defaults.baseURL = BASE_URL;

export const getBlogTags = async () => {
  return axios.get(`/blog/fetch-tags`).then((response) => response.data);
};

export const createBlogTag = async (payload) => {
  return axios
    .post(`/blog/create-tag`, payload)
    .then((response) => response.data);
};

export const updateBlogTag = async (id, payload) => {
  return axios
    .patch(`/blog/update-tag/${id}`, payload)
    .then((response) => response.data);
};

export const deleteBlogTag = async (id) => {
  return axios
    .delete(`/blog/remove-tag/${id}`)
    .then((response) => response.data);
};

export const getBlogPost = async () => {
  return axios.get(`/blog/fetch-posts`).then((response) => response.data);
};

export const getSinglePost = async (id) => {
  return axios.get(`/blog/fetch-post/${id}`).then((response) => response.data);
};

export const createBlogpost = async (payload) => {
  return axios
    .post(`/blog/create-post`, payload)
    .then((response) => response.data);
};

export const updateBlogPost = async (id, payload) => {
  return axios
    .patch(`/blog/update-post/${id}`, payload)
    .then((response) => response.data);
};

export const deleteBlogPost = async (id) => {
  return axios
    .delete(`/blog/remove-post/${id}`)
    .then((response) => response.data);
};

export const addBlogPostTag = async (id) => {
  return axios
  .patch(`/blog/remove-post-tag/${id}`)
  .then((response) => response.data);
}
export const removeBlogPostTag = async (id, payload) => {
  return axios
  .patch(`/blog/remove-post-tag/${id}`, payload)
  .then((response) => response.data);
}
