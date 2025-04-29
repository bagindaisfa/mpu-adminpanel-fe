import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'; // tambahkan useLocation
import { removeToken } from '../utils/auth';

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ambil location

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  // ambil segmen pertama setelah "/"
  const currentPage = location.pathname.split('/')[1] || 'Dashboard';

  return (
    <AntHeader
      style={{
        display: 'flex',
        justifyContent: 'space-between', // ubah dari flex-end ke space-between
        alignItems: 'center',
        background: '#fff',
        padding: '20px',
      }}
    >
      {/* Judul Halaman */}
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '18px',
          textTransform: 'capitalize',
        }}
      >
        {currentPage}
      </div>

      {/* Tombol Logout */}
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
