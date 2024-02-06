// src/services/fileService.js
import axios from 'axios';

const uploadFile = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Dosya yüklenemedi:', error);
  }
};

const deleteFile = async (userId, fileId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/files/${fileId}`);
  } catch (error) {
    throw new Error('Dosya silinemedi:', error);
  }
};

export default { uploadFile, deleteFile };
