// DosyaContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import fileService from '../services/fileService'; // Ekledik
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
  const [apiKeys, setApiKeys] = useState([]); // Ekledik
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserFiles(user.id);
      fetchApiKeys(user.id); // Ekledik
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

  const uploadFile = async (userId, file) => {
    try {
      await fileService.uploadFile(userId, file);
      fetchUserFiles(userId);
    } catch (error) {
      console.error('Dosya yüklenemedi:', error);
    }
  };

  const deleteFile = async (userId, fileId) => {
    try {
      await fileService.deleteFile(userId, fileId);
      fetchUserFiles(userId);
    } catch (error) {
      console.error('Dosya silinemedi:', error);
    }
  };

  const createApiKey = async (userId, apiKeyName) => { // Ekledik
    try {
      await fileService.createApiKey(userId, apiKeyName);
      fetchApiKeys(userId);
    } catch (error) {
      console.error('API anahtarı oluşturulamadı:', error);
    }
  };

  const fetchApiKeys = async (userId) => { // Ekledik
    try {
      const keys = await fileService.getApiKeys(userId);
      setApiKeys(keys);
    } catch (error) {
      console.error('API anahtarları alınamadı:', error);
    }
  };

  const deleteApiKey = async (userId, apiKeyId) => { // Ekledik
    try {
      await fileService.deleteApiKey(userId, apiKeyId);
      fetchApiKeys(userId);
    } catch (error) {
      console.error('API anahtarı silinemedi:', error);
    }
  };

  const kullaniciOlustur = async (kullaniciBilgileri) => {
    try {
      const yeniKullanici = await userService.kullaniciOlustur(kullaniciBilgileri);
      fetchUserFiles(yeniKullanici.id);
    } catch (error) {
      console.error('Kullanıcı oluşturulamadı:', error);
    }
  };

  return (
    <DosyaContext.Provider value={{ userFiles, uploadFile, deleteFile, createApiKey, apiKeys, deleteApiKey, fetchUserFiles, kullaniciOlustur }}>
      {children}
    </DosyaContext.Provider>
  );
};
