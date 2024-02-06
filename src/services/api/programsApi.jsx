import axios from "axios";
import { BASE_URL } from "../constant.Jsx";

axios.defaults.baseURL = BASE_URL;

export const createProgram = async(payload) => {
    return  axios.post(`/programs/create`, payload).then((response) => response.data)
 } 
 export const createCourse = async(payload) => {
    return  axios.post(`/courses/create`, payload).then((response) => response.data)
 } 
 export const getPrograms = async() => {
    return  axios.get(`/programs`).then((response) => response.data)
 } 
 export const getCourses = async(payload) => {
    return  axios.get(`/courses`, payload).then((response) => response.data)
 } 