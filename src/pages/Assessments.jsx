// src/pages/Assessments.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Switch, Modal, message } from 'antd';
import {
  getQuestions,
  toggleQuestionVisibility,
} from '../services/assessments';
import AssessmentFormModal from '../components/AssessmentFormModal';

const Assessments = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      message.error('Gagal mengambil data pertanyaan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleToggleVisibility = async (id) => {
    try {
      await toggleQuestionVisibility(id);
      fetchQuestions();
      message.success('Berhasil mengubah status pertanyaan');
    } catch (err) {
      message.error('Gagal mengubah status');
    }
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question_text',
      key: 'question_text',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleVisibility(record.id)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            onClick={() => {
              setSelectedQuestion(record);
              setFormVisible(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setSelectedQuestion(null);
          setFormVisible(true);
        }}
        style={{ marginBottom: 20 }}
      >
        Add Question
      </Button>
      <Table
        columns={columns}
        dataSource={questions}
        rowKey="id"
        loading={loading}
      />
      <AssessmentFormModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSuccess={() => {
          setFormVisible(false);
          fetchQuestions();
        }}
        initialData={selectedQuestion}
      />
    </div>
  );
};

export default Assessments;
