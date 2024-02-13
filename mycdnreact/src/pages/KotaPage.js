import React from 'react';
import { useKota } from '../contexts/KotaContext';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const KotaPage = () => {
  const { kotaBilgileri } = useKota();

  return (
    <Card
      title={<Title level={4} style={{ color: '#000' }}>Kota Alanı</Title>}
      bordered={false}
      style={{ maxWidth: 300, minWidth:400,margin: 'auto', marginTop: 20, backgroundColor: '#D3D3D3', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <p >Toplam Alan: {kotaBilgileri.toplamAlan} KB</p>
      <p >Kullanılan Alan: {kotaBilgileri.kullanilanAlan} KB</p>
    </Card>
  );
};

export default KotaPage;
