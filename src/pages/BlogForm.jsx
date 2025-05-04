import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Upload, message, Image, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createBlog, updateBlog, getBlogById } from '../services/blogs';
import { getAllCategories } from '../services/category';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const BlogForm = ({ isEdit = false }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch categories
  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch(() => message.error('Failed to fetch categories'));
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      getBlogById(id)
        .then((data) => {
          form.setFieldsValue({
            title: data.title,
            category: data.category,
            content: data.content,
          });
          setContent(data.content);
          if (data.image_path) {
            setImagePreview(data.image_path);
          }
        })
        .catch(() => message.error('Failed to fetch blog data'));
    }
  }, [isEdit, id, form]);

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('content', values.content);
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    }

    try {
      if (isEdit && id) {
        await updateBlog(id, formData);
        message.success('Blog updated successfully');
      } else {
        await createBlog(formData);
        message.success('Blog created successfully');
      }
      navigate('/blogs');
    } catch (err) {
      message.error('Failed to submit blog');
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(fileList[0].originFileObj);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>{isEdit ? 'Edit Blog' : 'Create Blog'}</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select category">
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.name}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <JoditEditor
            ref={editor}
            value={content}
            config={{
              readonly: false,
              placeholder: 'Enter blog content',
            }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>

        <Form.Item label="Image">
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          {imagePreview && (
            <div style={{ marginTop: 10 }}>
              <Image src={imagePreview} width={200} />
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => navigate('/blogs')}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogForm;
