import React, { useState, useEffect } from 'react';
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
    // const validation = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})');
    // const validationSimbolFound = password.match(validation);

    // if (validationSimbolFound !== null && validationSimbolFound.input === confirmPassword) {
    if (!isLoading && !error.langth) {
      await getRegistrationInfo({ email, password })(dispatch);
      // alert(error)
    }
    // } else {
    //   alert('Что-то не так, проверьте вводимые данные!');
    // }
  }
  //TODO:
  // const { error } = useSelector((state) => state.regist);
  //TODO: редирек только при удачнйо регистрации (флаг когда регистрация true);

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
        <span className='password-input-reglament'>{'заглавную букву(A-Z), символ: +-_@$!%*?&#.,;:[]'}</span>
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

        <Button type='submit' onClick={() => {}} className='' disabled={isLoading}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Registration;
