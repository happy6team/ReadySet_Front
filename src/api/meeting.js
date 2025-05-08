import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const uploadAudioFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${BASE_URL}/meeting/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return res.data;
};

export const summarizeAudio = async (fileId) => {
  const res = await axios.post(`${BASE_URL}/meeting/summarize/${fileId}`);
  return res.data;
};

export const summarizeText = async (text) => {
    const formData = new FormData();
    formData.append('text', text);
  
    const res = await axios.post(`${BASE_URL}/meeting/summarize`, formData); // headers 제거
    return res.data;
  };
  
