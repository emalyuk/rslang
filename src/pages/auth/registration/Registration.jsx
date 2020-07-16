import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRegistrationInfo } from './RegistrationSliceReducer';
import ROUTER from '../../../routes';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import Form from '../../../components/form/Form';
import Subtitle from '../../../components/subtitle/subtitle';

import '../auth.scss';

export const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, error } = useSelector((state) => state.registration);

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
      if (!isLoading && !error.langth) {
        await getRegistrationInfo({ email, password })(dispatch);
        history.push(ROUTER.login)
      }
    }
  }

  return (
    <div className='auth-wrapper'>
      <Subtitle>
        <span>Learning English</span>
        <br />
        Registration Now!
      </Subtitle>

      <Form className='form login-form' onSubmit={formSubmition}>
        <Input
          required
          value={email}
          onChange={handleEmailChange}
          type='email'
          className='email'
          placeholder='Email'
        />

        <span className='password-input-reglament'>{' Пароль должен содержать не менее 8-ми символов, '}</span>
        <span className='password-input-reglament'>заглавную букву(A-Z), 1 символ</span>
        <Input
          required
          value={password}
          onChange={handlePasswordChange}
          type='password'
          className='password'
          placeholder='Password'
        />

        <Input
          required
          value={confirmPassword}
          onChange={handlePasswordConfirm}
          type='password'
          className='password'
          placeholder='Confirm Password'
        />

        {error.map((i) => (<div className='unvalid-data'>{i}</div>))}
        {(password !== confirmPassword) ? <div className='unvalid-data'>Не совпадают пароли</div> : ''}

        <Button type='submit' onClick={() => {}} className='' disabled={isLoading}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Registration;
