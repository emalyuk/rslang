import React, { useState } from 'react';

import './Registration.scss';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import createUser from './RegistrationApi';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value)
  }

  const formSubmition = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      await createUser({ email, password })
    } else {
      alert('Password and confirm password are not equale!');
    }
  }

  return (
    <div className='auth-wrapper'>
      <p className='authpage-title'>
        <span>Learning English</span>
        <br />
        Registration Now!
      </p>

      <form className='login-form' onSubmit={formSubmition}>
        <Input value={email} onChange={handleEmailChange} type='email' className='email' placeholder='Email' />
        <Input value={password} onChange={handlePasswordChange} type='password' className='password' placeholder='Password' />
        <Input value={confirmPassword} onChange={handlePasswordConfirm} type='password' className='password' placeholder='Password' />
        <Button value='Sign Up' />
      </form>
    </div>
  );
};

export default Registration;
