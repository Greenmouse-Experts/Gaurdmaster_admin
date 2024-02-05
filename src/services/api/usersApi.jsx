import axios from "axios";
import { BASE_URL } from "../constant.Jsx";

axios.defaults.baseURL = BASE_URL;

export const createSubadmin = async(payload) => {
    return  axios.post(`/user/admin/create`, payload).then((response) => response.data)
 } 
 export const createInstructor = async(payload) => {
    return  axios.post(`/user/instructor/create`, payload).then((response) => response.data)
 } 
 export const getAdmins = async(params) => {
    return  axios.get(`/user/subadmins`).then((response) => response.data)
 } 
export const getClients = async(params) => {
    return  axios.get(`/user/clients`).then((response) => response.data)
 } 