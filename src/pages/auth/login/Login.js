import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginInfo } from './LoginSliceReducer';
import ROUTER from '../../../routes';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import Form from '../../../components/form/Form';
import Subtitle from '../../../components/subtitle/subtitle';

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, isUserLoggedIn } = useSelector((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      history.push(ROUTER.home);
    }
  }, [isUserLoggedIn]);

  const formSubmition = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      await getLoginInfo({ email, password })(dispatch);
    }
  }

  return (
    <div className='auth-wrapper'>
      <Subtitle>
        <span>Learning English</span>
        <br />
        Right Now!
      </Subtitle>

      <Form onSubmit={formSubmition} className='form login-form'>
        <Input required value={email} onChange={handleEmailChange} type='email' className='email' placeholder='Email' />
        <Input required value={password} onChange={handlePasswordChange} type='password' className='password' placeholder='Password' />
        <Button type='submit' onClick={() => {}} disabled={isLoading} className='submit btn-hover color-9'>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
