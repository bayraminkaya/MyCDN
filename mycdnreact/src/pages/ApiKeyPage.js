// ApiKeyPage.js
import React, { useState } from 'react';
import { Form, Input, Button, List } from 'antd';
import { useDosya } from '../contexts/DosyaContext';

const ApiKeyPage = () => {
  const { createApiKey, apiKeys, deleteApiKey } = useDosya();
  const [apiKeyName, setApiKeyName] = useState('');

  const handleCreateApiKey = () => {
    createApiKey(apiKeyName);
    setApiKeyName('');
  };

  const handleDeleteApiKey = (apiKeyId) => {
    deleteApiKey(apiKeyId);
  };

  return (
    <div>
      <h2>API Anahtarları</h2>
      <Form layout="inline">
        <Form.Item label="API Anahtarı Adı">
          <Input value={apiKeyName} onChange={(e) => setApiKeyName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreateApiKey}>
            Oluştur
          </Button>
        </Form.Item>
      </Form>
      <List
        dataSource={apiKeys}
        renderItem={(apiKey) => (
          <List.Item key={apiKey.id}>
            {apiKey.name}
            <Button type="link" onClick={() => handleDeleteApiKey(apiKey.id)}>
              Sil
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ApiKeyPage;
