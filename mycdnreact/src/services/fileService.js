import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://localhost:7148';

const fileService = {
  uploadFile: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE_URL}/api/users/${userId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Dosya yüklenemedi:', error);
    }
  },

  deleteFile: async (userId, fileId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${userId}/files/${fileId}`);
    } catch (error) {
      throw new Error('Dosya silinemedi:', error);
    }
  },

  createApiKey: async (userId, apiKeyName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/${userId}/apiKeys`, { name: apiKeyName });
      return response.data;
    } catch (error) {
      throw new Error('API anahtarı oluşturulamadı:', error);
    }
  },

  getApiKeys: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/apiKeys`);
      return response.data;
    } catch (error) {
      throw new Error('API anahtarları alınamadı:', error);
    }
  },

  deleteApiKey: async (userId, apiKeyId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${userId}/apiKeys/${apiKeyId}`);
    } catch (error) {
      throw new Error('API anahtarı silinemedi:', error);
    }
  },
};

export default fileService;
