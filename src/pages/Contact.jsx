import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { getContacts } from '../services/contacts';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch contacts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // created_at
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Submitted At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={contacts}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default Contacts;
