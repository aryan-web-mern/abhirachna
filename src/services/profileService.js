import axios from "../api/axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const updatingFormData = async (formData) => {
  try {
    const response = await axios.put(API_ROUTES.UPDATE_FORM_DATA, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllLeadsData = async (pageNo, limit) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_LEADS_DATA}?page=${pageNo}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSingleLeadData = async (leadId) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.SINGLE_LEAD_DATA}?leadId=${leadId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLeadFolders = async (leadId) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_LEAD_FOLDERS}/${leadId}`,
      {
        baseURL: "https://chat.abhirachnaa.com/api/v1",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFolderFiles = async (leadId, folderId) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_FOLDER_FILES}/${leadId}/folder/${folderId}`,
      {
        baseURL: "https://chat.abhirachnaa.com/api/v1",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLeadLinks = async (leadId) => {
  try {
    const response = await axios.get(`${API_ROUTES.GET_LEAD_LINKS}/${leadId}`, {
      baseURL: "https://chat.abhirachnaa.com/api/v1",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLeadImages = async (leadId) => {
  try {
    const response = await axios.get(
      `${API_ROUTES.GET_LEAD_IMAGES}/${leadId}`,
      {
        baseURL: "https://chat.abhirachnaa.com/api/v1",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
