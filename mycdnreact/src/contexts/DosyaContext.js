// src/contexts/DosyaContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import { useUser } from './UserContext'; 

const DosyaContext = createContext();

export const useDosya = () => {
  const context = useContext(DosyaContext);
  if (!context) {
    throw new Error('useDosya must be used within a DosyaProvider');
  }
  return context;
};

export const DosyaProvider = ({ children }) => {
  const [userFiles, setUserFiles] = useState([]);
  const { user } = useUser(); 

  useEffect(() => {
    if (user) {
      fetchUserFiles(user.id);
    }
  }, [user]);

  const fetchUserFiles = async (userId) => {
    try {
      const files = await userService.getUserFiles(userId);
      setUserFiles(files);
    } catch (error) {
      console.error('Dosya listesi alınamadı:', error);
    }
  };

  const uploadFile = async (file) => {
    try {
      await userService.uploadFile(user.id, file);
      fetchUserFiles(user.id);
    } catch (error) {
      console.error('Dosya yüklenemedi:', error);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await userService.deleteFile(user.id, fileId);
      fetchUserFiles(user.id);
    } catch (error) {
      console.error('Dosya silinemedi:', error);
    }
  };

  return (
    <DosyaContext.Provider value={{ userFiles, uploadFile, deleteFile, fetchUserFiles }}>
      {children}
    </DosyaContext.Provider>
  );
};
