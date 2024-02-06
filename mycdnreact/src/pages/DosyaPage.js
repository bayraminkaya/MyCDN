// src/pages/DosyaPage.js
import React, { useState } from 'react';
import { useDosya } from '../contexts/DosyaContext';

const DosyaPage = () => {
  const { userFiles, uploadFile, deleteFile } = useDosya();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      uploadFile(file);
      setFile(null);
    }
  };

  const handleDelete = (fileId) => {
    deleteFile(fileId);
  };

  return (
    <div>
      <h2>Dosya Yönetimi</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Dosya Yükle</button>
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

export default DosyaPage;
