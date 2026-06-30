import { apiClient } from "./authApi";

export const getCertificates = async () => {
  return apiClient.get(`/certificates/all`).then((response) => response.data);
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
