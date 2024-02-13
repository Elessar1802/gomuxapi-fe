import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DELETE } from '../../utils/utils';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await DELETE('auth');
      navigate('/login');
    })();
  }, [navigate]);
  return undefined;
}
