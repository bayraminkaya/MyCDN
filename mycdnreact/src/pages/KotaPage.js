// src/pages/KotaPage.js
import React from 'react';
import { useKota } from '../contexts/KotaContext';

const KotaPage = () => {
  const { kotaBilgileri } = useKota();

  return (
    <div>
      <h1>Kota Sayfası</h1>
      <p>Toplam Alan: {kotaBilgileri.toplamAlan} KB</p>
      <p>Kullanılan Alan: {kotaBilgileri.kullanilanAlan} KB</p>
    </div>
  );
};

export default KotaPage;
