
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import './Signup.css'
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import ima from './Revenue-bro.png'

import { RiLockPasswordFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email  || !password )
    {
      alert('Please enter the below all fields');
      return;
    }
    
    else{
      try {
        await axios.post('http://localhost:5000/signup', {username,email,password});
        alert('User signed up successfully');
       navigate('/Dashboard');
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to sign up');
      }
    }
  };

  return (

    <div className='parent2'>
      <img src={ima} className='ima' alt='crypto'height={550} width={550} />

    <div className='Signup'>
    <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <div className="input-box">
            <input type="text"  placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <FaRegUser className='icon' />
        </div>

        <div className="input-box">
            <input type="text"  placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <CiMail className='icon' />
        </div>

        <div className="input-box">
        <input type="text"  placeholder=" Create Password" value={password} onChange={e=>setPassword(e.target.value)}  required/>
        <RiLockPasswordFill className='icon' />
        </div>
       -<div className='but-container'>
        <button type="submit" >Sign Up</button>
        </div>
        <div className="register-link">
            <p>Already have an account? <div><Link to={'/signin'} >Login</Link></div></p>
        </div>

        </form>
        </div>
        </div>
  );
};

export default SignUp;
