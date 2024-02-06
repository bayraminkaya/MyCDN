// ApiKeyPage.js

import React, { useState } from 'react';
import { Form, Input, Button, List } from 'antd';
import { useDosya } from '../contexts/DosyaContext';

const ApiKeyPage = () => {
  const { createApiKey, apiKeys } = useDosya();
  const [apiKeyName, setApiKeyName] = useState('');

  const handleCreateApiKey = () => {
    createApiKey(apiKeyName);
    setApiKeyName(''); // API anahtar adını temizle
  };

  return (
    <div>
      <h2>API Key Oluşturma</h2>
      <Form layout="inline">
        <Form.Item label="API Anahtar Adı">
          <Input
            value={apiKeyName}
            onChange={(e) => setApiKeyName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreateApiKey}>
            Oluştur
          </Button>
        </Form.Item>
      </Form>

      <h2>Oluşturulan API Anahtarları</h2>
      <List
        dataSource={apiKeys}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </div>
  );
};

export default ApiKeyPage;
