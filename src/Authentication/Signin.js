
import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css'
import ima from './Revenue-bro.png'
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'

const Signin = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] =  useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
      if(!email || !password){
        alert('enter all field')
        return;
      }
      try {
            const res = await axios.post('http://localhost:5000/signin', {email,password});
            if (res.data === "Success") {
              console.log("Login Success");
              alert('Login successful!');
              navigate('/Home');
          } else {
              alert('Incorrect password! Please try again.');
          }
      } 
      catch (error) {
        console.error('Error signing in:', error);
        alert('Failed to sign in');
      }

    
  };

  return (


<div className='parent1'>
<img src={ima} className='ima' alt='crypto'height={550} width={550} />

    
    <div className='wrapper'>
    <form onSubmit={handleSubmit}>
            <h1>Login</h1>
        <div className="input-box">
            <input type="text"  placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
            <FaRegUser className='icon' />
        </div>
        <div className="input-box">
        <input type="text"  placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <RiLockPasswordFill className='icon' />
        </div>
      <div className='but-container'><button type="submit" >Login</button></div>
        <div className="register-link">
            <p>Don't have an account??  <div><Link to={"/signup"}>Register</Link></div></p>
        </div>

        </form>
        </div>
        </div>

  );
};

export default Signin;
