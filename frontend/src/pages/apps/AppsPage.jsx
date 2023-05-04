import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import { Card } from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';

export const AppsPage = () => {
  const [user, setUser] = useState({});
  const [apps, setApps] = useState([]);
  const [isStaffUser, setIsStaffUser] = useState(false);
  const navigate = useNavigate();

  const HEADERS = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };

  useEffect(() => {
    axios
      .get('/auth/userinfo/', HEADERS)
      .then((res) => setUser(res.data))
      .catch((error) => console.error(error));

    axios
      .get('/apps/', HEADERS)
      .then((res) => setApps(res.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (Object.keys(user).length) {
      setIsStaffUser(user.is_staff || false);
    }
  }, [user]);

  const handleLogout = () => {
    axios
      .post('/auth/logout/', null, HEADERS)
      .then((res) => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  const appsUI = useMemo(() => {
    return apps.length ? (
      <>
        {apps.map((app) => {
          return <Card app={app} />;
        })}
      </>
    ) : (
      <>Loading...</>
    );
  }, [apps]);

  return (
    <div className='flex flex-col gap-4'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleLogout}
      >
        Logout
      </button>
      {isStaffUser && <Link to='/apps/add'>Add App</Link>}
      <div>{appsUI}</div>
    </div>
  );
};
