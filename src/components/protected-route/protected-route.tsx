import React from 'react';
import { useSelector } from '../../services/store';
import {
  selectIsRequest,
  selectUser
} from '../../services/slices/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
}

export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const isRequest = useSelector(selectIsRequest);
  const location = useLocation();
  const user = useSelector(selectUser);

  if (isRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
}
