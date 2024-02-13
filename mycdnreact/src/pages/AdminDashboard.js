import React from 'react';
import KotaPage from './KotaPage';
import { useKota } from '../contexts/KotaContext';
import { useUser } from '../contexts/UserContext';
import { useDosya } from '../contexts/DosyaContext'; // DosyaContext ekleyin
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminDashboard = () => {
  const { kotaDuzenle } = useKota();
  const user = useUser();
  const { kullaniciOlustur } = useDosya(); // DosyaContext'ten kullaniciOlustur'u ekleyin

  const [form] = Form.useForm();

  // Eğer kotaDuzenle undefined ise, uygun bir kontrol
  if (!kotaDuzenle) {
    return <div style={{ color: 'red', marginTop: 20 }}>Hata: Kota düzenleme işlevi bulunamadı.</div>;
  }

  const handleKotaDuzenle = () => {
    // Kullanıcı varsa ve admin rolüne sahipse kota düzenleme işlemi yap
    const yeniKotaBilgileri = {
      toplamAlan: parseInt(form.getFieldValue('toplamAlan')),
      kullanilanAlan: parseInt(form.getFieldValue('kullanilanAlan')),
    };

    kotaDuzenle(yeniKotaBilgileri);
    form.resetFields();

    console.log('Kota düzenleme başarılı');
    console.log('user', user);
    console.log('user rolü', user?.role);
  };

  const handleKullaniciOlustur = () => {
    // Yeni kullanıcı bilgilerini formdan al
    form
      .validateFields()
      .then((values) => {
        const yeniKullaniciBilgileri = {
          username: values.username,
          password: values.password,
          // Diğer kullanıcı bilgilerini de ekleyebilirsiniz
        };
  
        kullaniciOlustur(yeniKullaniciBilgileri);
        console.log('Yeni kullanıcı oluşturuldu');
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.error('Hata:', errorInfo);
      });
  };

  return (
    <div style={{ maxWidth: 800, minWidth: 600, margin: 'auto', padding: 20, backgroundColor: '#f0f5ff', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Title level={1} style={{ marginBottom: 20, textAlign: 'center', fontWeight: 'bold', color: '#1890ff' }}>
        Admin Dashboard
      </Title>
      <KotaPage />
      <Title level={4} style={{ marginTop: 30, marginBottom: 10, color: '#1890ff' }}>
        Kota Bilgilerini Düzenle
      </Title>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Toplam Alan (KB)"
              name="toplamAlan"
              rules={[{ required: true, message: 'Bu alanı doldurun' }]}
            >
              <Input prefix={<EditOutlined />} type="number" placeholder="Toplam Alan" style={{ borderColor: '#1890ff' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kullanılan Alan (KB)"
              name="kullanilanAlan"
              rules={[{ required: true, message: 'Bu alanı doldurun' }]}
            >
              <Input prefix={<EditOutlined />} type="number" placeholder="Kullanılan Alan" style={{ borderColor: '#1890ff' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" size="large" onClick={handleKotaDuzenle} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', marginRight: 10 }}>
            Kota Bilgilerini Düzenle
          </Button>
          <Button type="primary" size="large" onClick={handleKullaniciOlustur} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
            Yeni Kullanıcı Oluştur
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminDashboard;
