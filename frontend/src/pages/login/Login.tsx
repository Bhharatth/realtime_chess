import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './login.css'
import { RootState } from '../../redux/store';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=> state.user);

  const handleLogin=(e: React.FormEvent)=> {
    e.preventDefault();
    login(dispatch, {username, password})
  }
  return (
    <div className='register'>
    <form className='form'>
        <input className='inputs' placeholder='username' type='text' onChange={(e)=> setUsername(e.target.value)}/>
        <input className='inputs' placeholder='password' type='password' onChange={(e)=> setPassword(e.target.value)}/>
        <button className='registerButton' onClick={handleLogin}>Login</button>
    </form>
</div>
  )
}

export default Login