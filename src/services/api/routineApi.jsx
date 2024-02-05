import axios from "axios";
import { BASE_URL } from "../constant.Jsx";
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
    //     localStorage.clear()
    //   return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export const uploadFile = async(payload) => {
    return  axios.post(`/upload/image`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => response.data)
 } 
 export const uploadImage = async(payload) => {
    return  axios.post(`/upload/image`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => response.data)
 } 