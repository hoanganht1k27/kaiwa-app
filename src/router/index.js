//Layout
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { Fragment } from 'react';
// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import RecordDetail from '~/pages/RecordDetail';
// Provider

// Public Page
const publicRoutes = [
  { 
    path: '/', component: Home, layout: DefaultLayout },
  {
    path: '/login', component: Login, layout: Fragment
  },
  {
    path: '/record-detail/:recordId', component: RecordDetail, layout: Fragment
  }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
