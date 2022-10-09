//Layout
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { Fragment } from 'react';
// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import RecordDetail from '~/pages/RecordDetail';
import UploadVideo from '~/pages/UploadVideo.js';
import RoomDetail from '~/pages/RoomDetail';
import ViewDetail from '~/pages/VideoDetail';
import Ranking from '~/pages/Ranking';
// Provider

// Public Page
const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: '/login',
    component: Login,
    layout: Fragment,
  },
  {
    path: '/record-detail/:recordId',
    component: RecordDetail,
    layout: DefaultLayout,
  },
  {
    path: '/upload-video',
    component: UploadVideo,
    layout: DefaultLayout,
  },
  {
    path: '/record-detail/:recordId',
    component: RecordDetail,
    layout: Fragment,
  },
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/room-chat/:roomId/:type/:videoId', component: RoomDetail, layout: DefaultLayout },
  { path: '/room-chat', component: RoomDetail, layout: DefaultLayout },
  { path: '/video-detail/:videoId', component: ViewDetail, layout: DefaultLayout },

  { path: '/ranking', component: Ranking, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
