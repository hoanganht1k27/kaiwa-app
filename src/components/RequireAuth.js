import React from 'react';
import { Outlet } from 'react-router-dom';

const RequireAuth = () => {
  return <Outlet />;

  //   return true ? <Outlet /> : <Navigate to="/landing" state={{ from: location }} replace />;
};

export default RequireAuth;
