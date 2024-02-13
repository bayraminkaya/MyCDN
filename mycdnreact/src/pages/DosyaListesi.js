import React from 'react';
import { useDosya } from '../contexts/DosyaContext';
import { List, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DosyaListesi = () => {
  const { userFiles, deleteFile } = useDosya();

  const handleDelete = (fileId) => {
    try {
      // Dosya silme işlemi
      deleteFile(fileId);
      message.success('Dosya başarıyla silindi.');
    } catch (error) {
      message.error('Dosya silinirken bir hata oluştu.');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#1890ff' }}>Kullanıcı Dosyaları</h2>
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

export default DosyaListesi;
 