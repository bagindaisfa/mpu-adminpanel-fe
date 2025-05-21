import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { getContacts, getSchedules } from '../services/contacts';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getSchedules();
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
      title: 'Schedule',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        const now = new Date();
        const scheduleDate = new Date(record.datetime);
        const diffInMs = scheduleDate - now;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays < 0) {
          return <span style={{ color: 'red' }}>Passed</span>;
        } else if (diffInDays === 1) {
          return <span style={{ color: 'orange' }}>1 more day</span>;
        } else if (diffInDays <= 3) {
          return <span style={{ color: 'green' }}>{diffInDays} more days</span>;
        } else {
          return <span style={{ color: 'blue' }}>&gt; 3 more days</span>;
        }
      },
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
