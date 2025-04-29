import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd';
import {
  getComments,
  approveComment,
  unapproveComment,
  deleteComment,
} from '../services/comments';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch comments');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveComment(id);
      message.success('Comment approved');
      fetchComments();
    } catch (error) {
      console.error(error);
      message.error('Failed to approve comment');
    }
  };

  const handleUnapprove = async (id) => {
    try {
      await unapproveComment(id);
      message.success('Comment unapproved');
      fetchComments();
    } catch (error) {
      console.error(error);
      message.error('Failed to unapprove comment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      message.success('Comment deleted');
      fetchComments();
    } catch (error) {
      console.error(error);
      message.error('Failed to delete comment');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      dataIndex: 'is_approved',
      key: 'is_approved',
      filters: [
        { text: 'Approved', value: true },
        { text: 'Pending', value: false },
      ],
      onFilter: (value, record) => record.is_approved === value,
      render: (is_approved) =>
        is_approved ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="orange">Pending</Tag>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          {/* Handle Approve/Unapprove with Popconfirm */}
          {record.is_approved ? (
            <Popconfirm
              title="Are you sure you want to unapprove this comment?"
              onConfirm={() => handleUnapprove(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Unapprove</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Are you sure you want to approve this comment?"
              onConfirm={() => handleApprove(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Approve</Button>
            </Popconfirm>
          )}
          {/* Delete button with confirmation */}
          <Popconfirm
            title="Are you sure to delete this comment?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={comments}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default Comments;
