import { apiClient } from "./authApi";

export const getCertificates = async () => {
  return apiClient.get(`/certificates/all`).then((response) => response.data);
};

export const getStudentCertificates = async (studentId: string) => {
  return apiClient
    .get(`/certificates/student/${studentId}`)
    .then((response) => response.data);
};

export const getCertificateTemplates = async () => {
  return apiClient
    .get(`/certificates/templates/list`)
    .then((response) => response.data);
};

export const updateCertificate = async (
  id: string,
  payload: {
    certificateUrl: string;
    templateId: string;
    certificateNumber: string;
  },
) => {
  return apiClient
    .patch(`/certificates/${id}`, payload)
    .then((response) => response.data);
};

export const revokeCertificate = async (id: string) => {
  return apiClient
    .patch(`/certificates/${id}/revoke`)
    .then((response) => response.data);
};

export const deleteCertificate = async (id: string) => {
  return apiClient
    .delete(`/certificates/${id}`)
    .then((response) => response.data);
};

export const setDefaultTemplate = async (id: string) => {
  return apiClient
    .patch(`/certificates/templates/${id}/set-default`)
    .then((response) => response.data);
};

export const deleteTemplate = async (id: string) => {
  return apiClient
    .delete(`/certificates/templates/${id}`)
    .then((response) => response.data);
};

export const uploadTemplate = async (payload: FormData) => {
  return apiClient
    .post(`/certificates/templates`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};
