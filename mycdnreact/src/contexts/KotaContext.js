// src/contexts/KotaContext.js
import React, { createContext, useContext, useState } from 'react';

const KotaContext = createContext();

export const useKota = () => {
  const context = useContext(KotaContext);

  if (!context) {
    throw new Error("useKota must be used within a KotaProvider");
  }

  return context;
};

export const KotaProvider = ({ children }) => {
  const [kotaBilgileri, setKotaBilgileri] = useState({
    toplamAlan: 1000, 
    kullanilanAlan: 500, 
  });

  const kotaDuzenle = (yeniKotaBilgileri) => {
    setKotaBilgileri(yeniKotaBilgileri);
  };

  return (
    <KotaContext.Provider value={{ kotaBilgileri, kotaDuzenle }}>
      {children}
    </KotaContext.Provider>
  );
};
