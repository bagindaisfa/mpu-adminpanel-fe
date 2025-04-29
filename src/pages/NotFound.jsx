import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleBackHome = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '72px', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '20px', marginBottom: '24px', color: '#666' }}>
        Page Not Found
      </p>
      <Button type="primary" onClick={handleBackHome}>
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
