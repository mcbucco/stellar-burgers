import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelector } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);
  return (
    <>
      <AppHeaderUI userName={user?.name} />
      <Outlet />
    </>
  );
};
