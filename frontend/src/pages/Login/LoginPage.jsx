import { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("----token-----", token);
    if(token){
      navigate("/apps");
    }
  }, [])

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!username || !password) return;

    axios
      .post('/login/', { username, password })
      .then((res) => {
        localStorage.setItem("token", `Token ${res.data?.token}`)
        navigate("/apps");
      })
      .catch((error) => {
      });
  };

  return (
    <div className='h-screen flex items-center justify-center flex-col gap-3'>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <input
              className='border p-2'
              type='text'
              placeholder='Email Address'
              id='txt_email'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className='border p-2'
              type='password'
              placeholder='Password'
              id='txt_password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
