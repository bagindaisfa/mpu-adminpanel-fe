import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <AntHeader
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        background: '#fff',
        padding: '20px',
      }}
    >
      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </AntHeader>
  );
};

export default Header;
