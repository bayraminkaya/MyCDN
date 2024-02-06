import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import userService from '../services/userService';
import axios from 'axios';
import DosyaPage from './DosyaPage';
import { useDosya } from '../contexts/DosyaContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userFiles, setUserFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [userQuotas, setUserQuotas] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const { uploadFile, deleteFile } = useDosya(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userListResponse = await userService.getUserList();
        const firstUser = userListResponse[0];
        const userId = firstUser.id;

        const [info, roles, quotas] = await Promise.all([
          userService.getUserInfo(userId),
          userService.getUserRoles(userId),
          userService.getUserQuotas(userId)
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

  return (
    <div>
      <h1>Dashboard Page</h1>
      <h2>Kullanıcı Bilgileri</h2>
      <p>Kullanıcı Adı: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>
      <h2>Kullanıcı Roller</h2>
      <h2>Dosya İşlemleri</h2>
      
      
      
      <input type="file" onChange={(e) => uploadFile(e.target.files[0])} />
      <ul>
        {userFiles.map((file) => (
          <li key={file.id}>
            Dosya Adı: {file.name}, Boyut: {file.size} KB
            <button onClick={() => handleDelete(file.id)}>Dosyayı Sil</button>
          </li>
        ))}
      </ul>
      
      <DosyaPage
        userFiles={userFiles}
        uploadFile={uploadFile}
        deleteFile={handleDelete}
      />
      <ul>
        {userRoles.map((role) => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
      <h2>Kullanıcı Kotaları</h2>
      <p>Toplam Alan: {userQuotas.totalSpace} KB</p>
      <p>Kullanılan Alan: {userQuotas.usedSpace} KB</p>
      <Button type="primary" onClick={showUpdateQuotasModal}>
        Kotaları Güncelle
      </Button>
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
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <h2>Kullanıcı Dosyaları</h2>
      <ul>
        {userFiles.map((file) => (
          <li key={file.id}>
            Dosya Adı: {file.name}, Boyut: {file.size} KB
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
