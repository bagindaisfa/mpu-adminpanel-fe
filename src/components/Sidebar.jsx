import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  FileProtectOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const { Sider } = Layout;

const menuItems = [
  { key: '1', path: '/dashboard', label: 'Dashboard', icon: <UserOutlined /> },
  { key: '2', path: '/blogs', label: 'Blog', icon: <FileOutlined /> },
  {
    key: '3',
    path: '/assessments',
    label: 'Assessment',
    icon: <FileProtectOutlined />,
  },
  {
    key: 'sub1',
    label: 'Management',
    icon: <SettingOutlined />,
    children: [
      { key: '4', path: '/users', label: 'Users', icon: <TeamOutlined /> },
      { key: '5', path: '/roles', label: 'Roles', icon: <UserOutlined /> },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const getSelectedKey = () => {
    const findItem = (items) => {
      for (const item of items) {
        if (item.children) {
          const found = findItem(item.children);
          if (found) return found;
        } else if (currentPath.startsWith(item.path)) {
          return item.key;
        }
      }
      return null;
    };
    return findItem(menuItems) || '1';
  };

  const renderMenuItems = (items) =>
    items.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: renderMenuItems(item.children),
        };
      }
      return {
        key: item.key,
        icon: item.icon,
        label: <Link to={item.path}>{item.label}</Link>,
      };
    });

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'white',
          textAlign: 'center',
          lineHeight: '32px',
          fontWeight: 'bold',
        }}
      >
        MPU Admin
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={renderMenuItems(menuItems)}
      />
    </Sider>
  );
};

export default Sidebar;
