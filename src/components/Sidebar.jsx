import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible>
      <div
        className="demo-logo-vertical"
        style={{ height: 32, margin: 16, background: 'white' }}
      />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileOutlined />}>
          <Link to="/blogs">Blog</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileProtectOutlined />}>
          <Link to="/assessments">Assessment</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
