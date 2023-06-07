import React from 'react';
import "./register.css";

const Register = () => {
  return (
    <div className='register'>
        <form className='form'>
            <input className='inputs' placeholder='username' type='text'/>
            <input className='inputs' placeholder='email' type='email'/>
            <input className='inputs' placeholder='password' type='password'/>
            <button className='registerButton'>register</button>
        </form>
    </div>
  )
}

export default Register