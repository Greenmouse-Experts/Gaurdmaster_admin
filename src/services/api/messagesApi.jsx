import { apiClient } from "./authApi";

export const getMessages = async () => {
  return apiClient.get(`/contact-me`).then((response) => response.data);
};

export const markMessageAsRead = async (id) => {
  return apiClient
    .patch(`/contact-me/${id}/read`)
    .then((response) => response.data);
};
