import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import { Card } from '../../components/card/Card';

const HEADERS = {
  headers: {
    Authorization: localStorage.getItem('token')
  }
};

export const AppsPage = () => {
  const [user, setUser] = useState({});
  const [apps, setApps] = useState([]);

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
      if (user.is_staff) {
      }
    }
  }, [user]);

  const cardView = () => {

  }

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

  return appsUI;
};
