import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getLoginInfo } from './LoginSliceReducer';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import { signInUser } from '../requests/request';

import './loginStyles.scss';

export const Login = () => {
  // const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const formSubmition = async (e) => {
    e.preventDefault();
    await signInUser({ email, password });
  }

  return (
    <div className='usc-footer'>
      <p className='authpage-title'>
        <span>Learning English</span>
        <br />
        Right Now!
      </p>

      <form onSubmit={formSubmition} className='login-form'>
        <Input value={email} onChange={handleEmailChange} type='email' className='email' placeholder='Email' />
        <Input value={password} onChange={handlePasswordChange} type='password' className='password' placeholder='Password' />
        <Button className='submit btn-hover color-9' value='Log in' />
      </form>
    </div>
  );
};

export default Login;
