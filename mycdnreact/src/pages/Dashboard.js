import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Card, Typography } from 'antd';
import userService from '../services/userService';
import axios from 'axios';
import DosyaPage from './DosyaPage';
import { useDosya } from '../contexts/DosyaContext';
import ApiKeyPage from './ApiKeyPage'; 

const { Meta } = Card;
const { Title } = Typography;

const Dashboard = () => {
  const [userFiles, setUserFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [userQuotas, setUserQuotas] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const { uploadFile, deleteFile, kullaniciOlustur } = useDosya();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userListResponse = await userService.getUserList();
        const firstUser = userListResponse[0];

        const userId = firstUser.id;

        const [info, roles, quotas] = await Promise.all([
          userService.getUserInfo(userId),
          userService.getUserRoles(userId),
          userService.getUserQuotas(userId),
        ]);

        setUserInfo(info);
        setUserRoles(roles);
        setUserQuotas(quotas);

        fetchUserFiles(userId);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  const fetchUserFiles = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/users/${userId}/files`);
      setUserFiles(response.data);
    } catch (error) {
      console.error('Dosya bilgileri alınamadı:', error);
    }
  };

  const handleDelete = (fileId) => {
    deleteFile(fileId);
  };

  const fetchUserQuotas = async () => {
    try {
      const quotas = await userService.getUserQuotas(userInfo.id);
      setUserQuotas(quotas);
    } catch (error) {
      console.error('Kullanıcı kotaları alınamadı:', error);
    }
  };

  const handleUpdateQuotas = async (values) => {
    try {
      await userService.updateUserQuotas(userInfo.id, values);
      message.success('Kullanıcı kotaları güncellendi.');
      setModalVisible(false);
      fetchUserQuotas();
    } catch (error) {
      console.error('Kullanıcı kotaları güncellenemedi:', error);
    }
  };

  const showUpdateQuotasModal = () => {
    setModalVisible(true);
  };

  const hideUpdateQuotasModal = () => {
    setModalVisible(false);
  };

  const handleKullaniciOlustur = () => {
    kullaniciOlustur({ role: 'KULLANICI_ROL_ADI' }); // Kullanıcı rol adını belirtin
  };

  return (
    <div style={{ maxWidth: 800, minWidth: 700, margin: 'auto', padding: 20, backgroundColor: '#f0f5ff', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#1890ff', textAlign: 'center' }}>Dashboard Page</h1>

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ color: '#1890ff' }}>Kullanıcı Bilgileri</h2>
        <p><strong>Kullanıcı Adı:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ color: '#1890ff' }}>Kullanıcı Roller</h2>
        <ul>
          {userRoles.map((role) => (
            <li key={role.id} style={{ color: '#1890ff' }}>
              {role.name} - {role.description}
            </li>
          ))}
        </ul>
      </section>

      <DosyaPage
        userFiles={userFiles}
        uploadFile={uploadFile}
        deleteFile={handleDelete}
      />

      <section style={{ marginBottom: 20, textAlign: 'center' }}>
        <h2 style={{ color: '#1890ff' }}>Kullanıcı Kotaları</h2>
        <Card title={<Title level={4} style={{ color: '#000' }}>Kota Alanı</Title>} style={{ width: 500, margin: 'auto', color: '#000', backgroundColor: '#D3D3D3', borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <p><strong>Toplam Alan:</strong> {userQuotas.totalSpace} KB</p>
          <p><strong>Kullanılan Alan:</strong> {userQuotas.usedSpace} KB</p>
          <Button type="primary" onClick={showUpdateQuotasModal} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
            Kotaları Güncelle
          </Button>
        </Card>
      </section>

      <Modal
        title="Kotaları Güncelle"
        open={modalVisible}
        onOk={hideUpdateQuotasModal}
        onCancel={hideUpdateQuotasModal}
        footer={null}
      >
        <Form onFinish={handleUpdateQuotas}>
          <Form.Item
            label="Toplam Alan (KB)"
            name="totalSpace"
            rules={[{ required: true, message: 'Toplam alanı giriniz!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Kullanılan Alan (KB)"
            name="usedSpace"
            rules={[{ required: true, message: 'Kullanılan alanı giriniz!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
              
      <section>
        <h2 style={{ color: '#1890ff', textAlign: 'center' }}>Kullanıcı Dosyaları</h2>
        <ul>
          {userFiles.map((file) => (
            <li key={file.id}>
              <span style={{ marginRight: 10 }}><strong>Dosya Adı:</strong> {file.name},</span>
              <span style={{ marginRight: 10 }}><strong>Boyut:</strong> {file.size} KB</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
      <ApiKeyPage />
      </section>
    </div>
  );
};

export default Dashboard;
