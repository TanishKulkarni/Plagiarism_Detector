import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

export const addReferenceText = async (text) => {
  return axios.post(`${API_BASE_URL}/add_reference`, { text });
};

export const checkPlagiarism = async (input_text) => {
  return axios.post(`${API_BASE_URL}/check_plagiarism`, { input_text });
};

export const clearReferences = async () => {
  return axios.post(`${API_BASE_URL}/clear_references`);
};
