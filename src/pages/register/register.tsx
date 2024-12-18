import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import { useDispatch, useSelector } from '../../services/store';
import {
  isAuthedSelector,
  loginErrorSelector,
  loginUserSelector,
  registerUser
} from '../../services/slices/user-slice';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(loginUserSelector);
  const isAuthed = useSelector(isAuthedSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newUser: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };
    dispatch(registerUser(newUser));
  };

  if (loading) {
    return <Preloader />;
  }

  if (isAuthed) {
    return <Navigate to={'/'} />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
