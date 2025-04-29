// src/components/AssessmentFormModal.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { createQuestion, updateQuestion } from '../services/assessments';

const AssessmentFormModal = ({ visible, onClose, onSuccess, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        question_text: initialData.question_text,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    try {
      if (initialData) {
        await updateQuestion(initialData.id, values.question_text);
        message.success('Pertanyaan berhasil diperbarui');
      } else {
        await createQuestion(values.question_text);
        message.success('Pertanyaan berhasil ditambahkan');
      }
      onSuccess();
    } catch (err) {
      message.error('Terjadi kesalahan saat menyimpan');
    }
  };

  return (
    <Modal
      title={initialData ? 'Edit Pertanyaan' : 'Tambah Pertanyaan'}
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Simpan"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Teks Pertanyaan"
          name="question_text"
          rules={[{ required: true, message: 'Teks pertanyaan wajib diisi' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssessmentFormModal;
