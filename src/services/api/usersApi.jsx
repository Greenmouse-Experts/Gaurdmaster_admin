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
 export const getStuctors = async(params) => {
   return  axios.get(`/user/instructors`).then((response) => response.data)
} 
export const getStudents = async(params) => {
    return  axios.get(`/user/students`).then((response) => response.data)
 } 
 export const getSingleStudents = async(id) => {
   return  axios.get(`/user/student/${id}`).then((response) => response.data)
} 