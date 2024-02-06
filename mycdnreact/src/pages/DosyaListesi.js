// src/pages/DosyaListesi.js
import React from 'react';
import { useDosya } from '../contexts/DosyaContext';

const DosyaListesi = () => {
  const { userFiles, deleteFile } = useDosya();

  const handleDelete = (fileId) => {
    // Dosya silme işlemi
    deleteFile(fileId);
  };

  return (
    <div>
      <h2>Kullanıcı Dosyaları</h2>
      <ul>
        {userFiles.map((file) => (
          <li key={file.id}>
            Dosya Adı: {file.name}, Boyut: {file.size} KB
            <button onClick={() => handleDelete(file.id)}>Dosyayı Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DosyaListesi;
