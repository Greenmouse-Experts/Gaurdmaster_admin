import axios from "axios";
import { BASE_URL } from "../constant.Jsx";
import useAuthStore from "../../store/userStore";

axios.defaults.baseURL = BASE_URL;
export const createProgram = async (payload) => {
  return axios
    .post(`/programs/create`, payload)
    .then((response) => response.data);
};
export const updateProgram = async (id, payload) => {
  return axios
    .patch(`/programs/${id}`, payload)
    .then((response) => response.data);
};

export const deleteProgram = async (id) => {
  return axios.delete(`/programs/${id}`).then((response) => response.data);
};
export const createCourse = async (payload) => {
  return axios
    .post(`/courses/create`, payload)
    .then((response) => response.data);
};
export const getPrograms = async () => {
  return axios.get(`/programs`).then((response) => response.data);
};
export const getCourses = async (payload, route) => {
  return axios
    .get(`/${route}?page=${payload}`)
    .then((response) => response.data);
};

export const getSingleCourse = async (id) => {
  return axios.get(`/courses/${id}`).then((response) => response.data);
};

export const updateCourse = async (id, payload) => {
  return axios
    .patch(`/courses/${id}`, payload)
    .then((response) => response.data);
};

export const deleteCourse = async (id) => {
  return axios.delete(`/courses/${id}`).then((response) => response.data);
};

export const getCourseContent = async (id) => {
  return axios
    .get(`/course-content/by-course/${id}`)
    .then((response) => response.data);
};

export const createCourseContent = async (payload) => {
  return axios
    .post(`/course-content/create`, payload)
    .then((response) => response.data);
};

export const updateCourseContent = async (id, payload) => {
  return axios
    .patch(`/course-content-sub/${id}`, payload)
    .then((response) => response.data);
};

export const deleteCourseContent = async (id) => {
  return axios
    .delete(`/course-content/${id}`)
    .then((response) => response.data);
};

export const createSubContent = async (payload) => {
  return axios
    .post(`/course-content-sub/create`, payload)
    .then((response) => response.data);
};

export const viewSubContent = async (id) => {
  return axios
    .get(`/course-content-sub/by-course-content/${id}`)
    .then((response) => response.data);
};

export const updateSubContent = async (id, payload) => {
  return axios
    .patch(`/course-content-sub/${id}`, payload)
    .then((response) => response.data);
};

export const viewSingleSubContent = async (id) => {
  return axios
    .get(`/course-content-sub/${id}`)
    .then((response) => response.data);
};

export const getAssessmentQuestions = async (id) => {
  return axios
    .get(`/assessments/fetch-questions/${id}`)
    .then((response) => response.data);
};

export const createQuestion = async (payload) => {
  return axios.post(`/assessments/add-question`, payload).then((response) => response.data)
}
export const editQuestion = async (id, payload) => {
  return axios.patch(`/assessments/question/${id}`, payload).then((response) => response.data)
}

export const deleteQuestion = async (id) => {
  return axios.delete(`/assessments/question/${id}`).then((response) => response.data)
}

export const getCourseReviews = async (id) => {
  return axios
    .get(`/reviews/view-course-reviews/${id}`)
    .then((response) => response.data);
};

export const muteCourseReview = async (id) => {
  return axios.post(`/reviews/mute-course-review/${id}`).then((response) => response.data)
}

export const unmuteCourseReview = async (id) => {
  return axios.post(`/reviews/unmute-course-review/${id}`).then((response) => response.data)
}


