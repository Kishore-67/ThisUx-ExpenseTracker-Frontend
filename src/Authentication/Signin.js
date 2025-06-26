import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';
import ima from './Revenue-bro.png';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });

      // Check message returned from backend
      if (res.data.message === 'Login successful') {
        console.log('Login success');
        //alert('Login successful!');
    localStorage.setItem('token', res.data.token);
          console.log("Saved token:", localStorage.getItem('token'));

        toast.success('Successfully LoggedIn')
        navigate('/Dashboard');
      } else {
          toast.warn('Incorrect Email or Password');
          //alert('Incorrect email or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      //alert('Failed to sign in');
      toast.error("Failed to Signin");
    }
  };

  return (
    <div className='parent1'>
      <img src={ima} className='ima' alt='crypto' height={550} width={550} />

      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className='input-box'>
            <input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaRegUser className='icon' />
          </div>

          <div className='input-box'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <RiLockPasswordFill className='icon' />
          </div>

          <div className='but-container'>
            <button type='submit'>Login</button>
          </div>

          <div className='register-link'>
            <p>
              Don't have an account? <Link to='/signup'>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
