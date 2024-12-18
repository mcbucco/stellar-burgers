import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { isAuthedSelector, loginUser } from '../../services/slices/user-slice';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isAuthed = useSelector(isAuthedSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const existingUser = {
      email: email,
      password: password
    };

    dispatch(loginUser(existingUser));
  };

  if (isAuthed) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
