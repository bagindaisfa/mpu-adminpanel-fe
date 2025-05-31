import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Image,
  Popconfirm,
  message,
  Tag,
  Switch,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  getAllBlogs,
  deleteBlog,
  toggleBlogVisibility,
} from '../services/blogs'; // Buat file ini nanti

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res);
    } catch (err) {
      message.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success('Blog deleted');
      fetchBlogs();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await toggleBlogVisibility(id);
      fetchBlogs();
      message.success('Berhasil mengubah status blog');
    } catch (err) {
      message.error('Gagal mengubah status');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image_path',
      key: 'image_path',
      render: (url) => <Image width={100} src={url} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, { category }) => (
        <>
          <Tag color="green" key={category}>
            {category.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (val) => new Date(val).toLocaleString(),
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
        <Space>
          <Button
            type="link"
            onClick={() =>
              window.open(
                `https://mpupeoplesolution.com/blog_details/${record.id}`,
                '_blank'
              )
            }
          >
            View
          </Button>
          <Button onClick={() => navigate(`/blogs/edit/${record.id}`)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this blog?"
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
      <Button
        type="primary"
        onClick={() => navigate('/blogs/create')}
        style={{ marginBottom: 20 }}
      >
        + Add Blog
      </Button>
      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        loading={loading}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Blogs;
