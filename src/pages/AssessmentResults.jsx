// src/pages/AssessmentResults.jsx
import React, { useEffect, useState } from 'react';
import { Table, Collapse, Spin, message } from 'antd';
import { getAllAnswers } from '../services/assessments';

const { Panel } = Collapse;

const AssessmentResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const res = await getAllAnswers();
      setData(res);
    } catch (err) {
      message.error('Gagal mengambil data jawaban');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) =>
        text ? text : <span style={{ color: 'gray' }}>Guest</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) =>
        text ? text : <span style={{ color: 'gray' }}>Not Provided</span>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'number',
      render: (text) =>
        text ? text : <span style={{ color: 'gray' }}>Not Provided</span>,
    },
    {
      title: 'Company Name',
      dataIndex: 'company',
      key: 'company',
      render: (text) =>
        text ? text : <span style={{ color: 'gray' }}>Not Provided</span>,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text) =>
        text ? text : <span style={{ color: 'gray' }}>Not Provided</span>,
    },
    {
      title: 'issues',
      key: 'issues',
      render: (_, record) => (
        <Collapse ghost>
          <Panel header="View Answer" key="1">
            <ul>
              {record?.issues?.map((item, idx) => (
                <li key={idx}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </Panel>
        </Collapse>
      ),
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
      <Spin spinning={loading}>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default AssessmentResults;
