import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
} from 'antd';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({ username: record.username, password: '' });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success('User deleted');
      fetchUsers();
    } catch {
      message.error('Failed to delete user');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success('User updated');
      } else {
        await createUser(values);
        message.success('User created');
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      title: 'No.',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        Add User
      </Button>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <Modal
        open={modalOpen}
        title={editingUser ? 'Edit User' : 'Add User'}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okText="Simpan"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, min: 3, message: 'Minimum 3 characters' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={editingUser ? 'Password (new)' : 'Password'}
            rules={[
              { required: true, min: 6, message: 'Minimum 6 characters' },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
