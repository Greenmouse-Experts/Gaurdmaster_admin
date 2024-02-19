import axios from "axios";
import { BASE_URL } from "../constant.Jsx";

axios.defaults.baseURL = BASE_URL;

export const createProgram = async(payload) => {
    return  axios.post(`/programs/create`, payload).then((response) => response.data)
 } 
 export const updateProgram = async(id, payload) => {
   return  axios.patch(`/programs/${id}`, payload).then((response) => response.data)
} 

export const deleteProgram = async(id) => {
   return  axios.delete(`/programs/${id}`).then((response) => response.data)
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

 export const getSingleCourse = async(id) => {
   return  axios.get(`/courses/${id}`).then((response) => response.data)
} 

 export const updateCourse = async(id, payload) => {
   return  axios.patch(`/courses/${id}`, payload).then((response) => response.data)
} 

export const deleteCourse = async(id) => {
   return  axios.delete(`/courses/${id}`).then((response) => response.data)
} 

export const getCourseContent = async(id) => {
   return  axios.get(`/course-content/by-course/${id}`).then((response) => response.data)
}

export const createCourseContent = async(payload) => {
   return  axios.post(`/course-content/create`, payload).then((response) => response.data)
}

export const updateCourseContent = async(id, payload) => {
   return axios.patch(`/course-content-sub/${id}`, payload).then((response) => response.data)
}

export const createSubContent = async(payload) => {
   return  axios.post(`/course-content-sub/create`, payload).then((response) => response.data)
}

export const viewSubContent = async(id) => {
   return axios.get(`/course-content-sub/by-course-content/${id}`).then((response) => response.data)
}

export const updateSubContent = async(id, payload) => {
   return axios.patch(`/course-content-sub/${id}`, payload).then((response) => response.data)
}

export const viewSingleSubContent = async(id) => {
   return axios.get(`/course-content-sub/${id}`).then((response) => response.data)
}