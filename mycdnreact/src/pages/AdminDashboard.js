// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import KotaPage from './KotaPage';
import { useKota } from '../contexts/KotaContext';
import { useUser } from '../contexts/UserContext';

const AdminDashboard = () => {
  const { kotaDuzenle } = useKota();
  const user = useUser();

  const [formValues, setFormValues] = useState({
    toplamAlan: '',
    kullanilanAlan: '',
  });

  // Eğer kotaDuzenle undefined ise, uygun bir kontrol
  if (!kotaDuzenle) {
   
    return <div>Hata: Kota düzenleme işlevi bulunamadı.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleKotaDuzenle = () => {
    if (user && user.role === 'admin') {
      // Sadece admin rolüne sahip kullanıcılar kota düzenleme işlemi yapabilir
      const yeniKotaBilgileri = {
        toplamAlan: parseInt(formValues.toplamAlan),
        kullanilanAlan: parseInt(formValues.kullanilanAlan),
      };

      kotaDuzenle(yeniKotaBilgileri);
      setFormValues({
        toplamAlan: '',
        kullanilanAlan: '',
      });
    } else {

      alert('Yetkiniz yok!');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <KotaPage />
      <h2>Kota Bilgilerini Düzenle</h2>
      <label>
        Toplam Alan (KB):
        <input
          type="number"
          name="toplamAlan"
          value={formValues.toplamAlan}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Kullanılan Alan (KB):
        <input
          type="number"
          name="kullanilanAlan"
          value={formValues.kullanilanAlan}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleKotaDuzenle}>Kota Bilgilerini Düzenle</button>
    </div>
  );
};

export default AdminDashboard;
