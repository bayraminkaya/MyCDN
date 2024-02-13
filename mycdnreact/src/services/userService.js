// services/userService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://localhost:7148';

const userService = {
  // Kullanıcı listesini getir
  getUserList: async () => {
    try {
      console.log("API Endpoint:", API_BASE_URL);
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kullanıcı bilgilerini getir
  getUserInfo: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kullanıcı rollerini getir
  getUserRoles: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/roles`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserFiles: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/files`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kullanıcı kotalarını getir
  getUserQuotas: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/quotas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kullanıcı kotalarını güncelle
  updateUserQuotas: async (userId, quotas) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${userId}/quotas`, quotas);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Yeni kullanıcı oluştur
  kullaniciOlustur: async (kullaniciBilgileri) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/kullaniciOlustur`, kullaniciBilgileri);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
