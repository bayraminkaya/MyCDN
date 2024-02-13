import React, { useState, useEffect } from 'react';
import { useDosya } from '../contexts/DosyaContext';
import { Upload, Button, List, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const DosyaPage = () => {
  const { userFiles, uploadFile, deleteFile } = useDosya();
  const [fileList, setFileList] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    // Dosya başarıyla yüklendiğinde fileUploaded durumunu sıfırla
    if (fileUploaded) {
      const timeout = setTimeout(() => {
        setFileUploaded(false);
      }, 3000); // 3 saniye sonra sıfırla, isteğe bağlı olarak süreyi ayarlayabilirsiniz

      return () => clearTimeout(timeout);
    }
  }, [fileUploaded]);

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response && info.file.response.success) {
        message.success(`${info.file.name} dosyası başarıyla yüklendi.`);
        setFileUploaded(true);
      } else {
        message.error(`${info.file.name} dosyası yüklenirken bir hata oluştu.`);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} dosyası yüklenirken bir hata oluştu.`);
    }

    setFileList([...info.fileList]);
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    try {
      uploadFile(file);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const handleDelete = (fileId) => {
    deleteFile(fileId);
  };

  return (
    <div>
      <h2 style={{ color: '#1890ff', textAlign: 'center' }}>Dosya Yönetimi</h2>
      <Upload
        customRequest={customRequest}
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
        fileList={fileList}
        onChange={handleFileChange}
        beforeUpload={() => false}
      >
        <Button icon={<UploadOutlined />} type="primary">
          Dosya Seç
        </Button>
      </Upload>
      {fileUploaded && (
        <p style={{ color: '#1890ff', textAlign: 'center' }}>Dosya başarıyla yüklendi!</p>
      )}
      <List
        dataSource={userFiles}
        renderItem={(file) => (
          <List.Item key={file.id}>
            <List.Item.Meta
              title={file.name}
              description={`Boyut: ${file.size} KB`}
            />
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(file.id)}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default DosyaPage;
